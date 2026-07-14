import React from 'react';
import inf from '../assets/logos/information.png';
import '../styles/info.scss';

const Information = ({onClick}) => {
  return (
    <div className='inf-d' onClick= {onClick} >
        <img src={inf} alt="informacion" className="inf-logo" ></img>
    </div>
  )
}

export default Information;