import React, { useState } from 'react';
import '../styles/header.scss';
import '../styles/menubutton.scss';
import logo from '../assets/logos/logoSinFondo.png';
import MenuButton from './MenuButton';

const Header = () => {
    const [isActive, setIsActive] = useState(false);
    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav>
            <div className="navbar-left">
                <ul className='list'>

                    <li>
                        <a className='x-short' href='/'>
                            <img src={logo} alt="logo" className="logo" href="/mySubjects" />
                        </a>
                    </li>
                    <li>
                        <a className='med' href="/mySubjects">Mis Materias</a>
                    </li>
                    <li>
                        <a className='short' href="/doubts">Dudas</a>
                    </li>
                    {/* <li>
                        <a className='e-large' href="/downloads">Actividades Descargadas</a>
                    </li> */}
                    <li>
                        <a className='large' href="/rea">Contenido Rea</a>
                    </li>
                    <li>
                        <a className='med' href="/activitys">Mi progreso</a>
                    </li>
                    <li className="dplast">
                        <div className="dropdown">
                            <button onClick={() => setIsActive(!isActive)} className='dropbtn'>Perfil
                            </button>
                            {isActive &&
                                <div className="dropdown-content">
                                    <a className="dropdown-content-a" href="/myAcount">Modificar Perfil</a>
                                    <p className="dropdown-content-p" onClick={handleLogout}> Cerrar Sesión</p>
                                </div>}
                        </div>
                    </li>

                </ul>
                <ul className='list-mobile'>
                    <li>
                        <div className='burguer' onClick={() => setIsOpen(!isOpen)}>
                            <MenuButton isOpen={isOpen} />
                        </div>
                    </li>
                    {isOpen === true && <ul className='list-mobile-menu' >
                        <li>
                            <a className='x-short' href='/'>
                                <img src={logo} alt="logo" className="logo" href="/mySubjects" />
                            </a>
                        </li>
                        <li>
                            <a className='med' href="/mySubjects">Mis Materias</a>
                        </li>
                        <li>
                            <a className='short' href="/doubts">Dudas</a>
                        </li>
                        <li>
                            <a className='e-large' href="/downloads">Actividades Descargadas</a>
                        </li>
                        <li>
                            <a className='large' href="/rea">Contenido Rea</a>
                        </li>
                        <li>
                            <a className='med' href="/activitys">Actividades</a>
                        </li>
                        <li>
                            <a className='e-large' href="/myAcount">Modificar Perfil</a>
                        </li>
                        <li>
                            <p className='e-large' onClick={handleLogout}> Cerrar Sesión</p>
                        </li>
                        
                    </ul>}
                </ul>
            </div>
        </nav >
    );
}

export default Header;