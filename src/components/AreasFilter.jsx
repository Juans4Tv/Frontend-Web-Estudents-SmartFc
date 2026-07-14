import React from 'react';
import '../styles/areafilter.scss';

const TIPOS = [
  { value: '', label: 'Todos los tipos' },
  { value: 'video', label: 'Video' },
  { value: 'documento', label: 'Documento' },
  { value: 'imagen', label: 'Imagen' },
  { value: 'audio', label: 'Audio' },
  { value: 'otro', label: 'Otro' },
];

const AreasFilter = ({ onFilterChange, onClear, filterGrado, filterMateria, filterTipo, grados, areas }) => {

  return (
    <>
      <div className='inf-a'>
        <select onChange={(e) => onFilterChange('grado', e.target.value)} className='sarea-inf' value={filterGrado}>
          <option value="">Todos los grados</option>
          {grados.map((g) => (
            <option key={g} value={g}>Grado {g}</option>
          ))}
        </select>
        <select onChange={(e) => onFilterChange('materia', e.target.value)} className='sarea-inf' value={filterMateria}>
          <option value="">Todas las areas</option>
          {areas.map((a) => (
            <option key={a.id} value={a.id}>{a.nombre}</option>
          ))}
        </select>
        <select onChange={(e) => onFilterChange('tipo', e.target.value)} className='sarea-inf' value={filterTipo}>
          {TIPOS.map((t) => (
            <option key={t.value || 'all'} value={t.value}>{t.label}</option>
          ))}
        </select>
        <button onClick={onClear} className='sarea-inf clear-btn'>Limpiar filtro</button>
      </div>
    </>
  )
}

export default AreasFilter;
