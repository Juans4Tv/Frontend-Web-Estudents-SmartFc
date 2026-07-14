import React, { useState } from 'react';
import '../styles/matterlist.scss';
import '../styles/global.scss';
import '../styles/subjectlist.scss';
import Infdoubts from '../modals/Infdoubts';
import Doubtsinfo from '../components/Doubtsinfo';
import Filters from './Filters';
import Information from '../components/Information';
import SearchDoub from '../components/SearchDoub';

const DoubtsList = () => {

	const [filterDoub, setFilterDoub] = useState('');
	const [openInfoDoubts, setOpenInfoDoubts] = useState(false);
	const handleChange = (e) => {setFilterDoub(e.target.value)}
    

	return (
		<section className="main-container">
			<div className='container-doubts'>
				<div className='search-cp'>
					<SearchDoub handleChange={handleChange} />
					<Information onClick={() => setOpenInfoDoubts(true)}/>
					<Infdoubts open ={openInfoDoubts} onClose={() =>setOpenInfoDoubts(false)}/>
				</div>
				<ul className='matterList'>
					<li>
						<Doubtsinfo  filter={filterDoub}/>
					</li>
				</ul>
			</div>
		</section>
	);
}

export default DoubtsList;