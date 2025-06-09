import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ProductData from "../data/ProductData"; // Import the ProductData

// Import the images directly
import G1 from "../assets/G1.png";
import G2 from "../assets/G2.png";
import G4 from "../assets/G4.png";
import G6 from "../assets/G6.png";
import W1 from "../assets/W1.png";
import W2 from "../assets/W2.png";
import Hats from "../assets/Hats.png";

const CameraWithAccessories = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  // Removed showAccessories state
  const [sidebarView, setSidebarView] = useState("main"); // "main", "subcategories", "products"
  
  // Main categories
  const categories = [
    { id: '1', name: 'men', displayName: 'Men', image: global.categoryImages?.men || require('../assets/Men.jpg') },
    { id: '2', name: 'women', displayName: 'Women', image: global.categoryImages?.women || require('../assets/Female.jpg') },
    { id: '3', name: 'kids', displayName: 'Kids', image: global.categoryImages?.kids || require('../assets/Kids.png') },
  ];
  
  // Get subcategories for the selected category with proper icons
  const getSubCategories = () => {
    const products = ProductData[selectedCategory] || [];
    const types = [...new Set(products.map(item => {
      // Extract type from category (e.g., "Men's Glasses" -> "Glasses")
      const categoryParts = item.category.split("'s ");
      return categoryParts.length > 1 ? categoryParts[1] : categoryParts[0];
    }))];
    
    return types.map(type => {
      // Get appropriate icon and image for each type
      let icon, image;
      
      if (type === 'Glasses') {
        icon = 'glasses-outline';
        image = G1;
      } else if (type === 'Watches') {
        icon = 'time-outline';
        image = W1;
      } else if (type === 'Hats') {
        icon = 'shirt-outline';
        image = Hats;
      } else {
        icon = 'pricetag-outline';
        image = null;
      }
      
      return {
        id: type.toLowerCase(),
        name: type,
        icon,
        image
      };
    });
  };
  
  // Filter products by subcategory
  const getFilteredProducts = () => {
    if (!selectedSubCategory) return [];
    return (ProductData[selectedCategory] || []).filter(
      item => item.category.includes(selectedSubCategory)
    );
  };

  // Handle main category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSidebarView("subcategories");
    setSelectedSubCategory(null);
  };
  
  // Handle subcategory selection
  const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSidebarView("products");
  };
  
  // Go back to subcategories view
  const handleBackToSubCategories = () => {
    setSidebarView("subcategories");
  };
  
  // Go back to main categories view
  const handleBackToCategories = () => {
    setSidebarView("main");
  };
  
  // Handle product selection
  const handleProductSelect = (product) => {
    setSelectedAccessory(product);
    Alert.alert("Product Selected", `Trying on ${product.name}`);
  };

  const handleClose = () => {
    // कैमरा संबंधित कोई भी स्टेट रीसेट करें (यदि आवश्यक हो)
    setSelectedCategory("men");
    setSelectedSubCategory(null);
    setSelectedAccessory(null);
    setSidebarView("main");
    
    // पिछले पेज पर वापस जाएं
    navigation.goBack();
  };

  const handleAddToCart = () => {
    if (selectedAccessory) {
      Alert.alert("Success", `${selectedAccessory.name} added to cart!`);
    } else {
      Alert.alert("Note", "Please select an item first");
    }
  };

  const handleDownload = () => {
    Alert.alert("Download", "Image is downloading...");
  };

  const handleSave = () => {
    Alert.alert("Save", "Image has been saved!");
  };
  
  // Removed toggleAccessoryTray function

  // Reset to appropriate view when category changes
  useEffect(() => {
    if (sidebarView === "products") {
      setSidebarView("subcategories");
    }
  }, [selectedCategory]);

  // Get icon for subcategory
  const getSubCategoryIcon = (subCategory) => {
    if (subCategory === "Glasses") return "glasses-outline";
    if (subCategory === "Watches") return "time-outline";
    if (subCategory === "Hats") return "shirt-outline";
    return "pricetag-outline";
  };

  // Get dynamic sidebar style based on current view
  const getSidebarStyle = () => {
    // Base style for all views - keeping height consistent
    return {
      position: "absolute",
      right: 0,
      width: 80,
      height: 400, // Fixed height for all views
      top: "50%",
      marginTop: -200,
      backgroundColor: "rgba(128, 128, 128, 0.7)",
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
      paddingVertical: 15,
      alignItems: "center",
      justifyContent: sidebarView === "main" ? "space-around" : "flex-start",
      zIndex: 5,
    };
  };

  // Render sidebar content based on current view
  const renderSidebarContent = () => {
    if (sidebarView === "main") {
      // Main categories view
      return categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryButton,
            selectedCategory === category.name && styles.selectedCategory,
          ]}
          onPress={() => handleCategorySelect(category.name)}
        >
          <View style={styles.categoryImageContainer}>
            <Image 
              source={category.image} 
              style={[
                styles.categoryImage,
                selectedCategory === category.name && styles.selectedCategoryImage
              ]} 
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.name && styles.selectedCategoryText,
              ]}
            >
              {category.displayName}
            </Text>
          </View>
        </TouchableOpacity>
      ));
    } else if (sidebarView === "subcategories") {
      // Subcategories view with images
      return (
        <>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackToCategories}
          >
            <Icon name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          
          <ScrollView style={styles.subCategoryScroll} showsVerticalScrollIndicator={false}>
            {getSubCategories().map((subCategory) => (
              <TouchableOpacity
                key={subCategory.id}
                style={[
                  styles.categoryButton,
                  selectedSubCategory === subCategory.name && styles.selectedCategory,
                ]}
                onPress={() => handleSubCategorySelect(subCategory.name)}
              >
                <View style={styles.categoryImageContainer}>
                  {subCategory.image ? (
                    <Image 
                      source={subCategory.image} 
                      style={[
                        styles.categoryImage,
                        selectedSubCategory === subCategory.name && styles.selectedCategoryImage
                      ]} 
                    />
                  ) : (
                    <View 
                      style={[
                        styles.categoryImage,
                        selectedSubCategory === subCategory.name && styles.selectedCategoryImage
                      ]}
                    >
                      <Icon 
                        name={subCategory.icon} 
                        size={28} 
                        color={selectedSubCategory === subCategory.name ? "rgb(228, 105, 105)" : "#fff"} 
                      />
                    </View>
                  )}
                  <Text
                    style={[
                      styles.categoryText,
                      selectedSubCategory === subCategory.name && styles.selectedCategoryText,
                    ]}
                  >
                    {subCategory.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      );
    } else if (sidebarView === "products") {
      // Products view - limit visible items with scrolling
      return (
        <>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackToSubCategories}
          >
            <Icon name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          
          <ScrollView 
            style={styles.subCategoryScroll} 
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.productsScrollContent}
          >
            {getFilteredProducts().map((product) => (
              <TouchableOpacity
                key={product.id}
                style={[
                  styles.categoryButton,
                  selectedAccessory?.id === product.id && styles.selectedCategory,
                ]}
                onPress={() => handleProductSelect(product)}
              >
                <View style={styles.categoryImageContainer}>
                  <Image 
                    source={product.image} 
                    style={[
                      styles.categoryImage,
                      selectedAccessory?.id === product.id && styles.selectedCategoryImage
                    ]} 
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      selectedAccessory?.id === product.id && styles.selectedCategoryText,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {product.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      );
    }
  };

  return (
    <View style={styles.cameraWithCategorie}>
      {/* Camera Placeholder */}
      <View style={styles.cameraPlaceholder}>
        <Icon name="camera" size={50} color="#888" />
        <Text style={styles.cameraText}>AR Camera Preview</Text>
        {selectedAccessory && (
          <Text style={styles.accessoryText}>
            Trying on: {selectedAccessory.name} - {selectedAccessory.price}
          </Text>
        )}
      </View>

      {/* Close Button */}
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Icon name="close" size={24} color="#fff" />
      </TouchableOpacity>
      
      {/* Camera Capture Button */}
      <TouchableOpacity 
        style={styles.captureButton} 
        onPress={() => Alert.alert("Captured", "Image captured!")}
      >
        <View style={styles.captureInnerCircle}>
          <Icon name="camera-outline" size={24} color="#fff" />
        </View>
      </TouchableOpacity>

      {/* Left Side - Add to Cart Button */}
      <TouchableOpacity style={styles.leftActionButton} onPress={handleAddToCart}>
        <Icon name="cart-outline" size={22} color="#fff" />
        <Text style={styles.actionButtonText}>Add to Cart</Text>
      </TouchableOpacity>
      
      {/* Right Side - Download and Save Buttons */}
      <View style={styles.rightActionButtons}>
        <TouchableOpacity style={styles.iconButton} onPress={handleDownload}>
          <Icon name="cloud-download-outline" size={24} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={handleSave}>
          <Icon name="bookmark-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Right Sidebar with Categories/Subcategories/Products - Dynamic Height */}
      <View style={getSidebarStyle()}>
        {renderSidebarContent()}
      </View>
    </View>
  );
};

const styles = {
  cameraWithCategorie: {
    backgroundColor: "#000",
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  cameraText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  accessoryText: {
    color: "rgb(228, 105, 105)",
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  // Removed toggleButton style
  captureButton: {
    position: "absolute",
    bottom: 110,
    left: "50%",
    marginLeft: -35,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 11,
    borderWidth: 3,
    borderColor: "#fff",
  },
  captureInnerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgb(228, 105, 105)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  leftActionButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    zIndex: 10,
  },
  actionButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  rightActionButtons: {
    position: "absolute",
    bottom: 30,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
    gap: 10,
  },
  // Remove the static sidebar style since we're using dynamic styles
  sidebar: null,
  // Main category styles
  categoryButton: {
    width: 70,
    alignItems: "center",
    marginVertical: 5,
  },
  categoryImageContainer: {
    alignItems: "center",
  },
  categoryImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  selectedCategoryImage: {
    borderColor: "rgb(228, 105, 105)",
    borderWidth: 2,
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 5,
  },
  selectedCategoryText: {
    fontWeight: "bold",
    color: "rgb(228, 105, 105)",
  },
  
  // Subcategory styles
  backButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginBottom: 5,
  },
  subCategoryScroll: {
    width: "100%",
    flex: 1,
  },
  productsScrollContent: {
    paddingBottom: 10,
  },
  
  // Accessory Type selector (keeping this for compatibility)
  accessoryTypeContainer: {
    position: "absolute",
    top: 100,
    left: 20,
    flexDirection: "column",
    zIndex: 10,
    gap: 10,
  },
  accessoryTypeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    gap: 8,
  },
  selectedAccessoryType: {
    borderColor: "rgb(228, 105, 105)",
    backgroundColor: "rgba(228, 105, 105, 0.2)",
  },
  accessoryTypeText: {
    color: "#fff",
    fontSize: 14,
  },
  selectedAccessoryTypeText: {
    color: "rgb(228, 105, 105)",
    fontWeight: "bold",
  },
  
  // Accessory items tray (keeping this for compatibility)
  accessoryTray: {
    position: "absolute",
    bottom: 180,
    left: 10,
    right: 90,
    height: 110,
    zIndex: 10,
  },
  accessoryItem: {
    width: 90,
    height: 110,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#555",
  },
  selectedAccessoryItem: {
    borderColor: "rgb(228, 105, 105)",
    borderWidth: 2,
    backgroundColor: "rgba(228, 105, 105, 0.2)",
  },
  accessoryImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginBottom: 5,
    resizeMode: "contain",
  },
  accessoryItemText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
  accessoryItemPrice: {
    color: "rgb(228, 105, 105)",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 2,
  },
};

export default CameraWithAccessories;