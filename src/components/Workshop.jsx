import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../config';
import { useNavigate } from 'react-router-dom';
import '../styles/pdfWorkshop.scss';
import '../styles/global.scss';
import '../styles/modals.scss';


const Workshop = () => {
    console.log('[Workshop] Componente renderizado');
    const [responsew, setresponsew] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        console.log('[Workshop] useEffect - leyendo materia');
        const info_materia = JSON.parse(localStorage.getItem("materia"));
        console.log('[Workshop] materia:', info_materia);
        if (!info_materia || !info_materia.urltaller) {
            console.log('[Workshop] No hay urltaller, retornando vacío');
            return;
        }
        const baseUrl = getBaseUrl();
        const urltaller = info_materia.urltaller;
        console.log('[Workshop] urltaller original:', urltaller);
        const repoIndex = urltaller.indexOf('/repositorio');
        let fullUrl;
        if (repoIndex !== -1) {
            const path = urltaller.substring(repoIndex);
            fullUrl = baseUrl + path;
        } else {
            fullUrl = urltaller;
        }
        console.log('[Workshop] urltaller final:', fullUrl);
        setresponsew({ urltaller: fullUrl });
    }, [])

    useEffect(() => {
        const info_acivity = JSON.parse(localStorage.getItem("materia"));
        const id_student = JSON.parse(localStorage.getItem("login"));
        if (!info_acivity || !id_student) return;
         const id_acivity = info_acivity.id_actividad;
         const  id_students = id_student.student.id_estudiante
        axios({
            method: 'post',
            url: `${getBaseUrl()}/createEventos`,
            data:{
                id_estudiante: id_students,
                id_actividad: id_acivity,
                paso: "4"
            }
        }).then((response) => {
            console.log('[Workshop] createEventos paso 4 ok:', response);
        }).catch((error) => {
            console.log('[Workshop] createEventos paso 4 error:', error);
        })
    }, [])


    return (
        <div className='pdfdi'>
            <div className='title-pdf'>
                <h2 className='pdf-title'>Aquí podrás encontrar el PDF de la actividad</h2>
                <p className="close-btn" onClick={() => navigate("/myCourses")}>X</p>
            </div>
            <iframe title="Visor de PDF"
                src={responsew.urltaller}
                width="80%"
                height="700px" />
        </div>
    )
}

export default Workshop;