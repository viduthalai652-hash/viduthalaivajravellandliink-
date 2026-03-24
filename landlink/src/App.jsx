import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ReactLenis } from 'lenis/react'; 

import Navbar from "./Navbar";
import Home from "./Home";
import Properties from "./Properties";
import Contact from "./Contact";
import Rent from "./Rent";
import MapView from "./MapView";

const perspectiveVariants = {
  initial: { opacity: 0, scale: 0.9, rotateX: 15, z: -100 },
  animate: { opacity: 1, scale: 1, rotateX: 0, z: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 1.1, rotateX: -15, z: 100, transition: { duration: 0.5 } }
};

function PageWrapper({ children }) {
  return (
    <motion.div variants={perspectiveVariants} initial="initial" animate="animate" exit="exit" style={{ transformPerspective: 1200 }}>
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/properties" element={<PageWrapper><Properties /></PageWrapper>} />
        <Route path="/rent" element={<PageWrapper><Rent /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/map" element={<PageWrapper><MapView /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ReactLenis root>
      <BrowserRouter>
        <div style={{ position: "fixed", inset: 0, zIndex: -10, backgroundColor: "#020617", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-10%", left: "-10%", height: "600px", width: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)", filter: "blur(100px)" }} />
            <div style={{ position: "absolute", bottom: "-10%", right: "-10%", height: "600px", width: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)", filter: "blur(100px)" }} />
        </div>
        <Navbar />
        <main style={{ position: "relative", paddingTop: "100px" }}><AnimatedRoutes /></main>
      </BrowserRouter>
    </ReactLenis>
  );
}
export default App;