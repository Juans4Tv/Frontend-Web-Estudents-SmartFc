export const API_URL = "http://localhost:4000/api";

export const COLORS = [
  "#FFC300",
  "#6A994E",
  "#E03244",
  "#1D82E6",
  "#6c2477",
  "#FFC300",
];

export const DEFAULT_PALABRAS = [
  { _id: 1, source: "Gracias", target: "Yupaychani", type: "Sustantivo", color: COLORS[0] },
  { _id: 2, source: "Hola", target: "Imanalla", type: "Saludo", color: COLORS[1] },
  { _id: 3, source: "Tierra", target: "Allpa", type: "Sustantivo", color: COLORS[2] },
  { _id: 4, source: "Agua", target: "Yaku", type: "Sustantivo", color: COLORS[3] },
  { _id: 5, source: "Sol", target: "Inti", type: "Sustantivo", color: COLORS[4] },
  { _id: 6, source: "Luna", target: "Killa", type: "Sustantivo", color: COLORS[5] },
  { _id: 7, source: "Cielo", target: "Q'illqa", type: "Sustantivo", color: COLORS[0] },
  { _id: 8, source: "Estrella", target: "Chaska", type: "Sustantivo", color: COLORS[1] },
];

export const alfabet = [
  "A",
  "ch",
  "h",
  "i",
  "k",
  "l",
  "ll",
  "m",
  "n",
  "ñ",
  "p",
  "r",
  "s",
  "sh",
  "t",
  "ts",
  "u",
  "w",
  "y",
];

export const reglasLetras = {
  k: "Reemplaza C y Q",
  h: "Reemplaza G y J",
  p: "Reemplaza B, V y F",
  t: "Reemplaza D",
};

export const cardsInfo = [
  {
    title: "Origen",
    color: "#FFC300",
    text: "El Runa Shimi es hablado por millones de personas en Ecuador, Perú, Bolivia y Colombia. Es la lengua del pueblo Inca y sus descendientes.",
    icon: "⛰️",
    svgPath: "M0,0 L100,0 L100,20 C85,35 75,5 50,25 C25,45 15,10 0,20 Z",
    svgCircles: [
      { cx: 85, cy: 25, r: 2.5 },
      { cx: 18, cy: 30, r: 1.5 },
    ],
  },
  {
    title: "Cosmovisión",
    color: "#3D8C56",
    text: "Representa el Sumak Kawsay (Buen Vivir), una filosofía de vida en armonía con la Pachamama (Madre Tierra).",
    icon: "🌿",
    svgPath: "M0,0 L100,0 L100,15 C80,30 70,-5 40,20 C20,35 10,15 0,25 Z",
    svgCircles: [
      { cx: 90, cy: 22, r: 2 },
      { cx: 10, cy: 32, r: 2 },
    ],
  },
  {
    title: "Preservación",
    color: "#E03244",
    text: "Ayuda a preservar esta lengua ancestral. Cada palabra que aprendas contribuye a mantener viva la cultura de los pueblos andinos.",
    icon: "🤲",
    svgPath: "M0,0 L100,0 L100,25 C75,45 65,10 40,25 C20,35 10,15 0,20 Z",
    svgCircles: [
      { cx: 88, cy: 28, r: 2.5 },
      { cx: 25, cy: 32, r: 1.5 },
    ],
  },
];