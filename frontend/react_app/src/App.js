import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './components/login/ValidatedLoginForm'
import Login from "./components/login/Login";
import About from "./components/pages/About"
import Header from "./components/layouts/Header";
import LandingNotLogged from "./components/pages/LandingNotLogged";
import Register from "./components/register/Register";


function isLoggedIn(){
    return false;
}
class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
        }
    }
  render() {
      return (
          <Router>
              <Route exact path="/" render={props => {
                  if (!isLoggedIn()) {
                      return (
                          <LandingNotLogged/>
                      )
                  } else {
                      return <h1>Test</h1>
                  }
              }} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/about" component={About} />
          </Router>
      );
  }
}




export default App;
