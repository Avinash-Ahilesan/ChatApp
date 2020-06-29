import React, {Component} from 'react';
import Header from "./components/layouts/Header";

class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <Header isLoggedIn={this.props.isLoggedIn} />
            </div>
        );
    }
}

export default Main;