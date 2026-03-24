import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Globe, MessageSquare, Share2 } from "lucide-react"; // ✨ FIXED: Removed brand icons

// 3D Tilt Component
const TiltCard = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y, { stiffness: 100, damping: 25 }), [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(useSpring(x, { stiffness: 100, damping: 25 }), [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};

function Contact() {
  return (
    <div style={{ minHeight: "100vh", padding: "120px 20px 60px", position: "relative" }}>
      
      {/* 3D Background Mesh */}
      <div style={{ position: "fixed", inset: 0, zIndex: -1, backgroundColor: "#020617" }}>
        <div style={{ position: "absolute", top: "10%", left: "10%", width: "500px", height: "500px", background: "rgba(212, 175, 55, 0.05)", filter: "blur(100px)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "500px", height: "500px", background: "rgba(59, 130, 246, 0.05)", filter: "blur(100px)", borderRadius: "50%" }} />
      </div>

      <div style={{ maxWidth: "1100px", margin: "auto" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ color: "white", fontSize: "50px", fontWeight: "900" }}>Contact <span style={{ color: "#D4AF37" }}>LandLink</span></h1>
          <p style={{color: '#94a3b8', marginTop: '10px'}}>Expert support for your premium property journey</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
          
          {/* Left Card: Info */}
          <TiltCard>
            <div style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", border: "1px solid rgba(212, 175, 55, 0.2)", borderRadius: "30px", padding: "40px", color: "white", height: '100%' }}>
              <h2 style={{ marginBottom: "30px", fontSize: '28px' }}>Office Details</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <p style={{ display: "flex", alignItems: "center", gap: "12px" }}><MapPin color="#D4AF37" size={20}/> OMR Road, Chennai</p>
                <p style={{ display: "flex", alignItems: "center", gap: "12px" }}><Phone color="#D4AF37" size={20}/> +91 98765 43210</p>
                <p style={{ display: "flex", alignItems: "center", gap: "12px" }}><Mail color="#D4AF37" size={20}/> support@landlink.com</p>
                <p style={{ display: "flex", alignItems: "center", gap: "12px" }}><Clock color="#D4AF37" size={20}/> Mon - Sat: 9AM - 6PM</p>
              </div>

              {/* ✨ Updated Social Icons using valid Lucide icons */}
              <div style={{ display: "flex", gap: "20px", marginTop: "40px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "30px" }}>
                <motion.div whileHover={{ y: -5, color: "#D4AF37" }} style={{cursor:'pointer'}}><Globe size={24} /></motion.div>
                <motion.div whileHover={{ y: -5, color: "#D4AF37" }} style={{cursor:'pointer'}}><MessageSquare size={24} /></motion.div>
                <motion.div whileHover={{ y: -5, color: "#D4AF37" }} style={{cursor:'pointer'}}><Share2 size={24} /></motion.div>
              </div>
            </div>
          </TiltCard>

          {/* Right Card: Form */}
          <TiltCard>
            <form style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(212, 175, 55, 0.2)", borderRadius: "30px", padding: "40px", display: "flex", flexDirection: "column", gap: "15px" }}>
              <h2 style={{ color: "white", marginBottom: "10px", fontSize: '28px' }}>Send Message</h2>
              <input type="text" placeholder="Full Name" style={inputStyle} />
              <input type="email" placeholder="Email" style={inputStyle} />
              <textarea placeholder="Message" rows="4" style={inputStyle} />
              <motion.button 
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
                style={btnStyle}
              >
                SEND MESSAGE <Send size={18} />
              </motion.button>
            </form>
          </TiltCard>

        </div>
      </div>
    </div>
  );
}

const inputStyle = { padding: "15px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", outline: "none", fontSize: '15px' };
const btnStyle = { padding: "18px", background: "linear-gradient(135deg, #FFD700, #B8860B)", color: "black", border: "none", borderRadius: "12px", fontWeight: "900", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", fontSize: '16px', marginTop: '10px' };

export default Contact;