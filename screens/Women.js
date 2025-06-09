import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import Header from "./HeaderNavigation"; // Importing the Header component
import Footer from "./Footer"; // Importing the Footer component
import ProductList from "../Components/ProductList"; // Importing the reusable ProductList component
import ProductData from "../data/ProductData"; // Importing Product Data
import { useNavigation } from "@react-navigation/native"; // Navigation hook

const Women = () => {
  const [selectedCategory, setSelectedCategory] = useState("Women's Glasses");
  const [cart, setCart] = useState([]);
  
  const navigation = useNavigation(); // Use navigation to navigate to product detail

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const navigateToProductDetail = (product) => {
    navigation.navigate("ProductDetail", { productId: product.id }); // Navigate to the ProductDetail page
  };

  return (
    <View style={styles.container}>
      {/* Header Component with Cart Count */}
      <Header cartCount={cart.length} />

      {/* Main Content with ScrollView */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <Image source={require("../assets/Women b1.png")} style={styles.bannerImage} />
        </View>

        {/* Category Selection */}
        <View style={styles.buttonsContainer}>
          {["Glasses", "Watches", "Hats"].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === `Women's ${category}` ? styles.selectedButton : styles.nonSelectedButton,
              ]}
              onPress={() => handleCategorySelect(`Women's ${category}`)}
            >
              <Text
                style={selectedCategory === `Women's ${category}` ? styles.selectedText : styles.nonSelectedText}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Product List - Filters based on the selected category */}
        <ProductList
          data={ProductData.women.filter(item => item.category === selectedCategory)}
          addToCart={addToCart}
          navigateToDetail={navigateToProductDetail} // Pass the navigation function to ProductList
        />
      </ScrollView>

      {/* Button to Navigate to Add to Cart Page */}
      <TouchableOpacity
        style={styles.goToCartButton}
        onPress={() => navigation.navigate("AddtoCart", { cart })}
      >
        <Text style={styles.goToCartButtonText}>Go to Cart ({cart.length})</Text>
      </TouchableOpacity>

      {/* Footer Component */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingBottom: 80, // Increased padding for smooth scrolling
  },
  bannerContainer: {
    width: "100%",
    height: 200,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: "#E46969",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 2,
    marginHorizontal: 10,
    width: 100,
  },
  selectedButton: {
    backgroundColor: "#E46969",
  },
  nonSelectedButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#000",
  },
  selectedText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  nonSelectedText: {
    color: "#000",
    textAlign: "center",
  },
  goToCartButton: {
    position: "absolute",
    bottom: 20,
    left: "20%",
    right: "20%",
    backgroundColor: "#E46969",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    elevation: 3,
  },
  goToCartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Women;