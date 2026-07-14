import React from 'react';
import '../styles/serach.scss';
import lp from '../assets/logos/loupe.png';

const SearchAcc = ({handleChange}) => {
  
  return (
    <div className='searh'>
        <input onChange={(e) => handleChange(e)} type="text" className='inp-searchtxt' placeholder='Buscar Actividad'></input>
        {/* <img src={lp} alt="Buscar" className="search-logo" ></img> */}
    </div>
  )
}

export default SearchAcc;