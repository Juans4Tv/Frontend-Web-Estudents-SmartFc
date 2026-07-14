import React from 'react';
import see from '../assets/logos/ver.png';
import question from '../assets/logos/qestion.png';
import '../styles/global.scss';
import '../styles/modals.scss';
import '../styles/modalinfma.scss'


const InfMatter = ({ openx, onClosex }) => {
    if (!openx) return null;
    return (
        <div className='overlay'>

            <div className="modal-container">
                <div className="mat-x">
                    <h2 className="letter-modal">¡Instrucciones!</h2>
                    <p onClick={onClosex} className="close-btn">X</p>
                </div>
                <div className="lo-tex">
                    <p className='txt-dud' >
                        En esta sección encontrarás el video (contenido REA)  <br/>                      
                        El botón
                        <img src={question} alt="Pregunta" className='qlogo' ></img>
                         te permitirá realizarle preguntas a tu profesor, si tienes dudas, dale clic.
                        <br />
                        El botón de "Realiza el TEST" te llevará al examen no calificable.
                    </p>
                    <img src={see} alt="Informacion" className='solve' ></img>
                </div>
                Muchos éxitos.
            </div>
        </div>
    )
}

export default InfMatter;