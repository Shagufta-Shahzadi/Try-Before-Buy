import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "./HeaderNavigation";
import Footer from "./Footer";
import ProductList from "../Components/ProductList"; // Import ProductList component
import ProductData from "../data/ProductData"; // Import ProductData

const Men = () => {
  const [selectedCategory, setSelectedCategory] = useState("Men's Glasses");
  const [cart, setCart] = useState([]); // Cart State
  const navigation = useNavigation();

  // Get Men's products from ProductData
  const menProducts = ProductData.men;

  // Filter products based on selected category
  const filteredProducts = menProducts.filter((product) => product.category === selectedCategory);

  // Add to Cart Function
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Navigate to Product Detail when a product is clicked
  const navigateToProductDetail = (product) => {
    navigation.navigate("ProductDetail", { productId: product.id });
  };

  return (
    <View style={styles.container}>
      {/* Header Component with Cart Count */}
      <Header cartCount={cart.length} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <Image source={require("../assets/Men b1.png")} style={styles.bannerImage} />
        </View>

        {/* Buttons for Categories */}
        <View style={styles.buttonsContainer}>
          {["Men's Glasses", "Men's Watches", "Men's Hats"].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category ? styles.selectedButton : styles.nonSelectedButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={selectedCategory === category ? styles.selectedText : styles.nonSelectedText}>
                {category.replace("Men's ", "")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Product List Component - Displays Filtered Products */}
        <ProductList 
          data={filteredProducts} 
          addToCart={addToCart} 
          navigateToDetail={navigateToProductDetail} // Pass navigate function to ProductList
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

export default Men;