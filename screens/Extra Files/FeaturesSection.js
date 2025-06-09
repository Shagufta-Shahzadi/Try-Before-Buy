import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Fast & Free Delivery",
      icon: require("../assets/free delivery.jpg"), // Replace with the correct path
    },
    {
      id: 2,
      title: "Secure Payment",
      icon: require("../assets/secure payment.png"), // Replace with the correct path
    },
    {
      id: 3,
      title: "Money Back Guarantee",
      icon: require("../assets/money back.png"), // Replace with the correct path
    },
    {
      id: 4,
      title: "Online Support",
      icon: require("../assets/online support.webp"), // Replace with the correct path
    },
  ];

  return (
    <View style={styles.featuresContainer}>
      {features.map((feature) => (
        <View key={feature.id} style={styles.featureCard}>
          <Image source={feature.icon} style={styles.featureIcon} />
          <Text style={styles.featureTitle}>{feature.title}</Text>
          <Text style={styles.featureDescription}>{feature.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    padding: 15,
    backgroundColor: "rgb(250, 250, 250)", // Light background
    borderRadius: 15,
  },
  featureCard: {
    alignItems: "center",
    width: "23%", // Adjusted width to fit 4 items
  },
  featureIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "rgb(33, 33, 33)", // Dark text
    textAlign: "center",
  },
});

export default FeaturesSection;
