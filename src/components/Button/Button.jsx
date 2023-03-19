import React from "react";
const Button = ({ text, type, disabled, onClick, id }) => {
    let className = "btn btn";

    return (
        <button id={id} className={`${className}${type} w-100`} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};
export default Button;