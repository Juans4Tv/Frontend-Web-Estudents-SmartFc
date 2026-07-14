import React, { useState, useRef, useEffect } from 'react';
import BtnNavQuizz from '../components/BtnNavQuizz';
import BtnWatchVidAgain from '../components/BtnWatchVidAgain';
import Videoplayer from '../components/Videoplayer';


const VideoplayerComp = () => {
    const playerRef = useRef(null);
    const [videoWatched, setvideoWatched] = useState(false);
    const handleVideoWatched = (videoWatched) => {
        setvideoWatched(true);
    };
    const [btnHab, setBtnHab] = useState(false);
    useEffect(() => {
        const info_lduda = JSON.parse(localStorage.getItem("metricaq"));
        if (info_lduda && info_lduda[0] && info_lduda[0].check_video === 1) {
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
                        <a>Ahora puedes relizar el quizz</a>
                        <BtnNavQuizz />
                        <BtnWatchVidAgain setvideoWatched={setvideoWatched} playerRef={playerRef} />
                    </div>
                )
                : null}
        </div>
    );
}

export default VideoplayerComp;