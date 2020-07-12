import React, {Component} from 'react';

const friendStyle = {
    color: '#FFF8F0',
    fontSize: '10px',
    fontFamily: 'Arial',
    fontWeight: 1
}
const textStyle={
}
class Friend extends Component {
     constructor(props) {
         super(props);
     }
    render() {
        return (
            <div style={friendStyle}>
                <img src={this.props.avatar} />
                <h3 style={textStyle}>{this.props.username}</h3>
            </div>
        );
    }
}

export default Friend;