import React from 'react';
import '../styles/global.scss';
import '../styles/notFound.scss'
import sad from '../assets/logos/sad.png';

const NotFound = () => {
    return (
        <div className='Bottom'>
            <div className="Nf-container">
                <img src={sad} alt="crashLogo" className="logo1" ></img>
                <h1>404</h1>
                <h2>Página no encontrada</h2>
                <p>La página que está buscando, no existe o ha ocurrido otro error</p>
                <p>Regrese o diríjase a para elegir una nueva dirección.</p>
            </div>

        </div>
    );
}

export default NotFound;