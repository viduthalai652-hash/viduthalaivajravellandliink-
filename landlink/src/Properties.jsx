import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaCoins, FaSearch, FaArrowRight } from "react-icons/fa";

const propertiesData = [
  { id: 1, name: "Premium Villa Plot", price: "45 Lakhs", location: "ECR", city: "Chennai", type: "Villa", area: "2400 sqft", owner: "Rajesh Kumar", lat: 12.9482, lng: 80.2394, image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800" },
  { id: 2, name: "Smart Residency", price: "32 Lakhs", location: "Saravanampatti", city: "Coimbatore", type: "Residential", area: "1500 sqft", owner: "Suresh Raina", lat: 11.0854, lng: 76.9961, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800" },
  { id: 3, name: "Temple City Heritage", price: "28 Lakhs", location: "Othakadai", city: "Madurai", type: "Residential", area: "1200 sqft", owner: "M. Sundaram", lat: 9.9252, lng: 78.1198, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" },
  { id: 4, name: "Cauvery Riverside Farm", price: "18 Lakhs", location: "Srirangam", city: "Trichy", type: "Agricultural", area: "2 Acres", owner: "K. Swaminathan", lat: 10.8650, lng: 78.6900, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800" },
  { id: 5, name: "Steel City Industrial", price: "1.2 Cr", location: "Steel Plant Road", city: "Salem", type: "Industrial", area: "5000 sqft", owner: "Salem Steels", lat: 11.6643, lng: 78.1460, image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800" },
  { id: 6, name: "Textile Hub Commercial", price: "55 Lakhs", location: "Avinashi Road", city: "Tiruppur", type: "Commercial", area: "1800 sqft", owner: "V. Mani", lat: 11.1085, lng: 77.3411, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
  { id: 7, name: "Vellore Fort-Side Plot", price: "22 Lakhs", location: "Katpadi", city: "Vellore", type: "Premium", area: "1200 sqft", owner: "S. Karthik", lat: 12.9796, lng: 79.1375, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800" },
  { id: 8, name: "Turmeric City Plot", price: "15 Lakhs", location: "Perundurai", city: "Erode", type: "Residential", area: "1100 sqft", owner: "G. Erode", lat: 11.2742, lng: 77.5833, image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=800" },
  { id: 9, name: "Nellai Heritage Villa", price: "38 Lakhs", location: "Palayamkottai", city: "Tirunelveli", type: "Villa", area: "2100 sqft", owner: "T. Nellai", lat: 8.7139, lng: 77.7567, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800" },
  { id: 10, name: "Pearl City Port View", price: "42 Lakhs", location: "Millerpuram", city: "Thoothukudi", type: "Commercial", area: "2000 sqft", owner: "Port Logistics", lat: 8.7642, lng: 78.1348, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" },
  { id: 11, name: "Delta Green Lands", price: "12 Lakhs", location: "Kumbakonam", city: "Thanjavur", type: "Agricultural", area: "1.5 Acres", owner: "R. Cholan", lat: 10.9602, lng: 79.3845, image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=800" },
  { id: 12, name: "Rock City Township", price: "20 Lakhs", location: "Palani Road", city: "Dindigul", type: "Residential", area: "1000 sqft", owner: "D. Rock", lat: 10.3673, lng: 77.9803, image: "https://images.unsplash.com/photo-1592595825556-9809e6d13844?q=80&w=800" },
  { id: 13, name: "Ranipet Tech Plot", price: "19 Lakhs", location: "SIPCOT", city: "Ranipet", type: "Industrial", area: "2200 sqft", owner: "T. SIPCOT", lat: 12.9276, lng: 79.3333, image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800" },
  { id: 14, name: "Sivakasi Trade Hub", price: "30 Lakhs", location: "Sattur Road", city: "Virudhunagar", type: "Commercial", area: "1500 sqft", owner: "S. Fireworks", lat: 9.4533, lng: 77.8024, image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000" },
  { id: 15, name: "Ocean Breeze Plots", price: "65 Lakhs", location: "Beach Road", city: "Kanyakumari", type: "Premium", area: "2500 sqft", owner: "K. Marine", lat: 8.0883, lng: 77.5385, image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000" },
  { id: 16, name: "Poultry Farm Estate", price: "25 Lakhs", location: "Tiruchengode", city: "Namakkal", type: "Agricultural", area: "3 Acres", owner: "N. Farm", lat: 11.3789, lng: 77.8936, image: "https://images.unsplash.com/photo-1464225226654-b30369abd59a?q=80&w=1000" },
  { id: 17, name: "Silk City Residency", price: "48 Lakhs", location: "Oragadam", city: "Kanchipuram", type: "Villa", area: "1800 sqft", owner: "Silk Residency", lat: 12.8342, lng: 79.7036, image: "https://images.unsplash.com/photo-1616075459372-51978280f305?q=80&w=1000" },
  { id: 18, name: "Chettinad Legacy", price: "35 Lakhs", location: "Karaikudi", city: "Sivaganga", type: "Premium", area: "3000 sqft", owner: "S. Heritage", lat: 10.0747, lng: 78.7844, image: "https://images.unsplash.com/photo-1626078437291-cc5801be9140?q=80&w=1000" },
  { id: 19, name: "Karur Textile Mill", price: "90 Lakhs", location: "Vengamedu", city: "Karur", type: "Industrial", area: "4500 sqft", owner: "K. Textiles", lat: 10.9601, lng: 78.0766, image: "https://images.unsplash.com/photo-1504307651254-35680f3366d4?q=80&w=1000" },
  { id: 20, name: "Nilgiri Mist Valley", price: "55 Lakhs", location: "Coonoor", city: "The Nilgiris", type: "Luxury", area: "1500 sqft", owner: "Tea Valley", lat: 11.3530, lng: 76.7959, image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000" },
];

function PropertyCard({ property }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y, { stiffness: 100, damping: 25 }), [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(useSpring(x, { stiffness: 100, damping: 25 }), [-0.5, 0.5], ["-10deg", "10deg"]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", height: '420px' }}
    >
      <div style={{ position: "relative", height: "100%", borderRadius: "28px", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.12)" }}>
        <img 
            src={property.image} 
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800"; }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} 
            alt={property.name}
        />
        <div style={{ position: "relative", zIndex: 2, padding: "28px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)", backdropFilter: "blur(1px)" }}>
          <div style={{ transform: "translateZ(50px)" }}>
            <span style={{ background: "rgba(59, 130, 246, 0.3)", color: "#fff", padding: "5px 12px", borderRadius: "8px", fontSize: "11px", fontWeight: "900" }}>{property.type}</span>
            <h3 style={{ color: "white", fontSize: "22px", marginTop: "12px", fontWeight: "800" }}>{property.name}</h3>
          </div>
          <div style={{ transform: "translateZ(40px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#d1d5db", fontSize: "14px", marginBottom: "8px" }}>
              <FaMapMarkerAlt style={{ color: "#f87171" }} /> {property.city}
            </div>
            <div style={{ color: "#fbbf24", fontSize: "24px", fontWeight: "900", marginBottom: "20px" }}>₹ {property.price}</div>
            
            <Link to="/map" state={{ selectedProperty: property }} style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#fff", color: "#000" }}
                style={{ width: "100%", padding: "15px", borderRadius: "14px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "white", fontWeight: "900", cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
              >
                VIEW DETAILS <FaArrowRight />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Properties() {
  const [query, setQuery] = useState("");
  const filtered = propertiesData.filter(p => p.city.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ minHeight: "100vh", padding: "120px 20px" }}>
      <div style={{ maxWidth: "1300px", margin: "auto" }}>
        
        <header style={{ textAlign: "center", marginBottom: "80px" }}>
          <h1 style={{ color: "white", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: "900", marginBottom: "30px" }}>
            Premium <span style={{ color: "#3b82f6" }}>Collections</span>
          </h1>
          
          <div style={{ position: "relative", maxWidth: "550px", margin: "auto" }}>
            <FaSearch style={{ position: "absolute", left: "25px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input 
              type="text" 
              placeholder="Search by District (e.g. Madurai)..." 
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: "100%", padding: "20px 25px 20px 65px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white", outline: "none", fontSize: "17px", backdropFilter: "blur(20px)" }}
            />
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: "40px" }}>
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ✨ THIS IS THE LINE YOU WERE MISSING:
export default Properties;