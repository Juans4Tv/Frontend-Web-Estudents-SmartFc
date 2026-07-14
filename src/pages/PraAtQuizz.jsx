import React, { useState } from 'react'
import Quizz from '../containers/Quizz';
import ModalPlayQuizz from '../modals/ModalPlayQuizz';

const PraAtQuizz = () => {
  console.log('[PraAtQuizz] Render, openModal=true, playTimeq=false');
  const [openModal, setOpenModal] = useState(true);
  const [playTimeq, setPlayTimeq] = useState(false);

  return (
    <div>
      <Quizz playTimeq ={playTimeq}/>
      <ModalPlayQuizz open={openModal} onClose={()=>{console.log('[PraAtQuizz] Clic en Jugar'); setOpenModal(false); setPlayTimeq(true)}}/>
    </div>
  )
}

export default PraAtQuizz;