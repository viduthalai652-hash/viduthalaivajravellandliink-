import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaCoins, FaSearch, FaArrowRight, FaExpandArrowsAlt, FaBed, FaUser } from "react-icons/fa";

// ✅ 20 Districts with Verified High-End Rental Data
const rentalsData = [
  { id: 1, name: "Modern 2BHK Apartment", price: "18k/mo", location: "Velachery", city: "Chennai", type: "Apartment", area: "1100 sqft", owner: "Rajesh Kumar", lat: 12.9750, lng: 80.2200, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800" },
  { id: 2, name: "Luxury 3BHK Villa", price: "45k/mo", location: "ECR", city: "Chennai", type: "Villa", area: "2200 sqft", owner: "Suresh Raina", lat: 12.9165, lng: 80.2500, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800" },
  { id: 3, name: "Cozy 2BHK House", price: "15k/mo", location: "RS Puram", city: "Coimbatore", type: "Independent", area: "900 sqft", owner: "Priya Nathan", lat: 11.0168, lng: 76.9558, image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800" },
  { id: 4, name: "3BHK Family Home", price: "20k/mo", location: "Anna Nagar", city: "Madurai", type: "Home", area: "1400 sqft", owner: "M. Sethu", lat: 9.9252, lng: 78.1198, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" },
  { id: 5, name: "Smart Executive Flat", price: "22k/mo", location: "Thillai Nagar", city: "Trichy", type: "Flat", area: "1200 sqft", owner: "Abdul K.", lat: 10.8200, lng: 78.6850, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800" },
  { id: 6, name: "Luxury Hill Villa", price: "55k/mo", location: "Coonoor", city: "The Nilgiris", type: "Villa", area: "2500 sqft", owner: "Nilgiri Tea Estates", lat: 11.3530, lng: 76.7959, image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800" },
  { id: 7, name: "Textile City Penthouse", price: "30k/mo", location: "Avinashi Road", city: "Tiruppur", type: "Apartment", area: "1800 sqft", owner: "V. Mani", lat: 11.1085, lng: 77.3411, image: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=800" },
  { id: 8, name: "Urban Studio", price: "12k/mo", location: "Bypass Rd", city: "Erode", type: "Studio", area: "750 sqft", owner: "G. Mani", lat: 11.3410, lng: 77.7172, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800" },
  { id: 9, name: "Heritage Bungalow", price: "35k/mo", location: "Karaikudi", city: "Sivaganga", type: "Heritage", area: "3000 sqft", owner: "S. Meiyappan", lat: 10.0747, lng: 78.7844, image: "https://images.unsplash.com/photo-1626078437291-cc5801be9140?q=80&w=800" },
  { id: 10, name: "Industrialist Suite", price: "28k/mo", location: "Steel Plant Rd", city: "Salem", type: "Flat", area: "1500 sqft", owner: "Salem Steels", lat: 11.6643, lng: 78.1460, image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800" },
  { id: 11, name: "Fort View Apartment", price: "18k/mo", location: "Sathuvachari", city: "Vellore", type: "Apartment", area: "1100 sqft", owner: "Dr. Karthik", lat: 12.9165, lng: 79.1325, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800" },
  { id: 12, name: "River Side Residency", price: "24k/mo", location: "Palayamkottai", city: "Tirunelveli", type: "Home", area: "1350 sqft", owner: "T. Nellai", lat: 8.7139, lng: 77.7567, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800" },
  { id: 13, name: "Smart Tech Flat", price: "20k/mo", location: "SIPCOT", city: "Ranipet", type: "Apartment", area: "1200 sqft", owner: "T. Ranipet", lat: 12.9276, lng: 79.3333, image: "https://images.unsplash.com/photo-1554232456-8727aae0cfa4?q=80&w=800" },
  { id: 14, name: "Sea Breeze Flat", price: "40k/mo", location: "Beach Road", city: "Kanyakumari", type: "Apartment", area: "1600 sqft", owner: "K. Marine", lat: 8.0883, lng: 77.5385, image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800" },
  { id: 15, name: "Temple Town Home", price: "16k/mo", location: "Kumbakonam", city: "Thanjavur", type: "Independent", area: "1000 sqft", owner: "R. Cholan", lat: 10.9602, lng: 79.3845, image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800" },
  { id: 16, name: "Hilltop Studio", price: "14k/mo", location: "Palani Road", city: "Dindigul", type: "Studio", area: "800 sqft", owner: "D. Rock", lat: 10.3673, lng: 77.9803, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800" },
  { id: 17, name: "Silk Town Villa", price: "32k/mo", location: "Oragadam", city: "Kanchipuram", type: "Villa", area: "1800 sqft", owner: "Silk Residency", lat: 12.8342, lng: 79.7036, image: "https://images.unsplash.com/photo-1616075459372-51978280f305?q=80&w=800" },
  { id: 18, name: "Sivakasi Trade Home", price: "15k/mo", location: "Sattur Road", city: "Virudhunagar", type: "Flat", area: "950 sqft", owner: "S. Fireworks", lat: 9.4533, lng: 77.8024, image: "https://images.unsplash.com/photo-1572120339554-d72640242114?q=80&w=800" },
  { id: 19, name: "Industrialist Flat", price: "25k/mo", location: "Vengamedu", city: "Karur", type: "Independent", area: "1400 sqft", owner: "K. Textiles", lat: 10.9601, lng: 78.0766, image: "https://images.unsplash.com/photo-1504307651254-35680f3366d4?q=80&w=800" },
  { id: 20, name: "Port City Hub", price: "30k/mo", location: "Millerpuram", city: "Thoothukudi", type: "Flat", area: "1550 sqft", owner: "Port Logistics", lat: 8.7642, lng: 78.1348, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" },
];

function RentalCard({ rental }) {
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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", height: '450px' }}
    >
      <div style={{ position: "relative", height: "100%", borderRadius: "28px", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.6)", border: "1px solid rgba(255,215,0,0.15)" }}>
        <img 
          src={rental.image} 
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800"; }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }} 
          alt={rental.name}
        />
        <div style={{ position: "relative", zIndex: 2, padding: "28px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)", backdropFilter: "blur(1px)" }}>
          <div style={{ transform: "translateZ(50px)" }}>
            <span style={{ background: "rgba(255, 215, 0, 0.25)", color: "#FFD700", padding: "5px 12px", borderRadius: "8px", fontSize: "11px", fontWeight: "900", border: '1px solid #FFD700' }}>{rental.type}</span>
            <h3 style={{ color: "white", fontSize: "22px", marginTop: "12px", fontWeight: "800" }}>{rental.name}</h3>
          </div>

          <div style={{ transform: "translateZ(40px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#d1d5db", fontSize: "14px", marginBottom: "8px" }}>
              <FaMapMarkerAlt style={{ color: "#f87171" }} /> {rental.city}
            </div>
            <div style={{ color: "#FFD700", fontSize: "24px", fontWeight: "900", marginBottom: "18px" }}>₹ {rental.price}</div>
            
            <Link to="/map" state={{ selectedProperty: rental }} style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "#FFD700", color: "#000" }}
                style={{ width: "100%", padding: "15px", borderRadius: "14px", background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.3)", color: "white", fontWeight: "900", cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
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

function Rent() {
  const [query, setQuery] = useState("");
  const filtered = rentalsData.filter(r => r.city.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ minHeight: "100vh", padding: "120px 20px 80px", backgroundColor: "#020617" }}>
      <div style={{ maxWidth: "1300px", margin: "auto" }}>
        
        {/* ✨ SEARCH HEADER */}
        <header style={{ textAlign: "center", marginBottom: "80px" }}>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "white", fontSize: "56px", fontWeight: "900", marginBottom: "30px", letterSpacing: "-2px" }}>
            Luxury <span style={{ color: "#FFD700" }}>Rentals</span>
          </motion.h1>
          
          <div style={{ position: "relative", maxWidth: "550px", margin: "auto" }}>
            <FaSearch style={{ position: "absolute", left: "25px", top: "50%", transform: "translateY(-50%)", color: "#FFD700" }} />
            <input 
              type="text" 
              placeholder="Search Districts (e.g. Chennai, Coimbatore)..." 
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: "100%", padding: "20px 25px 20px 65px", borderRadius: "100px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,215,0,0.2)", color: "white", outline: "none", fontSize: "17px", backdropFilter: "blur(20px)", transition: "0.3s" }}
            />
          </div>
        </header>

        {/* RENTAL GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))", gap: "40px", perspective: "1200px" }}>
          <AnimatePresence>
            {filtered.map((r) => (
              <motion.div key={r.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <RentalCard rental={r} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Rent;