import React from 'react';
import Doubtslist from '../containers/DoubtsList';
import Header from '../components/Header';
import '../styles/global.scss';


const MyCourses = () => {
	return (
		<>
            <Header />
			<Doubtslist />
		</>
	);
}

export default MyCourses;