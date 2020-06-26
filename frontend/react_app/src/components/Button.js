import React from 'react'


function Button(props) {
    const customClass = `button_${props.className}`
    return (
      <button className={customClass} onClick={props.handleClick}>
          {props.text}
      </button>
    );
}

export default Button