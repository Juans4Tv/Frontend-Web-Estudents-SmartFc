import React from 'react';
import '../styles/matterlist.scss';
import '../styles/global.scss';
import AvtivityInfo from '../components/AvtivityInfo';

export const ActivityList = () => {
  return (
    <section className="main-container">
			<div className='Bottom'>
				<ul className='matterList'>
					<li>
						<AvtivityInfo />
					</li>
				</ul>
			</div>
		</section>
  )
}
export default ActivityList;
