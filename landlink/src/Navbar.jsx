import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 40px",
      backgroundColor: "#2c3e50",
      color: "white"
    }}>
      <h2>LandLink</h2>

      <div>
        <Link to="/" style={{ color: "white", marginRight: "20px" }}>Home</Link>
        <Link to="/properties" style={{ color: "white", marginRight: "20px" }}>Properties</Link>
        <Link to="/contact" style={{ color: "white" }}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;