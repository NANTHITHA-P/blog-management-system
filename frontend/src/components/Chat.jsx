import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import './Chat.css'
const socket = io("http://localhost:5002");

function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("general");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      console.log({ data })
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("message");
  }, []);

  const joinChat = () => {
    socket.emit("join", { username, room });
    setJoined(true);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", { text: message });
    setMessage("");
  };

  return (
   <div className="chat-container">
  {!joined ? (
    <div className="join-section">
      <h2>Join Chat</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinChat}>Join</button>
    </div>
  ) : (
    <>
      <div className="room-name">Room: {room}</div>
      <div className="messages">
        {messages.map((msg, index) => {
          const type = msg.user === "system" ? "system" : (msg.user === username ? "user" : "other");
          return (
            <div key={index} className={`message ${type}`}>
              {msg.user !== "system" && <strong>{msg.user}</strong>}
              {msg.text}
              {msg.time && <span style={{ fontSize: "10px", alignSelf: "flex-end", marginTop: "3px" }}>{msg.time}</span>}
            </div>
          );
        })}
      </div>
      <div className="input-section">
        <input
          value={message}
          placeholder="Type a message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  )}
</div>

  );
}

export default Chat;
