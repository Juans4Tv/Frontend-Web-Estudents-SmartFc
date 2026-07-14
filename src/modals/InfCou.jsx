import React from 'react';
import '../styles/global.scss';
import '../styles/modals.scss';

const InfCou = ({ open, onClose }) => {
    if (!open) return null;
    return (
        <div className='overlay'>
            <div className="modal-container">
                <div className="mat-x">
                    <h2 className="letter-modal"></h2>
                    <p onClick={onClose} className="close-btn">X</p>
                </div>
                <div className="lo-tex">
                    <p className='txt-dud' >
                        Al dar click en las actividades encontraras los momentos MB2,MB3 y el examen.<br />
                        ¡Comienza ya!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InfCou;