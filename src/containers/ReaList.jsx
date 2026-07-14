import React, { useEffect, useState } from 'react';
import '../styles/matterlist.scss';
import '../styles/global.scss'
import ReaInfo from '../components/ReaInfo';
import SearchREA from '../components/SearchREA';
import AreasFilter from '../components/AreasFilter';
import axios from 'axios';
import { getBaseUrl } from '../config';

const STORAGE_KEY = 'reaFilters';

const loadFilters = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
};

const saveFilters = (filters) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
};

export const ReaList = () => {
	const saved = loadFilters();
	const [filterREA, setFilterREA] = useState(saved.texto || '');
	const [filterGrado, setFilterGrado] = useState(saved.grado || '');
	const [filterMateria, setFilterMateria] = useState(saved.materia || '');
	const [filterTipo, setFilterTipo] = useState(saved.tipo || '');
	const [grados, setGrados] = useState([]);
	const [areas, setAreas] = useState([]);
	const [areasMap, setAreasMap] = useState({});

	const persist = (updates) => {
		const current = { texto: filterREA, grado: filterGrado, materia: filterMateria, tipo: filterTipo, ...updates };
		saveFilters(current);
	};

	const handleChange = (e) => {
		const v = e.target.value;
		setFilterREA(v);
		persist({ texto: v });
	};

	const handleFilterChange = (type, value) => {
		if (type === 'grado') { setFilterGrado(value); persist({ grado: value }); }
		if (type === 'materia') { setFilterMateria(value); persist({ materia: value }); }
		if (type === 'tipo') { setFilterTipo(value); persist({ tipo: value }); }
	};

	const handleClear = () => {
		setFilterREA('');
		setFilterGrado('');
		setFilterMateria('');
		setFilterTipo('');
		localStorage.removeItem(STORAGE_KEY);
	};

	useEffect(() => {
		axios.get(`${getBaseUrl()}/loadAllcontents`).then(res => {
			const items = res.data || [];
			const gradosSet = new Set();
			const materiaIds = [...new Set(items.map(i => i.id_materia).filter(Boolean))];
			items.forEach(i => { if (i.id_grado != null) gradosSet.add(i.id_grado); });
			setGrados([...gradosSet].sort((a,b) => a-b));

			Promise.all(
				materiaIds.map(id =>
					axios.post(`${getBaseUrl()}/loadSubject`, { id_materia: id })
						.then(r => ({ id, nombre: r.data.subject?.nombre_materia || `Area ${id}` }))
						.catch(() => ({ id, nombre: `Area ${id}` }))
				)
			).then(results => {
				const map = {};
				results.forEach(r => { map[r.id] = r.nombre; });
				setAreasMap(map);
				setAreas(results);
			});
		}).catch(() => {});
	}, [])

  return (
    <section className="main-container">
			<div className='container-courses'>
				<div className='search-sh'>
					<SearchREA handleChange={handleChange} value={filterREA}/>
					<AreasFilter onFilterChange={handleFilterChange} onClear={handleClear} filterGrado={filterGrado} filterMateria={filterMateria} filterTipo={filterTipo} grados={grados} areas={areas} />
				</div>
				<ul className='matterList'>
					<li>
						<ReaInfo filterGrado={filterGrado} filterMateria={filterMateria} filterTipo={filterTipo} filter={filterREA} areasMap={areasMap}/>
					</li>
				</ul>
			</div>
		</section>
  );
}
 export default ReaList;
