import React from "react";
import moment from "moment/moment";


export default function Table({ data, propertyNames }) {
    const regex = /([A-Z])([a-z]+)|\s/g;
    const updatedPropertyNames = propertyNames.map(name => {
        return name.replace(regex, (match, p1, p2) =>
            p1 ? `${p1.toLowerCase()}${p2}` : "_"
        ).toLowerCase();
    });
    let filteredData = data.map(v =>
        Object.keys(v)
            .filter(k => updatedPropertyNames.includes(k))
            .reduce((acc, key) => ((acc[key] = v[key]), acc), {})
    );
    return (
        <>
            <table className="table table-striped table-rounded text-center border border-info border-2">
                <thead>
                    <tr >
                        {propertyNames.map(val => (
                            <th style={val === "Title" ? { background: "#c2e0de", width: "50rem" } : { background: "#c2e0de", width: "20rem" }} key={`h_${val}`}>
                                {val}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map((val, i) => (
                            <tr key={`i_${i}`} >
                                {updatedPropertyNames.map(p => (
                                    <td style={val[p].length > 30 ? { background: "#edd4de", fontSize: ".7rem" } : { background: "#edd4de", fontSize: ".8rem" }} key={`i_${i}_${p}`}>
                                        {p === "due_on" ? moment(val[p]).format("DD/MM/yyyy") : val[p]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {filteredData.length === 0 ? <div className="fw-bold d-flex justify-content-center">There is no data to display..</div> : undefined}
        </>
    )
}
