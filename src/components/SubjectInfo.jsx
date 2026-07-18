import React, { useEffect, useState } from 'react';
import '../styles/subjectinfo.scss';
import pruSubject from '../assets/logos/prusubject.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getBaseUrl, getServerIP } from '../config';

const SubjectInfo = ({filter}) => {
  const [response, setresponse] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(" ");
  
 

  useEffect(() => {
    const info_studianteS = JSON.parse(localStorage.getItem("login"));
    if (!info_studianteS.student) return
    const grade_studet = info_studianteS.student.grado_estudiante;
    const sh_studet = info_studianteS.student.id_colegio;
    axios({
      method: 'post',
      url: `${getBaseUrl()}/loadAllSubjectActivesMovil`,
      data: {
        id_grado: grade_studet,
        id_colegio: sh_studet
      }
    }).then(function (response) {
      setresponse(response.data)
      const hasRuna = response.data.some(s =>
        s.nombre_materiaActiva?.toLowerCase().includes('runa')
      );
      localStorage.setItem('hasRunaSubject', hasRuna);
    }).catch(function (error) {
      setError(error.response.data.message);
    })
  }, [])


  const dataFilter = () => { 
    if (filter === '') {
      return(response)
    }
    else {
      return(response.filter(itemfilter => itemfilter.nombre_materiaActiva.toLowerCase().includes(filter.toLowerCase())))
    }
  }
  

  return (
    <>
    {dataFilter().map((subject, indexs) => {
      return(
      <div className='subject-info' key={indexs} onClick={() => {localStorage.setItem("infosubject", JSON.stringify(subject)); navigate("/myCourses")}}>
        <div className='txt-subjectinf'>
          <h2>Materia: {subject.nombre_materiaActiva} </h2>
          <p>Grado: {subject.id_grado} </p>
        </div>
        <img src={subject.url_imagen?.replace('localhost', getServerIP() || 'localhost') || pruSubject} alt={subject.nombre_materiaActiva} className="sub-logo" onError={(e) => { e.target.src = pruSubject }} />
        <div className="error-message">{error}</div>
      </div>
    )
    }
  )}
    </>
  )
}

export default SubjectInfo;
