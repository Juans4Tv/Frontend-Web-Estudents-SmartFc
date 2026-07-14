import React, {useState} from 'react';
import '../styles/subjectlist.scss';
import '../styles/global.scss';
import SubjectInfo from '../components/SubjectInfo';
import Filters from './Filters';
import Information from '../components/Information';
import InfSubj from '../modals/InfSubj';

const SubjetList = () => {
    const [filter, setFilter] = useState('');
    const[openInfo, setOpenInfo] = useState(false);
    const handleChange = (e) => {console.log(e); setFilter(e.target.value)}
    

    return (
        <section className='main-container'>
            <div className='container-doubts'>
                <div className='search-cp'>
                    <Filters handleChange={handleChange}/>
                    <Information onClick={() => setOpenInfo(true)}/>
                    
                    <InfSubj open={openInfo} onClose={() => setOpenInfo(false)}/>
                    
                </div>
                <ul className='subjectlist'>
                    <li>
                        <SubjectInfo filter ={filter} />
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default SubjetList;