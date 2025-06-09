import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ThankYouScreen = ({ navigation }) => {
  const handleHomePress = () => {
    navigation.navigate('Home'); // Adjust 'Home' to your route name
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.thanksText}>Thanks!</Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.iconContainer}>
          <Icon name="check-circle" size={80} color="#001F54" />
        </View>
        <Text style={styles.messageText}>Thank you for purchasing.</Text>
        <Text style={styles.subMessageText}>
          Your order will be shipped in 2 to 4 international days.
        </Text>

        {/* Home Button */}
        <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
          <Icon name="home" size={20} color="#fff" style={styles.homeIcon} />
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F54',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  thanksText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
    top:130
  },
  bottomSection: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    marginTop:200
  },
  iconContainer: {
    backgroundColor: '#EAF0F6',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001F54',
    marginBottom: 10,
  },
  subMessageText: {
    fontSize: 14,
    color: '#7A869A',
    textAlign: 'center',
    marginBottom: 30,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2', // Pink color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  homeIcon: {
    marginRight: 10,
  },
});

export default ThankYouScreen;
