import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Header from "./HeaderNavigation";
import Footer from "./Footer";
import { MaterialIcons } from "@expo/vector-icons"; // For heart icon
import { Color } from "../GlobalStyles"; // Ensure GlobalStyles file is set correctly

const Kids = () => {
  const [selectedCategory, setSelectedCategory] = useState("Glasses"); // Default category set to "Glasses"

  const [productList, setProductList] = useState([
    // Glasses
    { id: "1", category: "Kids Glasses", name: "Ray-Ban Classic", price: "$120.00", image: require("../assets/G1.png"), liked: false },
    { id: "2", category: "Kids Glasses", name: "Oakley Modern", price: "$150.00", image: require("../assets/G2.png"), liked: false },
    { id: "3", category: "Kids Glasses", name: "Gucci Round", price: "$200.00", image: require("../assets/G4.png"), liked: false },
    { id: "4", category: "Kids Glasses", name: "Tom Ford Chic", price: "$180.00", image: require("../assets/G6.png"), liked: false },
    // Watches
    { id: "5", category: "Kids Watches", name: "Rolex Submariner", price: "$5,000.00", image: require("../assets/W1.png"), liked: false },
    { id: "6", category: "Kids Watches", name: "Casio Edifice", price: "$250.00", image: require("../assets/W2.png"), liked: false },
    { id: "7", category: "Kids Watches", name: "Seiko Sports", price: "$300.00", image: require("../assets/W2.png"), liked: false },
    { id: "8", category: "Kids Watches", name: "Omega Speedmaster", price: "$6,000.00", image: require("../assets/W2.png"), liked: false },
    // Hats
    { id: "9", category: "Kids Hats", name: "Baseball Cap", price: "$25.00", image: require("../assets/Hats.png"), liked: false },
    { id: "10", category: "Kids Hats", name: "Fedora Hat", price: "$50.00", image: require("../assets/Hats.png"), liked: false },
    { id: "11", category: "Kids Hats", name: "Cowboy Hat", price: "$60.00", image: require("../assets/Hats.png"), liked: false },
    { id: "12", category: "Kids Hats", name: "Beret Hat", price: "$40.00", image: require("../assets/Hats.png"), liked: false },
  ]);

  const toggleFavorite = (id) => {
    const updatedProducts = productList.map((product) =>
      product.id === id ? { ...product, liked: !product.liked } : product
    );
    setProductList(updatedProducts);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleBackPress = () => {
    console.log("Back button pressed");
  };

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Header onBackPress={handleBackPress} />

      {/* Main Content with ScrollView */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Banner Section */}
        <View style={styles.bannerContainer}>
          <Image
            source={require("../assets/kids banner.jpg")} // Update with your banner image path
            style={styles.bannerImage}
          />
        </View>

        {/* Buttons for Categories */}
        <View style={styles.buttonsContainer}>
          {["Glasses", "Watches", "Hats"].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category ? styles.selectedButton : styles.nonSelectedButton,
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text
                style={selectedCategory === category ? styles.selectedText : styles.nonSelectedText}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Product List */}
        <View style={styles.row}>
          {productList
            .filter((item) =>
              selectedCategory
                ? item.category.toLowerCase().includes(selectedCategory.toLowerCase())
                : true
            )
            .map((item) => (
              <View style={styles.card} key={item.id}>
                <Image source={item.image} style={styles.productImage} />
                <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(item.id)}>
                  <MaterialIcons
                    name={item.liked ? "favorite" : "favorite-border"}
                    size={20}
                    color={item.liked ? "red" : "gray"}
                  />
                </TouchableOpacity>
                <Text style={styles.categoryText}>{item.category}</Text>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => alert(`Added ${item.name} to cart`)}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>

      {/* Footer Component */}
      <Footer style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.m3SysLightOnPrimary,
  },
  contentContainer: {
    paddingBottom: 20,
  },
   // Scroll View Content
   contentContainer: {
    paddingBottom: 150,
   },
  bannerContainer: {
    width: 373,
    height: 200,
    marginTop: 10,
    left: 6,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: "rgb(228, 105, 105)",
    borderRadius: 25,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 5,
    width: 70,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "rgb(228, 105, 105)",
    borderRadius: 25,
    width: 100,
    height: 25,
  },
  nonSelectedButton: {
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "rgb(0, 0, 0)",
    width: 100,
    height: 25,
  },
  selectedText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  nonSelectedText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
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
    marginTop: 15,
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
  },
  heartIcon: {
    position: "absolute",
    top: 8,
    right: 8,
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
  priceRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  productPrice: {
    fontSize: 13,
    color: "#333",
  },
  addToCartButton: {
    backgroundColor: "rgb(230, 112, 112)",
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
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
  },
});

export default Kids;
