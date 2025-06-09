import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from './Footer';

const UserProfile = ({ user, navigation }) => {
  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : '');

  return (
    <>
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Icon name="cart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

          {/* Profile Info */}
          <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileSection}>
            <View style={styles.profileBadge}>
              {user?.profilePhoto ? (
                <Image
                  source={{ uri: user.profilePhoto }}
                  style={styles.profileImage}
                />
              ) : (
                <Text style={styles.initials}>{getInitials(user?.name)}</Text>
              )}
               </View>
            <Text style={styles.profileName}>{user?.name || 'Guest'}</Text>
            <Text style={styles.profileRole}>{user?.email || 'No email available'}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.iconWrapper}>
                <Icon name="wallet" size={24} color="#4A90E2" />
              </View>
              <Text style={styles.actionLabel}>Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.iconWrapper}>
                <Icon name="settings-outline" size={24} color="#4A90E2" />
              </View>
              <Text style={styles.actionLabel}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.iconWrapper}>
                <Icon name="notifications-outline" size={24} color="#4A90E2" />
              </View>
              <Text style={styles.actionLabel}>Notifications</Text>
            </TouchableOpacity>
          </View>

          {/* Menu List */}
          <View style={styles.menuList}>
            {[
              { label: 'Edit Profile', icon: 'create-outline' },
              { label: 'Account Privacy', icon: 'lock-closed-outline' },
              { label: 'Transaction History', icon: 'document-text-outline' },
              { label: 'Notification Settings', icon: 'notifications-outline' },
              { label: 'Language', icon: 'language-outline' },
              { label: 'Help Center', icon: 'help-circle-outline' },
              { label: 'FAQ', icon: 'information-circle-outline' },
              { label: 'Saved Items', icon: 'bookmark-outline' },
              { label: 'Feedback', icon: 'chatbubble-ellipses-outline' },
              { label: 'Contact', icon: 'call-outline' },
              { label: 'Virtual Try-On Gallery', icon: 'image-outline' },
              { label: 'Invite Friends', icon: 'share-social-outline' },
              { label: 'Add Account', icon: 'person-add-outline' },
              { label: 'Logout', icon: 'exit-outline' },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={styles.menuIconWrapper}>
                  <Icon name={item.icon} size={22} color="#4A90E2" />
                </View>
                <Text style={styles.menuText}>{item.label}</Text>
                <Icon name="chevron-forward-outline" size={20} color="#c4c4c4" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Footer */}
        <Footer />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    paddingBottom: 100, // To ensure content doesn't overlap with footer
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 90,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 10,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  profileBadge: {
    width: 100,
    height: 100,
    backgroundColor: '#E6F1F8',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  initials: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileRole: {
    fontSize: 14,
    color: '#777',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  actionButton: {
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#E6F1F8',
    borderRadius: 30,
    padding: 10,
  },
  actionLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  menuList: {
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconWrapper: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});

export default UserProfile;
