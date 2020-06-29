import React from "react";
import {Link} from "react-router-dom";

function Header(props) {
    return (
            <header className="Nav">
                <h3 className="logo">Logo</h3>
                <nav>
                    <ul className="show-desktop hide-mobile">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><a href="//github.com/Avinash-Ahilesan/ChatApp">Github</a></li>
                        <li>{props.isLoggedIn ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link> }</li>
                    </ul>
                </nav>
            </header>
    );
}


export default Header