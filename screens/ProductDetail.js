import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProductDetailData from "../data/ProductDetailData"; // Import your product detail data
import Footer from "./Footer";

const { width: screenWidth } = Dimensions.get("window"); // Get device screen width for responsive sizing

const ProductDetail = ({ route, navigation }) => {
  // Add default value to handle undefined route.params
  const productId = route?.params?.productId || null;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Find product data based on productId
  useEffect(() => {
    if (productId) {
      const selectedProduct = ProductDetailData.find((item) => item.id === productId);
      setProduct(selectedProduct || null);
    } else {
      // Handle case when productId is not provided
      console.warn("No productId provided. Showing default product or fallback.");
      // You could set a default product or keep it null
      setProduct(ProductDetailData[0] || null); // Optional: Show first product as default
    }
    setLoading(false);
  }, [productId]);

  // Handle quantity increment and decrement
  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handle Add to Cart button press
  const handleAddToCart = () => {
    if (product) {
      // Logic to add product to the cart (You can use a global state or context here)
      alert(`${product.name} added to cart!`);
    }
  };

  // Handle Buy Now button press
  const handleBuyNow = () => {
    if (product) {
      navigation.navigate("OrderDisplayScreen", { product, quantity });
    }
  };

  // Show loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Loading product...</Text>
      </View>
    );
  }

  // Show not found message if product is null
  if (!product) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Product not found</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={product.image} 
            style={styles.productImage} 
            resizeMode="cover" 
          />
        </View>

        {/* AR Try-On Button */}
        <TouchableOpacity style={styles.arButton}>
          <Text style={styles.arButtonText}>AR Try-On</Text>
        </TouchableOpacity>

        {/* Product Information */}
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.name}</Text>
            <TouchableOpacity style={styles.priceButton}>
              <Text style={styles.priceButtonText}>{product.price}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Quantity Section */}
          <View style={styles.quantityRow}>
            <Text style={styles.quantityTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange("decrement")}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange("increment")}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Buttons: Add to Cart & Buy Now */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
              <Icon name="cart-outline" size={18} color="#fff" />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
              <Text style={styles.buyNowText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(248, 227, 227)",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    marginTop: 15,
    backgroundColor: "rgb(74, 144, 226)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    height: 300, // Reduced height of the image container
    backgroundColor: "rgba(240, 233, 233, 0.45)",
  },
  productImage: {
    width: screenWidth - 20, // Reduce width, 40px padding on each side
    height: 340, // Reduced height of the image
    borderRadius: 10, // Optionally, you can keep the rounded corners
    left: 10,
    top: 15,
  },
  arButton: {
    position: "absolute",
    top: 300,
    left: "68%",
    backgroundColor: "rgb(65, 155, 216)",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgb(101, 85, 143)",
  },
  arButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: 130,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  priceButton: {
    backgroundColor: "rgb(101, 85, 143)",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  priceButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  rating: {
    fontSize: 14,
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 10,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  quantityTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  quantityButton: {
    backgroundColor: "rgb(231, 196, 196)",
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(74, 144, 226)",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    height: 35,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  buyNowButton: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    borderRadius: 25,
    flex: 1,
    borderWidth: 1.5,
    borderColor: "rgb(74, 144, 226)",
    alignItems: "center",
    height: 35,
  },
  buyNowText: {
    color: "rgb(0, 0, 0)",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetail;