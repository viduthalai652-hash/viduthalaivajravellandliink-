function Contact() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          backgroundColor: "white",
          padding: "50px",
          borderRadius: "20px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "36px",
            color: "#ff4b5c",
          }}
        >
          Contact LandLink
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
          }}
        >
          {/* Left Side - Company Details */}
          <div>
            <h3 style={{ color: "#333", marginBottom: "20px" }}>
              📍 Our Office
            </h3>

            <p><strong>Address:</strong> OMR Road, Chennai, Tamil Nadu</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Email:</strong> support@landlink.com</p>

            <h3 style={{ marginTop: "25px", marginBottom: "10px" }}>
              🕒 Office Hours
            </h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>

            <h3 style={{ marginTop: "25px", marginBottom: "10px" }}>
              🌐 Follow Us
            </h3>
            <p>Instagram | Facebook | LinkedIn</p>
          </div>

          {/* Right Side - Contact Form */}
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="email"
              placeholder="Your Email"
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="text"
              placeholder="Subject"
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <button
              style={{
                padding: "12px",
                background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;