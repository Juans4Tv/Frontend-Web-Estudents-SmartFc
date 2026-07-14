import React, { useState } from 'react';
import Test from '../containers/Test';
import ModalPlayTest from '../modals/ModalPlayTest';

const PracAtTest = () => {
  console.log('[PracAtTest] Render, openModal=true, playTime=false');
  const [openModal, setOpenModal] = useState(true);
  const [playTime, setPlayTime] = useState(false);
  return (
    <div>
        <Test playTime={playTime}/>
        <ModalPlayTest open={openModal} onClose={()=>{console.log('[PracAtTest] Clic en Jugar'); setOpenModal(false); setPlayTime(true)} } />
    </div>
  )
}
export default PracAtTest