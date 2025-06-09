// src/data/ProductDetailData.js
const ProductDetailData = [
  // MEN'S PRODUCTS (IDs 1-6)
  // Men's Glasses
  {
    id: "1",
    category: "Men's Glasses",
    name: "Ray-Ban Classic",
    price: "$150.00",
    description: "Classic Ray-Ban glasses for a timeless look. These glasses feature high-quality lenses that ensure crystal-clear vision while reducing glare. Their durable frame makes them ideal for everyday wear, while the comfortable nose pads provide a secure fit. Perfect for both casual outings and formal settings, these glasses are a must-have for anyone looking to enhance their style with a touch of elegance.",
    rating: "⭐ 4.5 | 💚 92% (145 reviews)",
    image: require("../assets/G1.png"),
  },
  {
    id: "2",
    category: "Men's Glasses",
    name: "Oakley Modern",
    price: "$180.00",
    description: "Stylish Oakley glasses for a sporty look. Designed with high-impact activities in mind, these glasses offer unparalleled UV protection, shielding your eyes from harmful rays. The lightweight yet sturdy frame provides durability without compromising comfort. With a sleek and modern design, these glasses are perfect for those who lead an active lifestyle while still wanting to maintain a trendy appearance.",
    rating: "⭐ 4.6 | 💚 90% (120 reviews)",
    image: require("../assets/G3.png"),
  },

  // Men's Watches
  {
    id: "3",
    category: "Men's Watches",
    name: "Rolex Submariner",
    price: "$11,200.00",
    description: "Luxury Rolex Submariner watch crafted for excellence. This iconic timepiece features a robust stainless steel case and bracelet, waterproof up to 300 meters. The automatic movement ensures precise timekeeping, while the unidirectional rotating bezel adds functionality for diving activities. With its classic black dial and luminous markers, this watch combines sophistication with professional reliability.",
    rating: "⭐ 4.9 | 💚 98% (520 reviews)",
    image: require("../assets/W1.png"),
  },
  {
    id: "4",
    category: "Men's Watches",
    name: "Shinola Runwell",
    price: "$595.00",
    description: "American-made Shinola Runwell watch with exceptional craftsmanship. Built in Detroit with Swiss movement, this watch features a beautiful leather strap and polished stainless steel case. The clean white dial with bold numerals ensures easy readability, while the water-resistant design makes it suitable for daily wear. A perfect blend of American heritage and modern style.",
    rating: "⭐ 4.4 | 💚 88% (95 reviews)",
    image: require("../assets/W2.png"),
  },

  // Men's Hats
  {
    id: "5",
    category: "Men's Hats",
    name: "AMI Paris Cap",
    price: "$95.00",
    description: "Stylish AMI Paris cap for contemporary fashion. Made from premium cotton twill with an adjustable strap for perfect fit. Features embroidered logo detailing and curved brim for sun protection. The structured crown maintains its shape while the breathable fabric ensures all-day comfort. Perfect for casual outings and adding a designer touch to your everyday look.",
    rating: "⭐ 4.3 | 💚 85% (78 reviews)",
    image: require("../assets/hats b1.png"),
  },
  {
    id: "6",
    category: "Men's Hats",
    name: "Roderer Fedora",
    price: "$120.00",
    description: "Classic Roderer fedora hat for timeless elegance. Handcrafted from finest wool felt with silk band detailing. Features a traditional center crease crown and snap brim that can be styled up or down. The interior leather sweatband ensures comfort during extended wear. Perfect for formal occasions or adding sophisticated flair to casual attire.",
    rating: "⭐ 4.6 | 💚 91% (110 reviews)",
    image: require("../assets/hats b2.png"),
  },

  // WOMEN'S PRODUCTS (IDs 7-12)
  // Women's Glasses
  {
    id: "7",
    category: "Women's Glasses",
    name: "Warby Parker Frames",
    price: "$145.00",
    description: "Elegant Warby Parker frames designed for modern women. These lightweight acetate frames offer durability and comfort for all-day wear. The subtle cat-eye shape flatters most face types while the anti-reflective coating reduces glare. Available with prescription lenses, these frames combine fashion-forward design with functional eyewear technology.",
    rating: "⭐ 4.5 | 💚 89% (156 reviews)",
    image: require("../assets/women.G1.png"),
  },
  {
    id: "8",
    category: "Women's Glasses",
    name: "Ryan Simkhai Shea",
    price: "$195.00",
    description: "Designer Ryan Simkhai Shea glasses for luxury style. Featuring premium acetate construction with gold-tone metal accents. The oversized square frame offers a bold statement while remaining comfortable. High-quality hinges ensure long-lasting durability, and the gradient lenses provide both style and UV protection. Perfect for fashion-conscious women seeking designer eyewear.",
    rating: "⭐ 4.7 | 💚 94% (189 reviews)",
    image: require("../assets/women.G2.png"),
  },

  // Women's Watches
  {
    id: "9",
    category: "Women's Watches",
    name: "Cartier Baignoire",
    price: "$24,350.00",
    description: "Exquisite Cartier Baignoire watch representing ultimate luxury. Crafted in 18k white gold with diamond-set bezel, this timepiece epitomizes elegance. The oval case houses a Swiss quartz movement with mother-of-pearl dial. Alligator leather strap with gold deployant buckle ensures comfort and security. A true heirloom piece for the discerning collector.",
    rating: "⭐ 4.9 | 💚 97% (445 reviews)",
    image: require("../assets/women.W1.png"),
  },
  {
    id: "10",
    category: "Women's Watches",
    name: "Pasha de Cartier",
    price: "$8,500.00",
    description: "Iconic Pasha de Cartier watch with distinctive design. Features stainless steel case with signature screw-down crown cap and chain. The silver-toned dial with Roman numerals showcases Cartier's traditional elegance. Water-resistant construction and Swiss automatic movement ensure reliability. The leather strap complements the watch's sophisticated aesthetic perfectly.",
    rating: "⭐ 4.8 | 💚 95% (298 reviews)",
    image: require("../assets/women.W2.png"),
  },

  // Women's Hats
  {
    id: "11",
    category: "Women's Hats",
    name: "Fashionable Fedora",
    price: "$65.00",
    description: "Chic fashionable fedora perfect for any season. Made from soft wool felt with grosgrain ribbon band. The wide brim provides excellent sun protection while the classic fedora shape adds instant sophistication to any outfit. Lightweight construction ensures comfortable wear, and the neutral color complements various wardrobe choices.",
    rating: "⭐ 4.2 | 💚 82% (67 reviews)",
    image: require("../assets/women.H1.png"),
  },
  {
    id: "12",
    category: "Women's Hats",
    name: "Stylish Bucket Hat",
    price: "$45.00",
    description: "Trendy stylish bucket hat for casual elegance. Crafted from durable cotton canvas with reinforced stitching. The downward-sloping brim offers 360-degree sun protection, while the lightweight material ensures breathability. Features an adjustable chin strap for windy conditions. Perfect for beach days, hiking, or adding a casual-chic element to your outfit.",
    rating: "⭐ 4.1 | 💚 79% (89 reviews)",
    image: require("../assets/women.H2.png"),
  },

  // KIDS' PRODUCTS (IDs 13-18)
  // Kids' Glasses
  {
    id: "13",
    category: "Kids' Glasses",
    name: "GlassesUSA Junior",
    price: "$89.00",
    description: "Durable GlassesUSA Junior glasses designed for active children. Features flexible TR-90 frame material that bends without breaking. The colorful design appeals to kids while spring hinges accommodate growing faces. Anti-scratch coating on lenses ensures longevity, and the lightweight construction prevents slipping. Safety and style combined for worry-free wear.",
    rating: "⭐ 4.4 | 💚 87% (124 reviews)",
    image: require("../assets/Kids.G5.png"),
  },
  {
    id: "14",
    category: "Kids' Glasses",
    name: "Lenscrafters Kids",
    price: "$120.00",
    description: "Professional Lenscrafters Kids glasses with superior protection. Made with impact-resistant polycarbonate lenses and flexible frame construction. The fun, vibrant colors encourage kids to wear their glasses proudly. Adjustable nose pads and temple tips ensure a comfortable, secure fit. Backed by warranty for parents' peace of mind.",
    rating: "⭐ 4.6 | 💚 91% (167 reviews)",
    image: require("../assets/G6.png"),
  },

  // Kids' Watches
  {
    id: "15",
    category: "Kids' Watches",
    name: "Timex Kids Digital",
    price: "$35.00",
    description: "Fun Timex Kids Digital watch perfect for learning time. Features large, easy-to-read digital display with backlight for low-light conditions. Water-resistant design handles splashes and everyday activities. The colorful resin strap is comfortable and durable. Multiple alarm functions help kids develop time management skills while having fun.",
    rating: "⭐ 4.3 | 💚 84% (203 reviews)",
    image: require("../assets/watches b1.png"),
  },
  {
    id: "16",
    category: "Kids' Watches",
    name: "Timex Kids Analog",
    price: "$45.00",
    description: "Educational Timex Kids Analog watch for time-telling practice. Clear number markers and distinct hour/minute hands make learning easy. The durable fabric strap withstands active play, while the stainless steel case provides protection. Water-resistant construction ensures longevity. Perfect for teaching traditional time-reading skills in a fun, engaging way.",
    rating: "⭐ 4.5 | 💚 88% (145 reviews)",
    image: require("../assets/watches b2.png"),
  },

  // Kids' Hats
  {
    id: "17",
    category: "Kids' Hats",
    name: "New Era Youth Cap",
    price: "$25.00",
    description: "Cool New Era Youth Cap designed for young trendsetters. Made from breathable cotton with moisture-wicking sweatband. The structured crown maintains its shape while the curved brim provides sun protection. Adjustable strap ensures perfect fit as kids grow. Available in vibrant colors that kids love to wear for sports and play.",
    rating: "⭐ 4.2 | 💚 81% (198 reviews)",
    image: require("../assets/Kids.png"),
  },
  {
    id: "18",
    category: "Kids' Hats",
    name: "Patagonia Kids Beanie",
    price: "$24.99",
    description: "Warm Patagonia Kids Beanie for outdoor adventures. Made from recycled wool blend that's soft against sensitive skin. The snug fit keeps little heads warm during cold weather activities. Machine washable for easy care, and the playful design appeals to children. Perfect for skiing, hiking, or everyday winter wear.",
    rating: "⭐ 4.7 | 💚 93% (176 reviews)",
    image: require("../assets/kids (2).png"),
  },

  // NEW COLLECTION (IDs 19-22)
  {
    id: "19",
    category: "New Collection",
    name: "Stylish Sunglasses",
    price: "$100.00",
    description: "Latest stylish sunglasses from our new collection. Features polarized lenses that eliminate glare and provide 100% UV protection. The contemporary frame design suits various face shapes, while the premium materials ensure durability. Includes protective case and cleaning cloth. Perfect for driving, beach activities, or everyday sun protection with style.",
    rating: "⭐ 4.4 | 💚 86% (89 reviews)",
    image: require("../assets/Glasses.png"),
  },
  {
    id: "20",
    category: "New Collection",
    name: "Elegant Wristwatch",
    price: "$400.00",
    description: "Sophisticated elegant wristwatch featuring Swiss movement precision. The stainless steel case with sapphire crystal glass offers scratch resistance and clarity. Genuine leather strap provides comfort and durability. Water-resistant design suitable for daily activities. The minimalist dial with luminous hands ensures easy reading in any lighting condition.",
    rating: "⭐ 4.6 | 💚 90% (134 reviews)",
    image: require("../assets/Watches.png"),
  },
  {
    id: "21",
    category: "New Collection",
    name: "Trendy Hat",
    price: "$30.00",
    description: "Modern trendy hat that combines style with functionality. Made from premium cotton blend with reinforced stitching for durability. The adjustable sizing ensures comfortable fit for various head sizes. Features moisture-wicking interior band and UV protection. Versatile design complements both casual and semi-formal outfits perfectly.",
    rating: "⭐ 4.1 | 💚 78% (67 reviews)",
    image: require("../assets/Hats.png"),
  },
  {
    id: "22",
    category: "New Collection",
    name: "Luxury Bag",
    price: "$500.00",
    description: "Premium luxury bag crafted from finest genuine leather. Features multiple compartments for organized storage and secure zip closures. The reinforced handles and detachable shoulder strap offer carrying versatility. Interior lined with high-quality fabric and includes phone and card pockets. A timeless piece that combines functionality with sophisticated elegance.",
    rating: "⭐ 4.8 | 💚 95% (245 reviews)",
    image: require("../assets/Bookmark (1).png"),
  },
];

export default ProductDetailData;