import React, { useEffect, useState } from 'react';
import Layaout from '../containers/Layout';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Activitys from '../pages/Activityes';
import Doubts from '../pages/Doubts';
import Downloads from '../pages/Downloads';
import Guest from '../pages/Guest';
import MyAcount from '../pages/MyAcount';
import MyCourses from '../pages/MyCourses';
import MySubjects from '../pages/Subjects';
import Rea from '../pages/Rea';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import '../styles/global.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PracAtHome from '../pages/PracAtHome';
import PraAtQuizz from '../pages/PraAtQuizz';
import PracAtSch from '../pages/PracAtSch';
import PracAtTest from '../pages/PracAtTest';
import PracAtHomeRea from '../pages/PracAtHomeRea';




const App = () => {

    const [isvalid, setisvalid] = useState(false)

    useEffect( () => {
        const info = JSON.parse(localStorage.getItem('login'))
        if (info){ 
            setisvalid(true) //Poner más seguridad aquí :D Si el estudiante tiene un id o algo, etc
        } else {
            setisvalid(false)
        }
    }, []) //Queremos que se ejecute sólo una vez, la 1era se renderiza

    return (
        <BrowserRouter>
        <Layaout>
            {!isvalid && <Routes>
                <Route path='/*' element ={ <Login/>} />
                <Route path='/register' element ={ <Register/>} />
                <Route exact path='/guest' element ={ <Guest/>} />
            </Routes> }
            {isvalid &&
        <Routes>
            <Route exact path='/activitys' element ={<Activitys/>} />
            <Route exact path='/myactivity' element ={<PracAtHome/>} />       
            <Route exact path='/reaActivity' element ={<PracAtHomeRea/>} />
            <Route exact path='/classActy' element ={<PracAtSch/>} />
            <Route exact path='/quizz' element ={<PraAtQuizz/>} />
            <Route exact path='/test' element ={<PracAtTest/>} />
            <Route exact path='/doubts' element ={ <Doubts/>} />
            <Route exact path='/downloads' element ={ <Downloads/>} />
            <Route exact path='/myAcount' element ={ <MyAcount/>} />
            <Route exact path='/myCourses' element ={ <MyCourses/>} />
            <Route exact path='/mySubjects' element={<MySubjects/>} />
            <Route exact path='/rea' element ={ <Rea/>} />
            <Route exact path='/register' element ={ <Register/>} />
            <Route exact path="/" element = { <Home/>}/>
            <Route path="*" element = {<NotFound/> } />
        </Routes>
        }
        </Layaout>
        </BrowserRouter>
    );
}

export default App;
