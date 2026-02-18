import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Comments() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [blog, setBlog] = useState({ comments: [] });

  useEffect(() => {
    fetch(`http://localhost:5000/api/blog/getblog/${id}`)
      .then(res => res.json())
      .then(data => setBlog(data))
      .catch(err => console.log(err));
  }, [id]);

  const handleComments = () => {
    if (!commentText.trim()) return alert("Comment cannot be empty");

    fetch(`http://localhost:5000/api/blog/${id}/addcomment`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ msg: commentText })
    })
      .then(async(res) => {
        if(res.status === 401){
        toast.error("Please login to comment in the blog");
        navigate("/login");
        return null;
      }
      return res.json();
      })
      .then(result => {
        if (!result) return;
        if (result.blog) {
          setBlog(result.blog); 
          setCommentText("");
        } else {
          toast.success(result.message || "Failed to add comment");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <section style={styles.wrapper}>
      <div style={styles.top}>
        <div>
          <h3>Add a Comment</h3>

          <textarea
            placeholder="Write your comment..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            rows="4"
            style={styles.textarea}
          />

          <button style={styles.button} onClick={handleComments}>
            Post Comment
          </button>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1501504905252-473c47e087f8"
            alt="Commenting"
            style={styles.image}
          />
        </div>
      </div>

<div style={styles.comments}>
  <h3 style={styles.commentsTitle}>Comments</h3>

  {blog.comments.length === 0 ? (
    <p style={styles.noComments}>No comments yet.</p>
  ) : (
    blog.comments.map((comment, i) => (
      <div key={i} style={styles.comment}>
        <div style={styles.commentContent}>
          <div style={styles.commentHeader}>
            <span style={styles.commentUser}>{comment.userName }</span>
            <span style={styles.commentDate}>
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <p style={styles.commentMessage}>{comment.message}</p>
        </div>
      </div>
    ))
  )}
</div>
    </section>
  );
}
 const styles = {
  wrapper: {
    marginTop: "50px",
    fontFamily: "'Poppins', sans-serif",
  },

  top: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    marginBottom: "40px",
    alignItems: "center",
  },

  textarea: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    resize: "none",
    marginBottom: "15px",
    fontSize: "15px",
    fontFamily: "'Poppins', sans-serif",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    transition: "0.2s all ease",
  },

  textareaFocus: {
    borderColor: "#6a5acd",
    boxShadow: "0 4px 12px rgba(106,90,205,0.2)",
  },

  button: {
    padding: "12px 25px",
    background: "linear-gradient(90deg, #6a5acd, #12ecb9ff)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(106,90,205,0.3)",
  },

  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(106,90,205,0.4)",
  },

  image: {
    width: "100%",
    maxHeight: "320px",
    objectFit: "cover",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
  },

  comments: {
    marginTop: "40px",
  },

  commentsTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#333",
    borderBottom: "2px solid #6a5acd20",
    paddingBottom: "6px",
  },

  noComments: {
    color: "#999",
    fontStyle: "italic",
    fontSize: "15px",
  },

  comment: {
    backgroundColor: "#fff",
    padding: "18px 22px",
    borderRadius: "15px",
    marginBottom: "15px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease",
  },

  commentHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
  },

  commentContent: {
    flex: 1,
  },

  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },

  commentUser: {
    fontWeight: "600",
    color: "#6a5acd",
    fontSize: "14px",
  },

  commentDate: {
    fontSize: "12px",
    color: "#999",
  },

  commentMessage: {
    fontSize: "15px",
    color: "#444",
    lineHeight: "1.7",
    whiteSpace: "pre-wrap",
  },
};
