import React from 'react';
import ValidatedRegisterForm from "./ValidatedRegisterForm";
import Header from "../layouts/Header";
import {Redirect} from "react-router-dom";

function Register(props) {
    if (props.isLoggedIn === "CHECKING") {
        return (<div></div>)
    } else if (!props.isLoggedIn) {
        return (
            <React.Fragment>
                <div className="container">
                    <Header isLoggedIn={props.isLoggedIn}/>
                </div>
                <ValidatedRegisterForm setLoggedIn={props.setLoggedIn}/>
            </React.Fragment>
        );
    } else {
        return (<Redirect to="/"/>);
    }
}

export default Register;