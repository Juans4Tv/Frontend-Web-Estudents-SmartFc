import React, { useEffect, useState } from 'react';
import '../styles/areafilter.scss';
import { getBaseUrl } from '../config';


const FilterOption = () => {
    const [response, setresponse] = useState([]);
    const [error, setError] = useState(" ");

    useEffect(() => {
        fetch(`${getBaseUrl()}/loadAllcontents`)
        .then(res => res.json())
        .then(data => {
            setresponse(data)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <>
            {response.map((filter, indexfilter) => {

                return (
                    <>
                                <option value="">{filter.id_materia}</option>
                        
                    </>
                )
            })}
        </>
    )
}

export default FilterOption;