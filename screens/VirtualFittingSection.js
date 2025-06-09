import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, Easing } from 'react-native';

const VirtualFittingSection = () => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const titleSlideAnim = useRef(new Animated.Value(-50)).current;
  const imageScaleAnim = useRef(new Animated.Value(0.8)).current;
  const buttonBounceAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      // Fade in the entire container
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      
      // Slide in the title
      Animated.timing(titleSlideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.7)),
        useNativeDriver: true,
      }),
      
      // Scale up the image
      Animated.timing(imageScaleAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      
      // Bounce the buttons
      Animated.sequence([
        Animated.delay(600),
        Animated.spring(buttonBounceAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  // Button press animations
  const onPressIn = (buttonRef) => {
    Animated.spring(buttonRef, {
      toValue: 0.95,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = (buttonRef) => {
    Animated.spring(buttonRef, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Individual button animation refs
  const demoButtonScale = useRef(new Animated.Value(1)).current;
  const howItWorksButtonScale = useRef(new Animated.Value(1)).current;

  // Animation styles
  const containerStyle = {
    opacity: fadeAnim,
  };

  const titleStyle = {
    transform: [
      { translateX: titleSlideAnim },
    ],
  };

  const imageStyle = {
    transform: [
      { scale: imageScaleAnim },
    ],
  };

  const buttonsContainerStyle = {
    transform: [
      { translateY: buttonBounceAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
      })},
    ],
    opacity: buttonBounceAnim,
  };

  const demoButtonStyle = {
    transform: [{ scale: demoButtonScale }],
  };

  const howItWorksButtonStyle = {
    transform: [{ scale: howItWorksButtonScale }],
  };

  return (
    <Animated.View style={[styles.virtualFittingContainer, containerStyle]}>
      <Animated.Text style={[styles.virtualFittingHeading, titleStyle]}>
        <Text style={styles.virtualFittingYour}>Your</Text>
        <Text style={styles.virtualFittingFit}>Fit</Text>
      </Animated.Text>
      
      <Animated.Text style={[styles.virtualFittingDescription, { opacity: fadeAnim }]}>
        Shopping is finally easier with a personalized virtual fitting room! Turn shoppers into buyers with the ultimate virtual fitting experience that combines virtual try-on and size recommendation in one simple tap.
      </Animated.Text>
      
      <Animated.View style={imageStyle}>
        <Image
          source={require('../assets/GifTryOn.gif')}
          style={styles.virtualFittingImage}
        />
      </Animated.View>
      
      <Animated.View style={[styles.virtualFittingButtons, buttonsContainerStyle]}>
        <TouchableOpacity 
          style={styles.demoButton}
          onPressIn={() => onPressIn(demoButtonScale)}
          onPressOut={() => onPressOut(demoButtonScale)}
          activeOpacity={0.8}
        >
          <Animated.View style={demoButtonStyle}>
            <Text style={styles.demoButtonText}>Try a Demo</Text>
          </Animated.View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.howItWorksButton}
          onPressIn={() => onPressIn(howItWorksButtonScale)}
          onPressOut={() => onPressOut(howItWorksButtonScale)}
          activeOpacity={0.8}
        >
          <Animated.View style={howItWorksButtonStyle}>
            <Text style={styles.howItWorksButtonText}>How It Works</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  virtualFittingContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'rgb(247, 248, 248)',
    borderRadius: 15,
    paddingVertical: 20,
    // Add shadow for more depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  virtualFittingHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  virtualFittingYour: {
    color: 'rgb(0, 0, 0)',
  },
  virtualFittingFit: {
    color: 'rgb(178, 45, 255)',
  },
  virtualFittingDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: 'rgb(85, 85, 85)',
    marginBottom: 20,
    lineHeight: 20,
  },
  virtualFittingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -40,
  },
  demoButton: {
    backgroundColor: 'rgb(228, 105, 105)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    width: 150,
    height: 35,
    justifyContent: 'center',
    // Add shadow for 3D effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  demoButtonText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  howItWorksButton: {
    borderColor: 'rgb(241, 155, 155)',
    borderWidth: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    width: 150,
    height: 35,
    justifyContent: 'center',
  },
  howItWorksButtonText: {
    color: 'rgb(88, 88, 88)',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  virtualFittingImage: {
    marginTop: -80,
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
});

export default VirtualFittingSection;