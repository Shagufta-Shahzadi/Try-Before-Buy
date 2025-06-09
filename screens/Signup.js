import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing from MaterialIcons
import { useNavigation } from '@react-navigation/native'; // For navigation

export default function SignupScreen() {
  const [isRememberMe, setIsRememberMe] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  const handleSignUp = () => {
    navigation.navigate('Home'); // Navigate to Home page
  };

  const toggleRememberMe = () => {
    setIsRememberMe(!isRememberMe);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="rgb(85, 85, 85)" />
      </TouchableOpacity>

      {/* Header with Image and Overlay */}
      <ImageBackground
        source={require('../assets/Login.jpg')} // Replace with your image path
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <View style={styles.overlay} />
      </ImageBackground>

      {/* Card Section */}
      <View style={styles.card}>
        <Text style={styles.registerWithText}>Register with</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              style={styles.icon}
              source={require('../assets/logos_facebook.png')} // Replace with your Facebook icon path
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              style={styles.icon}
              source={require('../assets/apple icon.png')} // Replace with your Apple icon path
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              style={styles.icon}
              source={require('../assets/google.png')} // Replace with your Google icon path
            />
          </TouchableOpacity>
        </View>

        {/* OR with lines */}
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput style={styles.input} placeholder="Enter your name" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter your email" keyboardType="email-address" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry={true} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry={true}
          />
        </View>

        {/* Remember Me Option */}
        <View style={styles.rememberMeContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isRememberMe && styles.checkboxChecked]}
            onPress={toggleRememberMe}
          >
            {isRememberMe && (
              <Icon name="check" size={18} color="rgb(255, 255, 255)" /> // Tick icon from MaterialIcons
            )}
          </TouchableOpacity>
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </View>

        {/* Signup Button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245, 245, 245)', // Light gray background
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust for the status bar height
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background
    borderRadius: 20,
    padding: 8,
    elevation: 2,
  },
  header: {
    width: '100%',
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden', // Ensures image respects the border radius
    top: 25,
  },
  headerImage: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.36)', // Semi-transparent white overlay
  },
  card: {
    width: '90%',
    backgroundColor: 'rgb(255, 255, 255)', // White background
    borderRadius: 20,
    padding: 20,
    top: -80,
    shadowColor: 'rgb(0, 0, 0)', // Black shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  registerWithText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'rgb(85, 85, 85)', // Dark gray
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
    backgroundColor: 'rgb(245, 245, 245)', // Light gray
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgb(221, 221, 221)', // Light gray
  },
  orText: {
    marginHorizontal: 10,
    color: 'rgb(153, 153, 153)', // Gray
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: 'rgb(85, 85, 85)', // Dark gray
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: 'rgb(221, 221, 221)', // Light gray
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgb(249, 249, 249)', // Very light gray
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'rgb(0, 0, 0)', // Black
    borderRadius: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'rgb(0, 0, 0)', // Black
  },
  rememberMeText: {
    color: 'rgb(85, 85, 85)', // Dark gray
    fontSize: 14,
  },
  signupButton: {
    backgroundColor: 'rgb(197, 158, 255)', // Light purple
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  signupText: {
    color: 'rgb(255, 255, 255)', // White
    fontWeight: 'bold',
    fontSize: 16,
  },
});
