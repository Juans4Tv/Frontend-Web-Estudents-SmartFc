import React from "react";

export default function Footer() {
  const styles = {
    footer: {
      width: "100%",
      background: "#24521c",
      color: "#fff",
      padding: "30px 20px",
      textAlign: "center",
      borderTop: "4px solid #3D8C56",
      boxSizing: "border-box",
    },

    disclaimer: {
      margin: 0,
      fontSize: "15px",
      lineHeight: "1.7",
    },

    footerLine: {
      marginTop: "18px",
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      flexWrap: "wrap",
    },

    footerText: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#DCEBCF",
    },
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.disclaimer}>
        ✨ Este traductor es una herramienta educativa.
        Las traducciones pueden variar según la región y dialecto. ✨
      </p>

      <div style={styles.footerLine}>
        <span style={styles.footerText}>
          Preservando las lenguas ancestrales ⛰️
        </span>

        <span style={styles.footerText}>
          Hecho con amor para la comunidad 🌍
        </span>
      </div>
    </footer>
  );
}