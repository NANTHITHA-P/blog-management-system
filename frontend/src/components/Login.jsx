import { Link } from "react-router-dom";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Login({value}) {
    const navigate = useNavigate();
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");

   const handleEmail = (event) =>{
    setEmail(event.target.value);
   }
   const handlePwd = (event) =>{
    setPassword(event.target.value);
   }
  
   const handleLogin = () => {
   value();
   fetch('http://localhost:5000/api/user/login', {
    method: 'POST',
    credentials:'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email:email,
        password:password,
    }),
})
   .then(res=>res.json())
   .then(result =>{
    console.log(result.success);
      if(result.success){
           toast.success("Login successful");
           navigate('/addblog');
        }
        else{
          toast.error("Failed to login");
           navigate('/login');
        }
   })
}
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <p style={styles.subtitle}>Welcome back! Please login to your account</p>

        <form style={styles.form}>
          <input type = "email" value = {email} onChange={handleEmail} placeholder="Email" style={styles.input}  />
          <input type = "password" value = {password} onChange={handlePwd} placeholder="Password" style={styles.input}/>          
          <button style={styles.button} onClick={(e) =>{e.preventDefault();value() ;handleLogin();}}>Login</button>
        </form>

        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign up
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
    " url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",

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
