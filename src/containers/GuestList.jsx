import React, { useState } from 'react';
import '../styles/matterlist.scss';
import '../styles/global.scss'
import SearchREA from '../components/SearchREA';
import GuestInfo from '../components/GuestInfo';

export const GuestList = () => {
    const[filterREA, setFilterREA] = useState('');
	const handleChange = (e) => {setFilterREA(e.target.value)}
  return (
    <section className="main-container">
			<div className='container-courses'>
				<div className='search-sh'>
					<SearchREA handleChange={handleChange}/>
				</div>
				<ul className='matterList'>
					<li>
						<GuestInfo  filter={filterREA}/>
					</li>
				</ul>
			</div>
		</section>
  );
}
 export default GuestList;