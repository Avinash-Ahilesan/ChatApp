import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import './components/login/ValidatedLoginForm'
import Login from "./components/login/Login";
import About from "./components/pages/About"
import LandingNotLogged from "./components/pages/LandingNotLogged";
import Register from "./components/register/Register";
import Axios from 'axios'
import Main from "./Main";
import Logout from "./components/pages/Logout";



class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",    // 3 values: NOT_LOGGED_IN, LOGGED_IN, CHECKING
            user: {}
        }
    }
    componentDidMount() {
        this.setState({
            loggedInStatus: "CHECKING",
            user: {}
        })
        Axios.get('/home').then((response) => {
            console.log(response)
            this.setState({
                loggedInStatus: "LOGGED_IN",
                user: {}
            })
        }).catch((err) => {
            this.setState({
                loggedInStatus: "NOT_LOGGED_IN",
                user: {}
            })
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
        return Axios.post('/logout').then(() => {
            this.setState({
                loggedInStatus: "NOT_LOGGED_IN",
                user: {}
            })
        }).catch((err) => {

        })
    }
    isLoggedIn(){
        if (this.state.loggedInStatus === "CHECKING") {
            return "CHECKING"
        }
        return this.state.loggedInStatus === "LOGGED_IN";
    }

  render() {
      return (
          <Router>
              <Route exact path="/" render={props => {
                  if (this.isLoggedIn() === "CHECKING") {
                      return (<div></div>)
                  }
                  return ( this.isLoggedIn() ? <Main isLoggedIn={this.isLoggedIn()}/> : <LandingNotLogged isLoggedIn={this.isLoggedIn()}/> )
                }
               }/>
              <Route path="/login"  render={props =>
                  <Login {...props}
                                 isLoggedIn={this.isLoggedIn()}
                                 setLoggedIn={this.setLoggedIn.bind(this)}/>
              }
              />
              <Route path="/register" render={props => <Register {...props}
                                                                 setLoggedIn={this.setLoggedIn.bind(this)}
                                                                 isLoggedIn={this.isLoggedIn()} />  }  />
              <Route path="/about" component={About} />
              <Route path="/logout" render={props => <Logout { ... props} setLoggedOut={this.setLoggedOut.bind(this)}/>} />
          </Router>
      );
  }
}




export default App;
