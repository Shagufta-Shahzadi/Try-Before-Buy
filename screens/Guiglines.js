import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from './HeaderNavigation'; // Ensure this path points to your Header component
import Footer from './Footer'; // Ensure this path points to your Footer component

const GuidelinesPage = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header />

      {/* Scrollable Content */}
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          {/* Virtual Try-On */}
          <Text style={styles.title}>How to Use Virtual Try-On</Text>
          <Text style={styles.description}>
            Follow these easy steps to try on products virtually:
          </Text>
          <Text style={styles.listItem}>• Enable camera permission to start trying products virtually.</Text>
          <Text style={styles.listItem}>• Browse through the catalog and select the item you want to try on.</Text>
          <Text style={styles.listItem}>
            • Position yourself within the guidelines displayed on the screen for the best experience.
          </Text>
          <Text style={styles.listItem}>
            • View the selected item on yourself in real-time and see recommended products tailored to your preferences.
          </Text>
          <Text style={styles.listItem}>
            • Add your favorite item to the cart once you're satisfied with the fit and style.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Click On Video For Guidance</Text>
          </TouchableOpacity>
          {/* Placeholder */}
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Placeholder for Video</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* AI Recommendations */}
          <Text style={styles.title}>How to Use AI Recommendations</Text>
          <Text style={styles.description}>
            Follow these easy steps to get personalized product suggestions:
          </Text>
          <Text style={styles.listItem}>
            • Upload your preferences or a photo to help the AI understand your style and needs.
          </Text>
          <Text style={styles.listItem}>
            • Use your camera for real-time scanning, allowing AI to recommend products that fit your size and features.
          </Text>
          <Text style={styles.listItem}>
            • Get personalized suggestions based on your preferences, including size, color, and trending styles.
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Click On Video For Guidance</Text>
          </TouchableOpacity>
          {/* Placeholder */}
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Placeholder for Video</Text>
          </View>

          {/* Footer Text */}
          <Text style={styles.footer}>
            Still need help? <Text style={styles.contactLink}>Contact us</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf3f3',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30, // Added paddingBottom to ensure spacing at the bottom
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    color: '#555',
  },
  listItem: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6670ff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  placeholder: {
    marginTop: 20,
    height: 200,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#555',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 30,
    color: '#555',
  },
  contactLink: {
    color: '#6670ff',
    textDecorationLine: 'underline',
  },
});

export default GuidelinesPage;
