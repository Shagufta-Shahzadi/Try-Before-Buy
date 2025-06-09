import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the icons
import { Black, white } from '../Constants';

const Field = ({ iconName, secureTextEntry, ...props }) => {
  return (
    <View style={styles.inputFieldContainer}>
      {/* Render icon if iconName is passed as prop */}
      {iconName && <Icon name={iconName} size={20} color="gray" style={styles.icon} />}
      <TextInput
        {...props}
        secureTextEntry={secureTextEntry}
        style={styles.inputField}
        placeholderTextColor={Black} // Placeholder text color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldContainer: {
    flexDirection: 'row', // Aligns the icon and input field horizontally
    alignItems: 'center', // Center the icon and text inside the input field
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Black, // Border color for the input field
    marginTop: 30,
    width: '99%',
    height:40
  },
  icon: {
    marginLeft: 10, // Add some space between the icon and input text
  },
  inputField: {
    flex: 1, // Makes the input field take the remaining space
    color: "rgba(136, 136, 143, 0.62)", // Text color
    backgroundColor: "rgb(255, 255, 255)", // Input field background color
    paddingHorizontal: 15, // Horizontal padding inside the field
    paddingVertical: 8, // Vertical padding inside the field
    fontSize: 14,
    borderRadius: 15,
  },
});

export default Field;
