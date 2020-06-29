import React from 'react';
import ValidatedLoginForm from "./ValidatedLoginForm";
import Header from "../layouts/Header";
import {Redirect} from 'react-router-dom'


class Login extends React.Component {

    constructor(props) {
        super(props);
        if (props.test === 'null' || props.test === 'undefined') {
            console.log("You went here manually!")
        }
    }

    render() {
        console.log(this.props.isLoggedIn)

        if (this.props.isLoggedIn === "CHECKING") {
            return (<div></div>)
        } else if (this.props.isLoggedIn) {
            return (<Redirect to="/"/>);
        } else {
            return (
                <React.Fragment>
                    <div className="container">
                        <Header isLoggedIn={this.props.isLoggedIn}/>
                    </div>
                    <div className="Login">
                        <ValidatedLoginForm setLoggedIn={this.props.setLoggedIn}/>
                    </div>
                </React.Fragment>

            );
        }
    }
}

export default Login;
