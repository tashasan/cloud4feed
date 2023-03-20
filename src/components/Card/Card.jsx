import React from "react";

export default function Card({ body, borderColor }) {
    return (
        <div className={`card ${borderColor ? `border ${borderColor} border-3` : "shadow"}`}>
            <div className="card-body bg-light shadow rounded-4">
                {body}
            </div>
        </div>
    );
};
