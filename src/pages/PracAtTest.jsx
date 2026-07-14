import React, { useState } from 'react';
import Test from '../containers/Test';
import ModalPlayTest from '../modals/ModalPlayTest';

const PracAtTest = () => {
  const [openModal, setOpenModal] = useState(true);
  const [playTime, setPlayTime] = useState(false);
  return (
    <div>
        <Test playTime={playTime}/>
        <ModalPlayTest open={openModal} onClose={()=>{setOpenModal(false); setPlayTime(true)} } />
    </div>
  )
}
export default PracAtTest