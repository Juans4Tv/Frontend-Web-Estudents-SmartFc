import React from 'react';
import '../styles/welcomeinfo.scss';
import '../styles/global.scss'
import Logohi from '../assets/logos/hi.png';

const Welcomeinfo = () => {

    return (
        <div className='welcomeInfo'>
            <img src={Logohi} alt="Hola" className='logo-hi'></img>
            <h1>Bienvenido!</h1>
            En la barra podrás encontrar todas las opciones para interactuar con el aplicativo.
             A continuación, realizaremos una breve descripción.
            <ul className='ul-welcome'>
                <li>
                    <span className='txt-welcome'>Mis cursos:</span> Encontrarás todos los cursos en los 
                    que te encuentres matriculado, además, al darle click, aparecerán las actividades correspondientes al curso.
                </li>
                <li>
                    <span className='txt-welcome'>Dudas: </span> En esta sección se encuentran las dudas (preguntas) que le hayas hecho a tu profesor, relacionadas con cada materia.
                </li>
                <li>
                    <span className='txt-welcome'>REA: </span> En esta sección encontrarás el contenido REA disponible.
                </li>
                <li>
                    <span className='txt-welcome'>Mi progreso: </span> Al dar click encontrarás el progreso de cada una de tus actividades realizadas.
                </li>
            </ul>
            <p className='p-welcome'>Si deseas más información, haz click aquí: <a href="/pdf/usermanual.pdf" target='_blank' download>Manual Usuario</a></p>
        </div>
    );
}

export default Welcomeinfo;