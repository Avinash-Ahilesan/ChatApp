import React from 'react';
import Header from "../layouts/Header";

function LandingNotLogged(props) {
    return (
        <div className="container">
            <Header/>
            <section>
                <h1>Chat App 1.0</h1>
                <p className="subhead" style={pStyle}>The better way to communicate</p>
                <a style={registerButtonStyle} href="/register">Register Now!</a>
            </section>
        </div>
    );
}

const registerButtonStyle =  {
    backgroundColor: '#FFF8F0',
    width: 'calc(100% - 25em)',
    display: 'block',
    textDecoration: 'none',
    color: '#111111',
    borderRadius: '20px',
    fontSize: '1.1em',
    padding: '.5em',
    margin: '3% auto 7%',
    position: 'relative',
    zIndex: '4'
}

const pStyle = {
    'border-right': 'solid 3px #FFF8F0',
    margin: 'auto',
    'white-space': 'nowrap',
    overflow: 'hidden',
    'font-family': '\'Source Code Pro\', monospace',
    'font-size': '24px',
    color: '#FFF8F0',
    animation: 'animated-text 4s steps(29) 1s 1 normal both, animated-cursor 600ms steps(29) infinite'
}



export default LandingNotLogged;