import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // For back icon
import Footer from "./Footer"; // Import Footer component

const OrderDisplayScreen = ({ route, navigation }) => {
  // Safely access route params with default values
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    streetAddress: "",
    city: "",
    paymentMethod: null,
  });

  // Extract product and quantity from route params safely
  useEffect(() => {
    if (route?.params?.product) {
      setProductData(route.params.product);
      setQuantity(route.params.quantity || 1);
    } else {
      // Handle the case when product data is not provided
      console.warn("No product data provided in route parameters");
      // You could navigate back or show an error message
    }
    setLoading(false);
  }, [route?.params]);

  const handleInputChange = (key, value) => {
    setUserDetails({ ...userDetails, [key]: value });
  };

  const handlePlaceOrder = () => {
    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.phone ||
      !userDetails.email ||
      !userDetails.streetAddress ||
      !userDetails.city ||
      !userDetails.paymentMethod
    ) {
      Alert.alert("Error", "Please fill all required fields and select a payment method.");
      return;
    }
    Alert.alert("Success", "Order Placed Successfully!");
  };

  const handlePaymentMethodSelect = (method) => {
    setUserDetails({ ...userDetails, paymentMethod: method });
  };

  // Show loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Loading order details...</Text>
      </View>
    );
  }

  // Show error state if no product data
  if (!productData) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>No product information available</Text>
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
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Display</Text>
        </View>

        {/* Product Details */}
        <View style={styles.productContainer}>
          {/* Product image with fallback to a colored placeholder */}
          {productData.image ? (
            <Image 
              source={
                typeof productData.image === 'string' 
                  ? { uri: productData.image } 
                  : productData.image
              } 
              style={styles.productImage}
            />
          ) : (
            <View style={[styles.productImage, styles.placeholderImage]}>
              <Text style={styles.placeholderText}>{productData.name?.charAt(0) || "P"}</Text>
            </View>
          )}
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{productData.name}</Text>
            <Text style={styles.productPrice}>
              ${typeof productData.price === 'number' 
                ? productData.price.toFixed(2) 
                : parseFloat(productData.price.replace(/[^0-9.-]+/g, "")).toFixed(2)}
            </Text>
            <Text style={styles.productDescription}>{productData.description}</Text>
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Quantity</Text>
            <Text style={styles.summaryValue}>{quantity}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              ${calculateSubtotal(productData.price, quantity)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>
              ${calculateSubtotal(productData.price, quantity)}
            </Text>
          </View>
        </View>

        {/* User Information Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name *"
            value={userDetails.firstName}
            onChangeText={(text) => handleInputChange("firstName", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name *"
            value={userDetails.lastName}
            onChangeText={(text) => handleInputChange("lastName", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone *"
            keyboardType="phone-pad"
            value={userDetails.phone}
            onChangeText={(text) => handleInputChange("phone", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email *"
            keyboardType="email-address"
            value={userDetails.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Street Address *"
            value={userDetails.streetAddress}
            onChangeText={(text) => handleInputChange("streetAddress", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="City *"
            value={userDetails.city}
            onChangeText={(text) => handleInputChange("city", text)}
          />

          {/* Payment Method Section */}
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethodContainer}>
            <TouchableOpacity
              style={[
                styles.paymentMethodButton,
                userDetails.paymentMethod === 'creditCard' && styles.selectedPaymentMethod
              ]}
              onPress={() => handlePaymentMethodSelect('creditCard')}
            >
              <Icon name="card-outline" size={24} color={userDetails.paymentMethod === 'creditCard' ? "#fff" : "#4A90E2"} />
              <Text style={[
                styles.paymentMethodText,
                userDetails.paymentMethod === 'creditCard' && styles.selectedPaymentMethodText
              ]}>Credit Card</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.paymentMethodButton,
                userDetails.paymentMethod === 'cashOnDelivery' && styles.selectedPaymentMethod
              ]}
              onPress={() => handlePaymentMethodSelect('cashOnDelivery')}
            >
              <Icon name="cash-outline" size={24} color={userDetails.paymentMethod === 'cashOnDelivery' ? "#fff" : "#4A90E2"} />
              <Text style={[
                styles.paymentMethodText,
                userDetails.paymentMethod === 'cashOnDelivery' && styles.selectedPaymentMethodText
              ]}>Cash on Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Order Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handlePlaceOrder}>
          <Text style={styles.confirmButtonText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
};

// Helper function to calculate subtotal
const calculateSubtotal = (price, quantity) => {
  // Handle price that might be a string with currency symbol
  let numPrice;
  if (typeof price === 'number') {
    numPrice = price;
  } else {
    numPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
  }
  
  return (numPrice * quantity).toFixed(2);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    marginTop: 15,
    backgroundColor: "#4A90E2",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: 80, // Add padding to accommodate the footer
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    padding: 10,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  productContainer: {
    alignItems: "center",
    padding: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  placeholderImage: {
    backgroundColor: "#e1e1e1",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  productDetails: {
    alignItems: "center",
    marginTop: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    color: "#4A90E2",
    marginVertical: 5,
  },
  productDescription: {
    fontSize: 14,
    color: "#000",
  },
  summaryContainer: {
    padding: 15,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#555",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
  },
  formContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  paymentMethodButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 5,
  },
  selectedPaymentMethod: {
    backgroundColor: "#4A90E2",
  },
  paymentMethodText: {
    marginLeft: 8,
    color: "#4A90E2",
    fontWeight: "500",
  },
  selectedPaymentMethodText: {
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderDisplayScreen;