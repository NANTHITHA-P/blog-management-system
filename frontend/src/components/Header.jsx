import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.headerContainer}>
        <h2 style={styles.logo}>MyBlog</h2>

        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>
            Home
            <span style={styles.underline}></span>
          </Link>

          <Link to="/login" style={styles.link}>
            Login
            <span style={styles.underline}></span>
          </Link>

          <Link to="/dashboard" style={styles.link}>
            Dashboard
            <span style={styles.underline}></span>
          </Link>

          <Link to="/myblog" style={styles.link}>
            MyBlogs
            <span style={styles.underline}></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: "#ffffff",
    boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  headerContainer: {
    width: "90%",
    maxWidth: "1200px",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
  },

  logo: {
    fontSize: "26px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    color: "#0d0e0dff",
    cursor: "pointer",
  },

  nav: {
    display: "flex",
    gap: "32px",
    alignItems: "center",
  },

  link: {
    position: "relative",
    textDecoration: "none",
    color: "#222",
    fontSize: "15px",
    fontWeight: "500",
    padding: "6px 0",
    transition: "color 0.3s ease",
  }
};

