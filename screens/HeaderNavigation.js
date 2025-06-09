import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ cartCount = 0 }) => {
  const navigation = useNavigation();

  const handleSearchPress = () => {
    alert("Search button clicked! Implement search functionality here.");
  };

  return (
    <>
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
      <View style={styles.header}>
        {/* Back button instead of menu */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.menuButton}
        >
          <Icon name="arrow-back" size={28} color="#fff" style={styles.menuIcon} />
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleSearchPress}>
            <Icon name="search-outline" size={16} color="#fff" style={styles.searchIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#fff"
          />
        </View>

        {/* Cart Icon with Badge */}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("AddtoCart")}>
          <Icon name="cart-outline" size={22} color="#fff" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartCount}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Notifications Icon */}
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="notifications-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4A90E2",
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 90,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    top: -12,
  },
  menuButton: {
    padding: 5,
    marginTop: 16,
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcon: {
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    flex: 1.2,
    marginHorizontal: 5,
    marginLeft: 10,
    paddingHorizontal: 10,
    height: 30,
    top: 13,
  },
  searchIcon: {
    marginRight: 5,
    color: "#fff",
    fontSize: 16,
  },
  searchInput: {
    fontSize: 14,
    color: "#fff",
    paddingVertical: 2,
    height: 25,
  },
  iconButton: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    top: 13,
  },
  cartBadge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  cartCount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Header;