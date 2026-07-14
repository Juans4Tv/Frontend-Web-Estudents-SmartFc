import React from 'react';
import solve from '../assets/logos/doubtds.png';
import '../styles/global.scss';
import '../styles/modals.scss';

const Modal = ({ open, onClose, responsem }) => {
  if (!open || !responsem) return null;

  const pregunta = responsem.pregunta;
  const respuesta = responsem.respuesta;
  const respuestaVacia = !respuesta || respuesta.trim() === "";

  return (
    <div className='overlay'>
      <div className="modal-container">
        <div className="mat-x">
          <h2 className="letter-modal">{pregunta}</h2>
          <p onClick={onClose} className="close-btn">X</p>
        </div>
        <div className="lo-tex">
          {respuestaVacia ? (
            <>
              <p className='txt-dud'>El profesor aún no ha respondido tu pregunta</p>
            </>
          ) : (
            <>
              <p className='txt-dud'>{respuesta}</p>
              <img src={solve} alt="Respuesta" className='solve' />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
