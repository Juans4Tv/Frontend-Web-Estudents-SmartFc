import React, { useEffect, useState } from 'react';
import '../styles/matterinfo.scss';
import Modal from '../modals/Modal';
import axios from 'axios';
import { getBaseUrl } from '../config';

export const GuestInfo = ({filter}) => {
  const [openModal, setOpenModal] = useState(false);
  const [responser, setresponser] = useState([]);
  const [errorGuest, setErrorGuest] = useState('');

  useEffect(() => {
    const baseUrl = getBaseUrl();
    if (!baseUrl) {
      setErrorGuest('⚠️ No hay IP del servidor configurada. Ve al login, configura la IP e intenta de nuevo.');
      return;
    }
    axios({
      method: 'get',
      url: `${baseUrl}/loadAllcontents`,
    }).then(response => {
      setresponser(response.data)
    }).catch((error) => {
      setErrorGuest('Error al cargar contenido: ' + (error.response?.data?.message || error.message));
    })
  }, [])

  const datafilterREA = () => {
    if(filter == ''){
      return(responser)
    }
    else {
      return(responser.filter(itemfilter => itemfilter.nombre_CREA.toLowerCase().includes(filter.toLowerCase())))
    }
  }

  if (errorGuest) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--error)', fontSize: '16px', fontWeight: 500 }}>{errorGuest}</div>;
  }

  return (
    <>
      {datafilterREA().map((rea, indexr) => (
        <div className='matterInfo' key={indexr} onClick={() => setOpenModal(true)}>
          <h2>{rea.nombre_CREA}</h2>
          <p>{rea.id_grado} </p>
        </div>
      ))}
    </>
  );
}
export default GuestInfo;
