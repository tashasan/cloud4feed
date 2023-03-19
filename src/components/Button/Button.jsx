import React from "react";
const Button = ({ text, type, disabled, onClick, id, onMouseOver, outline }) => {
    let className = "btn btn";

    return (
        <button id={id} className={`${className}${outline ? "-outline" : ""}${type} w-100`} onMouseOver={onMouseOver} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};
export default Button;