import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentSuccessful = ({ navigation }) => {
  // Navigate to order details screen
  const handleViewDetails = () => {
    if (navigation) {
      navigation.navigate('OrderDetails'); // Adjust the route name to match your navigation setup
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="check-circle" size={100} color="#4caf50" />
      </View>
      <Text style={styles.successText}>Payment Successful!</Text>
      <Text style={styles.thankYouText}>Thank you for your purchase.</Text>

      <TouchableOpacity style={styles.detailsButton} onPress={handleViewDetails}>
        <Text style={styles.detailsButtonText}>View  Order Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  thankYouText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  detailsButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PaymentSuccessful;
