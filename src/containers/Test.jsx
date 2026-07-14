import React from 'react';
import Testquestion from '../components/Testquestion';


const Test = ({playTime}) => {
    return (
        <section className='main-container'>
            <div className='Bottom'>
                <Testquestion playTime={playTime}/>
            </div>
        </section>
    )
}

export default Test;