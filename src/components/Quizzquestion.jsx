import React, { useEffect, useState } from 'react';
import '../styles/testquestion.scss';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getBaseUrl } from '../config';

const Quizzquestion = ({playTimeq}) => {
    const [acQuestion, setacQuestion] = useState(1);
    const [puntuacion, setpuntuacion] = useState(0);
    const [isFinish, setisFinish] = useState(false);
    const [restTime, setrestTime] = useState(10);
    const [areDisable, setareDisable] = useState(false);
    const [responset, setresponset] = useState(null);
    const [preguntasLength, setPreguntasLength] = useState([])
    const [respuestas, setRespuestas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!playTimeq) {
            console.log('[Quizzquestion] playTimeq false, esperando...');
            return;
        }
        console.log('[Quizzquestion] playTimeq true, iniciando carga');
        const info_question = JSON.parse(localStorage.getItem("materia"));
        if (!info_question) {
            console.log('[Quizzquestion] No hay materia en localStorage');
            return;
        }
        const id_qstudet = info_question.id_actividad;
        console.log('[Quizzquestion] id_actividad:', id_qstudet);
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '¿Seguro que quieres recargar la página?';
        };
        axios({
            method: 'post',
            url: `${getBaseUrl()}/loadActivity`,
            data: {
                id_actividad: id_qstudet,

            }

        }).then(function (response) {
            console.log('[Quizzquestion] Actividad cargada:', response.data);
            const activityData = response.data.activity || response.data;
            console.log('[Quizzquestion] activityData keys:', Object.keys(activityData));
            setresponset(activityData)
            const r1 = activityData['A' + acQuestion + '1'];
            console.log('[Quizzquestion] respuestas A11...A14:', r1, activityData['A12'], activityData['A13'], activityData['A14']);
            setRespuestas([r1, activityData['A' + acQuestion + '2'], activityData['A' + acQuestion + '3'], activityData['A' + acQuestion + '4']])
        }).catch(function (error) {
            console.log('[Quizzquestion] Error cargando actividad:', error);
        })
        const info_acivity = JSON.parse(localStorage.getItem("materia"));
        const id_student = JSON.parse(localStorage.getItem("login"));
        const id_acivity = info_acivity.id_actividad;
        const id_students = id_student.student.id_estudiante;

        axios({
            method: 'post',
            url: `${getBaseUrl()}/createEventos`,
            data: {
                id_estudiante: id_students,
                id_actividad: id_acivity,
                paso: "3"

            }

        }).then((response) => {
            console.log('[Quizzquestion] createEventos paso 3:', response.data);
        }).catch((error) => {
            console.log('[Quizzquestion] error en createEventos paso 3:', error);
        })
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playTimeq])

    /*response.answers = [{
        respuesta1: id
    }]*/






    function handleAnswSubmit(isCorrect, e) {
        //puntuacion
        setacQuestion(acQuestion + 1);
        //console.log(acQuestion)
        setPreguntasLength([...preguntasLength, responset[0]['Q' + (acQuestion + 1)]])
        if (responset[0]['Q' + (acQuestion + 1)]) {
            setRespuestas([responset[0]['A' + (acQuestion + 1) + '1'], responset[0]['A' + (acQuestion + 1) + '2'], responset[0]['A' + (acQuestion + 1) + '3'], responset[0]['A' + (acQuestion + 1) + '4']])
        }
        else {
            //console.log(responset[0]['Q1'])
            setisFinish(true);
        }
        setrestTime(10)
        if (isCorrect) {
            setpuntuacion(puntuacion + 1)
        };

        //estilos
        //e.target.classList.add(isCorrect + 1 === responset[0]['CA'+ acQuestion] ? "correct" : "incorrect");
        //cambiar a la sg pregunta

        /* setTimeout(() => {
            if (acQuestion === preguntas.length - 1) {
                setisFinish(true);
            }
            else {
                setacQuestion(acQuestion + 1);

            }
        }, 1000); */
    }

    useEffect(() => {
        if(playTimeq){
        const intervalo = setInterval(() => {
            if (restTime > 0) setrestTime((prev) => prev - 1);
            if (restTime === 0) setareDisable(true);
        }, 1000);
        return () => clearInterval(intervalo);}
    }, [restTime, playTimeq]);

    if (isFinish) {

        const info_acivity = JSON.parse(localStorage.getItem("materia"));
        const id_student = JSON.parse(localStorage.getItem("login"));
        //console.log(info_matter);  const id_materia = info_matter.id_materiaActiva
        const id_acivity = info_acivity.id_actividad;
        const id_students = id_student.student.id_estudiante;
        //console.log(id_student);
        //setQuizzNote((puntuacion*5)/preguntasLength.length);
        var noteQuizz = ((puntuacion * 5) / preguntasLength.length);

        axios({
            method: 'post',
            url: `${getBaseUrl()}/createEventos`,
            data: {
                id_estudiante: id_students,
                id_actividad: id_acivity,
                paso: "3"

            }

        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
        axios({
            method: 'post',
            url: `${getBaseUrl()}/createEventos`,
            data: {
                id_estudiante: id_students,
                id_actividad: id_acivity,
                paso: "5",
                score_a: noteQuizz

            }

        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
        axios({
            method: 'post',
            url: `${getBaseUrl()}/loadEvento`,
            data: {
                id_estudiante: id_students,
                id_actividad: id_acivity,

            }

        }).then((responseq) => {
            localStorage.setItem("metricaq", JSON.stringify(responseq.data));
            console.log("si entraa");
        }).catch((error) => {
            console.log(error);
        })

        return (
            <main className='test-container'>
                <div className='up-cont'></div>
                <h3 className="titulo-result"> Obtuviste {puntuacion} de {preguntasLength.length}</h3>
                <button onClick={() => navigate("/mySubjects")} className='pick-btn'>Volver a mis materias</button>
            </main>
        )

    } else {
        console.log("fallo enviando evento metrica");
    }


    //console.log(preguntasLength.length)

    return (
        <div className='test-container'>
            {responset ? (
                <>
                    <div className='up-cont'>
                        <div className='numero-pregunta'>
                            <span>Pregunta {acQuestion}</span>
                        </div>
                        <div className='titulo-pregunta'>
                            <h3>{responset['Q' + acQuestion]}</h3>
                        </div>
                    </div>
                    <div className='down-cont'>
                        {respuestas.map((respuesta, i) => (
                            <button
                                disabled={areDisable}
                                key={i}
                                onClick={(e) => handleAnswSubmit(respuestas.indexOf(respuesta), e)
                                }>
                                {respuesta}
                            </button>
                        ))}
                        <div>
                            {!areDisable ? (
                                <span className='rest-time'>Tiempo restante: {restTime} </span>
                            ) : (
                                <div className='dt'>
                                    <p className='txt-t'>Se ha terminado tu tiempo, por favor da click en continuar.</p>
                                    <button className='ctn-btn'
                                        onClick={(e) => {
                                            setrestTime(10);
                                            setareDisable(false);
                                            handleAnswSubmit(false, e)
                                        }}>
                                        Continuar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p>Cargando preguntas...</p>
            )}
        </div>
    )
}

export default Quizzquestion;