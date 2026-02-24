import heroImage from "./assets/hero.jpg";

function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${heroImage})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        textShadow: "2px 2px 5px black"
      }}
    >
      <div>
        <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>
          Find Your Dream Land
        </h1>

        <p style={{ fontSize: "22px", marginTop: "15px" }}>
          Trusted Land Promoters | Secure Investment | Prime Locations
        </p>

        <button
          style={{
            marginTop: "25px",
            padding: "12px 25px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer"
          }}
        >
          View Properties
        </button>
      </div>
    </div>
  );
}

export default Home;