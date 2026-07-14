import React from 'react';
import '../styles/dowloadsinfo.scss';
import see from '../assets/logos/download.png';

export const DownloadInfo = () => {

  
  var commad = "../../public/documents";

  return (
    <div className='downloadInfo' onClick={() => "../../public/documents"}>
      <div className='downloadtxt'>
        <h3>Al dar clic aquí, abrirás la carpeta donde se encuentran todas las descargas Smart- Fc en este computador.</h3>
      </div>
      <img src={see} alt="Descargas" className='download' ></img>
    </div>
  );
}

export default DownloadInfo;