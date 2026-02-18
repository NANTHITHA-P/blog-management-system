import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const categoryImages = {
    food: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    travel: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    lifestyle: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/blog/getblog/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLikesCount(data.likes?.length || 0);
        setLiked(data.isLiked || false); 
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSave = () => {
    fetch(`http://localhost:5000/api/user/${id}/saveblog`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async(res) => {
        if(res.status === 401){
        toast.error("Please login to save the blog");
        navigate("/login");
        return null;
      }
      return res.json();
      })
      .then((result) => {
        if (!result) return;
        if (result.message === "Blog saved") {
          toast.success(result.message);
          navigate("/dashboard");
        } else {
          toast.error("Already saved..");
        }
      });
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

    fetch(`http://localhost:5000/api/blog/${id}/addlike`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async(res) => {
        if(res.status === 401){
        toast.error("Please login to like the blog");
        navigate("/login");
        return null;
      }
      return res.json();
      })
      .then((result) => {
        if (!result) return;
        if (result.likescount !== undefined) setLikesCount(result.likescount);
        if (result.isLiked !== undefined) setLiked(result.isLiked);
      })
      .catch((err) => {
        console.log(err);
        setLiked((prev) => !prev);
        setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
      });
  };

  if (!blog) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div style={styles.page}>
      <img
        src={blog.image || categoryImages[blog.category] || categoryImages["lifestyle"]}
        style={styles.image}
        alt={blog.title}
      />
      <h1>{blog.title}</h1>
      <p style={styles.category}>{blog.category}</p>
      <p style={styles.date}>{new Date(blog.createdAt).toDateString()}</p>
      <p style={styles.description}>{blog.description}</p>

      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <button style={styles.saveblogoutline} onClick={handleSave}>
          Save this blog
        </button>

        <button
          style={{
            ...styles.saveblogoutline,
            background: liked ? "#e0245e" : "transparent", 
            color: liked ? "#fff" : "#6a5acd",
            borderColor: liked ? "#e0245e" : "#6a5acd",
          }}
          onClick={handleLike}
        >
          {liked ? "❤️ Liked" : "🤍 Like"} ({likesCount})
        </button>
      </div>

      <Comments />
    </div>
  );
}

const styles = {
  page: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
    background: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  image: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "10px",
  },
  category: {
    display: "inline-block",
    backgroundColor: "#6a5acd20",
    color: "#6a5acd",
    fontWeight: "600",
    fontSize: "14px",
    padding: "5px 12px",
    borderRadius: "20px",
    marginBottom: "10px",
  },
  date: {
    color: "#aaa",
    fontSize: "14px",
    marginBottom: "20px",
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.8",
    marginBottom: "25px",
    color: "#555",
  },
  buttonRow: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },
  saveblogoutline: {
    background: "transparent",
    color: "#6a5acd",
    border: "2px solid #6a5acd",
    padding: "10px 25px",
    borderRadius: "25px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  saveblogoutlineHover: {
    background: "#6a5acd",
    color: "#fff",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(106,90,205,0.4)",
  },
  likeBtn: {
    background: "transparent",
    color: "#6a5acd",
    border: "2px solid #6a5acd",
    padding: "10px 25px",
    borderRadius: "25px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  likeBtnLiked: {
    background: "#e0245e",
    color: "#fff",
    borderColor: "#e0245e",
    boxShadow: "0 4px 15px rgba(224,36,94,0.4)",
    transform: "translateY(-2px)",
  },
};
