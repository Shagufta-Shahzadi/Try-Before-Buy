import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet, StatusBar } from "react-native";

// Importing your screens
import Home from "./Home";
import ShoppingCart from "./ShoppingCart";
import CameraWithCategorie1 from "./CameraWithCategorie1";
import Support from "./Support";
import UserProfile from "./UserProfile";

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <>
      {/* Set the status bar to light-content for white color */}
      <StatusBar barStyle="light-content" hidden={false} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Shopping Cart") {
              iconName = focused ? "cart" : "cart-outline";
            } else if (route.name === "Camera") {
              iconName = focused ? "camera" : "camera-outline";
            } else if (route.name === "Support") {
              iconName = focused ? "help-circle" : "help-circle-outline";
            } else if (route.name === "User Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#4A90E2",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          headerShown: false, // This hides the header
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Shopping Cart" component={ShoppingCart} />
        <Tab.Screen name="Camera" component={CameraWithCategorie1} />
        <Tab.Screen name="Support" component={Support} />
        <Tab.Screen name="User Profile" component={UserProfile} />
      </Tab.Navigator>
    </>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  tabBar: {
    backgroundColor: "#202B40",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 60,
    borderTopWidth: 0,
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
