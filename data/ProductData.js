// src/data/ProductData.js
const ProductData = {
  men: [
    // Glasses
    { id: "1", category: "Men's Glasses", name: "Ray-Ban Classic", price: "$150.00", image: require("../assets/G1.png"), liked: false },
    { id: "2", category: "Men's Glasses", name: "Oakley Modern", price: "$180.00", image: require("../assets/G3.png"), liked: false },
    
    // Watches
    { id: "3", category: "Men's Watches", name: "Rolex Submariner", price: "$11,200.00", image: require("../assets/W1.png"), liked: false },
    { id: "4", category: "Men's Watches", name: "Shinola Runwell", price: "$595.00", image: require("../assets/W2.png"), liked: false },
    
    // Hats
    { id: "5", category: "Men's Hats", name: "AMI Paris Cap", price: "$95.00", image: require("../assets/hats b1.png"), liked: false },
    { id: "6", category: "Men's Hats", name: "Roderer Fedora", price: "$120.00", image: require("../assets/hats b2.png"), liked: false },
  ],
  women: [
    // Glasses
    { id: "7", category: "Women's Glasses", name: "Warby Parker Frames", price: "$145.00", image: require("../assets/women.G1.png"), liked: false },
    { id: "8", category: "Women's Glasses", name: "Ryan Simkhai Shea", price: "$195.00", image: require("../assets/women.G2.png"), liked: false },
    
    // Watches
    { id: "9", category: "Women's Watches", name: "Cartier Baignoire", price: "$24,350.00", image: require("../assets/women.W1.png"), liked: false },
    { id: "10", category: "Women's Watches", name: "Pasha de Cartier", price: "$8,500.00", image: require("../assets/women.W2.png"), liked: false },
    
    // Hats
    { id: "11", category: "Women's Hats", name: "Fashionable Fedora", price: "$65.00", image: require("../assets/women.H1.png"), liked: false },
    { id: "12", category: "Women's Hats", name: "Stylish Bucket Hat", price: "$45.00", image: require("../assets/women.H2.png"), liked: false },
  ],
  kids: [
    // Glasses
    { id: "13", category: "Kids' Glasses", name: "GlassesUSA Junior", price: "$89.00", image: require("../assets/Kids.G5.png"), liked: false },
    { id: "14", category: "Kids' Glasses", name: "Lenscrafters Kids", price: "$120.00", image: require("../assets/G6.png"), liked: false },
    
    // Watches
    { id: "15", category: "Kids' Watches", name: "Timex Kids Digital", price: "$35.00", image: require("../assets/watches b1.png"), liked: false },
    { id: "16", category: "Kids' Watches", name: "Timex Kids Analog", price: "$45.00", image: require("../assets/watches b2.png"), liked: false },
    
    // Hats
    { id: "17", category: "Kids' Hats", name: "New Era Youth Cap", price: "$25.00", image: require("../assets/Kids.png"), liked: false },
    { id: "18", category: "Kids' Hats", name: "Patagonia Kids Beanie", price: "$24.99", image: require("../assets/kids (2).png"), liked: false },
  ],
  newCollection: [
    { id: "19", category: "New Collection", name: "Stylish Sunglasses", price: "$100.00", image: require("../assets/Glasses.png"), liked: false },
    { id: "20", category: "New Collection", name: "Elegant Wristwatch", price: "$400.00", image: require("../assets/Watches.png"), liked: false },
    { id: "21", category: "New Collection", name: "Trendy Hat", price: "$30.00", image: require("../assets/Hats.png"), liked: false },
    { id: "22", category: "New Collection", name: "Luxury Bag", price: "$500.00", image: require("../assets/Bookmark (1).png"), liked: false },
  ],
};

export default ProductData;