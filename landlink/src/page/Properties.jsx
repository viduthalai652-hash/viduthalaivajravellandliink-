function Properties() {
  const properties = [
    {
      id: 1,
      title: "DTCP Approved Plot",
      price: "₹25 Lakhs",
      location: "Chennai",
      image: "https://via.placeholder.com/300"
    },
    {
      id: 2,
      title: "CMDA Approved Layout",
      price: "₹40 Lakhs",
      location: "Coimbatore",
      image: "https://via.placeholder.com/300"
    },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h1>Available Properties</h1>

      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px"
      }}>
        {properties.map((property) => (
          <div key={property.id} style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            width: "300px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <img src={property.image} alt="" width="100%" />
            
            <div style={{ padding: "15px" }}>
              <h3>{property.title}</h3>
              <p>{property.location}</p>
              <p style={{ fontWeight: "bold" }}>{property.price}</p>
              <button style={{
                padding: "8px 15px",
                backgroundColor: "#1e293b",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;