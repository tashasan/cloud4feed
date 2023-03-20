import React from "react";

export default function Input({ id, inputType,checked, placeholder, value, onChange, onFocus, error, labelValue, disable, title }) {
    let className = inputType !== "radio" ? `form-control mt-2 border border-secondary border-1` : "";
    let errorField = " border border-danger";

    return (
        <>
            {labelValue !== undefined ? (<>
                <label
                    className={labelValue.className}
                >
                    {labelValue.text}
                </label></>
            ) : undefined}
            <input
                id={id}
                placeholder={placeholder}
                value={value}
                onFocus={onFocus}
                onChange={onChange}
                type={inputType}
                className={error !== undefined ? className += errorField : className}
                disabled={disable}
                title={title}
                checked={checked}
            />
            <span>{error}</span>
        </>
    );
};
