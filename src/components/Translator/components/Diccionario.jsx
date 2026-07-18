import React, { useState, useEffect, useMemo } from 'react';

const API_URL = 'http://localhost:4000/api';
const COLORS = ['#FFC300', '#6A994E', '#E03244', '#1D82E6', '#6c2477', '#FFC300'];

const DEFAULT_PALABRAS = [
  { _id: 1, source: 'Gracias', target: 'Yupaychani', type: 'Sustantivo', color: COLORS[0] },
  { _id: 2, source: 'Hola', target: 'Imanalla', type: 'Saludo', color: COLORS[1] },
  { _id: 3, source: 'Tierra', target: 'Allpa', type: 'Sustantivo', color: COLORS[2] },
  { _id: 4, source: 'Agua', target: 'Yaku', type: 'Sustantivo', color: COLORS[3] },
  { _id: 5, source: 'Sol', target: 'Inti', type: 'Sustantivo', color: COLORS[4] },
  { _id: 6, source: 'Luna', target: 'Killa', type: 'Sustantivo', color: COLORS[5] },
];

const ALFABET = ['A', 'ch', 'h', 'i', 'k', 'l', 'll', 'm', 'n', 'ñ', 'p', 'r', 's', 'sh', 't', 'ts', 'u', 'w', 'y'];

const REGLAS_LETRAS = {
  k: 'Reemplaza C y Q',
  h: 'Reemplaza G y J',
  p: 'Reemplaza B, V y F',
  t: 'Reemplaza D',
};

