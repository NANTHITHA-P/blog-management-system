import { useNavigate } from "react-router-dom";

export default function FloatingChat() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/chat")}
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        width: "60px",
        height: "60px",
        background: "#128c7e",
        color: "#fff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "26px",
        cursor: "pointer",
        boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      💬
    </div>
  );
}
