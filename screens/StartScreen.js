import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

const StartScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('NextScreen'); // Replace with your next screen route
  };

  return (
    <ImageBackground
      source={require('../assets/33.jpg')} // Replace with your image path
      style={styles.container}
      resizeMode="cover"
    >
      {/* Floating Shapes */}
      <View style={styles.shapesContainer}>
        <View style={[styles.shape, styles.star]} />
        <View style={[styles.shape, styles.circle]} />
        <View style={[styles.shape, styles.triangle]} />
      </View>

      {/* Centered Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}> 
          <Image source={require('../assets/26.jpg')} style={styles.logo} /> {/* Logo import */}
        </View>
        <Text style={styles.tagline}>Try before buy</Text>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.32)', // Semi-transparent black overlay
  },
  shapesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  shape: {
    position: 'absolute',
    opacity: 0.5,
  },
  star: {
    top: 50,
    left: 100,
    width: 40,
    height: 40,
    backgroundColor: '#FFD700',
    borderRadius: 10,
  },
  circle: {
    top: 150,
    right: 80,
    width: 30,
    height: 30,
    backgroundColor: '#FFC0CB',
    borderRadius: 15,
  },
  triangle: {
    bottom: 200,
    left: 50,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#00FFFF',
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 2,
    top:-50
  },
  logoWrapper: {
    width: 150, // Adjust logo size as needed
    height: 150, // Adjust logo size as needed
    borderRadius: 75, // Making the container round
    overflow: 'hidden', // To make sure the logo fits inside the round container
    borderWidth: 5,
    borderColor: '#fff', // Optional: border color for the logo container
    marginBottom: 10, // Space between the logo and the tagline
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  tagline: {
    fontSize: 24, // Increased font size for "Try before buy"
    fontWeight: 'bold', // Making it bold
    color: 'rgb(89, 0, 255)',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'rgb(228, 106, 126)',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    position: 'absolute',
    bottom: 270, // Moved the button slightly higher
    zIndex: 2,
    
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default StartScreen;
