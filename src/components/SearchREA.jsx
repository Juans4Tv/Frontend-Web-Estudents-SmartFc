import React from 'react';
import '../styles/serach.scss';

const SearchREA = ({handleChange, value = ''}) => {
    return (
        <div className='searh'>
            <input onChange={(e) => handleChange(e)} type="text" className='inp-searchtxt' placeholder='Buscar Actividad' value={value}></input>
        </div>
    )
}

export default SearchREA;
