import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  TouchableWithoutFeedback,
  Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Custom Grid Component with enhanced pattern
const GridBackground = () => {
  const gridLines = [];
  const cellSize = 40; // Slightly larger for more elegance
  
  // Create horizontal lines with varied opacity for depth
  for (let i = 0; i <= Math.ceil(height / cellSize); i++) {
    const opacity = i % 3 === 0 ? 0.3 : 0.15;
    gridLines.push(
      <View 
        key={`h-${i}`} 
        style={[
          styles.gridLine,
          { 
            width: width * 1.5, 
            height: i % 3 === 0 ? 1.5 : 0.8, // Varied thickness
            top: i * cellSize,
            opacity: opacity
          }
        ]} 
      />
    );
  }
  
  // Create vertical lines with varied opacity
  for (let i = 0; i <= Math.ceil(width / cellSize); i++) {
    const opacity = i % 3 === 0 ? 0.3 : 0.15;
    gridLines.push(
      <View 
        key={`v-${i}`} 
        style={[
          styles.gridLine,
          { 
            width: i % 3 === 0 ? 1.5 : 0.8, // Varied thickness
            height: height * 1.5,
            left: i * cellSize,
            opacity: opacity
          }
        ]} 
      />
    );
  }
  
  return <View style={styles.gridContainer}>{gridLines}</View>;
};

// Fashion logo component with more elegant design
const LogoComponent = () => {
  return (
    <View style={styles.logoComponentContainer}>
      <LinearGradient
        colors={['#3465d9', '#5283e4']}
        style={styles.logoCircle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.logoText}>TB</Text>
      </LinearGradient>
    </View>
  );
};

// Enhanced avatar components for different products
const ProductAvatar = ({ emoji, position, delay }) => {
  return (
    <Animatable.View 
      style={[styles.avatarContainer, position]}
      animation="fadeIn"
      delay={delay}
      duration={1200}
    >
      <LinearGradient
        colors={['#3465d9', '#5283e4']}
        style={styles.avatarGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.avatarInner}>
          <Text style={styles.avatarText}>{emoji}</Text>
        </View>
      </LinearGradient>
    </Animatable.View>
  );
};

// Enhanced scanline component
const ScanLine = ({ animValue }) => {
  return (
    <Animated.View
      style={[
        styles.scanBeam,
        {
          opacity: animValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.8, 0.3, 0.8]
          }),
          transform: [
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-height * 0.5, height * 0.5]
              })
            }
          ]
        }
      ]}
    />
  );
};

// Progress indicator component
const ProgressIndicator = ({ progress }) => {
  return (
    <View style={styles.progressContainer}>
      <Animated.View 
        style={[
          styles.progressBar,
          {
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%']
            })
          }
        ]}
      />
    </View>
  );
};

