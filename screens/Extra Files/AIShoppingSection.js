import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AIShoppingSection = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ImageBackground
        source={require("../assets/Untitled design (7).png")}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Revolutionize Your Shopping Experience with AI-Powered Assistant</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AIRecommendation")}
          >
            <Text style={styles.buttonText}>Discover</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: 250,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.46)",
  },
  textContainer: {
    position: "absolute",
    left: 70,
    top: "30%",
    width: "60%",
  },
  heading: {
    fontSize: 18,
    color:  "rgb(255, 230, 8)",
    fontWeight: "bold",
    textAlign:"center"
  },
    button: {
      backgroundColor: "rgba(255, 255, 255, 0)",
      paddingVertical: 3,
      paddingHorizontal: 30,
      marginTop: 10,
      borderRadius: 20,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
      alignSelf: "center",
      width: 125,
      borderColor: "rgb(255, 255, 255)",
      borderWidth: 1
    },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default AIShoppingSection;
