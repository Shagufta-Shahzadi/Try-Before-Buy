import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ProductScreen = () => {
  // Sample product data
  const products = [
    { id: "1", category: "Men's Glasses", name: "Ray-Ban Classic", price: "$120.00", image: require("../assets/G1.png"), liked: false },
    { id: "2", category: "Men's Glasses", name: "Oakley Modern", price: "$150.00", image: require("../assets/G1.png"), liked: false },
    { id: "3", category: "Men's Glasses", name: "Gucci Round", price: "$200.00", image: require("../assets/G1.png"), liked: false },
    { id: "4", category: "Men's Glasses", name: "Tom Ford Chic", price: "$180.00", image: require("../assets/G1.png"), liked: false },
  ];

  // State to handle favorite toggling
  const [productList, setProductList] = useState(products);

  const toggleFavorite = (id) => {
    const updatedProducts = productList.map((product) =>
      product.id === id ? { ...product, liked: !product.liked } : product
    );
    setProductList(updatedProducts);
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.innerContainer} style={styles.scrollView}>
        <View style={styles.row}>
          {productList.map((item) => (
            <View style={styles.card} key={item.id}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(item.id)}>
                <MaterialIcons
                  name={item.liked ? 'favorite' : 'favorite-border'}
                  size={20}
                  color={item.liked ? 'red' : 'gray'}
                />
              </TouchableOpacity>
              <Text style={styles.categoryText}>{item.category}</Text>
              <Text style={styles.productName}>{item.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => alert(`Added ${item.name} to cart`)}
              >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    height: 900, // Fixed height for scrollable container
  },
  innerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap items for grid-like layout
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    width: '45%',
    height: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 2,
    position: 'relative',
    marginHorizontal: 9,
    marginTop: 20,
  },
  productImage: {
    width: '110%',
    height: 130,
    resizeMode: 'cover',
    borderRadius: 5,
    top: -5,
    left: -7,
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  categoryText: {
    fontSize: 11,
    color: 'gray',
    marginTop: 4,
  },
  productName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 3,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 13,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: 'rgb(230, 112, 112)', // Button color
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 10,
    width: 100,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ProductScreen;
