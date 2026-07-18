import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/api';

const Traductor = () => {
  // === ESTADOS ===
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isEspanolToRuna, setIsEspanolToRuna] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isMobileLg, setIsMobileLg] = useState(window.innerWidth < 1024);

  // === DETECCIÓN DE PANTALLA RESPONSIVE ===
  useEffect(() => {
    const handleResize = () => {
      setIsMobileLg(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // === LOGICA DE TRADUCCIÓN ===
  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const direction = isEspanolToRuna ? 'espanolToRuna' : 'runaToEspanol';

      const response = await fetch(`${API_URL}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify({ text, direction }),
      });

      const data = await response.json();

      if (data.success) {
        setTranslatedText(data.data.translated_text || data.data);
      } else {
        setError(data.error || 'Error en traducción');
      }
    } catch (err) {
      setError('No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  };

  // === INTERCAMBIAR IDIOMAS ===
  const handleSwapLanguages = () => {
    setIsEspanolToRuna(!isEspanolToRuna);
    const tempText = text;
    setText(translatedText);
    setTranslatedText(tempText);
  };

  // === COPIAR AL PORTAPAPELES ===
  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar');
    }
  };

  return (
    <section id="traductor" className="section traductor-section">
      {/* === ESTILOS EMBEDIDOS === */}
      <style>{`
        .traductor-section {
          padding: 4rem 2rem;
          background-color: #f6f7f3;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
        }

        .main-white-box {
          background-color: #ffffff;
          border-radius: 2rem;
          padding: 3rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          max-width: 1000px;
          width: 100%;
          box-sizing: border-box;
        }

        .header-text {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .traductor-title {
          font-size: 2.5rem;
          color: #24521c;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .traductor-subtitle {
          font-size: 1.1rem;
          color: #5f6b5c;
          margin: 0;
        }

        .card-transparent {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: transparent;
        }

        /* DISEÑO ESCRITORIO (GRID) */
        .pc-header-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1.5rem;
          text-align: center;
        }

        .pc-inputs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        /* ENVOLTORIO TEXTAREA */
        .textarea-wrapper {
          background-color: #fcfdfa;
          border: 1px solid #e2e8df;
          border-radius: 1.2rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          min-height: 200px;
          position: relative;
          box-sizing: border-box;
        }

        .lang-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #4c8c35;
          letter-spacing: 0.05em;
          margin-bottom: 0.8rem;
          text-transform: uppercase;
        }

        .textarea {
          border: none;
          outline: none;
          background: transparent;
          font-size: 1.15rem;
          color: #2e382d;
          resize: none;
          width: 100%;
          flex-grow: 1;
          font-family: inherit;
          margin-bottom: 1rem;
          box-sizing: border-box;
        }

        .textarea::placeholder {
          color: #99a396;
        }

        .footer-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #889485;
          font-size: 0.9rem;
        }

        /* CIRCULO SWAP */
        .swap-circle {
          background-color: #3b6d2a;
          color: #ffffff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(59, 109, 42, 0.2);
          margin: 0 auto;
        }

        .swap-circle:hover {
          background-color: #24521c;
          transform: scale(1.1);
        }

        /* BOTÓN TRADUCIR */
        .btn-translate {
          background-color: #3b6d2a;
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 999px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          margin: 2rem auto 0;
          transition: all 0.3s ease;
          width: fit-content;
          align-self: center;
        }

        .btn-translate:hover:not(:disabled) {
          background-color: #24521c;
          transform: translateY(-2px);
        }

        .btn-translate:disabled {
          cursor: not-allowed;
        }

        /* ANIMACIÓN CARGANDO */
        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* MENSAJE DE ERROR */
        .error-message {
          color: #e03244;
          text-align: center;
          margin-top: 1rem;
          font-weight: 500;
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .traductor-section {
            padding: 2rem 1rem;
          }
          .main-white-box {
            padding: 1.5rem;
          }
          .traductor-title {
            font-size: 2rem;
          }
          .textarea-wrapper {
            min-height: 160px;
            padding: 1rem;
          }
        }
      `}</style>

      {/* === ESTRUCTURA DE LA CAJA PRINCIPAL === */}
      <div className="main-white-box">
        <div className="header-text">
          <h1 className="traductor-title">Traductor De Runa Shimi</h1>
          <p className="traductor-subtitle">
            Conecta con las raíces ancestrales a través de la lengua Runa Shimi.
          </p>
        </div>

        <div className="card-transparent">
          {isMobileLg ? (
            /* === VISTA MÓVIL === */
            <>
              {/* Entrada */}
              <div className="textarea-wrapper">
                <div className="lang-label">
                  {isEspanolToRuna ? 'ESPAÑOL' : 'RUNA SHIMI'}
                </div>
                <textarea
                  className="textarea"
                  placeholder={
                    isEspanolToRuna
                      ? 'Escribe aquí en español...'
                      : 'Escribe aquí en runa shimi...'
                  }
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={300}
                />
                <div className="footer-row">
                  <span>{text.length}/300</span>
                </div>
              </div>

              {/* Botón de Intercambio */}
              <div className="swap-circle" onClick={handleSwapLanguages}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 16l-4-4 4-4" />
                  <path d="M3 12h18" />
                  <path d="M17 8l4 4-4 4" />
                </svg>
              </div>

              {/* Salida */}
              <div className="textarea-wrapper">
                <div className="lang-label">
                  {isEspanolToRuna ? 'RUNA SHIMI' : 'ESPAÑOL'}
                </div>
                <textarea
                  className="textarea"
                  placeholder="La traducción aparecerá aquí..."
                  value={translatedText}
                  readOnly
                />
                <div className="footer-row">
                  <span />
                  <div
                    onClick={() => handleCopy(translatedText)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    title="Copiar traducción"
                  >
                    {copied ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6A994E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
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
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* === VISTA ESCRITORIO === */
            <>
              <div className="pc-header-grid">
                <div className="lang-label">
                  {isEspanolToRuna ? 'ESPAÑOL' : 'RUNA SHIMI'}
                </div>
                <div className="swap-circle" onClick={handleSwapLanguages}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 16l-4-4 4-4" />
                    <path d="M3 12h18" />
                    <path d="M17 8l4 4-4 4" />
                  </svg>
                </div>
                <div className="lang-label">
                  {isEspanolToRuna ? 'RUNA SHIMI' : 'ESPAÑOL'}
                </div>
              </div>

              <div className="pc-inputs-grid">
                {/* Entrada Escritorio */}
                <div className="textarea-wrapper">
                  <textarea
                    className="textarea"
                    placeholder={
                      isEspanolToRuna
                        ? 'Escribe aquí en español...'
                        : 'Escribe aquí en runa shimi...'
                    }
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={300}
                  />
                  <div className="footer-row">
                    <span>{text.length}/300</span>
                  </div>
                </div>

                {/* Salida Escritorio */}
                <div className="textarea-wrapper">
                  <textarea
                    className="textarea"
                    placeholder="La traducción aparecerá aquí..."
                    value={translatedText}
                    readOnly
                  />
                  <div className="footer-row">
                    <span />
                    <div
                      onClick={() => handleCopy(translatedText)}
                      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      title="Copiar traducción"
                    >
                      {copied ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#6A994E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Botón de Traducir común */}
          <button
            className="btn-translate"
            style={{ opacity: loading ? 0.7 : 1 }}
            onClick={handleTranslate}
            disabled={loading}
          >
            {loading ? 'Traduciendo...' : 'Traducir'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={loading ? 'spin' : ''}
            >
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          </button>

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default Traductor;