import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

// Get device dimensions
const { width, height } = Dimensions.get("window");

const StartScreen = () => {
  const navigation = useNavigation();

  // Animation - Fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500, // Animation duration 1.5 sec
      useNativeDriver: true,
    }).start();
  }, []);

  // Handlers
  const handleLoginPress = () => {
    navigation.navigate("LOGIN"); // Navigate to Login
  };

  const handleSignUpPress = () => {
    navigation.navigate("Signup"); // Navigate to Sign-Up
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground
        source={require("../assets/Picture1.png")} // Replace with your background image
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* White Gradient Overlay */}
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0)", // Transparent at the top
            "rgba(255, 255, 255, 0.9)", // Semi-transparent in the middle
            "rgb(255, 255, 255)", // Solid white at the bottom
          ]}
          style={styles.gradientOverlay}
        />

        {/* Animated View (Content with Fade-in Effect) */}
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Title */}
          <Text style={styles.title}>Try Before Buy</Text>
          <Text style={styles.subtitle}>Shop Smarter – Test Before You Invest.</Text>

          {/* Login & Sign-up Buttons */}
          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Login to Your Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
            <Text style={styles.buttonText}>Sign Up to Your Account</Text>
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)", // White background
  },
  backgroundImage: {
    flex: 1,
    width: width, // Full screen width
    height: 570, // Full screen height
    justifyContent: "flex-end", // Push content to the bottom
  },
  gradientOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    paddingHorizontal: "5%", // Dynamic padding
    paddingBottom: height * 0.05, // 5% of screen height
    alignItems: "center",
    top: 20,
  },
  title: {
    fontSize: width * 0.08, // Dynamic font size (8% of screen width)
    fontWeight: "bold",
    color: "rgb(75, 0, 130)", // RGB Purple
    marginBottom: height * 0.01, // Spacing based on height
    textAlign: "center",
  },
  subtitle: {
    fontSize: width * 0.045, // 4.5% of screen width
    color: "rgb(102, 102, 102)", // RGB Gray
    marginBottom: height * 0.03, // Dynamic spacing
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(252, 252, 252)", // White background
    paddingVertical: 5, // Button height
    width: "100%", // Full width
    borderRadius: 30,
    marginBottom: height * 0.02, // Dynamic margin
    justifyContent: "center", // Center text
    shadowColor: "rgb(0, 0, 0)", // Black shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    height: 40,
    borderWidth: 0.3,
  },
  buttonText: {
    fontSize: 14, // Font size
    color: "rgb(51, 51, 51)", // Dark gray text
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default StartScreen;