const Diccionario = () => {
  // === ESTADOS ===
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [copiedId, setCopiedId] = useState(null);
  const [palabras, setPalabras] = useState(DEFAULT_PALABRAS);
  const [letraSeleccionada, setLetraSeleccionada] = useState(null);
  const itemsPorPagina = 6;

  // === CARGAR DICCIONARIO ===
  const loadDictionary = async (search = '') => {
    try {
      const url = search
        ? `${API_URL}/dictionary?search=${encodeURIComponent(search)}`
        : `${API_URL}/dictionary`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data && data.length > 0) {
        setPalabras(
          data.map((p, i) => ({
            ...p,
            color: COLORS[i % COLORS.length],
          }))
        );
      } else if (!search) {
        setPalabras(DEFAULT_PALABRAS);
      }
    } catch (error) {
      console.error('Error loading dictionary, usando por defecto');
      setPalabras(DEFAULT_PALABRAS);
    }
  };

  useEffect(() => {
    loadDictionary(searchTerm);
  }, [searchTerm]);

  // === FILTRADO ===
  const palabrasFiltradas = useMemo(() => {
    const busqueda = searchTerm.toLowerCase();
    return palabras.filter((p) => {
      const cumpleBusqueda =
        (p.source || '').toLowerCase().includes(busqueda) ||
        (p.target || '').toLowerCase().includes(busqueda);

      const cumpleLetra = letraSeleccionada
        ? (p.target || '').toLowerCase().startsWith(letraSeleccionada.toLowerCase())
        : true;

      return cumpleBusqueda && cumpleLetra;
    });
  }, [palabras, searchTerm, letraSeleccionada]);

  // === PAGINACIÓN ===
  const totalPaginas = useMemo(() => {
    return Math.ceil(palabrasFiltradas.length / itemsPorPagina);
  }, [palabrasFiltradas]);

  const itemsActuales = useMemo(() => {
    const ultimoIndice = paginaActual * itemsPorPagina;
    const primerIndice = ultimoIndice - itemsPorPagina;
    return palabrasFiltradas.slice(primerIndice, ultimoIndice);
  }, [palabrasFiltradas, paginaActual]);

  const irSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const irAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const handleSearchClick = () => {
    setSearchTerm(inputValue);
    setPaginaActual(1);
  };

  const toggleLetra = (letra) => {
    setLetraSeleccionada(letraSeleccionada === letra ? null : letra);
    setPaginaActual(1);
  };

  // === COPIAR TEXTO ===
  const handleCopy = async (id, textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      console.error('Error al copiar');
    }
  };

  return (
    <section id="diccionario" className="section diccionario-section">
      {/* === ESTILOS CSS  === */}
      <style>{`
        .diccionario-section {
          padding: 5rem 2rem;
          background-color: #ffffff; /* Fondo blanco limpio sin texturas */
          width: 100%;
          min-height: 100vh;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .diccionario-title-container {
          text-align: center;
          margin-bottom: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
        }

        .diccionario-title {
          font-size: 2.8rem;
          color: #1e4620; /* Texto oscuro/verde para destacar en fondo claro */
          font-weight: 700;
          margin: 0;
        }

        /* BARRA DE BÚSQUEDA (CON BORDE CLARO) */
        .search-container-row {
          display: flex;
          gap: 1rem;
          width: 100%;
          max-width: 800px;
          margin-bottom: 2.5rem;
          align-items: center;
        }

        .search-input-wrapper {
          position: relative;
          flex: 1;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1.5rem 1rem 3.5rem;
          font-size: 1.15rem;
          border: 1px solid #cccccc; /* Borde sutil */
          border-radius: 12px;
          background-color: #ffffff;
          color: #2e382d;
          outline: none;
          box-sizing: border-box;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .search-icon {
          position: absolute;
          left: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          color: #889485;
          pointer-events: none;
        }

        /* BOTÓN BUSCAR VERDE OSCURO */
        .btn-buscar-submit {
          background-color: #1e4620;
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(30, 70, 32, 0.2);
        }

        .btn-buscar-submit:hover {
          background-color: #153216;
          transform: translateY(-1px);
        }

        /* ABECEDARIO CIRCULAR BLANCO CON BORDE */
        .alphabet-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.8rem;
          max-width: 850px;
          margin-bottom: 3.5rem;
        }

        .alphabet-btn {
          background-color: #ffffff;
          color: #1e2124;
          border: 1px solid #cccccc; /* Borde del segundo diseño */
          width: 44px;
          height: 44px;
          font-size: 1.05rem;
          font-weight: 700;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .alphabet-btn:hover {
          background-color: #1e4620;
          color: #ffffff;
          border-color: #1e4620;
          transform: translateY(-2px);
        }

        .alphabet-btn.active {
          background-color: #1e4620;
          color: #ffffff;
          border-color: #1e4620;
          box-shadow: 0 4px 12px rgba(30, 70, 32, 0.3);
        }

        /* REGLAS */
        .rules-box {
          background-color: #fffbeb;
          border-left: 4px solid #fbbf24;
          padding: 1rem 1.5rem;
          border-radius: 0.8rem;
          max-width: 600px;
          margin: 0 auto 2.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .rules-text {
          color: #92400e;
          font-size: 0.95rem;
          margin: 0;
          font-weight: 500;
        }

        /* GRILLA DE TARJETAS */
        .words-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.8rem;
          max-width: 1100px;
          width: 100%;
          margin-bottom: 4rem;
        }

        /* TARJETAS CON BORDE NEGRO/GRIS FINO */
        .word-card {
          background-color: #ffffff;
          border: 1.5px solid #2e382d; /* Borde oscuro y fino idéntico a la imagen */
          border-radius: 18px;
          padding: 2.2rem 1.8rem 1.8rem 1.8rem;
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          overflow: hidden;
          transition: transform 0.2s ease;
        }

        .word-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
        }

        /* ONDA SUPERIOR */
        .card-wave-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 14px;
          overflow: hidden;
        }

        .card-text-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .word-header-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 0.2rem;
        }

        .word-target {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1e2124;
        }

        .word-source {
          font-size: 1.05rem;
          color: #7a7a7a;
          font-weight: 500;
        }

        .word-type {
          font-size: 0.85rem;
          color: #555555;
          font-weight: 600;
          margin-top: 0.3rem;
        }

        /* ICONO DE COPIAR EN EL LADO DERECHO */
        .btn-copy-card {
          position: absolute;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #8c9689;
          transition: color 0.2s ease;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-copy-card:hover {
          color: #1e4620;
        }

        /* PAGINACIÓN */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
        }

        .pagination-btn {
          background-color: #ffffff;
          border: 1.5px solid #2e382d;
          color: #1e4620;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }

        .pagination-btn:hover:not(:disabled) {
          background-color: #f1f4ef;
          transform: scale(1.05);
        }

        .pagination-btn:disabled {
          color: #c2cbd1;
          border-color: #e2e8df;
          cursor: not-allowed;
          box-shadow: none;
        }

        .page-indicator {
          font-weight: 700;
          color: #1e4620; /* Texto legible en fondo blanco */
          font-size: 1.1rem;
        }

        .no-results {
          text-align: center;
          padding: 4rem 1rem;
          color: #1e4620;
          font-size: 1.25rem;
          font-weight: 500;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .words-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 1rem;
          }
        }

        @media (max-width: 768px) {
          .words-grid {
            grid-template-columns: 1fr;
            padding: 0 1rem;
          }
          .search-container-row {
            flex-direction: column;
            padding: 0 1rem;
          }
          .btn-buscar-submit {
            width: 100%;
          }
          .diccionario-title {
            font-size: 2.2rem;
          }
        }
      `}</style>

      {/* Título Principal */}
      <div className="diccionario-title-container">
        <h1 className="diccionario-title">Diccionario Runa Shimi</h1>
        <span style={{ fontSize: '2.5rem' }}>📖</span>
      </div>

      {/* Barra de Búsqueda */}
      <div className="search-container-row">
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar palabra..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
          />
        </div>
        <button className="btn-buscar-submit" onClick={handleSearchClick}>
          Buscar
        </button>
      </div>

      {/* Abecedario Circular */}
      <div className="alphabet-grid">
        {ALFABET.map((letra) => (
          <button
            key={letra}
            className={`alphabet-btn ${letraSeleccionada === letra ? 'active' : ''}`}
            onClick={() => toggleLetra(letra)}
          >
            {letra}
          </button>
        ))}
      </div>

      {/* Regla Ortográfica */}
      {letraSeleccionada && REGLAS_LETRAS[letraSeleccionada.toLowerCase()] && (
        <div className="rules-box">
          <span style={{ fontSize: '1.3rem' }}>💡</span>
          <p className="rules-text">
            <strong>Regla para '{letraSeleccionada}':</strong> {REGLAS_LETRAS[letraSeleccionada.toLowerCase()]}
          </p>
        </div>
      )}

      {/* Grilla de Tarjetas */}
      {itemsActuales.length > 0 ? (
        <div className="words-grid">
          {itemsActuales.map((p) => (
            <div key={p._id} className="word-card">
              {/* Onda Superior en SVG */}
              <div className="card-wave-container" style={{ color: p.color }}>
                <svg viewBox="0 0 100 12" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                  <path d="M0,0 L100,0 L100,4 C80,10 60,2 40,8 C20,10 0,2 0,4 Z" fill="currentColor" />
                </svg>
              </div>

              {/* Contenido */}
              <div className="card-text-container">
                <div className="word-header-row">
                  <span className="word-target">{p.target}</span>
                  <span className="word-source">{p.source}</span>
                </div>
                <div className="word-type">({p.type || 'Palabra'})</div>
              </div>

              {/* Botón Copiar */}
              <button
                className="btn-copy-card"
                onClick={() => handleCopy(p._id, p.target)}
                title="Copiar palabra"
              >
                {copiedId === p._id ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1e4620"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No se encontraron palabras que coincidan.</p>
        </div>
      )}

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={irAnterior}
            disabled={paginaActual === 1}
            aria-label="Anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="page-indicator">
            {paginaActual} de {totalPaginas}
          </span>
          <button
            className="pagination-btn"
            onClick={irSiguiente}
            disabled={paginaActual === totalPaginas}
            aria-label="Siguiente"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default Diccionario;