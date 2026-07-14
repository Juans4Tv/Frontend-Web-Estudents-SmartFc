import React from 'react';
import hi from '../assets/logos/saludo.png';
import '../styles/global.scss';
import '../styles/modals.scss';
import { useNavigate } from 'react-router-dom';

const Modal = ({ open, onClose }) => {
    const navigate = useNavigate();


    if (!open) return null;
    return (
        <div className='overlay'>
            <div className="modal-container">
                <div className="mat-x">
                    <h2 className="letter-modal">Materia</h2>
                    <p onClick={onClose} className="close-btn">X</p>
                </div>
                <div className="lo-tex">
                    <p className='txt-f'>Selecciona una etapa para continuar</p>
                    <img src={hi} alt="saludo" className='hi' ></img>
                </div>
                <div className="btn-div">
                    <button onClick={() => navigate("/Myactivity")} className='btn-modal'>Práctica en Casa</button>
                    <button onClick={() => navigate("/classActy")} className='btn-modal'>Práctica en Clase</button>
                    <button onClick={() => navigate("/test")} className='btn-modal'>Realiza tu Examen</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;