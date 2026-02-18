import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [blogs, setBlog] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/blog/getblog", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddblog = () => {
    navigate("/addblog");
  };

   const foodImages = [
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
  "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800",
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
];

const travelImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
  "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800",
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800"
];

const lifestyleImages = [
  "https://images.unsplash.com/photo-1506086679522-41d30a0f27a0?w=800",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
  "https://images.unsplash.com/photo-1509474520651-3e9f2a4032df?w=800",
  "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800",
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800",
  "https://images.unsplash.com/photo-1533777324565-a040eb52f9f5?w=800",
  "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?w=800",
  "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=800",
  "https://images.unsplash.com/photo-1473187983305-f615310e7daa?w=800"
];
const technologyImages = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800",
  "https://images.unsplash.com/photo-1526378722484-cc5cdd0f6d4d?w=800",
  "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800",
  "https://images.unsplash.com/photo-1581091012184-5c7b9a09a1c1?w=800",
  "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=800",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
];

  return (
    <>
      <section style={styles.pageTitle}>
        <div style={styles.container}>
          <h1 style={styles.mainTitle}>Blog</h1>
          <p style={styles.subTitle}>Latest articles & insights</p>
        </div>
      </section>

      <section style={styles.blogSection}>
        <div style={styles.container}>
          <div style={styles.blogGrid}>
            {blogs.map((blog, i) => (
              <div
                key={i}
                style={{
                  ...styles.blogCard,
                  ...(hoveredIndex === i ? styles.blogCardHover : {}),
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => navigate(`/blog/${blog._id}`)}
              >
                <div style={styles.imageWrapper}>
                  <img
                    src={
                      blog.category === "food"
                        ? foodImages[i % foodImages.length]
                        : blog.category === "travel"
                        ? travelImages[i % travelImages.length]
                        : blog.category === "tech"
                        ? technologyImages[i % technologyImages.length]
                        : lifestyleImages[i % lifestyleImages.length]
                    }
                    alt={blog.title}
                    style={{
                      ...styles.image,
                      ...(hoveredIndex === i ? styles.imageHover : {}),
                    }}
                  />
                </div>

                <div style={styles.blogContent}>
                  <h2
                    style={{
                      ...styles.category,
                      ...(hoveredIndex === i ? styles.categoryHover : {}),
                    }}
                  >
                    {blog.category}
                  </h2>
                  <h4 style={styles.blogTitle}>{blog.title}</h4>
                  <span style={styles.date}>
                    {new Date(blog.createdAt).toDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.addBlogRow}>
            <div style={styles.addBlogLeft}>
              <h3>Are you interested in adding a blog?</h3>
              <p>Share your knowledge, ideas, and experiences with readers.</p>
            </div>

            <div style={styles.addBlogRight}>
              <h3>Add Blog</h3>
              <button style={styles.addBlogButton} onClick={handleAddblog}>
                Add Blog
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>© 2025 MyBlog. All rights reserved.</footer>
    </>
  );
}

const styles = {
  container: {
    width: "90%",
    maxWidth: "1200px",
    margin: "auto",
  },

  pageTitle: {
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1499750310107-5fef28a66643')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "90px 0",
    color: "#fff",
    textAlign: "center",
  },

  mainTitle: {
    fontSize: "46px",
    letterSpacing: "1px",
  },

  subTitle: {
    fontSize: "18px",
    opacity: 0.9,
  },

  blogSection: {
    padding: "60px 0",
    background: "#f4f6f9",
  },

  blogGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "35px",
  },

  blogCard: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "all 0.4s ease",
  },

  blogCardHover: {
    transform: "translateY(-12px)",
    boxShadow: "0 20px 45px rgba(18,236,185,0.35)",
  },

  imageWrapper: {
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },

  imageHover: {
    transform: "scale(1.12)",
  },

  blogContent: {
    padding: "22px",
  },

  category: {
    fontSize: "13px",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  categoryHover: {
    color: "#12ecb9",
    fontWeight: "600",
  },

  blogTitle: {
    margin: "10px 0",
    fontSize: "21px",
    color: "#222",
  },

  date: {
    fontSize: "13px",
    color: "#aaa",
  },

  addBlogRow: {
    marginTop: "60px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "25px",
  },

  addBlogLeft: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
  },

  addBlogRight: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    textAlign: "center",
  },

  addBlogButton: {
    marginTop: "14px",
    padding: "12px 28px",
    borderRadius: "30px",
    background: "linear-gradient(90deg, #6a5acd, #12ecb9ff)",
    color: "#fff",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
  },

  footer: {
    textAlign: "center",
    padding: "30px",
    background: "#fff",
    marginTop: "50px",
    color: "#888",
  },
};
