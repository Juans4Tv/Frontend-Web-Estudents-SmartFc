import React, { useEffect, useRef, useState } from 'react';
import '../styles/doubtsinfo.scss';
import ModalDoubt from '../modals/ModalDoubts';
import question from '../assets/logos/qestion.png';
import axios from "axios";
import { getBaseUrl } from '../config';

export const Doubtsinfo = ({filter}) => {
    const [responsem, setresponsem] = useState('');
    const [responseq, setresponseq] = useState([]);
    const [matter, setMatter] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [idduda, setIdduda] = useState(0);

    const handleclick = (id) => {
        setOpenModal(true);
        setIdduda(id);
    }

    useEffect(() => {
        if( idduda === 0) return
        axios({
            method: 'post',
            url: `${getBaseUrl()}/loadDuda`,
            data: {
                id_duda: idduda
            }
        }).then((responsem) => {
            setresponsem(responsem.data.duda || responsem.data)
        }).catch((error) => {
            console.log(error);
        })
    }, [idduda])

    useEffect(() => {
        const info_studiante = JSON.parse(localStorage.getItem("login"));
        if (!info_studiante.student) return
        const id_studet = info_studiante.student.id_estudiante;
        axios({
            method: 'post',
            url: `${getBaseUrl()}/loadDudaStudents`,
            data: {
                id_estudiante: id_studet
            }

        }).then(function (response) {
            setresponseq(response.data)
        }).catch(function (error) {
            console.log(error);
        })
    }, [])

    const dataFilterDoub = () => {
        if (filter == '') {
            return(responseq)
        }
        else {
            return(responseq.filter(itemfilter => itemfilter.pregunta.toLowerCase().includes(filter.toLowerCase())))
        }
    }
    
    return (
        <>

            {dataFilterDoub().map((doubt, index) => {
                return (
                    <div className='doubtsInfo' key={index} onClick={() => handleclick(doubt.id_duda)}>
                        <div className='info' >
                            <h2>Pregunta:
                                {doubt.pregunta}
                            </h2>
                            <p>Referencia pregunta: {doubt.id_duda}</p>
                            <p>Estado: {doubt.estado_duda}</p>
                            {matter}
                        </div>
                        <img src={question} alt="Pregunta" className='question' ></img>
                    </div>
                )
            }
            )}

            <ModalDoubt open={openModal} onClose={() => setOpenModal(false)} responsem={responsem} />
        </>
    )
}
export default Doubtsinfo;