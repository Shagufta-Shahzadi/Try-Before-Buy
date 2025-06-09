import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the icons

const SimpleMenu = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require('../assets/download (2).png')} style={styles.profileImage} />
        <Text style={styles.userName}>Sara Ali</Text>
      </View>

      {/* Menu Options */}
      <TouchableOpacity style={styles.menuItem}>
        <Icon name="home" size={20} color="gray" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Icon name="bicycle" size={20} color="gray" />
        <Text style={styles.menuText}>Cycling</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Icon name="bus" size={20} color="gray" />
        <Text style={styles.menuText}>Bus</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Icon name="airplane" size={20} color="gray" />
        <Text style={styles.menuText}>Plane</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Icon name="person" size={20} color="gray" />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Icon name="log-in" size={20} color="gray" />
        <Text style={styles.menuText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Icon name="chatbubbles" size={20} color="gray" />
        <Text style={styles.menuText}>Communicate</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Icon name="star" size={20} color="gray" />
        <Text style={styles.menuText}>Rate Us</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 12, // Spacing between menu items
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default SimpleMenu;
