import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Building2, Key, Mail, Landmark } from "lucide-react"; 

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", name: "Home", icon: <Home size={20} /> },
    { path: "/properties", name: "Properties", icon: <Building2 size={20} /> },
    { path: "/rent", name: "Rentals", icon: <Key size={20} /> },
    { path: "/contact", name: "Contact", icon: <Mail size={20} /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      style={{
        position: "fixed",
        top: "25px", 
        left: "50%",
        width: "90%",
        maxWidth: "1100px",
        padding: "12px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(13, 17, 23, 0.8)", // Deep premium glass
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(255, 215, 0, 0.15)", // Gold border
        borderRadius: "100px",
        zIndex: 10000,
        boxShadow: "0 25px 50px rgba(0,0,0,0.5), inset 0 0 15px rgba(255,215,0,0.05)",
      }}
    >
      {/* 🏡 3D BRANDING & LOGO */}
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "15px" }}>
        <motion.div
          whileHover={{ rotateY: 180, scale: 1.1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
            padding: "10px",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 20px rgba(212, 175, 55, 0.4)",
            transformStyle: "preserve-3d"
          }}
        >
          <Landmark color="#000" size={24} strokeWidth={2.5} />
        </motion.div>
        
        <span style={{
          fontSize: "24px",
          fontWeight: "900",
          background: "linear-gradient(to bottom, #FFD700 20%, #FFF5B7 50%, #B8860B 80%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-1px",
          filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.3))"
        }}>
          LandLink
        </span>
      </Link>

      {/* 🔗 3D PREMIUM ICON MENU */}
      <div style={{ display: "flex", gap: "12px" }}>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link key={index} to={item.path} style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: "relative",
                  padding: "10px 20px",
                  borderRadius: "50px",
                  color: isActive ? "#FFD700" : "#94a3b8",
                  fontSize: "15px",
                  fontWeight: "800",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  background: isActive ? "rgba(255, 215, 0, 0.1)" : "transparent",
                  border: isActive ? "1px solid rgba(255, 215, 0, 0.3)" : "1px solid transparent",
                }}
              >
                {/* 3D ICON POP */}
                <span style={{ 
                  display: "flex", 
                  color: isActive ? "#FFD700" : "inherit",
                  filter: isActive ? "drop-shadow(0 0 8px #FFD700)" : "none",
                  transform: isActive ? "translateY(-2px)" : "none"
                }}>
                  {item.icon}
                </span>

                <span style={{ display: isActive ? "block" : "none", textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px" }}>
                   {item.name}
                </span>

                {/* ACTIVE NEON GLOW UNDERLINE */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-neon"
                    style={{
                      position: "absolute",
                      bottom: "-5px",
                      left: "25%",
                      right: "25%",
                      height: "3px",
                      background: "#FFD700",
                      borderRadius: "10px",
                      boxShadow: "0 0 15px #FFD700, 0 0 30px #FFD700",
                    }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}

export default Navbar;