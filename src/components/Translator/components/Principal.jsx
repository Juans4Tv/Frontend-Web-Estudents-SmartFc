import React from "react";
import indigena from "../../../assets/traductor/indigena.png";

export default function Principal() {
  const styles = {
    mainContent: {
      width: "100%",
      margin: 0,
      paddingTop: "10px",
      boxSizing: "border-box",
    },

    section: {
      width: "100%",
    },

    principalContainer: {
      width: "100%",
      minHeight: "85vh",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "4rem 4rem",
      boxSizing: "border-box",
      display: "grid",
      gridTemplateColumns: "1.2fr 0.8fr",
      gap: "3rem",
      alignItems: "center",
      backgroundColor: "#f6f7f3",
    },

    principalLeft: {
      display: "flex",
      flexDirection: "column",
    },

    badge: {
      backgroundColor: "#dcebcf",
      color: "#3b6d2a",
      padding: "0.8rem 1.5rem",
      borderRadius: "999px",
      width: "fit-content",
      fontWeight: "500",
      marginBottom: "2rem",
    },

    title: {
      fontSize: "4.5rem",
      fontWeight: "700",
      color: "#24521c",
      lineHeight: "1.1",
      margin: "0 0 2rem 0",
    },

    description: {
      fontSize: "1.5rem",
      color: "#5f6b5c",
      lineHeight: "1.8",
      maxWidth: "600px",
      margin: 0,
    },

    features: {
      display: "flex",
      flexWrap: "wrap",
      gap: "2rem",
      marginTop: "2rem",
      color: "#4f6c48",
      fontSize: "1rem",
    },

    principalRight: {
      position: "relative",
      width: "100%",
    },

    image: {
      width: "100%",
      height: "550px",
      objectFit: "cover",
      borderRadius: "2rem",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    },

    floatingCard: {
      position: "absolute",
      left: "20px",
      bottom: "20px",
      backgroundColor: "#fff",
      padding: "1rem 1.5rem",
      borderRadius: "1.5rem",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      maxWidth: "250px",
    },

    cardLabel: {
      color: "#777",
      marginBottom: "0.5rem",
    },

    cardText: {
      color: "#4c8c35",
      fontSize: "1.4rem",
      fontWeight: "600",
    },
  };

  return (
    <main style={styles.mainContent}>
      <section id="principal" style={styles.section}>
        <div style={styles.principalContainer}>
          {/* Lado izquierdo */}
          <div style={styles.principalLeft}>
            <div style={styles.badge}>
              Conectando culturas 🌿
            </div>

            <h1 style={styles.title}>
              Traductor de
              <br />
              Runa Shimi
            </h1>

            <p style={styles.description}>
              Descubre y aprende la lengua ancestral de los Yanakunas.
              Una herramienta moderna para preservar y compartir nuestra
              rica herencia cultural.
            </p>

            <div style={styles.features}>
              <span>● Fácil de usar</span>
              <span>● Culturalmente enfocado</span>
            </div>
          </div>

          {/* Lado derecho */}
          <div style={styles.principalRight}>
            <img
              src={indigena}
              alt="Runa Shimi"
              style={styles.image}
            />

            <div style={styles.floatingCard}>
              <div style={styles.cardLabel}>
                Traducción
              </div>

              <div style={styles.cardText}>
                Yupaychani 🌿
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}