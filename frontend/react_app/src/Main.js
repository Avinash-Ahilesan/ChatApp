import React, {Component} from 'react';
import Header from "./components/layouts/Header";
import FriendsPanel from "./components/FriendsPanel";

let friends = [{username: "Jimothy", avatar: "", status: "Online"},
    {username: "A-Test", avatar: "", status: "Online"}]
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'online'
        }
    }
    render() {
        return (
            <div className="container">
                <Header isLoggedIn={this.props.isLoggedIn} />
                <FriendsPanel friends={friends}/>
            </div>
        );
    }
}

export default Main;