import React from 'react';
import Quizzquestion from '../components/Quizzquestion';

const Quizz = ({playTimeq}) => {
    return (
        <section className='main-container'>
            <div className='Bottom'>
                <Quizzquestion playTimeq={playTimeq}/>
            </div>
        </section>
    )
}

export default Quizz;