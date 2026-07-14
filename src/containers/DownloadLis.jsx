import React from 'react';
import DownloadInfo from '../components/DownloadInfo';
import '../styles/dowloadsinfo.scss';
import '../styles/global.scss';

export const DownloadLis = () => {
  return (
    <section className="main-container">
			<div className='container-doubts'>
			<h2>Aquí podrás encontrar los archivos descargados en tu computadora.</h2>
				<ul className='matterList'>
					<li>
						<DownloadInfo />
					</li>
				</ul>
			</div>
		</section>
  )
}
export default DownloadLis;
