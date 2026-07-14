import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { getBaseUrl } from '../config';

const VIDEO_EXTS = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv', '.flv', '.wmv', '.m4v', '.3gp'];
const AUDIO_EXTS = ['.mp3', '.wav', '.ogg', '.aac', '.flac', '.wma', '.m4a'];
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico'];

const getFileType = (url) => {
  const ext = url.split('.').pop().split('?')[0].toLowerCase();
  if (VIDEO_EXTS.includes('.' + ext)) return 'video';
  if (AUDIO_EXTS.includes('.' + ext)) return 'audio';
  if (IMAGE_EXTS.includes('.' + ext)) return 'image';
  if (ext === 'pdf') return 'pdf';
  return 'other';
};

const VideoplayerRea = ({ onVideoEnd, playerRef, videoWatched }) => {
    const [videoData, setVideoData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("video"));
        if (stored) {
            const baseUrl = getBaseUrl();
            let url = stored.urlrepositorio || '';
            const repoIndex = url.indexOf('/repositorio');
            if (repoIndex !== -1) {
                url = baseUrl + url.substring(repoIndex);
            }
            setVideoData({ ...stored, urlrepositorio: url });
        }
    }, [])

    if (!videoData) return null;

    const url = videoData.urlrepositorio;
    const fileType = getFileType(url);
    const fileName = url.split('/').pop();

    if (fileType === 'pdf') {
      return (
        <div>
          <h2>{videoData.nombre_CREA}</h2>
          <iframe src={url} width="100%" height="600px" title={videoData.nombre_CREA} />
        </div>
      );
    }

    if (fileType === 'image') {
      return (
        <div>
          <h2>{videoData.nombre_CREA}</h2>
          <img src={url} alt={videoData.nombre_CREA} style={{maxWidth:'100%'}} />
        </div>
      );
    }

    if (fileType === 'other') {
      return (
        <div>
          <h2>{videoData.nombre_CREA}</h2>
          <p>Este archivo no se puede previsualizar.</p>
          <a href={url} target="_blank" rel="noreferrer" className='pick-btn'>Descargar {fileName}</a>
        </div>
      );
    }

    return (
        <div>
            <h2>{videoData.nombre_CREA}</h2>
            {error ? (
              <div>
                <p>No se pudo reproducir el archivo. Puedes descargarlo directamente.</p>
                <a href={url} target="_blank" rel="noreferrer" className='pick-btn'>Descargar {fileName}</a>
              </div>
            ) : (
              <ReactPlayer
                  url={url}
                  controls
                  playing={true}
                  volume={0.8}
                  ref={playerRef}
                  onEnded={onVideoEnd}
                  onError={() => setError(true)}
                  width="100%"
                  height="400px"
                  playsinline
              />
            )}
        </div>
    );
}

export default VideoplayerRea;
