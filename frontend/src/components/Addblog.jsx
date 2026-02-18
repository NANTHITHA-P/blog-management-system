import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Addblog() {
    const navigate = useNavigate();
   const[title,setTitle] = useState("");
   const[description,setDesc] = useState("");
   const[category,setCategory] = useState("");
   const handleBlog = ()=>{
      fetch('http://localhost:5000/api/blog/addblog',{
        method:'POST',
        credentials:'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        category:category,
        title:title,
        description: description,
       
    }),
      })
      .then(async(res) => {
        if(res.status === 401){
        toast.error("Please login to add the blog");
        navigate("/login");
        return null;
      }
      return res.json();
      })
      .then(result =>{
        if (!result) return;
        if(result.message==="Blog added successfully"){
             toast.success("Blog added successfully");
             navigate('/');
        }  
      })
   }
   const handleTitle = (event) =>{
    setTitle(event.target.value);
   }
   const handleDesc = (event) =>{
    setDesc(event.target.value);
   }
   const handleCategory = (event) => {
    setCategory(event.target.value);
   }


  return (
    <section style={styles.page}>
      <div style={styles.layout}>
        
        
        <div style={styles.left}>
          <h1 style={styles.heading}>Add Blog</h1>
          <p style={styles.subtext}>
            Share your thoughts, experiences, and stories with readers.
          </p>

          <form style={styles.form}>
            <input
              type="text" value={title} onChange={handleTitle}
              placeholder="Blog Title"
              style={styles.input}
            />

            <textarea
              placeholder="Blog Description" value={description} onChange={handleDesc}
              rows="6"
              style={styles.textarea}
            />

            <select style={styles.select} value={category} onChange={handleCategory}>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="tech">Technology</option>
              <option value="lifestyle">Lifestyle</option>
            </select>


            <button type="button" style={styles.button} onClick={handleBlog}>
              Publish Blog 
            </button>
          </form>
        </div>

      
        <div style={styles.right}>
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
            alt="Write blog"
            style={styles.image}
          />
        </div>

      </div>
    </section>
   
  );
}

const styles = {
  page: {
    padding: "60px 8%",
    background: "#f8f8f8",
    minHeight: "100vh"
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "50px",
    alignItems: "center"
  },

  left: {},

  heading: {
    fontSize: "34px",
    marginBottom: "6px"
  },

  subtext: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "30px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    maxWidth: "600px"
  },

  input: {
    padding: "14px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },

  textarea: {
    padding: "14px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    resize: "none"
  },

  select: {
    padding: "14px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },

  file: {
    fontSize: "15px"
  },

  button: {
    marginTop: "10px",
    padding: "14px",
    fontSize: "16px",
    background: "#12ecb9ff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "220px"
  },

  right: {
    textAlign: "center"
  },

  image: {
    width: "100%",
    maxWidth: "420px",
    borderRadius: "12px"
  }
};
