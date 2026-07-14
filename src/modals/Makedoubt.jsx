import axios from 'axios';
import { getBaseUrl } from '../config';
import React, {useEffect, useState} from 'react';
import mquest from '../assets/logos/robotPregunta.png';
import '../styles/global.scss';
import '../styles/modalmake.scss';

const Makedoubt = ({ openM, onCloseM }) => {
    const [formQuestion, setformQuestion] = useState({
        question: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [nextId, setNextId] = useState(null);

    useEffect(() => {
        if (!openM) return;
        const info_lduda = JSON.parse(localStorage.getItem("login"));
        if (!info_lduda?.student) return;
        const id_dstudent = info_lduda.student.id_estudiante;
        axios({
            method: 'post',
            url: `${getBaseUrl()}/loadDudaStudents`,
            data: { id_estudiante: id_dstudent }
        }).then((response) => {
            const dudas = response.data || [];
            const maxId = dudas.reduce((max, d) => Math.max(max, d.id_duda || 0), 0);
            setNextId(maxId > 0 ? maxId + 1 : parseInt(id_dstudent.toString() + '1'));
        }).catch(() => {
            setNextId(parseInt(id_dstudent.toString() + '1'));
        });
        setErrorMsg('');
    }, [openM]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setformQuestion((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formQuestion.question.trim()) return;
        
        const info_lduda = JSON.parse(localStorage.getItem("login"));
        const info_mduda = JSON.parse(localStorage.getItem("materia"));
        if(!info_lduda?.student && !info_mduda?.student) return
        const id_dstudent = info_lduda.student.id_estudiante;
        const id_dmatter = info_mduda.id_actividad;
        
        setLoading(true);
        setErrorMsg('');
        axios ({
            method: 'post',
            url: `${getBaseUrl()}/createDuda`,
            data: {
                id_duda: nextId || parseInt(id_dstudent.toString() + Date.now().toString().slice(-3)),
                id_estudiante: id_dstudent,
                id_actividad: id_dmatter,
                pregunta: formQuestion.question,
                respuesta: '',
                estado_duda: 0
            }
        }).then(function(response){
            onCloseM();
        }).catch(function(error){
            setErrorMsg('Error al enviar la pregunta. Intenta de nuevo más tarde.');
            setLoading(false);
        })
    };
    
    if (!openM) return null;
    return (
        <div className='overlaym'>

            <div className="modal-mcontainer">
                <div className="mat-mx">
                    <h2 className="letter-mmodal">Realiza tu pregunta.</h2>
                    <p onClick={onCloseM} className="close-btn">X</p>
                </div>
                <div className="q-tex">
                    <p className='txt-dud' >
                    Ingresa la pregunta para tu profesor/a
                    </p>
                    <div className='q-form'>
                    <img src={mquest} alt="Informacion" className='solveq' ></img>
                    <form className='formm'>
                        <input id="question" name="question" className='inp-question' 
                         value={formQuestion.question} onChange={handleChange} placeholder='Escribe tu pregunta aquí.'></input>
                        {errorMsg && <p className='error-msg'>{errorMsg}</p>}
                        <button type='submit' onClick={handleSubmit} className='btnsenq' disabled={loading}>{loading ? 'Enviando...' : 'Enviar Pregunta'}</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Makedoubt;