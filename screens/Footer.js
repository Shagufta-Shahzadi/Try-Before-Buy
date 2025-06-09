import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Check if a tab is active
  const isTabActive = (tabName) => {
    if (tabName === "Home") return route.name === "Home";
    if (tabName === "AIChat") return route.name === "AIChat"; // Changed to new AIChat component
    if (tabName === "Camera") return route.name === "CameraWithCategorie1";
    if (tabName === "Cart") return route.name === "AddtoCart";
    if (tabName === "Profile") 
      return route.name === "UserProfile" || route.name === "ECommerceSettings";
    return false;
  };

  // Get icon color based on active state
  const getIconColor = (tabName) => {
    return isTabActive(tabName) ? "#4a86f7" : "#666666";
  };

  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
        {/* Home Button */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("Home")}
        >
          <View style={styles.iconContainer}>
            <Icon
              name={isTabActive("Home") ? "home" : "home-outline"}
              size={24}
              color={getIconColor("Home")}
            />
          </View>
        </TouchableOpacity>

        {/* AI Chat Button - Updated to navigate to new AIChat screen */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("AIWelcomeScreen")}
        >
          <View style={styles.iconContainer}>
            <Icon
              name={isTabActive("AIChat") ? "chatbubble" : "chatbubble-outline"}
              size={24}
              color={getIconColor("AIChat")}
            />
          </View>
        </TouchableOpacity>

        {/* Camera Button */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("CameraWithCategorie1")}
        >
          <View style={styles.scanContainer}>
            <Icon
              name="scan-outline"
              size={24}
              color="#FFFFFF"
            />
          </View>
        </TouchableOpacity>

        {/* Cart Button */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("AddtoCart")}
        >
          <View style={styles.iconContainer}>
            <Icon
              name={isTabActive("Cart") ? "cart" : "cart-outline"}
              size={24}
              color={getIconColor("Cart")}
            />
          </View>
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("UserProfile")}
        >
          <View style={styles.iconContainer}>
            <Icon
              name={isTabActive("Profile") ? "person" : "person-outline"}
              size={24}
              color={getIconColor("Profile")}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    width: "100%",
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingBottom: 5,
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
    paddingTop: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scanContainer: {
    backgroundColor: "#4a86f7",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4a86f7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  }
});

export default Footer;