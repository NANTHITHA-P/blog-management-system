import { useState, useEffect } from "react";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function MyBlogs() {
  const [blogs, setBlog] = useState([]);

  const handleDelete = (blogId) => {
     fetch(`http://localhost:5000/api/blog/${blogId}/deletemyblog`,{
       method:'PATCH',
       headers: { "Content-Type": "application/json" },
       credentials: "include"
     })
     .then(res=>res.json())
     .then(result => {
        if(result.message==="Blog deleted successfully"){
            setBlog(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
            toast.success("Deleted successfully!");  
        }
        else{
          toast.error("Failed to delete"); 
        }
     })
     .catch(err => toast.error("Error deleting blog"));
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/blog/getmyblog", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setBlog(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div style={styles.container}>
        {blogs.map((blog, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.category}>{blog.category}</div>
            <div style={styles.title}>{blog.title}</div>
            <div style={styles.description}>{blog.description}</div>
            <div style={styles.footer}>
              <span>❤️<span style={styles.likeCount}>{blog.likes?.length || 0}</span></span>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "25px",
    padding: "40px",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f0f2f5",
   
  },
  card: {
    width: "320px",
    background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  category: {
    fontSize: "12px",
    color: "#ff6b81",
    marginBottom: "6px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#222",
  },
  description: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "12px",
    flexGrow: 1,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  likeCount: {
    fontWeight: "600",
    color: "#555",
    marginLeft: "6px",
  },
  deleteBtn: {
    backgroundColor: "#e0245e",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background-color 0.3s ease",
  },
};