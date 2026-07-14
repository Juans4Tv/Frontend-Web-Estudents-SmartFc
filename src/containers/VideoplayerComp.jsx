import React, { useState, useRef, useEffect } from 'react';
import BtnNavQuizz from '../components/BtnNavQuizz';
import BtnWatchVidAgain from '../components/BtnWatchVidAgain';
import Videoplayer from '../components/Videoplayer';


const VideoplayerComp = () => {
    console.log('[VideoplayerComp] Render');
    const playerRef = useRef(null);
    const [videoWatched, setvideoWatched] = useState(false);
    const handleVideoWatched = (videoWatched) => {
        console.log('[VideoplayerComp] Video terminado');
        setvideoWatched(true);
    };
    const [btnHab, setBtnHab] = useState(false);
    useEffect(() => {
        console.log('[VideoplayerComp] useEffect - revisando metricaq');
        const info_lduda = JSON.parse(localStorage.getItem("metricaq"));
        console.log('[VideoplayerComp] metricaq:', info_lduda);
        if (info_lduda && info_lduda[0] && info_lduda[0].check_video === 1) {
            console.log('[VideoplayerComp] check_video=1, habilitando quizz');
            setBtnHab(true);
        }
    }, []);
    return (
        <div>

            <Videoplayer
                playerRef={playerRef}
                onVideoEnd={handleVideoWatched}
                videoWatched={videoWatched} />

            {(videoWatched || btnHab)
                ? (
                    <div>
                        <h2>Terminaste el vídeo</h2>
                        <span>Ahora puedes relizar el quizz</span>
                        <BtnNavQuizz />
                        <BtnWatchVidAgain setvideoWatched={setvideoWatched} playerRef={playerRef} />
                    </div>
                )
                : null}
        </div>
    );
}

export default VideoplayerComp;