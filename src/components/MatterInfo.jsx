import React, { useEffect, useState } from 'react';
import '../styles/matterinfo.scss';
import Modal from '../modals/Modal';
import axios from 'axios';
import { getBaseUrl } from '../config';

const Matterinfo = ({filter}) => {
    const [matter] = useState('');
    const [responsem, setresponsem] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(" ");


    useEffect(() => {
        const info_matter = JSON.parse(localStorage.getItem("infosubject"));
        const info_student = JSON.parse(localStorage.getItem("login"));
        if(!info_matter || !info_student) return 
        const id_materia = info_matter.id_materiaActiva
        const id_colegio = info_student.student.id_colegio
        const id_grado = info_student.student.grado_estudiante
        axios({
            method: 'post',
            url: `${getBaseUrl()}/loadAllActivitiesMovil`,
            data: {
                id_colegio: id_colegio,
                id_grado: id_grado,
                id_materia: id_materia
            }
        }).then((response) => {
            const info_subject = JSON.parse(localStorage.getItem("infosubject"));
            const filtered = response.data.filter(act => act.id_materiaActiva === info_subject.id_materiaActiva);
            setresponsem(filtered)
        }).catch((error) => {
            console.error('[MatterInfo] Error cargando actividades:', error);
            setError(error.response?.data?.message || 'Error al cargar actividades');
        })
    }, [])
    
    const dataFilterAcc = () => {
        if(filter === ''){
            return(responsem)
        }
        else{
            return(responsem.filter(itemfilter => itemfilter.titulo_actividad.toLowerCase().includes(filter.toLowerCase())))
        }
    } 
    const handleMateria = (data) => {
        setOpenModal(true);
        localStorage.setItem('materia', JSON.stringify({
            id_actividad: data.id_actividad,
            id_colegio: data.id_colegio,
            id_grado: data.id_grado,
            taller: data.taller,
            evaluacion: data.evaluacion,
            urlvideo: data.urlvideo || '',
            urltaller: data.urltaller || '',
            titulo_actividad: data.titulo_actividad || ''
        }))
        const info_acivity = JSON.parse(localStorage.getItem("materia"));
        const id_student = JSON.parse(localStorage.getItem("login"));
        //console.log(info_matter);  const id_materia = info_matter.id_materiaActiva
         const id_acivity = info_acivity.id_actividad;
         const  id_students = id_student.student.id_estudiante
       axios({
                method: 'post',
                url: `${getBaseUrl()}/loadEvento`,
                data:{
                    id_estudiante: id_students,
                    id_actividad: id_acivity,
                    
                }
                
            }).then((responseq) => {
                localStorage.setItem("metricaq", JSON.stringify(responseq.data));
                //console.log("si entraa");
            }).catch((error) => {
                console.log(error);
            })
    }
    //console.log(dataFilterAcc())
    return (
        <>
            {dataFilterAcc().map((activity, indexa) => (

                <div key={activity.id_actividad || indexa} className='matterInfo' onClick={() => handleMateria(activity)}>
                    <h2>Actividad: {activity.titulo_actividad}</h2>
                    <p>Objetivo: {activity.descripcion_actividad}</p>
                    {matter}
                </div>

            ))}
            <Modal open={openModal} onClose={() => setOpenModal(false)} />
            <div className="error-message">{error}</div>

        </>
    );
}

export default Matterinfo;