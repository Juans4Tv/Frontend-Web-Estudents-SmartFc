import React from 'react';


const BtnWatchVidAgain = ({playerRef, setvideoWatched}) => {
    

    const handleRestartClick = () => {
        setvideoWatched(false);
        playerRef.current.seekTo(0);
        //playerRef.current.play();
        playerRef.current.seekTo(0, 'seconds');
        playerRef.current.getInternalPlayer().play();
      };
  return (
    <div>
       <div>
            <button onClick={handleRestartClick} className='btn-modalqt'>Volver a ver vídeo</button>
        </div>
    </div>
  )
}

export default BtnWatchVidAgain;
