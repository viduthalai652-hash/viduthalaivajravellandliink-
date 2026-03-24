const generatePins = (baseLat, baseLng, areaName, districtName, category, count = 10) => {
  const pins = [];
  const owners = ["Arun Vijay", "Siva Kartikeyan", "Meena Kumari", "Rajesh Khanna", "Priya Nathan", "K. Swaminathan"];
  
  // High-quality real estate images (Sales = Exterior/Plots, Rent = Interior/Apartments)
  const saleImages = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=400",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=400"
  ];
  const rentImages = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=400"
  ];

  for (let i = 1; i <= count; i++) {
    const randomOffsetLat = (Math.random() - 0.5) * 0.06; 
    const randomOffsetLng = (Math.random() - 0.5) * 0.06;

    pins.push({
      id: `${districtName}-${category}-${i}`,
      name: `${areaName} ${category === 'rent' ? 'Luxury Home' : 'Premium Plot'} ${i}`,
      lat: baseLat + randomOffsetLat,
      lng: baseLng + randomOffsetLng,
      // Formatting price based on category
      price: category === 'rent' ? `${15 + i}k/mo` : `${20 + i} Lakhs`,
      location: areaName,
      district: districtName,
      category: category, // 'sale' or 'rent'
      owner: owners[Math.floor(Math.random() * owners.length)],
      area: `${1200 + (i * 150)} sqft`,
      image: category === 'rent' ? rentImages[i % 3] : saleImages[i % 3],
      type: category === 'rent' ? "Apartment" : (i % 2 === 0 ? "Villa" : "Plot")
    });
  }
  return pins;
};

// 📍 COORDINATES FOR ALL 20 DISTRICTS
export const locations = [
  // 1. Chennai
  ...generatePins(13.0827, 80.2707, "ECR / Adyar", "Chennai", "sale", 10),
  ...generatePins(13.0827, 80.2707, "OMR / Velachery", "Chennai", "rent", 10),
  
  // 2. Coimbatore
  ...generatePins(11.0168, 76.9558, "RS Puram", "Coimbatore", "sale", 8),
  ...generatePins(11.0168, 76.9558, "Peelamedu", "Coimbatore", "rent", 8),
  
  // 3. Madurai
  ...generatePins(9.9252, 78.1198, "Anna Nagar", "Madurai", "sale", 8),
  ...generatePins(9.9252, 78.1198, "KK Nagar", "Madurai", "rent", 8),

  // 4. Trichy
  ...generatePins(10.7905, 78.7047, "Srirangam", "Trichy", "sale", 5),
  ...generatePins(10.7905, 78.7047, "Thillai Nagar", "Trichy", "rent", 5),

  // 5. Salem
  ...generatePins(11.6643, 78.1460, "Steel Plant Rd", "Salem", "sale", 5),
  ...generatePins(11.6643, 78.1460, "Hasthampatti", "Salem", "rent", 5),

  // 6. Tiruppur
  ...generatePins(11.1085, 77.3411, "Avinashi Rd", "Tiruppur", "sale", 5),
  ...generatePins(11.1085, 77.3411, "Rayapuram", "Tiruppur", "rent", 5),

  // 7. Erode
  ...generatePins(11.3410, 77.7172, "Perundurai", "Erode", "sale", 5),
  ...generatePins(11.3410, 77.7172, "Bypass Rd", "Erode", "rent", 5),

  // 8. Vellore
  ...generatePins(12.9165, 79.1325, "Katpadi", "Vellore", "sale", 5),
  ...generatePins(12.9165, 79.1325, "Sathuvachari", "Vellore", "rent", 5),

  // 9. Tirunelveli
  ...generatePins(8.7139, 77.7567, "Palayamkottai", "Tirunelveli", "sale", 5),
  ...generatePins(8.7139, 77.7567, "High Ground", "Tirunelveli", "rent", 5),

  // 10. Thoothukudi
  ...generatePins(8.7642, 78.1348, "Millerpuram", "Thoothukudi", "sale", 5),
  
  // 11. Thanjavur
  ...generatePins(10.7870, 79.1378, "Medical College Rd", "Thanjavur", "sale", 5),

  // 12. Dindigul
  ...generatePins(10.3673, 77.9803, "Palani Road", "Dindigul", "sale", 5),

  // 13. Ranipet
  ...generatePins(12.9276, 79.3333, "SIPCOT Area", "Ranipet", "sale", 5),

  // 14. Virudhunagar
  ...generatePins(9.4533, 77.8024, "Sivakasi", "Virudhunagar", "sale", 5),

  // 15. Kanyakumari
  ...generatePins(8.0883, 77.5385, "Beach Road", "Kanyakumari", "sale", 5),

  // 16. Namakkal
  ...generatePins(11.3789, 77.8936, "Thuraiyur Rd", "Namakkal", "sale", 5),

  // 17. Kanchipuram
  ...generatePins(12.8342, 79.7036, "Silk Town", "Kanchipuram", "sale", 5),

  // 18. Sivaganga
  ...generatePins(10.0747, 78.7844, "Karaikudi", "Sivaganga", "sale", 5),

  // 19. Karur
  ...generatePins(10.9601, 78.0766, "Vengamedu", "Karur", "sale", 5),

  // 20. The Nilgiris
  ...generatePins(11.4102, 76.6950, "Coonoor / Ooty", "The Nilgiris", "sale", 5),
  ...generatePins(11.4102, 76.6950, "Kotagiri", "The Nilgiris", "rent", 5),
];