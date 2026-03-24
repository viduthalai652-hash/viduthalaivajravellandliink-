import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { locations } from "./locations"; 
import { FaUser, FaExpandArrowsAlt, FaCoins, FaArrowLeft, FaCompass, FaKey } from "react-icons/fa";

// --- 1. CINEMATIC AUTO-ZOOM ENGINE ---
function ZoomHandler({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 15, {
        duration: 3,
        easeLinearity: 0.25,
      });
    }
  }, [coords, map]);
  return null;
}

// --- 2. METALLIC GOLD 3D PIN ---
const create3DIcon = () => L.divIcon({
  className: "custom-3d-pin",
  html: `
    <div class="pin-anchor">
      <div class="pin-ring"></div>
      <div class="pin-core">
        <div class="pin-shimmer"></div>
      </div>
    </div>
  `,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -55],
});

// --- 3. 3D TILTING POPUP CARD ---
const PopupCard = ({ loc }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y, { stiffness: 100, damping: 20 }), [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(useSpring(x, { stiffness: 100, damping: 20 }), [-0.5, 0.5], ["-10deg", "10deg"]);

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <div className="premium-glass-card">
        <img 
          src={loc.image} 
          alt={loc.name} 
          className="card-img" 
          onError={(e) => e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=400"}
        />
        <div className="card-overlay"></div>
        <div className="card-content">
          <div style={{ transform: "translateZ(50px)" }}>
            <span className="badge-gold">
                {loc.category === 'rent' ? <><FaKey size={8}/> Rental Asset</> : 'Verified Asset'}
            </span>
            <h3 className="gold-text-shimmer">{loc.name}</h3>
          </div>
          <div style={{ transform: "translateZ(30px)" }} className="info-grid">
            <div className="info-row"><FaUser /> <span>{loc.owner}</span></div>
            <div className="info-row"><FaExpandArrowsAlt /> <span>{loc.area}</span></div>
            <div className="info-row"><FaCompass /> <span>{loc.district}</span></div>
          </div>
          <div style={{ transform: "translateZ(60px)" }} className="price-tag">
            <FaCoins /> ₹ {loc.price}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function MapView() {
  const navigate = useNavigate();
  const locationData = useLocation();
  const selected = locationData.state?.selectedProperty;

  const centerPoint = selected ? [selected.lat, selected.lng] : [11.1271, 78.6569];

  // 🔥 SMART FILTER: Filters by District AND Category (Sale/Rent)
  const filtered = selected 
    ? locations.filter(l => 
        l.district?.toLowerCase().includes(selected.city.toLowerCase()) &&
        l.category === (selected.price.includes('/mo') ? 'rent' : 'sale')
      )
    : locations;

  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#020617", overflow: 'hidden' }}>
      
      <motion.button
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212, 175, 55, 0.4)" }}
        onClick={() => navigate(-1)}
        style={exitBtnStyle}
      >
        <FaArrowLeft /> EXIT 3D VIEW
      </motion.button>

      <MapContainer center={centerPoint} zoom={7} style={{ height: "100%", width: "100%" }} zoomControl={false}>
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png" opacity={0.7} />
        
        <ZoomHandler coords={centerPoint} />

        {filtered.map((loc, index) => (
          <Marker key={loc.id || index} position={[loc.lat, loc.lng]} icon={create3DIcon()}>
            <Popup minWidth={300}><PopupCard loc={loc} /></Popup>
          </Marker>
        ))}
      </MapContainer>

      <style>{`
        .pin-anchor { position: relative; width: 40px; height: 40px; transform-style: preserve-3d; }
        .pin-core { width: 30px; height: 30px; background: linear-gradient(135deg, #FFD700, #B8860B); border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #000; box-shadow: 0 10px 20px rgba(0,0,0,0.5); position: relative; overflow: hidden; }
        .pin-shimmer { position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); transform: skewX(-20deg); animation: shimmerPin 2s infinite; }
        @keyframes shimmerPin { to { left: 200%; } }
        .pin-ring { position: absolute; bottom: -5px; left: 5px; width: 20px; height: 10px; background: rgba(212, 175, 55, 0.4); border-radius: 50%; animation: pulseRing 1.5s infinite; }
        @keyframes pulseRing { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(3); opacity: 0; } }
        
        .leaflet-popup-content-wrapper { background: transparent !important; box-shadow: none !important; padding: 0 !important; }
        .leaflet-popup-tip { background: #B8860B !important; }
        
        .premium-glass-card { background: rgba(13, 17, 23, 0.85); backdrop-filter: blur(20px); border-radius: 30px; border: 1px solid rgba(212, 175, 55, 0.3); overflow: hidden; color: white; width: 280px; position: relative; box-shadow: 0 30px 60px rgba(0,0,0,0.6); }
        .card-img { width: 100%; height: 140px; object-fit: cover; opacity: 0.8; }
        .card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #020617 30%, transparent); }
        .card-content { padding: 25px; position: relative; z-index: 2; margin-top: -60px; }
        .badge-gold { background: #FFD700; color: #000; font-size: 10px; font-weight: 900; padding: 4px 10px; border-radius: 50px; text-transform: uppercase; display: flex; align-items: center; gap: 5px; width: fit-content; }
        .gold-text-shimmer { margin: 10px 0; font-size: 20px; font-weight: 900; background: linear-gradient(90deg, #FFD700, #FFF5B7, #FFD700); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .info-grid { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        .info-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #94a3b8; }
        .price-tag { font-size: 24px; font-weight: 900; color: #FFD700; display: flex; align-items: center; gap: 10px; }
      `}</style>
    </div>
  );
}

const exitBtnStyle = {
  position: "absolute", top: "100px", left: "30px", zIndex: 1000,
  padding: "15px 30px", background: "linear-gradient(135deg, #FFD700, #B8860B)",
  color: "black", border: "none", borderRadius: "100px", cursor: "pointer",
  fontWeight: "900", fontSize: "12px", letterSpacing: "2px",
  display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

export default MapView;