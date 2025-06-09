import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // For arrow icon
import { Color, FontFamily, Border, FontSize, Padding } from "../GlobalStyles";
import Cart from "./Cart";

const Catageory = () => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  // Function to handle button press and update selected category
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.catageory}>
      {/* Arrow and "Categories" Text */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.arrowContainer}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.categoriesText}>Categories</Text>
      </View>

      {/* Buttons for Mens, Womens, Kids */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Mens" ? styles.selectedButton : styles.nonSelectedButton,
          ]}
          onPress={() => handleCategorySelect("Mens")}
        >
          <Text
            style={selectedCategory === "Mens" ? styles.selectedText : styles.nonSelectedText}
          >
            Mens
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Womens" ? styles.selectedButton : styles.nonSelectedButton,
          ]}
          onPress={() => handleCategorySelect("Womens")}
        >
          <Text
            style={selectedCategory === "Womens" ? styles.selectedText : styles.nonSelectedText}
          >
            Womens
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === "Kids" ? styles.selectedButton : styles.nonSelectedButton,
          ]}
          onPress={() => handleCategorySelect("Kids")}
        >
          <Text
            style={selectedCategory === "Kids" ? styles.selectedText : styles.nonSelectedText}
          >
            Kids
          </Text>
        </TouchableOpacity>
      </View>
      <Cart/>
    </View>
  );
};

const styles = StyleSheet.create({
  catageory: {
    flex: 1,
    backgroundColor: Color.m3SysLightOnPrimary,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 15,
  },
  arrowContainer: {
    position: 'absolute',
    left: 25, // Positioning arrow to the left
    top: 15,
  },
  categoriesText: {
    fontSize: 22,
    fontWeight: "600",
    color: Color.colorBlack,
    textAlign: 'center',
    marginTop: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: "rgb(245, 141, 141)", // Pink color for selected button
    borderColor: "rgb(211, 144, 144)",  // Border color for selected button
    height:42,
    borderRadius:15
  },
  nonSelectedButton: {
    backgroundColor: "rgba(219, 219, 223, 0.32)",
    borderWidth: 1,
    borderColor: "rgba(219, 219, 223, 0.88)",
    height:42,
    borderRadius:15
  },
  selectedText: {
    color: "white", // Text color for selected button
    marginTop: -5,
  },
  nonSelectedText: {
    color: "black", // Text color for non-selected button
    marginTop: -5,
  },
});

export default Catageory;
