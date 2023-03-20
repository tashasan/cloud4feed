import moment from 'moment/moment';
import React from 'react';

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
            <table className='table table-striped table-rounded text-center border border-info border-2'>
                <thead>
                    <tr>
                        {propertyNames.map(val => (
                            <th key={`h_${val}`}>{val}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map((val, i) => (
                            <tr key={`i_${i}`} className="bg-warning">
                                {updatedPropertyNames.map(p => (
                                    <td key={`i_${i}_${p}`}>
                                        {p === "due_on" ? moment(val[p]).format("DD/MM/yyyy") : val[p]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {filteredData.length === 0 ? <div className="fw-bold d-flex justify-content-center">There is no data to display</div> : undefined}
        </>
    )
}
