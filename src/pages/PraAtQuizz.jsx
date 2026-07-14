import React, { useState } from 'react'
import Quizz from '../containers/Quizz';
import ModalPlayQuizz from '../modals/ModalPlayQuizz';

const PraAtQuizz = () => {
  const [openModal, setOpenModal] = useState(true);
  const [playTimeq, setPlayTimeq] = useState(false);

  return (
    <div>
      <Quizz playTimeq ={playTimeq}/>
      <ModalPlayQuizz open={openModal} onClose={()=>{setOpenModal(false); setPlayTimeq(true)}}/>
    </div>
  )
}

export default PraAtQuizz;