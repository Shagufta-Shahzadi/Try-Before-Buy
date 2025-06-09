import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // For icons
import Footer from "./Footer"; // Import Footer component

const Checkout = ({ navigation }) => {
  // Example product data
  const product = {
    name: "Elegant Hijab",
    price: 25.0,
    quantity: 2,
    image: "https://via.placeholder.com/300",
    shippingFee: 5.0,
    paymentMethod: "Cash on Delivery", // Example payment method
  };

  // Example user details
  const userDetails = {
    name: "Sarah Khan",
    mobile: "+92 300 1234567",
    email: "sarah@example.com",
    address: "Street #10, Gulberg, Lahore",
    deliveryAddress: "House #24, DHA Phase 6, Lahore",
  };

  const subtotal = product.price * product.quantity;
  const total = subtotal + product.shippingFee;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Checkout</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          {/* Product Details */}
          <View style={styles.productContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>
              Price: ${product.price.toFixed(2)}
            </Text>
            <Text style={styles.productQuantity}>
              Quantity: {product.quantity}
            </Text>
          </View>

          {/* Summary Section */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping Fee</Text>
              <Text style={styles.summaryValue}>
                ${product.shippingFee.toFixed(2)}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { fontWeight: "bold" }]}>
                Total
              </Text>
              <Text style={[styles.summaryValue, { fontWeight: "bold" }]}>
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Payment Method */}
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentTitle}>Payment Method</Text>
            <View style={styles.paymentMethodContainer}>
              <Text style={styles.paymentMethodText}>
                {product.paymentMethod}
              </Text>
              <Icon name="checkmark-circle" size={24} color="#4A90E2" />
            </View>
          </View>

          {/* User Details Section */}
          <View style={styles.userDetailsContainer}>
            <Text style={styles.userDetailsTitle}>User Details</Text>

            {/* User Name */}
            <View style={styles.userDetailItem}>
              <Text style={styles.userDetailHeading}>Name</Text>
              <Text style={styles.userDetailValue}>{userDetails.name}</Text>
            </View>

            {/* Mobile Number */}
            <View style={styles.userDetailItem}>
              <Text style={styles.userDetailHeading}>Mobile</Text>
              <Text style={styles.userDetailValue}>{userDetails.mobile}</Text>
            </View>

            {/* Email */}
            <View style={styles.userDetailItem}>
              <Text style={styles.userDetailHeading}>Email</Text>
              <Text style={styles.userDetailValue}>{userDetails.email}</Text>
            </View>

            {/* Address */}
            <View style={styles.userDetailItem}>
              <Text style={styles.userDetailHeading}>Address</Text>
              <Text style={styles.userDetailValue}>{userDetails.address}</Text>
            </View>

            {/* Delivery Address */}
            <View style={styles.userDetailItem}>
              <Text style={styles.userDetailHeading}>Delivery Address</Text>
              <Text style={styles.userDetailValue}>
                {userDetails.deliveryAddress}
              </Text>
            </View>
          </View>

          {/* Confirm Order Button */}
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 20,
    top:20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  mainContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    top:20,
  },
  productContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  productQuantity: {
    fontSize: 14,
    color: "#555",
  },
  summaryContainer: {
    marginBottom: 20,
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
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  paymentContainer: {
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  paymentMethodContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  paymentMethodText: {
    fontSize: 14,
    color: "#555",
  },
  userDetailsContainer: {
    marginBottom: 20,
  },
  userDetailsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  userDetailItem: {
    marginBottom: 15,
  },
  userDetailHeading: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
    marginBottom: 5,
  },
  userDetailValue: {
    fontSize: 14,
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Checkout;
