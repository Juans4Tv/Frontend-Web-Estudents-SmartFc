import React, { useState, useEffect } from 'react';
import '../styles/progressbar.scss';
import axios from 'axios';
import { getBaseUrl } from '../config';

const ProgressBar = () => {
  //const [progress, setProgress] = useState(0);
  const [response, setresponse] = useState([]);
  const [error, setError] = useState(" ");
  useEffect(() => {
    const id_student = JSON.parse(localStorage.getItem("login"));
    //console.log(info_matter);
    if (!id_student) return
    const id_students = id_student.student.id_estudiante
    axios({
      method: 'post',
      url: `${getBaseUrl()}/progreso`,
      data: {
        id_estudiante: id_students,
      }
    }).then((response) => {
      setresponse(response.data)
      console.log(response.data);
    }).catch((error) => {
      setError(error.response.data.message);
    })
  }, [])

  /*  useEffect(() => {
     // Simula un progreso gradual cada segundo
     const interval = setInterval(() => {
       if (progress < 100) {
         setProgress(progress + 10);
       } else {
         clearInterval(interval);
       }
     }, 1000);
 
     return () => clearInterval(interval);
   }, [progress]); */
  return (
    <>
      {response.map((progres, indexpercent) => {
        return (
          <>
            <div className='parentdiv' key={indexpercent}>
              <div className='childdiv' style={{ width: `${progres.progreso * 100}%` }} >
                <span className='progresstext' >{`${progres.progreso}%`}</span>
              </div>
            </div>

          </>
        )
      })}
    </>
  )
}

export default ProgressBar;
