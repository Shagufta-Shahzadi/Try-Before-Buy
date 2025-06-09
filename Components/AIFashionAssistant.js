import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AIFashionAssistant = () => {
  const navigation = useNavigation();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  // Button press animations
  const onPressIn = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 0.95,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <ImageBackground
        source={require('../assets/Untitled design (7).png')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <Animated.View 
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim.interpolate({
                inputRange: [0, 50],
                outputRange: [0, 30]
              })}]
            }
          ]}
        >
          <Text style={styles.heading}>AI Fashion Assistant</Text>
          <Text style={styles.description}>Get personalized fashion recommendations with our AI-powered assistant</Text>
          <TouchableOpacity
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("AIChat")}  // Changed from "AIRecommendation" to "AIChat"
            activeOpacity={0.8}
          >
            <Animated.View 
              style={[
                styles.button,
                {
                  transform: [{ scale: buttonScaleAnim }]
                }
              ]}
            >
              <Text style={styles.buttonText}>Try Now</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
        
        {/* Add a subtle pulsing glow effect */}
        <Animated.View
          style={[
            styles.glowEffect,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5]
              })
            }
          ]}
        />
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginHorizontal: 15,
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  textContainer: {
    position: 'absolute',
    left: 70,
    top: '30%',
    width: '60%',
  },
  heading: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    alignSelf: 'center',
    overflow: 'hidden',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  glowEffect: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    top: '40%',
    left: '20%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    blurRadius: 20,
  },
});

export default AIFashionAssistant;