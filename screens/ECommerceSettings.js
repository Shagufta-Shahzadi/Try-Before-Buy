import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Footer from './Footer';  // Import Footer component

const ECommerceSettings = ({ navigation }) => {
  const sections = [
    {
      title: "Account Settings",
      data: [
        { id: 1, title: "Personal Information", icon: "person-outline" },
        { id: 2, title: "Change Password", icon: "lock-closed-outline" },
        { id: 3, title: "Manage Addresses", icon: "location-outline" },
        { id: 4, title: "Payment Methods", icon: "card-outline" },
      ],
    },
    {
      title: "Orders",
      data: [
        { id: 5, title: "Order History", icon: "cart-outline" },
        { id: 6, title: "Track Orders", icon: "locate-outline" },
        { id: 7, title: "Returns & Refunds", icon: "refresh-circle-outline" },
      ],
    },
    {
      title: "Notifications",
      data: [
        { id: 8, title: "Push Notifications", icon: "notifications-outline" },
        { id: 9, title: "Email & SMS", icon: "mail-outline" },
        { id: 10, title: "Promotional Offers", icon: "pricetags-outline" },
      ],
    },
    {
      title: "Help & Support",
      data: [
        { id: 11, title: "Help Center", icon: "help-circle-outline" },
        { id: 12, title: "Report a Problem", icon: "alert-circle-outline" },
        { id: 13, title: "About Us", icon: "information-circle-outline" },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", onPress: () => console.log("Logged Out") },
    ]);
  };

  const handleAddAccount = () => {
    Alert.alert("Add Another Account", "Redirecting to account creation...");
  };

  const renderSection = (section) => (
    <View key={section.title} style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.data.map((item) => (
        <TouchableOpacity key={item.id} style={styles.itemContainer}>
          <View style={styles.iconContainer}>
            <Icon name={item.icon} size={24} color="#4A90E2" />
          </View>
          <Text style={styles.itemText}>{item.title}</Text>
          <Icon name="chevron-forward-outline" size={20} color="#ccc" />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/80" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileUsername}>john.doe@example.com</Text>
      </View>

      {/* Sections */}
      <ScrollView style={styles.scrollContainer}>
        {sections.map((section) => renderSection(section))}

        {/* Log Out & Add Account Options */}
        <View style={styles.extraOptionsContainer}>
          {/* Add Another Account */}
          <TouchableOpacity
            style={[styles.itemContainer, styles.extraOption]}
            onPress={handleAddAccount}
          >
            <View style={styles.iconContainer}>
              <Icon name="person-add-outline" size={24} color="#4A90E2" />
            </View>
            <Text style={styles.itemText}>Add Another Account</Text>
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity
            style={[styles.itemContainer, styles.extraOption]}
            onPress={handleLogout}
          >
            <View style={styles.iconContainer}>
              <Icon name="log-out-outline" size={24} color="#4A90E2" />
            </View>
            <Text style={styles.itemText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Add Footer at the bottom */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileUsername: {
    fontSize: 14,
    color: "#777",
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  iconContainer: {
    marginRight: 15,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  extraOptionsContainer: {
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  extraOption: {
    borderBottomWidth: 0,
  },
});

export default ECommerceSettings;
