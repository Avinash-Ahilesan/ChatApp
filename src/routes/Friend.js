const Router = require('express')
const isNullOrUndefined = require('../Util')
const validate = require('../validation').joiutil.validate
const {auth, catchAsync} = require('../middleware')
const User = require('../models')
const REDIS_OPTIONS = require('../../config/cache').REDIS_OPTIONS
const friendRequestSchema = require('../validation').friends.friendRequestSchema
const acceptRequestSchema = require('../validation').friends.acceptRequestSchema
const router = Router()
const Redis = require('ioredis')
const redis = new Redis(REDIS_OPTIONS)
// for sending friend requests


async function addFriendRequestCache(originalUser, friendUserID) {
    const cachedUser = await redis.get(originalUser.id)
    console.log(cachedUser)
    if (!isNullOrUndefined(cachedUser)) {
        let cachedUserRequests = cachedUser.friendRequests
        if (isNullOrUndefined(cachedUserRequests)) {
            cachedUserRequests = []
        }
        let randomVar;
        cachedUserRequests.push(friendUserID)
        redis.set(originalUser.id, JSON.stringify({username: originalUser.username, usrStatus: originalUser.usrStatus,
            friends: cachedUser.friends, friendRequests: cachedUserRequests}))
    }
}

async function acceptFriendRequestCache(originalUser, friendRequestedUser) {
    const originalUserCache = await redis.get(originalUser.id)
    const friendRequestedUserCache = await redis.get(friendRequestedUser.id)
    let cachedUserRequests = friendRequestedUserCache.friendRequests;
    if (isNullOrUndefined(cachedUserRequests)) {
        cachedUserRequests = []
    }
    let index = 0;
    for (let x of cachedUserRequests) {
        index++;
        if (x === friendRequestedUser.id){
            cachedUserRequests.pull(index);
        }
    }

    let originalUserFriends = originalUserCache.friends;
    let friendRequestedFriends = friendRequestedUserCache.friends;
    if (isNullOrUndefined(originalUserFriends)) {
        originalUserFriends = []
    }
    if (isNullOrUndefined(friendRequestedFriends)) {
        friendRequestedFriends = []
    }

    originalUserFriends.push(friendRequestedUser.id)
    friendRequestedFriends.push(originalUser.id)

    redis.set(originalUser.id, JSON.stringify({username: originalUser.username, friends : originalUserFriends,usrStatus: originalUser.usrStatus, friendRequests : originalUserCache.friendRequests}))
    redis.set(friendRequestedUser.id, JSON.stringify({username: friendRequestedUser.username, friends : friendRequestedFriends, usrStatus: friendRequestedUser.usrStatus, friendRequests : cachedUserRequests}))
    console.log("made it here")
}

async function denyFriendRequestCache(friendRequestedUser) {
    const friendRequestedUserCache = await redis.get(friendRequestedUser.id)
    let cachedUserRequests = friendRequestedUserCache.friendRequests;
    if (isNullOrUndefined(cachedUserRequests)) {
        cachedUserRequests = []
    }
    let index = 0;
    for (let x of cachedUserRequests) {
        index++;
        if (x === friendRequestedUser.id){
            cachedUserRequests.pull(index);
        }
    }
    redis.set(friendRequestedUser.id, JSON.stringify({username: friendRequestedUser.id, friends: friendRequestedUser.friends,
        usrStatus: friendRequestedUser.usrStatus, friendRequests: cachedUserRequests}))
}

router.post('/friends/requests', auth , catchAsync(async (req, res) => {
    await validate(friendRequestSchema, req.body)
    const {username} = req.body

    const sendingUser = await User.findById(req.session.userId)
    if (!sendingUser)
        throw {status: 401, message: "Unauthorized"}
    const user = await User.findOne({username})
    if (!user) {
        throw {status: 400, message: "User does not exist"}
    }

    const friendRequest = req.session.userId
    if (isNullOrUndefined(user.friendRequests)) {
        user.friendRequests = [friendRequest]
    } else {
        if (!user.friendRequests.includes(friendRequest)) {
            user.friendRequests.push(friendRequest)
        }
    }
    user.save((err, usr) => {
        if (err) throw {status: 500, message: "couldn't read database"}
    })
    await addFriendRequestCache(user.id, friendRequest)
    console.log(user.friendRequests)
    res.json({status: 200, message: "Successfully sent friend request"})
}))


async function acceptUser(user1, user2 ) {
    const user2FriendObj = user2.id;
    const user1FriendObj = user1.id;
    user1.friends.push(user2FriendObj)
    user2.friends.push(user1FriendObj)
    user1.save((err, usr) => {
        if (err) throw {status:200, message: err}
    })
    user2.save((err, usr) => {
        if (err) throw {status:200, message: err}
    })

    await acceptFriendRequestCache(user2, user1)
}
router.post('/friends/replyToRequest',auth, catchAsync( async (req, res) => {
    await validate(acceptRequestSchema, req.body)
    const {reply, username} = req.body

    console.log(reply + " " + username)
    const user = await User.findById(req.session.userId)
    if (!user) {
        throw {status: 401, message: "Unauthorized"}
    }
    const userToAdd = await User.findOne({username})
    if (!userToAdd) {
        throw {status: 400, message: "User does not exist"}
    }

    const friendRequestList = user.friendRequests;
    let hasUser = false;
    let index = -1;
    for (let x of friendRequestList) {
        index++;
        if (x === userToAdd.id) {
            hasUser = true;
            break;
        }
    }
    console.log(friendRequestList[index])
    if (!hasUser) {
        throw {status: 400, message: "Cannot accept friend request - Request does not exist"}
    }

    let message = ""
    if (reply === "accept") {
        friendRequestList.pull(friendRequestList[index])
        await acceptUser(user, userToAdd);
        message = "Accepted Friend Request"
    } else if (reply === "deny") {
        friendRequestList.pull(friendRequestList[index])
        user.save((err, usr) => {
            if (err) throw {status: 400, message: err}
        })
        await denyFriendRequestCache(user)
        message = "Denied Friend Request"
    } else {
        throw {status: 400, message: "somethings gone wrong"}
    }

    res.json({status: 200, message: message})

}))

//get all online friends
router.get('/friends/online', auth, catchAsync ( async (req, res) => {
    let userCached = await redis.get(req.session.userId)
    userCached = await JSON.parse(userCached)
    if (isNullOrUndefined(userCached)) {
        throw {status: 401, message: "Unauthorized"}
    }
    let friendsArray = userCached.friends
    if (isNullOrUndefined(friendsArray)) {
        return res.json({status: 200, message: "[]"})
    }
    let onlineFriendArray = []
    for (let x of friendsArray) {
        let friend = await redis.get(x)
        friend = JSON.parse(friend)
        console.log(x)
        if (!isNullOrUndefined(friend)) {
            onlineFriendArray.push(friend.username)
        }
    }
    res.json({status: 200, message: onlineFriendArray})
}))

module.exports = router

