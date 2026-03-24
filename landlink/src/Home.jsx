import heroImage from "./assets/hero.jpg";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ShieldCheck, Map, Crown, Mouse, ChevronDown, Sparkles, CheckCircle2, Navigation, Gavel } from "lucide-react";
import ChatBot from "./ChatBot"; 

// --- 1. PREMIUM PROPERTY IMAGES FOR MARQUEE ---
const marqueeImages = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800",
  "https://images.unsplash.com/photo-1464225226654-b30369abd59a?q=80&w=800",
];

// --- 2. ENHANCED LUXURY 3D CARD COMPONENT ---
const DetailCard = ({ icon: Icon, title, desc, features, img, delay }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y), [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(useSpring(x), [-0.5, 0.5], ["-12deg", "12deg"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1200px" }}
    >
      <div style={{
        background: "rgba(10, 15, 30, 0.5)",
        backdropFilter: "blur(25px)",
        border: "1px solid rgba(212, 175, 55, 0.3)", 
        borderRadius: "40px",
        padding: "45px",
        height: "600px", // Increased height for more detail
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 25px 60px rgba(0,0,0,0.6)"
      }}>
        <img src={img} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.1, filter: "grayscale(100%) brightness(0.2)" }} alt="" />
        
        <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div style={{ transform: "translateZ(60px)", background: "linear-gradient(135deg, #FFD700, #B8860B)", width: "65px", height: "65px", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "25px", boxShadow: "0 10px 20px rgba(212, 175, 55, 0.3)" }}>
            <Icon color="black" size={32} strokeWidth={2.5} />
          </div>

          <h3 style={{ transform: "translateZ(80px)", color: "white", fontSize: "30px", fontWeight: "900", marginBottom: "15px", letterSpacing: "-1px" }}>{title}</h3>
          
          <p style={{ transform: "translateZ(50px)", color: "#cbd5e1", fontSize: "16px", lineHeight: "1.7", marginBottom: "25px" }}>{desc}</p>

          {/* Detailed Bullet Points */}
          <div style={{ transform: "translateZ(30px)", display: "flex", flexDirection: "column", gap: "12px" }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#FFD700", fontSize: "14px", fontWeight: "600" }}>
                <CheckCircle2 size={16} /> <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function Home() {
  const navigate = useNavigate();
  const scrollToDetails = () => window.scrollTo({ top: window.innerHeight, behavior: "smooth" });

  return (
    <div style={{ backgroundColor: "#020617", color: "white", overflowX: "hidden" }}>
      
      {/* 🚀 1. HERO SECTION */}
      <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.35)" }} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} style={{ zIndex: 10, textAlign: "center", padding: "0 20px" }}>
          <span style={{ color: "#D4AF37", letterSpacing: "5px", fontSize: "12px", fontWeight: "900", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>Elite TN Real Estate</span>
          <h1 style={{ fontSize: "clamp(40px, 8vw, 85px)", fontWeight: "950", letterSpacing: "-2px", lineHeight: "1.1", marginBottom: "40px" }}>
            Find Your <br /> <span className="gold-shimmer">Dream Property</span>
          </h1>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button onClick={() => navigate("/properties")} whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(212, 175, 55, 0.4)" }} style={goldBtnStyle}>View Properties</motion.button>
            <motion.button onClick={() => navigate("/rent")} whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(212, 175, 55, 0.4)" }} style={goldBtnStyle}>View Rentals</motion.button>
          </div>
        </motion.div>
        <motion.div onClick={scrollToDetails} style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", cursor: "pointer", zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ color: "#D4AF37" }}><Mouse size={32} strokeWidth={1.5} /><ChevronDown size={24} /></motion.div>
        </motion.div>
      </section>

      {/* 🚀 2. DETAILED SHOWCASE SECTION */}
      <section style={{ padding: "120px 20px", maxWidth: "1500px", margin: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: "100px" }}>
          <h2 style={{ fontSize: "clamp(35px, 6vw, 60px)", fontWeight: "900", letterSpacing: "-2px" }}>The Gold <span style={{ color: "#D4AF37" }}>Standard</span></h2>
          <div style={{ width: "100px", height: "4px", background: "#D4AF37", margin: "25px auto", borderRadius: "10px" }} />
          <p style={{ color: "#64748b", fontSize: "20px", maxWidth: "700px", margin: "auto" }}>We combine legacy trust with futuristic technology to transform how you buy land in Tamil Nadu.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "50px" }}>
          <DetailCard 
            icon={Gavel} 
            title="Verified Trust" 
            desc="Investment security is our priority. Every single listing undergoes a rigorous 25-point legal audit by independent property lawyers." 
            features={["Patta & Chitta Verification", "RERA & DTCP Compliance", "Clean Encumbrance History", "Title Deed Validation"]}
            img="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800" 
            delay={0.1} 
          />
          <DetailCard 
            icon={Navigation} 
            title="3D District Map" 
            desc="Experience Tamil Nadu from above. Our custom spatial engine allows you to navigate 20+ districts with absolute geographical precision." 
            features={["3D Terrain Exploration", "Satellite Boundary Overlay", "Real-time Proximity Data", "Auto-Zoom To Pinpoint"]}
            img="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" 
            delay={0.2} 
          />
          <DetailCard 
            icon={Crown} 
            title="Elite Assets" 
            desc="We host a private catalog of the most exclusive assets in South India, reserved for high-net-worth investors and developers." 
            features={["Premium ECR Beachfronts", "Prime Coimbatore Hubs", "Direct Owner Transparency", "Pre-vetted Industrial Zones"]}
            img="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800" 
            delay={0.3} 
          />
        </div>
      </section>

      {/* 🚀 3. INFINITE 3D GALLERY */}
      <section style={{ padding: "100px 0", backgroundColor: "#010413", overflow: "hidden", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
           <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', color:'#D4AF37'}}>
              <Sparkles size={20} />
              <span style={{ fontSize: "14px", fontWeight: "900", letterSpacing: "5px", textTransform:'uppercase' }}>Our Portfolio</span>
              <Sparkles size={20} />
           </div>
        </div>
        <div style={{ display: "flex", width: "fit-content", transform: "perspective(1200px) rotateX(8deg)" }}>
          <motion.div animate={{ x: [0, -1500] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ display: "flex", gap: "30px", padding: "20px" }}>
            {[...marqueeImages, ...marqueeImages, ...marqueeImages].map((url, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1, rotateY: 10, zIndex: 50 }} style={{ width: "420px", height: "280px", borderRadius: "30px", overflow: "hidden", border: "1px solid rgba(212, 175, 55, 0.4)", boxShadow: "0 20px 50px rgba(0,0,0,0.7)", flexShrink: 0, cursor: "pointer" }}>
                <img src={url} alt="luxury property" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, width: "15%", height: "100%", background: "linear-gradient(to right, #020617, transparent)", zIndex: 10 }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "15%", height: "100%", background: "linear-gradient(to left, #020617, transparent)", zIndex: 10 }} />
      </section>

      <ChatBot />

      <style>{`
        .gold-shimmer {
          background: linear-gradient(90deg, #D4AF37 0%, #FFF5B7 50%, #D4AF37 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer { to { background-position: 200% center; } }
      `}</style>
    </div>
  );
}

const goldBtnStyle = {
  background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
  color: "#000", padding: "20px 50px", borderRadius: "100px", border: "none",
  fontWeight: "900", fontSize: "14px", textTransform: "uppercase", letterSpacing: "2px",
  cursor: "pointer", boxShadow: "0 10px 25px rgba(0,0,0,0.4)", transition: "0.4s ease"
};

export default Home;