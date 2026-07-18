import { Link } from "react-router-dom";
import logo from '../../../assets/traductor/logo.png';

export default function Header({
  isMobile,
  mobileMenuOpen,
  toggleMobileMenu,
  handleNavigate,
}) {
  const styles = {
    
   header: {
  width: "100%",
  background: "#fff",
  borderBottom: "1px solid #E5E7EB",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0 2px 8px rgba(0,0,0,.08)",
},

container: {
  maxWidth: "1450px",
  width: "100%",
  margin: "0 auto",
  minHeight: "90px",      
  display: "flex",
  alignItems: "center",
  padding: "0 5px",   
  boxSizing: "border-box",
},
    

   smartBtn: {
  background: "#1F5D28",
  color: "#fff",
  border: "none",
  borderRadius: "16px",
  padding: "8px 2px",
  fontSize: "10px",
  fontWeight: "600",
  cursor: "pointer",
  marginRight: "35px",
  whiteSpace: "nowrap",
  display: "flex",
  alignItems: "center",
  gap: "6px",
},

    logoSection: {
      display: "flex",
      alignItems: "center",
    },

    logo: {
      width: "60px",         
      height: "50px",
      objectFit: "contain",
      marginRight: "12px",
    },

    titleContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },

    title: {
      margin: 0,
      color: "#1F5D28",
      fontSize: "18px",      
      fontWeight: "700",
      lineHeight: "1.1",
    },

    subtitle: {
      margin: "1px 0 0",
      color: "#667085",
      fontSize: "11px",      
      fontWeight: "400",
    },

    menu: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: "28px",          
    },

    link: {
  background: "none",
  border: "none",
  outline: "none",
  color: "#1F5D28",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  padding: "0 8px",
},
   
    mobileButton: {
      
      background: "#ffff",
      border: "none",
      fontSize: "20px",
      color: "#1F5D28",
    },

    mobileMenu: {
      display: "flex",
      flexDirection: "column",
      background: "#fff",
      padding: "12px 20px",
      gap: "12px",
      borderBottom: "1px solid #E5E7EB",
    },

    mobileLink: {
      background: "transparent",
      border: "none",
      color: "#1F5D28",
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "left",
      cursor: "pointer",
      padding: "6px 0",
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        
        {/* Botón Volver Izquierda */}
        <Link to="/mySubjects" style={{ textDecoration: "none" }}>
          <button style={styles.smartBtn}>
            <span>‹</span> Volver a Smart FC
          </button>
        </Link>

        {/* Logo y Título */}
        <div style={styles.logoSection}>
          <img
  src={logo}
  alt="Runa Shimi"
  style={styles.logo}
/>

          <div style={styles.titleContainer}>
            <h1 style={styles.title}>Runa Shimi</h1>
            {!isMobile && (
              <p style={styles.subtitle}>Traductor Yanakuna</p>
            )}
          </div>
        </div>

        {/* Menú de navegación Escritorio */}
        {!isMobile && (
          <nav style={styles.menu}>
            <button
              style={styles.link}
              onClick={() => handleNavigate("principal")}
            >
              Principal
            </button>

            <button
              style={styles.link}
              onClick={() => handleNavigate("traductor")}
            >
              Traductor
            </button>

            <button
              style={styles.link}
              onClick={() => handleNavigate("diccionario")}
            >
              Diccionario
            </button>

            <button
              style={styles.link}
              onClick={() => handleNavigate("acerca")}
            >
              Acerca de
            </button>
          </nav>
        )}

        {/* Botón menú móvil */}
        {isMobile && (
          <button
            style={styles.mobileButton}
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      {/* Menú móvil desplegable */}
      {isMobile && mobileMenuOpen && (
        <nav style={styles.mobileMenu}>
          <button
            style={styles.mobileLink}
            onClick={() => handleNavigate("principal")}
          >
            Principal
          </button>

          <button
            style={styles.mobileLink}
            onClick={() => handleNavigate("traductor")}
          >
            Traductor
          </button>

          <button
            style={styles.mobileLink}
            onClick={() => handleNavigate("diccionario")}
          >
            Diccionario
          </button>

          <button
            style={styles.mobileLink}
            onClick={() => handleNavigate("acerca")}
          >
            Acerca de
          </button>
        </nav>
      )}
    </header>
  );
}