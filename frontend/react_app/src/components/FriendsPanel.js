import React, {Component} from 'react';
import Friend from "./Friend";

const panelStyle = {
    position: 'fixed',
    height: '100%',
    width: '250px',
    zIndex: '1',
    top: '3.4em',
}
const friendLabel = {
    marginTop: '30px',
    width: '85%'
}

//TODO: get unique key for objects (usernames may not be unique)
class FriendsPanel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={panelStyle}>
               <label style={friendLabel}>Friends</label>
                {this.props.friends.map( (obj) => <Friend key={obj.username} username={obj.username}
                                                          avatar={obj.avatar} status={obj.status} />)}
            </div>
        );
    }
}

export default FriendsPanel;