import React, { useEffect, useState } from 'react';
import hi from '../assets/logos/saludo.png';
import '../styles/global.scss';
import '../styles/modals.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModalPlayQuizz = ({ open, onClose }) => {
    const navigate = useNavigate();
    if (!open) return null;
    return (
        <div className='overlay'>
        <div className="modal-container">
            <div className="mat-x">
                <h2 className="letter-modal">Instrucciones:</h2>
                <p onClick={() => navigate("/mySubjects")} className="close-btn">X</p>
            </div>
            <div className="lo-tex">
                <img src={hi} alt="saludo" className='hi' ></img>
                <ul className='listplay'>
                    <li>Podrás realizar el quiz sólo una vez.</li>
                    <li>Selecciona una única respuesta.</li>
                    <li>El resultado estará basado en si la respuesta es correcta y el tiempo que tomes en responder.</li>
                    <li>Al dar click en JUGAR el quiz iniciará de inmediato.</li>
                </ul>
            </div>
            <div className="btn-div">
                <button onClick={onClose} className='btn-modal'>Jugar</button>
            </div>
        </div>
    </div>
    )
}

export default ModalPlayQuizz;