import React from 'react';
import ValidatedRegisterForm from "./ValidatedRegisterForm";
import Header from "../layouts/Header";

function Register(props) {
    return (
        <React.Fragment>
            <Header/>
            <ValidatedRegisterForm />
        </React.Fragment>
    );
}

export default Register;