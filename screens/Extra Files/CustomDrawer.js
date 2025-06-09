import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomDrawer = () => {
  const navigation = useNavigation();

  const menuItems = [
    { name: 'Home', route: 'Home' },
    { name: 'Categories', route: 'Categories' },
    { name: 'Virtual-Try-On', route: 'VirtualTryOn' },
    { name: 'AI-Recommendations', route: 'AIRecommendations' },
    { name: 'Contact Us', route: 'ContactUs' },
    { name: 'Our Team', route: 'OurTeam' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <Text style={styles.closeIcon}>{'>>'}</Text>
        </TouchableOpacity>
      </View>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => {
            navigation.navigate(item.route);
          }}
        >
          <Text style={styles.menuText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#f9f4f4', // Light pink background
    paddingVertical: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  closeIcon: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b5bdb', // Blue text
  },
});

export default CustomDrawer;
