import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ProductCart = () => {
  // Sample product data
  const products = [
    { id: '1', category: "Men's shoes", name: 'Nike Air VaporMax Evo', price: '$300.00', image: 'https://via.placeholder.com/150', liked: false },
    { id: '2', category: "Women's shoes", name: 'Nike Air VaporMax Evo', price: '$300.00', image: 'https://via.placeholder.com/150', liked: false },
    { id: '3', category: 'Nike Air Huarache', name: 'Nike Air Huarache', price: '$250.00', image: 'https://via.placeholder.com/150', liked: false },
    { id: '4', category: "Men's shoes", name: 'Nike Air VaporMax Evo', price: '$350.00', image: 'https://via.placeholder.com/150', liked: false },
    { id: '5', category: 'Nike Air Huarache', name: 'Nike Air Huarache', price: '$250.00', image: 'https://via.placeholder.com/150', liked: false },
    { id: '6', category: "Men's shoes", name: 'Nike Air ZoomX', price: '$280.00', image: 'https://via.placeholder.com/150', liked: false },
  ];

  // State to handle favorite toggling
  const [productList, setProductList] = useState(products);

  const toggleFavorite = (id) => {
    const updatedProducts = productList.map((product) =>
      product.id === id ? { ...product, liked: !product.liked } : product
    );
    setProductList(updatedProducts);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.categoryText}>{item.category}</Text>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.heartIcon} onPress={() => toggleFavorite(item.id)}>
        <AntDesign name={item.liked ? 'heart' : 'hearto'} size={20} color={item.liked ? 'red' : 'gray'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2} // Grid layout
        columnWrapperStyle={styles.row} // Add spacing between columns
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '48%', // Adjusted for grid spacing
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ProductCart;
