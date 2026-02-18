export default function Contact() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Contact Us</h2>
        <p style={styles.subtext}>
          We’d love to hear from you. Please fill out the form below.
        </p>
        <form >
          <input type="text"  placeholder="Your Name" required style={styles.input}/>
          <input type="email"  placeholder="Your Email" required style={styles.input}/>
          <textarea placeholder="Your Message" rows="4" required style={styles.textarea}/>
          <button type="submit" style={styles.button}>Send Message</button>
        </form>
      </div>
    </div>
  );
}


const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
  },
  card: {
    width: "400px",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  heading: {
    marginBottom: "10px",
  },
  subtext: {
    marginBottom: "20px",
    color: "#666",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    maxWidth: "320px",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  textarea: {
    width: "100%",
    maxWidth: "320px",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "15px",
    resize: "none",
  },
  button: {
    width: "100%",
    maxWidth: "320px",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#0d0d0eff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};
