import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import Header from "./HeaderNavigation";
import Footer from "./Footer";
import { Color } from "../GlobalStyles";
import Carousel from "react-native-snap-carousel"; // Import carousel for the banners

const { width } = Dimensions.get("window"); // Get screen width for responsiveness

const Watches = () => {
  const [productList] = useState([
    { id: "1", category: "Men", name: "Ray-Ban Classic", price: "$120.00", image: require("../assets/G1.png") },
    { id: "2", category: "Men", name: "Oakley Modern", price: "$150.00", image: require("../assets/G2.png") },
    { id: "3", category: "Women", name: "Gucci Elegance", price: "$200.00", image: require("../assets/G4.png") },
    { id: "4", category: "Women", name: "Tom Ford Luxe", price: "$180.00", image: require("../assets/G6.png") },
    { id: "5", category: "Kids", name: "Kiddo Trendy", price: "$80.00", image: require("../assets/G1.png") },
    { id: "6", category: "Kids", name: "Junior Vision", price: "$90.00", image: require("../assets/G2.png") },
  ]);

  const [activeBanner, setActiveBanner] = useState(0); // State for active banner index

  const handleBackPress = () => {
    console.log("Back button pressed");
  };

  const handleAddToCart = (productName) => {
    alert(`Added ${productName} to cart`);
  };

  // Banner data for carousel
  const banners = [
    { id: "1", image: require("../assets/watches b2.png") },
    { id: "2", image: require("../assets/watches b1.png") }, // Add a second banner image
  ];

  const renderBannerItem = ({ item }) => (
    <View style={styles.bannerContainer}>
      <Image source={item.image} style={styles.bannerImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Header onBackPress={handleBackPress} />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Banner Section */}
        <View style={styles.carouselContainer}>
          <Carousel
            data={banners}
            renderItem={renderBannerItem}
            sliderWidth={width}
            itemWidth={width}
            onSnapToItem={(index) => setActiveBanner(index)} // Update active banner index
            autoplay={true} // Auto slide
            autoplayInterval={3000} // Slide interval of 2 seconds
          />
          {/* Dots below the banner */}
          <View style={styles.dotsContainer}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeBanner === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product List */}
        <View style={styles.row}>
          {productList.map((product) => (
            <View style={styles.card} key={product.id}>
              <Image source={product.image} style={styles.productImage} />
              <Text style={styles.categoryText}>{product.category}</Text>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(product.name)}
              >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer Component */}
      <Footer /> {/* Removed `style` prop */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.m3SysLightOnPrimary,
  },
  contentContainer: {
    paddingBottom: 150, // Ensure scrolling above footer
  },
  carouselContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  bannerContainer: {
    width: "95%",
    height: 200, // Fixed height for banner
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2, // Reduced opacity for shadow
    shadowRadius: 10,
    elevation: 5, // For Android shadow effect
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
  },
  activeDot: {
    backgroundColor: "rgb(0, 0, 0)", // RGB for black
    borderColor: "rgb(0, 0, 0)", // Border black for active dot
  },
  inactiveDot: {
    backgroundColor: "rgb(255, 255, 255)", // RGB for white
    borderColor: "rgb(0, 0, 0)", // Black border for inactive dot
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: "45%",
    height: 230,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 2,
    marginHorizontal: 8,
    marginTop: 30,
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 11,
    color: "red",
    marginTop: 4,
    textAlign: "center",
  },
  productName: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 3,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
  },
  addToCartButton: {
    backgroundColor: "rgb(230, 112, 112)", // RGB color for button
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 10,
    width: 90,
    height: 20,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 11,
    textAlign: "center",
  },
});

export default Watches;
