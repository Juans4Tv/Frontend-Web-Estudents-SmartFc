import React, { useEffect, useState } from 'react';
import '../styles/matterinfo.scss';
import axios from 'axios';
import { getBaseUrl } from '../config';
import { useNavigate } from 'react-router-dom';

const VIDEO_EXTS = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.flv', '.wmv', '.m4v', '.3gp'];
const AUDIO_EXTS = ['.mp3', '.wav', '.ogg', '.aac', '.flac', '.wma', '.m4a'];
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico'];
const DOC_EXTS = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.dotx'];

const getContentType = (item) => {
  const url = item.urlrepositorio || '';
  const ext = '.' + url.split('.').pop().split('?')[0].toLowerCase();
  if (VIDEO_EXTS.includes(ext)) return 'video';
  if (AUDIO_EXTS.includes(ext)) return 'audio';
  if (IMAGE_EXTS.includes(ext)) return 'imagen';
  if (DOC_EXTS.includes(ext)) return 'documento';
  return 'otro';
};

const TYPE_LABELS = { video: 'Video', audio: 'Audio', imagen: 'Imagen', documento: 'Documento', otro: 'Otro' };

export const ReaInfo = ({filterGrado, filterMateria, filterTipo, filter, areasMap}) => {
  const navigate = useNavigate();
  const [responser, setresponser] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${getBaseUrl()}/loadAllcontents`,
    }).then(response => {
      setresponser(response.data || [])
      localStorage.setItem("rea", JSON.stringify(response.data))
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  const datafilterREA = () => {
    let result = responser;
    if (filterGrado) {
      result = result.filter(item => String(item.id_grado) === String(filterGrado));
    }
    if (filterMateria) {
      result = result.filter(item => String(item.id_materia) === String(filterMateria));
    }
    if (filterTipo) {
      result = result.filter(item => getContentType(item) === filterTipo);
    }
    if (filter) {
      result = result.filter(item => item.nombre_CREA && item.nombre_CREA.toLowerCase().includes(filter.toLowerCase()));
    }
    return result;
  }
  const HandleContent = (video) => {
    navigate("/reaActivity");
    localStorage.setItem("video", JSON.stringify(video))
  }

  return (
    <>
      {datafilterREA().map((rea, indexr) => {
        const tipo = getContentType(rea);
        return (
          <div className='matterInfo' key={rea.id_contenidoREA || rea._id || indexr} onClick={() => HandleContent(rea)}>
            <h2>{rea.nombre_CREA}</h2>
            <p>Grado {rea.id_grado} &middot; {areasMap[rea.id_materia] || `Area ${rea.id_materia}`} &middot; {TYPE_LABELS[tipo]}</p>
          </div>
        )
      })}
    </>
  );
}
export default ReaInfo;
