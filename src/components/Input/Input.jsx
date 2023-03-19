import React from 'react';

export default function InputLabelOnBorder({ id, inputType, placeholder, value, onChange, onBlur }) {
    return (
        <>
            <input
                id={id}
                placeholder={placeholder}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                type={inputType}
                className="form-control mt-2 border border-info">
            </input>
        </>
    )
}
