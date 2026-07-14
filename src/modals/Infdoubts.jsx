import React from 'react';
import see from '../assets/logos/ver.png';
import '../styles/global.scss';
import '../styles/modals.scss';

const Infdoubts = ({ open, onClose }) => {
    if (!open) return null;
    return (
        <div className='overlay'>

            <div className="modal-container">
                <div className="mat-x">
                    <h2 className="letter-modal">¡Saludos!</h2>
                    <p onClick={onClose} className="close-btn">X</p>
                </div>
                <div className="lo-tex">
                    <p className='txt-dud' >
                    Aquí podrás encontrar la información relacionada con las preguntas que le haz realizado a tu profesor.
                    Si el profesor respondió tu pregunta, el estado sera actualizado a 1.
                    Para ver la respuesta de tu profesor da clic en alguna de las opciones que tienes en la lista.
                    </p>
                    <img src={see} alt="Informacion" className='solve' ></img>
                </div>
            </div>
        </div>
    )
}

export default Infdoubts;