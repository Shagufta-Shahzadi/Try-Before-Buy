import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from 'react-native';

const Footer2 = () => {
  // Animated value for sliding animation
  const slideAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    // Start the sliding animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <View style={styles.footerContainer}>
      {/* Try Before You Buy Section */}
      <View style={styles.tryBeforeSection}>
        <View style={styles.logoRow}>
          
          <Text style={styles.tryBeforeText}>Try Before You Buy</Text>
        </View>
        <Text style={styles.tryBeforeDescription}>
          Experience our products before making a purchase. See the quality, design, and feel, all in one place!
        </Text>
      </View>

      {/* Social Media Icons Section */}
      <View style={styles.footerIcons}>
        <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')}>
          <Image source={require('../assets/logosfacebook.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')}>
          <Image source={require('../assets/skilliconsinstagram.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/923121324083')}>
          <Image source={require('../assets/Whatsapp.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:waleedishfaq1515@gmail.com')}>
          <Image source={require('../assets/download.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* New Animated Section */}
      <Animated.View style={[styles.animatedSection, { transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.animatedTitle}>Shop on Your Terms</Text>
        <Text style={styles.animatedDescription}>
          Choose how much you want to pay for your items and if the seller agrees, voila! We have a sale.
        </Text>
        <View style={styles.downloadButtons}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://apps.apple.com')}
            style={[styles.downloadButton, styles.appleButton]}
          >
            <Image
              source={require('../assets/apple icon.png')}
              style={styles.downloadIcon}
            />
            <Text style={styles.downloadText}>App Store</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://play.google.com')}
            style={[styles.downloadButton, styles.googleButton]}
          >
            <Image
              source={require('../assets/play store.jpeg')}
              style={styles.downloadIcon}
            />
            <Text style={styles.downloadText}>Google Play</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Last Footer Section */}
      <View style={styles.lastFooter}>
        <Text style={styles.lastFooterText}>Design By Try-Before-Buy Team</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: 'rgb(0, 162, 255)', // Dark background color to match the design
    padding: 20,
    marginTop: 0,
    height:550,
  },
  // Try Before You Buy Section
  tryBeforeSection: {
    marginBottom: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  tryBeforeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)',
    textAlign: 'center',
  },
  tryBeforeDescription: {
    fontSize: 14,
    color: 'rgb(255, 255, 255)',
    textAlign: 'center',
    marginTop: 10,
  },

  // Social Media Icons
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
    borderRadius: 50,
  },

  // New Animated Section
  animatedSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  animatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  animatedDescription: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  downloadButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  appleButton: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: "black"

  },
  googleButton: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: "black"
  },
  downloadIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  downloadText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Last Footer Section
  lastFooter: {
    marginTop: 20,
    backgroundColor: 'rgb(235, 99, 99)',
    padding: 10,
    alignItems: 'center',
  },
  lastFooterText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Footer2;