const SplashScreen = () => {
  const navigation = useNavigation();
  const [loadingText, setLoadingText] = useState('Initializing...');
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const shineAnim = useRef(new Animated.Value(-width)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const circleScale = useRef(new Animated.Value(0)).current;
  const circleFade = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scanAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  // AR Animation refs
  const arRingScale = useRef(new Animated.Value(0.3)).current;
  const arRingOpacity = useRef(new Animated.Value(0)).current;

  // Particles for enhanced visual effect
  const particles = Array(15).fill().map(() => ({
    anim: new Animated.ValueXY({ 
      x: Math.random() * width, 
      y: Math.random() * height 
    }),
    opacity: new Animated.Value(0),
    size: Math.random() * 5 + 2,
  }));

  // Loading text animation
  useEffect(() => {
    const loadingTexts = [
      'Initializing...',
      'Loading AR assets...',
      'Calibrating product scanner...',
      'Preparing virtual try-on...',
      'Almost ready...'
    ];
    
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingTexts.length;
      setLoadingText(loadingTexts[currentIndex]);
    }, 2000);
    
    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    // Extended and enhanced animation sequence
    Animated.parallel([
      // Background fade in with slow easing
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1800,
        easing: Easing.bezier(0.23, 1, 0.32, 1), // Smoother cubic bezier
        useNativeDriver: true,
      }),
      
      // Logo animation sequence with more elegant timing
      Animated.sequence([
        // Scale up with subtle bounce
        Animated.spring(logoScale, {
          toValue: 1.08,
          friction: 6,
          tension: 30,
          useNativeDriver: true,
        }),
        // Scale to normal with gentle easing
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 500,
          easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
          useNativeDriver: true,
        })
      ]),
      
      // Enhanced 3D rotation effect for logo
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 2200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }),
      
      // Text fade in with more sophisticated movement
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 1400,
        delay: 800,
        easing: Easing.bezier(0.23, 1, 0.32, 1),
        useNativeDriver: true,
      }),
      
      // AR Ring animation with elegant timing
      Animated.sequence([
        Animated.delay(800),
        Animated.parallel([
          Animated.timing(arRingScale, {
            toValue: 1,
            duration: 1800,
            easing: Easing.bezier(0.23, 1, 0.32, 1),
            useNativeDriver: true,
          }),
          Animated.timing(arRingOpacity, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          })
        ])
      ]),
      
      // Progress bar animation
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 13000, // Almost full duration of splash screen
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: false,
      })
    ]).start();

    // Enhanced AR scanning animation
    Animated.loop(
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
        useNativeDriver: true,
      })
    ).start();

    // More natural floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2500,
          easing: Easing.bezier(0.42, 0, 0.58, 1),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2500,
          easing: Easing.bezier(0.42, 0, 0.58, 1),
          useNativeDriver: true, 
        })
      ])
    ).start();

    // More subtle pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          easing: Easing.bezier(0.42, 0, 0.58, 1),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.bezier(0.42, 0, 0.58, 1),
          useNativeDriver: true, 
        })
      ])
    ).start();

    // Enhanced shine effect animation
    Animated.loop(
      Animated.timing(shineAnim, {
        toValue: width * 1.5,
        duration: 6000,
        delay: 1500,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
        useNativeDriver: true,
      }),
      { iterations: -1 }
    ).start();

    // Enhanced expanding circle effect
    const pulseCircle = () => {
      circleScale.setValue(0);
      circleFade.setValue(0.7);
      
      Animated.parallel([
        Animated.timing(circleScale, {
          toValue: 2.8,
          duration: 4500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }),
        Animated.timing(circleFade, {
          toValue: 0,
          duration: 4500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        })
      ]).start(() => pulseCircle());
    };
    
    pulseCircle();
    
    // Enhanced particles animation
    particles.forEach((particle, index) => {
      particle.anim.setValue({ 
        x: Math.random() * width, 
        y: Math.random() * height 
      });
      
      particle.opacity.setValue(0);
      
      // Staggered start for each particle
      setTimeout(() => {
        // Fade in with elegant timing
        Animated.timing(particle.opacity, {
          toValue: Math.random() * 0.3 + 0.1, // Varied opacity for depth
          duration: 2000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        }).start();
        
        // Enhanced floating movement
        Animated.loop(
          Animated.sequence([
            Animated.timing(particle.anim, {
              toValue: { 
                x: Math.random() * width, 
                y: Math.random() * height 
              },
              duration: 18000 + (Math.random() * 12000),
              easing: Easing.bezier(0.42, 0, 0.58, 1),
              useNativeDriver: true,
            }),
            Animated.timing(particle.anim, {
              toValue: { 
                x: Math.random() * width, 
                y: Math.random() * height 
              },
              duration: 18000 + (Math.random() * 12000),
              easing: Easing.bezier(0.42, 0, 0.58, 1),
              useNativeDriver: true,
            })
          ])
        ).start();
      }, index * 100);
    });

    // Extended timer - navigate to Home1 after 15 seconds
    const timer = setTimeout(() => {
      navigation.replace('Home1');
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  // Handle manual skip by tapping
  const handleSkip = () => {
    navigation.replace('Home1');
  };

  return (
    <TouchableWithoutFeedback onPress={handleSkip}>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        
        {/* Enhanced luxury gradient background - changed to blue tones */}
        <Animated.View style={[styles.background, { opacity: fadeAnim }]}>
          <LinearGradient
            colors={['#0a1b33', '#1e2a4f', '#2a3a6c']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </Animated.View>
        
        {/* Enhanced 3D Grid effect */}
        <Animated.View 
          style={[
            styles.gridContainer,
            {
              opacity: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5]
              })
            }
          ]}
        >
          <GridBackground />
        </Animated.View>
        
        {/* Scan lines */}
        <ScanLine animValue={scanAnim} />
        
        {/* Enhanced luxury particles */}
        {particles.map((particle, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                width: particle.size,
                height: particle.size,
                borderRadius: particle.size / 2,
                opacity: particle.opacity,
                transform: [
                  { translateX: particle.anim.x },
                  { translateY: particle.anim.y }
                ]
              }
            ]}
          />
        ))}
        
        {/* Product avatars - positioned in parallel layout around the TB logo */}
        {/* Top Row */}
        <ProductAvatar 
          emoji="👓" // Glasses
          position={{ top: height * 0.2, left: width * 0.2 }} 
          delay={1500} 
        />
        <ProductAvatar 
          emoji="👗" // Clothes
          position={{ top: height * 0.2, right: width * 0.2 }} 
          delay={1700} 
        />
        
        {/* Bottom Row */}
        <ProductAvatar 
          emoji="⌚" // Watches
          position={{ bottom: height * 0.25, left: width * 0.2 }} 
          delay={1900} 
        />
        <ProductAvatar 
          emoji="👒" // Hats
          position={{ bottom: height * 0.25, right: width * 0.2 }} 
          delay={2100} 
        />
        
       {/* Small AR rings in background */}
