import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For the heart icon

const products = [
  {
    id: '1',
    name: 'CURREN B362GL',
    price: '$18.99',
    image: require('../assets/11.jpg'), // Add your image paths
  },
  {
    id: '2',
    name: 'CURREN B372GL',
    price: '$20.99',
    image: require('../assets/11.jpg'),
  },
  {
    id: '3',
    name: 'Skmei 1654W',
    price: '$19.99',
    image: require('../assets/11.jpg'),
  },
  {
    id: '4',
    name: 'OQG S394/201',
    price: '$20.99',
    image: require('../assets/11.jpg'),
  },
];

const ProductDisplay = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Inner Container for Products */}
      <View style={styles.innerContainer}>
        {/* Product Grid */}
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <View style={styles.productActions}>
                {/* Heart Icon (favorite) */}
                <TouchableOpacity style={styles.favoriteButton}>
                  <Icon name="heart-outline" size={15} color="black" />
                </TouchableOpacity>
                {/* Add to Cart Button */}
                <TouchableOpacity style={styles.addToCartButton}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          numColumns={2} // 2 products per row
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(250, 241, 241)',
    padding: 20,
    top: 30,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'rgb(250, 241, 241)', // Background for the product grid container
    borderRadius: 8,
    paddingBottom: 20,
    height: 1000,
    top: -30,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff', // Changed to white
    margin: 8, // Reduced margin for smaller container
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
    alignItems: 'center',
    paddingBottom: 8, // Reduced padding bottom
    top: 30,
    height: 205,
    // Shadow properties
    shadowColor: 'rgb(0, 0, 0)', // Black shadow
    shadowOpacity: 0.3, // Increased shadow opacity
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: 110, // Reduced image size
    height: 110, // Reduced image size
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 14, // Reduced font size
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  productPrice: {
    fontSize: 12, // Reduced font size
    color: '#777',
    marginVertical: 4,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12, // Reduced padding
  },
  favoriteButton: {
    width: 25,
    height: 25,
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 50, // Circular button
    borderWidth: 1,
    borderColor: 'rgb(189, 168, 168)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4.5,
    paddingHorizontal: 4,
    top: 10,
  },
  addToCartButton: {
    backgroundColor: 'rgb(228, 105, 105)',
    borderRadius: 10,
    paddingVertical: 1,
    paddingHorizontal: 13,
    height: 25,
    width: 90,
    top: 8,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12, // Smaller text size
    marginTop: 3,
  },
});

export default ProductDisplay;
