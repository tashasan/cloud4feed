import React from 'react';

export default function Table({ onMouseEnter, labelFunc, data, propertyNames, buttons, emptyThread, matchValues, func, status, labelProp }) {

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
    console.log(filteredData)
    return (
        <table className='table table-striped table-rounded text-center'>
            <thead>
                <tr>
                    {propertyNames.map(val => (
                        <th key={`h_${val}`}>{val}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {filteredData.length === 0 ?

                    "" :

                    filteredData.map((val, i) => (
                        <tr key={`i_${i}`}>
                            {updatedPropertyNames.map(p => (
                                <td key={`i_${i}_${p}`}>
                                    {val[p]}
                                </td>
                            ))}

                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}
