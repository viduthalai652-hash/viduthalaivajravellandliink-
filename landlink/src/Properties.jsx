const properties = [
  {
    id: 1,
    name: "Premium Villa Plot",
    price: "₹45 Lakhs",
    location: "ECR, Chennai",
    type: "Villa",
  },
  {
    id: 2,
    name: "Residential Plot",
    price: "₹25 Lakhs",
    location: "OMR, Chennai",
    type: "Residential",
  },
  {
    id: 3,
    name: "Commercial Land",
    price: "₹60 Lakhs",
    location: "T Nagar",
    type: "Commercial",
  },
  {
    id: 4,
    name: "Farm Land",
    price: "₹18 Lakhs",
    location: "Kanchipuram",
    type: "Agricultural",
  },
  {
    id: 5,
    name: "Luxury Gated Community Plot",
    price: "₹75 Lakhs",
    location: "Velachery",
    type: "Premium",
  },
  {
    id: 6,
    name: "Budget Residential Plot",
    price: "₹12 Lakhs",
    location: "Tambaram",
    type: "Budget",
  },
];

function Properties() {
  return (
    <div
      style={{
        padding: "60px 20px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          color: "white",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        Explore Our Premium Properties
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {properties.map((property) => (
          <div
            key={property.id}
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              transition: "0.3s",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                fontSize: "14px",
                color: "#764ba2",
                fontWeight: "bold",
              }}
            >
              {property.type}
            </div>

            <h3 style={{ marginBottom: "10px" }}>{property.name}</h3>

            <p style={{ marginBottom: "8px" }}>
              📍 <strong>Location:</strong> {property.location}
            </p>

            <p style={{ marginBottom: "15px", fontSize: "18px", fontWeight: "bold" }}>
              💰 {property.price}
            </p>

            <button
              style={{
                padding: "10px 18px",
                backgroundColor: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%",
                fontWeight: "bold",
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;