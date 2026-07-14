import React from 'react';
import Doubtslist from '../containers/DoubtsList';
import Header from '../components/Header';
import '../styles/global.scss';
import Doubts from '../components/Doubtsinfo';


const MyCourses = () => {
	return (
		<>
            <Header />
			<Doubtslist />
		</>
	);
}

export default MyCourses;