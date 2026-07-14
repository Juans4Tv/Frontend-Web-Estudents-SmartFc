import React, { useEffect, useState } from 'react';
import '../styles/matterinfo.scss';
import axios from 'axios';
import { getBaseUrl } from '../config';

export const AvtivityInfo = () => {

    const [response, setresponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProgress = async () => {
            try {
                const loginData = JSON.parse(localStorage.getItem("login"));
                if (!loginData?.student) return;
                const id_estudiante = loginData.student.id_estudiante;
                const id_colegio = loginData.student.id_colegio;
                const id_grado = loginData.student.grado_estudiante;

                const [eventsRes, activitiesRes] = await Promise.all([
                    axios.post(`${getBaseUrl()}/generateMetrica`, { id_estudiante }),
                    axios.post(`${getBaseUrl()}/loadAllActivitiesMovil`, {
                        id_colegio, id_grado, id_materia: ''
                    })
                ]);

                const events = eventsRes.data;
                const activities = activitiesRes.data;

                const results = (Array.isArray(activities) ? activities : [])
                    .filter(act => act.id_actividad)
                    .map(act => {
                        const ev = (Array.isArray(events) ? events : []).find(
                            e => String(e.id_actividad) === String(act.id_actividad)
                        );
                        const checks = ev ? [ev.check_inicio, ev.check_fin, ev.check_video, ev.check_download].filter(Boolean).length : 0;
                        const totalChecks = 4;
                        const progreso = totalChecks > 0 ? +(checks / totalChecks).toFixed(2) : 0;
                        return {
                            titulo_actividad: act.titulo_actividad,
                            score_a: ev?.score_a || 0,
                            score_Ea: ev?.score_Ea || 0,
                            score_actividad: ev?.score_actividad || 0,
                            progreso
                        };
                    });

                setresponse(results);
            } catch (err) {
                setError('Error al cargar el progreso');
            } finally {
                setLoading(false);
            }
        };
        loadProgress();
    }, []);

    if (loading) return <p className='txt-welcome'>Cargando progreso...</p>;
    if (error) return <p className='txt-welcome'>{error}</p>;

    return (
        <>
            {response.length === 0 && <p className='txt-welcome'>No hay actividades registradas.</p>}
            {response.map((progress, indexp) => {
                return (
                    <div className='matterInfo' key={indexp}>
                        <h2>Actividad: {progress.titulo_actividad} </h2>
                        <p>Nota Actividad: {progress.score_actividad} </p>
                        <p>Nota Quizz: {progress.score_a}</p>
                        <p>Nota Evaluacion: {progress.score_Ea} </p>
                        <div className='progressContainer'>
                            <span className='progressText'>{`${Math.round(progress.progreso * 100)}%`}</span>
                            <div className='progressBar'>
                                <div className='progressFill' style={{ width: `${Math.round(progress.progreso * 100)}%` }} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    );
}
export default AvtivityInfo;
