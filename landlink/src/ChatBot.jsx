import { useState } from "react";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi 👋 Welcome to LandLink! How can I help?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    const userMsg = { text: input, sender: "user" };
    const text = input.toLowerCase();

    let botReply = "Sorry, I didn't understand 😅";

    // 🔥 BASIC RESPONSES
    if (text.includes("price")) {
      botReply = "Prices start from ₹12 Lakhs 💰";
    } 
    else if (text.includes("location")) {
      botReply = "We have properties in OMR, ECR, Tambaram 📍";
    } 
    else if (text.includes("contact")) {
      botReply = "Call us at 📞 9876543210";
    }

    // 🔥 LOCATION RESPONSES
    else if (text.includes("tambaram")) {
      botReply = "We have multiple plots in Tambaram starting from ₹12 Lakhs 🏡";
    }
    else if (text.includes("omr")) {
      botReply = "OMR has premium residential plots starting from ₹25 Lakhs 🚀";
    }
    else if (text.includes("ecr")) {
      botReply = "ECR offers luxury villa plots near beach 🌊 starting ₹45 Lakhs";
    }
    else if (text.includes("velachery")) {
      botReply = "Velachery premium plots available around ₹75 Lakhs 💎";
    }
    else if (text.includes("t nagar")) {
      botReply = "T Nagar commercial lands available around ₹60 Lakhs 🏢";
    }

    setMessages([...messages, userMsg, { text: botReply, sender: "bot" }]);
    setInput("");
  };

  return (
    <div>
      {/* 💬 CHAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "15px",
          borderRadius: "50%",
          background: "#FFD700",
          border: "none",
          cursor: "pointer",
          fontSize: "20px",
        }}
      >
        💬
      </button>

      {/* 💬 CHAT BOX */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "#1e1e1e",
            borderRadius: "10px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto", color: "white" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "5px",
                }}
              >
                <span
                  style={{
                    background: msg.sender === "user" ? "#FFD700" : "#333",
                    padding: "8px",
                    borderRadius: "10px",
                    display: "inline-block",
                    color: msg.sender === "user" ? "#111" : "white",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div style={{ display: "flex", marginTop: "5px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about price, location..."
              style={{
                flex: 1,
                padding: "6px",
                borderRadius: "5px",
                border: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: "5px",
                padding: "6px 10px",
                background: "#FFD700",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;