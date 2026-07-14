import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { getBaseUrl } from '../config';

const Videoplayer = ({ onVideoEnd, playerRef, videoWatched }) => {
    const [responsev, setresponsev] = useState([]);

    const [, setvideoWatch] = useState(false);


    const handleVideoWatch = () => {
        setvideoWatch(true);
        if (true) {
                const info_acivity = JSON.parse(localStorage.getItem("materia"));
                const id_student = JSON.parse(localStorage.getItem("login"));
                //console.log(info_matter);  const id_materia = info_matter.id_materiaActiva
                 const id_acivity = info_acivity.id_actividad;
                 const  id_students = id_student.student.id_estudiante
                 console.log(id_student);
                axios({
                    method: 'post',
                    url: `${getBaseUrl()}/createEventos`,
                    data:{
                        id_estudiante: id_students,
                        id_actividad: id_acivity,
                        paso: "1"
                        
                    }
                    
                }).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                })
            
        }
        else {
            console.log("fallo");
        }
    };

    useEffect(() => {
        console.log('[Videoplayer] useEffect - leyendo materia');
        const info_matter = JSON.parse(localStorage.getItem("materia"));
        console.log('[Videoplayer] materia:', info_matter);
        if (!info_matter || !info_matter.urlvideo) {
            console.log('[Videoplayer] No hay urlvideo, retornando vacío');
            return;
        }
        const baseUrl = getBaseUrl();
        const urlvideo = info_matter.urlvideo;
        console.log('[Videoplayer] urlvideo original:', urlvideo);
        const repoIndex = urlvideo.indexOf('/repositorio');
        let fullUrl;
        if (repoIndex !== -1) {
            const path = urlvideo.substring(repoIndex);
            fullUrl = baseUrl + path;
        } else {
            fullUrl = urlvideo;
        }
        console.log('[Videoplayer] urlvideo final:', fullUrl);
        setresponsev({ urlvideo: fullUrl });
    }, [])

    return (
        <>
                
                    <ReactPlayer
                        url={responsev.urlvideo}
                        controls
                        onPlay={handleVideoWatch}
                        volume={0.8}
                        onEnded={onVideoEnd}
                        ref={playerRef}
                        style={videoWatched ? { display: "none" } : null} />
                
            
        </>
    );
}

export default Videoplayer;
