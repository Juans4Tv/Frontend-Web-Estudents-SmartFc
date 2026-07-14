import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import question from '../assets/logos/qestion.png';
import InfMatter from '../modals/InfMatter';
import Makedoubt from '../modals/Makedoubt';
import '../styles/global.scss';
import '../styles/modals.scss';
import Information from '../components/Information';
import VideoplayerComp from '../containers/VideoplayerComp';
import { getBaseUrl } from '../config';


const PracAtHome = () => {
    
    const [responsem, setresponsem] = useState([]);
       
    useEffect(() => {
        const info_acivity = JSON.parse(localStorage.getItem("materia"));
        const id_student = JSON.parse(localStorage.getItem("login"));
        //console.log(info_matter);  const id_materia = info_matter.id_materiaActiva
         const id_acivity = info_acivity.id_actividad;
         const  id_students = id_student.student.id_estudiante
        
        fetch(`${getBaseUrl()}/createEventos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_estudiante: id_students,
                id_actividad: id_acivity,
                paso:"8"
            })
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
   /*  useEffect(() => {
        const info_acivity = JSON.parse(localStorage.getItem("materia"));
        const id_student = JSON.parse(localStorage.getItem("login"));
        //console.log(info_matter);  const id_materia = info_matter.id_materiaActiva
         const id_acivity = info_acivity.id_actividad;
         const  id_students = id_student.student.id_estudiante
         console.log(id_student);
        axios({
            method: 'post',
            url: 'http://45.231.184.246:3000/api/loadUltimoEvento',
            data:{
                id_estudiante: id_students,
                id_actividad: id_acivity,
                
            }
            
        }).then((response) => {
            console.log(response);
            console.log("si entraa");
        }).catch((error) => {
            console.log(error);
        })
    }, []) */


    const navigate = useNavigate();
    const [openInfMatter, setopenInfMatter] = useState(false);
    const [openMaked, setopenMaked] = useState(false);
   
    return (
        <div className='bodyah'>
            <div className="mat-x">
                <h2 className="letter-imodal">Materia</h2>
                <Information onClick={() => setopenInfMatter(true)} />
                <InfMatter openx={openInfMatter} onClosex ={() => setopenInfMatter(false)}/>
                <p className="close-btn" onClick={() => navigate("/myCourses")}>X</p>
            </div>
            <VideoplayerComp/>
            <div className='bnt-quest'>
                <img src={question} alt="Pregunta" className='questionh'  onClick={() => setopenMaked(true)}></img>
                <Makedoubt openM={openMaked} onCloseM={()=> setopenMaked(false)}/>
            </div>
        </div>
    )
}

export default PracAtHome;