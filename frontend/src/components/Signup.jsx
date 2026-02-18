import { useNavigate,Link } from "react-router-dom";
import {useState} from 'react'; 
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Signup() {
    const navigate = useNavigate();
      const [name,setUser] = useState("");
      const [password,setPassword] = useState("");
      const [email,setEmail] = useState("");
      const handleSignup = () => {
       fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            email:email,
            password : password
        }),
    })

        .then(response => response.json())
        .then(result => {
            if(result.message==="User registered successfully"){
                toast.success("User registered");
                navigate('/login');
            }
            else {
              toast.error(result.message);
        }
            }
        );
      };
    const handleInputChange = (event) =>{
        setUser(event.target.value);
    }
    const handlePwdChange = (event) =>{
        setPassword(event.target.value);
    }
    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
   }
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Sign up to get started</p>

        <form style={styles.form}>
          <input type="text" placeholder="Full Name" value={name} onChange={handleInputChange}style={styles.input}  />
          <input
            type="email" value = {email} onChange={handleEmailChange}
            placeholder="Email"
            style={styles.input}
          />

          <input
            type="password"value={password} onChange={handlePwdChange}
            placeholder="Password"
            style={styles.input}
          />

          <button style={styles.button} onClick={handleSignup}>Sign Up</button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}


const styles = {
 page: {
  minHeight: "calc(100vh - 80px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1470&q=80')",

  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
},


  card: {
    background: "#ffffff",
    width: "100%",
    maxWidth: "420px",
    padding: "45px 35px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    textAlign: "center",
    animation: "fadeIn 0.6s ease"
  },

  title: {
    fontSize: "30px",
    marginBottom: "6px",
    fontWeight: "700",
    color: "#111"
  },

  subtitle: {
    fontSize: "14px",
    color: "#888",
    marginBottom: "28px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  input: {
    width: "100%",
    maxWidth: "320px",
    padding: "14px 16px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s",
    background: "#fafafa"
  },

  button: {
    width: "100%",
    maxWidth: "320px",
    padding: "14px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(135deg, #111, #333)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "0.3s",
    boxShadow: "0 8px 18px rgba(0,0,0,0.2)"
  },

  footerText: {
    marginTop: "22px",
    fontSize: "14px",
    color: "#666"
  },

  link: {
    textDecoration: "none",
    color: "#111",
    fontWeight: "600"
  }
};

