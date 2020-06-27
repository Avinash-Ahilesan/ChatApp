import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './components/login/ValidatedLoginForm'
import Login from "./components/login/Login";
import About from "./components/pages/About"
import LandingNotLogged from "./components/pages/LandingNotLogged";
import Register from "./components/register/Register";
import Axios from 'axios'

const proxy = {
    host: 'http://localhost',
    port: 3001
};

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
        }
    }
    componentDidMount() {
        Axios.get('/home').then((response)=> {
            console.log(response)
            this.setState({
                loggedInStatus: "LOGGED_IN",
                user: {}
            })
        }).catch((err) => {

        })
    }

    setLoggedIn(user) {
        console.log("UI Detected Logged In")
        // TODO: Make POST request to get user details
        this.setState({
            loggedInStatus: "LOGGED_IN",
            user: user
        })
    }

    setLoggedOut() {
        Axios.post('/logout').then(() => {
            this.setState({
                loggedInStatus: "NOT_LOGGED_IN",
                user: {}
            })
        }).catch((err) => {

        })
    }
    isLoggedIn(){
        return this.state.loggedInStatus === "LOGGED_IN";
    }

  render() {
      return (
          <Router>
              <Route exact path="/" render={props => this.isLoggedIn() ? <button onClick={this.setLoggedOut}>Logout</button> : <LandingNotLogged /> }/>
              <Route path="/login"  render={props =>
                  <Login {...props}
                                 isLoggedIn={this.isLoggedIn()}
                                 setLoggedIn={this.setLoggedIn.bind(this)}/>
              }
              />
              <Route path="/register" render={props => <Register {...props} />} isLoggedIn={this.isLoggedIn()}
                     setLoggedIn={this.setLoggedIn.bind(this)}/>
              <Route path="/about" component={About} />
          </Router>
      );
  }
}




export default App;
