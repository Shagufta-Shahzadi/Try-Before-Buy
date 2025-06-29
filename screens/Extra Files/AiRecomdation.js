import React, { useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AIWelcomeScreen = ({ navigation }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const robotYAnim = useRef(new Animated.Value(0)).current;
  const robotOpacityAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(0.95)).current;
  
  // Start animations on component mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(400),
        Animated.parallel([
          Animated.timing(robotOpacityAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();
    
    // Add floating animation for robot
    Animated.loop(
      Animated.sequence([
        Animated.timing(robotYAnim, {
          toValue: -10,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(robotYAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  // Handle button press animation
  const handleButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('AIUnifiedScreen');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        backgroundColor="#4169E1" 
        barStyle="light-content" 
      />
      <LinearGradient
        colors={['#E6F0FF', '#C8E0FF']}
        style={styles.gradientBackground}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.appTitle}>Try On Fashion</Text>
          
          <Animated.View 
            style={[
              styles.welcomeTextContainer,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideUpAnim },
                  { scale: scaleAnim }
                ]
              }
            ]}
          >
            <Text style={styles.welcomeTitle}>Welcome to AI Style Assistant</Text>
            <Text style={styles.welcomeSubtitle}>
              I'll help you find the perfect accessories that match your style and preferences.
            </Text>
          </Animated.View>
          
          <Animated.View
            style={[
              styles.robotImageWrapper,
              {
                opacity: robotOpacityAnim,
                transform: [
                  { translateY: robotYAnim }
                ]
              }
            ]}
          >
            <Image
              source={require('../assets/chatbot.png')}
              style={styles.robotImage}
              resizeMode="contain"
            />
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.startButtonContainer,
              {
                transform: [{ scale: buttonScaleAnim }]
              }
            ]}
          >
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleButtonPress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4169E1', '#1E90FF']}
                style={styles.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.startButtonText}>Get Started</Text>
                <Icon name="arrow-forward" size={20} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4169E1',
    marginBottom: 20,
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  robotImageWrapper: {
    marginBottom: 40,
  },
  robotImage: {
    width: 160,
    height: 160,
  },
  startButtonContainer: {
    width: '80%',
  },
  startButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default AIWelcomeScreen;