import React from 'react';

const CARDS_INFO = [
  {
    title: 'Origen',
    color: '#FFC300',
    text: 'El Runa Shimi es hablado por millones de personas en Ecuador, Perú, Bolivia y Colombia. Es la lengua del pueblo Inca y sus descendientes.',
    icon: '⛰️',
    svgPath: 'M0,0 L100,0 L100,20 C85,35 75,5 50,25 C25,45 15,10 0,20 Z',
    svgCircles: [{ cx: 85, cy: 25, r: 2.5 }, { cx: 18, cy: 30, r: 1.5 }],
  },
  {
    title: 'Cosmovisión',
    color: '#3D8C56',
    text: 'Representa el Sumak Kawsay (Buen Vivir), una filosofía de vida en armonía con la Pachamama (Madre Tierra) y la comunidad.',
    icon: '🌿',
    svgPath: 'M0,0 L100,0 L100,15 C80,30 70,-5 40,20 C20,35 10,15 0,25 Z',
    svgCircles: [{ cx: 90, cy: 22, r: 2 }, { cx: 10, cy: 32, r: 2 }],
  },
  {
    title: 'Preservación',
    color: '#E03244',
    text: 'Ayuda a preservar esta lengua ancestral. Cada palabra que aprendas contribuye a mantener viva la cultura de los pueblos andinos.',
    icon: '🤲',
    svgPath: 'M0,0 L100,0 L100,25 C75,45 65,10 40,25 C20,35 10,15 0,20 Z',
    svgCircles: [{ cx: 88, cy: 28, r: 2.5 }, { cx: 25, cy: 32, r: 1.5 }],
  },
];

const AcercaDe = () => {
  return (
    <section id="acerca-de" className="section acerca-section">
      {/* === ESTILOS EMBEDIDOS === */}
      <style>{`
        .acerca-section {
          padding: 5rem 2rem;
          background-color: #f6f7f3;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
        }

        .acerca-container {
          max-width: 1100px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .acerca-header {
          text-align: center;
        }

        .acerca-title {
          font-size: 2.5rem;
          color: #24521c;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .acerca-subtitle {
          font-size: 1.1rem;
          color: #5f6b5c;
          margin: 0;
        }

        /* GRILLA DE TARJETA INFORMATIVAS */
        .acerca-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .acerca-card {
          background-color: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .acerca-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
        }

        .card-wave-wrapper {
          width: 100%;
          height: 70px;
          display: block;
        }

        .card-body {
          padding: 2rem 1.8rem;
          position: relative;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        /* CONTENEDOR FLOTANTE PARA EL ICONO */
        .card-icon-container {
          position: absolute;
          top: -30px;
          right: 25px;
          background-color: #ffffff;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          font-size: 1.6rem;
        }

        .card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2e382d;
          margin: 0 0 1rem 0;
        }

        .card-text {
          font-size: 1rem;
          color: #5f6b5c;
          line-height: 1.6;
          margin: 0;
        }

        /* SECCIÓN DE CRÉDITOS Y COLABORADORES */
        .credits-box {
          background-color: #ffffff;
          border: 1px solid #e2e8df;
          border-radius: 24px;
          padding: 2.5rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.02);
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .credits-title {
          font-size: 1.5rem;
          color: #24521c;
          font-weight: 700;
          margin: 0 0 1rem 0;
        }

        .credits-text {
          font-size: 1.05rem;
          color: #5f6b5c;
          line-height: 1.7;
          margin: 0 0 1.5rem 0;
        }

        .collaborators-list {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          font-weight: 600;
          color: #3b6d2a;
          font-size: 1.1rem;
        }

        .collaborator-badge {
          background-color: #f1f4ef;
          padding: 0.5rem 1.2rem;
          border-radius: 999px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.04);
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .acerca-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .acerca-section {
            padding: 3rem 1rem;
          }
          .acerca-grid {
            grid-template-columns: 1fr;
          }
          .acerca-title {
            font-size: 2rem;
          }
          .credits-box {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="acerca-container">
        {/* Cabecera de la sección */}
        <div className="acerca-header">
          <h2 className="acerca-title">Acerca de Runa Shimi</h2>
          <p className="acerca-subtitle">
            Conoce el trasfondo, valor y cosmovisión detrás de esta valiosa lengua ancestral.
          </p>
        </div>

        {/* Tarjetas Informativas */}
        <div className="acerca-grid">
          {CARDS_INFO.map((card, index) => (
            <div key={index} className="acerca-card">
              {/* Renderizado dinámico de la onda superior con SVG */}
              <svg 
                viewBox="0 0 100 40" 
                preserveAspectRatio="none" 
                className="card-wave-wrapper"
              >
                <path d={card.svgPath} fill={card.color} />
                {card.svgCircles.map((circle, idx) => (
                  <circle 
                    key={idx} 
                    cx={circle.cx} 
                    cy={circle.cy} 
                    r={circle.r} 
                    fill="#ffffff" 
                    opacity="0.6" 
                  />
                ))}
              </svg>

              <div className="card-body">
                {/* Icono Flotante */}
                <div className="card-icon-container">
                  <span className="card-icon">{card.icon}</span>
                </div>
                
                {/* Textos */}
                <h3 className="card-title">{card.title}</h3>
                <p className="card-text">{card.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Caja de Créditos / Co-creación */}
        <div className="credits-box">
          <h3 className="credits-title">Proyecto de Revitalización Lingüística</h3>
          <p className="credits-text">
            Este traductor y diccionario ha sido desarrollado con el firme compromiso de valorar, 
            preservar y difundir el Runa Shimi de la comunidad Yanakuna, acercando la tecnología 
            a nuestras raíces culturales en colaboración con la <strong>Fundación Universitaria de Popayán (FUP)</strong>.
          </p>
          <div className="collaborators-list">
            <span className="collaborator-badge">Lilibeth Andrea Anacona Jimenez</span>
            <span className="collaborator-badge">Juan miguel cedeño</span>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcercaDe;