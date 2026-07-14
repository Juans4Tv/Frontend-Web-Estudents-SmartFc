import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import InfMatter from '../modals/InfMatter';
import '../styles/global.scss';
import '../styles/modals.scss';
import Information from '../components/Information';
import VideoplayerRea from '../components/VideoplayerRea';


const PracAtHomeRea = () => {
    const navigate = useNavigate();
    const [openInfMatter, setopenInfMatter] = useState(false);
   
    return (
        <div className='bodyah'>
            <div className="mat-x">
                <h2 className="letter-imodal">Contenido REA</h2>
                <Information onClick={() => setopenInfMatter(true)} />
                <InfMatter openx={openInfMatter} onClosex ={() => setopenInfMatter(false)}/>
                <p className="close-btn" onClick={() => navigate("/rea")}>X</p>
            </div>
            <VideoplayerRea/>
        </div>
    )
}

export default PracAtHomeRea;