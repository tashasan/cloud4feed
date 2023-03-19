import React from 'react';

export default function Input({ id, inputType, placeholder, value, onChange, onFocus, error, labelValue,disable }) {
    let className = `form-control mt-2 border border-secondary border-1}`;
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
            />
            <span>{error}</span>
        </>
    )
}
