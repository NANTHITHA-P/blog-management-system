import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [blogs, setBlog] = useState([]);
  const navigate = useNavigate();

  const travelImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
];


  const foodImages = [
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1562967916-eb82221dfb36?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80"
];


  const lifestyleImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506086679522-41d30a0f27a0?auto=format&fit=crop&w=800&q=80"
];

  const technologyImages = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526378722484-cc5cdd0f6d4d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
];

  const handleUnsave = (blogId) => {
  fetch(`http://localhost:5000/api/user/${blogId}/unsaveblog`, {
    method: "PATCH",
    credentials: "include",
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.message === "Blog unsaved") {
        setBlog((prev) => prev.filter((b) => b._id !== blogId));
      } else {
        toast.error(result.message);
      }
    });
};


  const handleLogout = () => {
    fetch("http://localhost:5000/api/user/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) navigate("/login");
        else toast.error("Logout Failed");
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/user/getsavedblog", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div style={styles.logoutRow}>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
      <div style={styles.container}>
        <h3 style={styles.heading}>Welcome to your Dashboard</h3>
        <h4 style={styles.subHeading}>Saved Blogs</h4>

       <div style={styles.blogGrid}>
  {blogs.map((blog, i) => {
    const image =
      blog.category === "food"
        ? foodImages[i % foodImages.length]
        : blog.category === "travel"
        ? travelImages[i % travelImages.length]
        : blog.category === "tech"
      ? technologyImages[i % technologyImages.length]
        : lifestyleImages[i % lifestyleImages.length];

    return (
      <div key={blog._id} style={styles.blogCard}>
        <img src={image} style={styles.image} alt={blog.title} />
        <h2>{blog.title}</h2>
        <p style={styles.category}>{blog.category}</p>
        <p style={styles.date}>
          {new Date(blog.createdAt).toDateString()}
        </p>
        {/* <p style={styles.description}>{blog.description}</p> */}
        <button
          style={styles.viewBtn}
          onClick={() => navigate(`/blog/${blog._id}`)} >
          View Blog
        </button>
        <button style={styles.unsaveBtn}
  onClick={() => handleUnsave(blog._id)}
>
  Unsave
</button>

      </div>
    );
  })}
</div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
  },
  heading: {
    marginBottom: "10px",
    color: "#333",
  },
  subHeading: {
    marginBottom: "30px",
    color: "#6a5acd",
  },
  unsaveBtn: {
  marginTop: "10px",
  backgroundColor: "#ef233c",
  color: "#fff",
  border: "none",
  padding: "8px 20px",
  borderRadius: "20px",
  fontWeight: "600",
  cursor: "pointer",
},
  page: {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#fff",
  },
  logoutRow: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 30px",
  },
  logoutBtn: {
    backgroundColor: "#ef233c",
    border: "none",
    color: "#ffffff",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "15px",
  },
  category: {
    color: "#888",
    marginBottom: "5px",
  },
  date: {
    color: "#aaa",
    fontSize: "14px",
    marginBottom: "15px",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.7",
    marginBottom: "15px",
  },
  
  viewBtn: {
    background: "transparent",
    color: "#6a5acd",
    border: "2px solid #6a5acd",
    padding: "8px 20px",
    borderRadius: "20px",
    fontWeight: "600",
    cursor: "pointer",
  },
  emptyText: {
    color: "#999",
    fontStyle: "italic",
  },
  blogGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
},

blogCard: {
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "15px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}

};
