import { useState, useEffect } from "react";

import Header from "./components/Header";
import Principal from "./components/Principal";
import Traductor from "./components/Traductor";
import Diccionario from "./components/Diccionario";
import Acerca from "./components/Acerca";
import Footer from "./components/Footer";

import {
  API_URL,
  COLORS,
  DEFAULT_PALABRAS,
  alfabet,
  reglasLetras,
} from "./data";

export default function Translator() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileLg, setIsMobileLg] = useState(window.innerWidth < 1024);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isEspanolToRuna, setIsEspanolToRuna] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [copiedId, setCopiedId] = useState(null);
  const [palabras, setPalabras] = useState(DEFAULT_PALABRAS);
  const [letraSeleccionada, setLetraSeleccionada] = useState(null);

  const itemsPorPagina = 6;

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    loadDictionary();

    const body = document.body;
    const origBgImage = body.style.backgroundImage;
    const origBgColor = body.style.backgroundColor;
    body.style.backgroundImage = 'none';
    body.style.backgroundColor = '#f6f7f3';

    const styleId = 'translator-body-override';
    const existing = document.getElementById(styleId);
    if (!existing) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = 'body::before { display: none !important; }';
      document.head.appendChild(style);
    }

    const resize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsMobileLg(window.innerWidth < 1024);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      document.documentElement.style.scrollBehavior = "auto";
      body.style.backgroundImage = origBgImage;
      body.style.backgroundColor = origBgColor;
      const s = document.getElementById(styleId);
      if (s) s.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigate = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSwapLanguages = () => {
    setIsEspanolToRuna(!isEspanolToRuna);

    const aux = text;

    setText(translatedText);
    setTranslatedText(aux);
  };

  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const direction = isEspanolToRuna
        ? "espanolToRuna"
        : "runaToEspanol";

      const response = await fetch(`${API_URL}/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: token }),
        },
        body: JSON.stringify({
          text,
          direction,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTranslatedText(
          data.data.translated_text || data.data
        );
      } else {
        setError(data.error || "Error en la traducción");
      }
    } catch {
      setError("No se pudo conectar al servidor");
    } finally {
      setLoading(false);
    }
  };

  const loadDictionary = async () => {
    try {
      const url = searchTerm
        ? `${API_URL}/dictionary?search=${encodeURIComponent(searchTerm)}`
        : `${API_URL}/dictionary`;

      const response = await fetch(url);

      const data = await response.json();

      if (data.length > 0) {
        setPalabras(
          data.map((p, i) => ({
            ...p,
            color: COLORS[i % COLORS.length],
          }))
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCopy = async (id, text) => {
  try {
    await navigator.clipboard.writeText(text);

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);

  } catch {
    console.log("Error al copiar");
  }
};

// ← AQUÍ TERMINA handleCopy

const palabrasFiltradas = palabras.filter((p) => {
  const busqueda = searchTerm.toLowerCase();

  return (
    p.source.toLowerCase().includes(busqueda) ||
    p.target.toLowerCase().includes(busqueda)
  );
});

const totalPaginas = Math.ceil(
  palabrasFiltradas.length / itemsPorPagina
);

const itemsActuales = palabrasFiltradas.slice(
  (paginaActual - 1) * itemsPorPagina,
  paginaActual * itemsPorPagina
);

const irSiguiente = () => {
  if (paginaActual < totalPaginas) {
    setPaginaActual((prev) => prev + 1);
  }
};

const irAnterior = () => {
  if (paginaActual > 1) {
    setPaginaActual((prev) => prev - 1);
  }
};

const onSearchChange = (valor) => {
  setSearchTerm(valor);
  setPaginaActual(1);
};

const toggleLetra = (letra) => {
  setLetraSeleccionada(
    letraSeleccionada === letra ? null : letra
  );
};

return (
  <div className="translator-wrapper">
    <style>{`
      .translator-wrapper {
        width: 100%;
        min-height: 100vh;
        background-color: #f6f7f3;
      }
    `}</style>

    <Header
      isMobile={isMobile}
      mobileMenuOpen={mobileMenuOpen}
      toggleMobileMenu={toggleMobileMenu}
      handleNavigate={handleNavigate}
    />

    <Principal />

    <Traductor
      isMobileLg={isMobileLg}
      text={text}
      setText={setText}
      translatedText={translatedText}
      loading={loading}
      error={error}
      isEspanolToRuna={isEspanolToRuna}
      handleTranslate={handleTranslate}
      handleSwapLanguages={handleSwapLanguages}
      handleCopy={handleCopy}
    />

    <Diccionario
      alfabet={alfabet}
      reglasLetras={reglasLetras}
      letraSeleccionada={letraSeleccionada}
      toggleLetra={toggleLetra}
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      itemsActuales={itemsActuales}
      copiedId={copiedId}
      handleCopy={handleCopy}
      paginaActual={paginaActual}
      totalPaginas={totalPaginas}
      irAnterior={irAnterior}
      irSiguiente={irSiguiente}
    />

    <Acerca />

    <Footer />

  </div>
);
}