<Animated.View
  style={[
    styles.smallArRingContainer1,
    {
      opacity: arRingOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.6]
      }),
      transform: [{ scale: arRingScale.interpolate({
        inputRange: [0, 1],
        outputRange: [0.7, 1]
      })}]
    }
  ]}
>
  <View style={styles.smallArRingOuter}>
    <View style={styles.smallArRingInner} />
  </View>
</Animated.View>

<Animated.View
  style={[
    styles.smallArRingContainer2,
    {
      opacity: arRingOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0.2, 0.5]
      }),
      transform: [{ scale: arRingScale.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 0.9]
      })}]
    }
  ]}
>
  <View style={styles.smallArRingOuter}>
    <View style={styles.smallArRingInner} />
  </View>
</Animated.View>

{/* Add more by duplicating and changing positions */}
        
        {/* Enhanced AR Target markers */}
        <Animatable.View 
          style={styles.arMarker1}
          animation="fadeIn" 
          delay={1800}
          duration={1000}
        >
          <View style={styles.arMarkerDot} />
        </Animatable.View>
        
        <Animatable.View 
          style={styles.arMarker2}
          animation="fadeIn" 
          delay={2000}
          duration={1000}
        >
          <View style={styles.arMarkerDot} />
        </Animatable.View>
        
        <Animatable.View 
          style={styles.arMarker3}
          animation="fadeIn" 
          delay={2200}
          duration={1000}
        >
          <View style={styles.arMarkerDot} />
        </Animatable.View>
        
        {/* Enhanced pulsing circle */}
        <Animated.View 
          style={[
            styles.pulsingCircle,
            {
              opacity: circleFade,
              transform: [{ scale: circleScale }]
            }
          ]}
        />
        
        {/* Enhanced logo container with 3D animations */}
        <Animated.View 
          style={[
            styles.logoContainer,
            styles.logoShadow,
            {
              transform: [
                { scale: logoScale },
                { 
                  rotateY: logoRotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['35deg', '0deg']
                  })
                },
                {
                  translateY: floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10]
                  })
                }
              ]
            }
          ]}
        >
          <Animated.View 
            style={[
              styles.logoInner,
              {
                transform: [{ scale: pulseAnim }]
              }
            ]}
          >
            <LogoComponent />
            
            {/* Enhanced shine effect */}
            <Animated.View 
              style={[
                styles.shine,
                {
                  transform: [{ translateX: shineAnim }]
                }
              ]}
            />
          </Animated.View>
        </Animated.View>

        {/* Enhanced App Title and Tagline */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textAnim,
              transform: [
                {
                  translateY: textAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={styles.title}>TryBeforeBuy</Text>
          <Text style={styles.subtitle}>Virtual Try-On Experience</Text>
        </Animated.View>
        
        {/* Enhanced AR Badge */}
        <Animated.View
          style={[
            styles.arBadge,
            {
              opacity: textAnim,
              transform: [
                {
                  scale: textAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 1.2, 1]
                  })
                }
              ]
            }
          ]}
        >
          <View style={styles.arGlow} />
          <LinearGradient
            colors={['#3465d9', '#5283e4']}
            style={styles.arBadgeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.arText}>AR</Text>
          </LinearGradient>
        </Animated.View>
        
        {/* Enhanced loading indicator */}
        <Animatable.View 
          style={styles.loadingContainer}
          animation="fadeIn"
          delay={1200}
          duration={1000}
        >
          <Text style={styles.loadingText}>{loadingText}</Text>
          <ProgressIndicator progress={progressAnim} />
        </Animatable.View>
        
        {/* Enhanced tap hint with elegant animation */}
        <Animatable.Text 
          style={styles.tapHint}
          animation="fadeIn"
          delay={3000}
          duration={1200}
        >
          Tap to experience virtual try-on
        </Animatable.Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1b33',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(82, 131, 228, 0.3)',
  },
  scanBeam: {
    position: 'absolute',
    width: width * 1.2,
    height: 2,
    backgroundColor: '#5283e4',
    shadowColor: '#5283e4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    left: -width * 0.1,
  },
  particle: {
    position: 'absolute',
    backgroundColor: '#5283e4',
    shadowColor: '#5283e4',
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  avatarContainer: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    shadowColor: '#5283e4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },
  avatarGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgba(82, 131, 228, 0.7)',
  },
  avatarInner: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  avatarText: {
    fontSize: 30,
  },
  smallArRingContainer1: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallArRingContainer2: {
    position: 'absolute',
    top: height * 0.25,
    right: width * 0.15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallArRingOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3465d9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3465d9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  smallArRingInner: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: '#5283e4',
    shadowColor: '#5283e4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  arMarker1: {
    position: 'absolute',
    top: height * 0.35,
    left: width * 0.2,
    width: 28,
    height: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(82, 131, 228, 0.7)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arMarker2: {
    position: 'absolute',
    top: height * 0.6,
    left: width * 0.65,
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(82, 131, 228, 0.7)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arMarker3: {
    position: 'absolute',
    top: height * 0.25,
    right: width * 0.25,
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(82, 131, 228, 0.7)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arMarkerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#5283e4',
    shadowColor: '#5283e4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  pulsingCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'rgba(82, 131, 228, 0.3)',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  logoShadow: {
    shadowColor: '#5283e4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
  },
  logoInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  logoComponentContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: -width,
    width: width * 0.3,
    height: height,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: [{ skewX: '-25deg' }],
  },
  textContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  arBadge: {
    position: 'absolute',
    top: height * 0.06,
    right: width * 0.08,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arGlow: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    borderRadius: 24, 
    backgroundColor: 'transparent',
    shadowColor: '#5283e4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  arBadgeGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  arText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 0.8,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: height * 0.1,
    width: width * 0.8,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressContainer: {
    width: width * 0.7,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#5283e4',
    borderRadius: 3,
  },
  tapHint: {
    position: 'absolute',
    bottom: height * 0.05,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
  }
});

export default SplashScreen;