import React, {Component} from 'react';
import Header from "../layouts/Header";
import Axios from 'axios'
const h1Style = {
    textAlign: 'center'
}

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false
        }
    }
    componentDidMount() {
        this.props.setLoggedOut().then(()=> {
            this.setState({loggedOut:true})
        })
    }

    render() {
        if (!this.state.loggedOut) {
            return <div className="container"><h1>Logging Out</h1></div>
        }
        return (
            <div className="container">
                <Header isLoggedIn={false}/>
                <h1 style={h1Style}>You have been logged out!</h1>
            </div>
        )

    }
}

export default Logout;