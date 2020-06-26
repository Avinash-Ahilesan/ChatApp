import React from 'react';
import ValidatedLoginForm from "./ValidatedLoginForm";
import Header from "../layouts/Header";


class Login extends React.Component{
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="Login">
                    <ValidatedLoginForm />
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
