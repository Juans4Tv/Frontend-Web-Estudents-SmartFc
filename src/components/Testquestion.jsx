import React, { useEffect, useState } from 'react';
import '../styles/testquestion.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getBaseUrl } from '../config';

const Testquestion = ({playTime}) => {
    const [actQuestion, setActQuestion] = useState(0);
    const [puntuaciont, setPuntuaciont] = useState(0);
    const [isFinisht, setIsFinisht] = useState(false);
    const [restTimet, setRestTimet] = useState(10);
    const [areDisablet, setAreDisablet] = useState(false);
    const [responsett, setResponsett] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [activityCompleted, setActivityCompleted] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!playTime) return;
        const info_questiont = JSON.parse(localStorage.getItem("materia"));
        if (!info_questiont) return;
        const id_tstudet = info_questiont.id_actividad;
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '¿Seguro que quieres recargar la página?';
        };
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
                paso: "9"
            }
        }).then((response) => {
            if (response.data && response.data.mensaje === 'La evaluación ya ha sido respondida.'){
                setActivityCompleted(true);
            } else{
                axios({
                    method: 'post',
                    url: `${getBaseUrl()}/loadActivity`,
                    data: {
                        id_actividad: id_tstudet,
                    }
                }).then(function (response) {
                    setResponsett(response.data.activity || response.data);
                }).catch(function (error) {
                });
            }
        }).catch((error) => {
        });


        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, [playTime]);

    function handleAnswSubmit(isCorrect, e) {
        if (e) {
            setActQuestion(actQuestion + 1);

            const selectedAnswerId = e.target.id;

            setSelectedAnswers([...selectedAnswers, selectedAnswerId]);

            if (isCorrect) {
                setPuntuaciont(puntuaciont + 1);
            }

            if (actQuestion >= responsett?.questions.length - 1) {
                setIsFinisht(true);
            } else {
                setRestTimet(10);
                setAreDisablet(false);
            }
        }
    }

    useEffect(() => {
        if (playTime) {
        const intervalo = setInterval(() => {
            if (restTimet > 0) setRestTimet((prev) => prev - 1);
            if (restTimet === 0) setAreDisablet(true);
        }, 1000);
        return () => clearInterval(intervalo);}
    }, [restTimet, playTime]);

    useEffect(() => {
        if (!isFinisht && !activityCompleted) return;
        const info_acivity = JSON.parse(localStorage.getItem("materia"));
        const id_student = JSON.parse(localStorage.getItem("login"));
        if (!info_acivity || !id_student) return;
        const id_acivity = info_acivity.id_actividad;
        const id_students = id_student.student.id_estudiante;

        if (activityCompleted) {
            axios({
                method: 'post',
                url: `${getBaseUrl()}/createEventos`,
                data: {
                    id_estudiante: id_students,
                    id_actividad: id_acivity,
                    paso: "6",
                    score_Ea: 1
                }
            }).then((response) => {
            }).catch((error) => {
            });
        } else if (isFinisht) {
            const noteTest = ((puntuaciont * 5) / (responsett?.questions?.length || 1));
            axios({
                method: 'post',
                url: `${getBaseUrl()}/createEventos`,
                data: {
                    id_estudiante: id_students,
                    id_actividad: id_acivity,
                    paso: "6",
                    score_Ea: noteTest,
                    answers: selectedAnswers
                }
            }).then((response) => {
            }).catch((error) => {
            });

            axios({
                method: 'post',
                url: `${getBaseUrl()}/loadEvento`,
                data: {
                    id_estudiante: id_students,
                    id_actividad: id_acivity,
                }
            }).then((responseq) => {
                localStorage.setItem("metricaq", JSON.stringify(responseq.data));
            }).catch((error) => {
            });
        }
    }, [isFinisht, activityCompleted, puntuaciont, responsett?.questions?.length, selectedAnswers]);

     if (activityCompleted) {
        return (
            <main className='test-container'>
                <div className='up-cont'></div>
                <h3 className="titulo-result">Actividad completada</h3>
                <h1 className="titulo-end">Ya has finalizado esta actividad. Puedes continuar en "Mis Materias".</h1>
                <button onClick={() => navigate("/mySubjects")} className='pick-btn'>Mis Materias</button>
            </main>
        );
    }

    if (isFinisht) {
        return (
            <main className='test-container'>
                <div className='up-cont'></div>
                <h3 className="titulo-result"> Obtuviste {puntuaciont} de {responsett?.questions?.length}</h3>
                <h1 className="titulo-end"> Finalizaste tu actividad, da click en "Mis Materias" para continuar aprendiendo</h1>
                <button onClick={() => navigate("/mySubjects")} className='pick-btn'>Mis Materias</button>
            </main>
        );
    }

    return (
        <>
            {actQuestion < responsett?.questions.length ? (
                <div className='test-container'>
                    <div className='up-cont'>
                        <div className='numero-pregunta'>
                            <span>Pregunta {actQuestion + 1}</span>
                        </div>
                        <div className='titulo-pregunta'>
                            <h3>{responsett?.questions[actQuestion].question}</h3>
                        </div>
                    </div>
                    <div className='down-cont'>
                        {responsett?.questions[actQuestion].options.map((option, optionIndex) => (
                            <button
                                disabled={areDisablet}
                                key={optionIndex}
                                id={option.id}
                                onClick={(e) => handleAnswSubmit(option.id === responsett?.questions[actQuestion].correct, e)}
                            >
                                {option.question}
                            </button>
                        ))}
                        <div>
                            {!areDisablet ? (
                                <span className='rest-time'>Tiempo restante: {restTimet} </span>
                            ) : (
                                <div className='dt'>
                                    <p className='txt-t'>Se ha terminado tu tiempo, por favor da click en continuar.</p>
                                    <button className='ctn-btn'
                                        onClick={(e) => {
                                            setRestTimet(10);
                                            setAreDisablet(false);
                                            handleAnswSubmit(false, e);
                                        }}>
                                        Continuar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {/* Puedes mostrar un mensaje o realizar una acción aquí */}
                </div>
            )}
        </>
    )
}

export default Testquestion;
