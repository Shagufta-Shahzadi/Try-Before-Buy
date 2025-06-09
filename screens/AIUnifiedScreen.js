import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Footer from './Footer';

const { width } = Dimensions.get('window');

const AIUnifiedScreen = ({ navigation, route }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [skinTone, setSkinTone] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);
  const [gender, setGender] = useState(null);
  const [image, setImage] = useState(null);
  const [inputMode, setInputMode] = useState('image'); // Input mode toggle
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');
  
  // Select category (radio button style)
  const selectCategory = (category) => {
    setSelectedCategory(category);
  };
  
  // Pick image from gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setMessage('Image uploaded successfully!');
    }
  };
  
  // Get recommendations and navigate to results
  const getRecommendations = () => {
    setProcessing(true);
    setMessage('Analyzing your preferences...');
    
    // Simulate API call to backend for recommendations
    setTimeout(() => {
      let faceShape = 'Oval'; // Default face shape
      
      // Mock face shape detection for image mode - in production this would come from backend
      if (inputMode === 'image' && image) {
        const faceShapes = ['Heart', 'Oblong', 'Oval', 'Round', 'Square'];
        faceShape = faceShapes[Math.floor(Math.random() * faceShapes.length)];
      }
      
      // Generate recommendations based on backend logic
      const recommendedCategories = [selectedCategory];
      const recommendations = generateRecommendations(faceShape, recommendedCategories);
      
      // Create history item
      const historyItem = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        image: image,
        categories: [selectedCategory],
        skinTone: skinTone,
        ageGroup: ageGroup,
        gender: gender,
        faceShape: faceShape,
        recommendations: recommendations,
        inputMode: inputMode
      };
      
      setProcessing(false);
      
      // Navigate to results screen with data
      navigation.navigate('AIResultHistoryScreen', {
        recommendations: recommendations,
        historyItem: historyItem,
        image: image,
        gender: gender,
        skinTone: skinTone,
        ageGroup: ageGroup,
        faceShape: faceShape,
        selectedCategory: selectedCategory,
        inputMode: inputMode
      });
    }, 1500);
  };
  
  // Generate recommendations based on face shape and selected categories
  const generateRecommendations = (faceShape, categories) => {
    const faceShapeRecommendations = {
      "Heart": {
        "Glasses": [
          "Cat Eye Frames", "Round Frames", "Clear Frames", "Oval Glasses", "Alford Glasses"
        ],
        "Watches": [
          "Luxury Watch", "Minimalist Watch", "Chronograph Watch", "Pilot Watch", "Diver Watch"
        ],
        "Hats": [
          "Beanie", "Wide-Brim Hat", "Trilby", "Newsboy Cap", "Cowboy Hat"
        ]
      },
      "Oblong": {
        "Glasses": [
          "Aviators", "Oversized Glasses", "Round Frames", "Square Frames", "Wayfarer Glasses"
        ],
        "Watches": [
          "Pilot Watch", "Luxury Watch", "Minimalist Watch", "Chronograph Watch", "Diver Watch"
        ],
        "Hats": [
          "Trilby", "Newsboy Cap", "Cowboy Hat", "Safari Hat", "Flat Cap"
        ]
      },
      "Oval": {
        "Glasses": [
          "Wayfarer Glasses", "Geometric Frames", "Cat Eye Frames", "Round Frames", "Clear Frames"
        ],
        "Watches": [
          "Diver Watch", "Dress Watch", "Luxury Watch", "Minimalist Watch", "Chronograph Watch"
        ],
        "Hats": [
          "Cowboy Hat", "Safari Hat", "Trilby", "Newsboy Cap", "Flat Cap"
        ]
      },
      "Round": {
        "Glasses": [
          "Square Frames", "Browline Glasses", "Cat Eye Frames", "Rectangle Frames", "Angular Frames"
        ],
        "Watches": [
          "Bold Dial Watch", "Square Dial Watch", "Luxury Watch", "Minimalist Watch", "Chronograph Watch"
        ],
        "Hats": [
          "Flat Cap", "Boater Hat", "Trilby", "Newsboy Cap", "Cowboy Hat"
        ]
      },
      "Square": {
        "Glasses": [
          "Rimless Glasses", "Classic Aviators", "Cat Eye Frames", "Round Frames", "Oval Frames"
        ],
        "Watches": [
          "Skeleton Watch", "Retro Watch", "Luxury Watch", "Minimalist Watch", "Chronograph Watch"
        ],
        "Hats": [
          "Top Hat", "Classic Fedora", "Trilby", "Newsboy Cap", "Cowboy Hat"
        ]
      }
    };
    
    let recommendations = {};
    
    // If no specific categories are selected, use all categories
    const categoriesToUse = categories.length > 0 ? categories : ["Glasses", "Watches", "Hats"];
    
    categoriesToUse.forEach(category => {
      // Get recommendations for the category based on face shape
      if (faceShapeRecommendations[faceShape] && faceShapeRecommendations[faceShape][category]) {
        recommendations[category] = faceShapeRecommendations[faceShape][category];
      } else {
        // Fallback to Oval face shape recommendations if specific face shape or category not found
        recommendations[category] = faceShapeRecommendations["Oval"][category] || 
          ["No specific recommendations available for this category."];
      }
    });
    
    return recommendations;
  };

  // Custom header component with blue theme
  const CustomHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <SafeAreaView style={styles.safeAreaHeader}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('WelcomeScreen')}
            >
              <Icon name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            
            <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>Personal Stylist</Text>
              <Text style={styles.headerSubtitle}>AI-Powered Fashion Recommendations</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('AIResultHistoryScreen')}
            >
              <Icon name="history" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  };

  // Render radio button category selector in row
  const renderCategorySelector = () => {
    const categories = ["Glasses", "Watches", "Hats"];
    
    return (
      <View style={styles.categoriesRow}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.radioButtonContainer,
              selectedCategory === category && styles.radioButtonContainerSelected
            ]}
            onPress={() => selectCategory(category)}
          >
            <View style={styles.radioButtonWrapper}>
              <View style={[
                styles.radioButton,
                selectedCategory === category && styles.radioButtonSelected
              ]}>
                {selectedCategory === category && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={[
                styles.radioButtonText,
                selectedCategory === category && styles.radioButtonTextSelected
              ]}>
                {category}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Render feature selector with radio buttons in row
  const renderFeatureSelector = (title, options, selectedValue, onSelect) => {
    return (
      <View style={styles.featureSection}>
        <Text style={styles.featureTitle}>{title}</Text>
        <View style={styles.optionsRow}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.radioButtonContainer,
                selectedValue === option.value && styles.radioButtonContainerSelected,
                title === 'Skin Tone' && { backgroundColor: option.color }
              ]}
              onPress={() => onSelect(option.value)}
            >
              <View style={styles.radioButtonWrapper}>
                <View style={[
                  styles.radioButton,
                  selectedValue === option.value && styles.radioButtonSelected,
                  title === 'Skin Tone' && { borderColor: '#FFF' }
                ]}>
                  {selectedValue === option.value && (
                    <View style={[
                      styles.radioButtonInner,
                      title === 'Skin Tone' && { backgroundColor: '#FFF' }
                    ]} />
                  )}
                </View>
                <Text style={[
                  styles.radioButtonText,
                  selectedValue === option.value && styles.radioButtonTextSelected,
                  title === 'Skin Tone' && { color: '#FFF', fontWeight: '600' }
                ]}>
                  {option.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor="#1976D2" 
        barStyle="light-content" 
      />
      
      {/* Custom Header */}
      <CustomHeader />
      
      {/* Input Mode Toggle */}
      <View style={styles.inputToggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            inputMode === 'image' && styles.toggleButtonActive
          ]}
          onPress={() => setInputMode('image')}
        >
          <Text 
            style={[
              styles.toggleText,
              inputMode === 'image' && styles.toggleTextActive
            ]}
          >
            Image Based
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.toggleButton,
            inputMode === 'text' && styles.toggleButtonActive
          ]}
          onPress={() => setInputMode('text')}
        >
          <Text 
            style={[
              styles.toggleText,
              inputMode === 'text' && styles.toggleTextActive
            ]}
          >
            Text Based
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Image Input Section - Combined container */}
        {inputMode === 'image' && (
          <View style={styles.combinedContainer}>
            {/* Photo Upload Section */}
            <View style={styles.photoUploadSection}>
              <Text style={styles.sectionTitle}>Upload Your Photo</Text>
              
              <TouchableOpacity 
                style={styles.photoUploadArea}
                onPress={pickImage}
              >
                {image ? (
                  <Image 
                    source={{ uri: image }} 
                    style={styles.uploadedImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <Text style={styles.uploadInstructionText}>
                      Tap to upload a photo
                    </Text>
                    <Text style={styles.uploadSubtext}>
                      We'll analyze your facial features
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              
              {message ? (
                <View style={styles.messageContainer}>
                  <Text style={styles.messageText}>{message}</Text>
                </View>
              ) : (
                <View style={styles.photoTipContainer}>
                  <Text style={styles.photoTipText}>
                    For best results, use a clear photo of your face
                  </Text>
                </View>
              )}
            </View>
            
            {/* Categories Section */}
            <View style={styles.categoriesSection}>
              <Text style={styles.sectionTitle}>Select Category</Text>
              {renderCategorySelector()}
            </View>
            
            {/* Analyze Button */}
            <TouchableOpacity
              style={[
                styles.analyzeButton,
                (!image || !selectedCategory || processing) && styles.buttonDisabled
              ]}
              disabled={!image || !selectedCategory || processing}
              onPress={getRecommendations}
            >
              <Text style={styles.buttonText}>
                {processing ? 'Analyzing...' : 'Analyze Photo'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Text Input Section */}
        {inputMode === 'text' && (
          <View style={styles.textBasedContainer}>
            {/* Categories Selection */}
            <View style={styles.textInputCard}>
              <Text style={styles.sectionTitle}>Select Category</Text>
              {renderCategorySelector()}
            </View>
            
            {/* Features Selection */}
            <View style={styles.textInputCard}>
              <Text style={styles.sectionTitle}>Your Features</Text>
              
              <ScrollView style={styles.featuresScrollView} showsVerticalScrollIndicator={false}>
                {/* Skin Tone Selection */}
                <View style={styles.featureSection}>
                  <Text style={styles.featureTitle}>Skin Tone</Text>
                  <View style={styles.optionsRow}>
                    {[
                      { label: 'Fair', value: 'Fair' },
                      { label: 'Medium', value: 'Medium' },
                      { label: 'Dark', value: 'Dark' }
                    ].map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={[
                          styles.radioButtonContainer,
                          skinTone === option.value && styles.radioButtonContainerSelected
                        ]}
                        onPress={() => setSkinTone(option.value)}
                      >
                        <View style={styles.radioButtonWrapper}>
                          <View style={[
                            styles.radioButton,
                            skinTone === option.value && styles.radioButtonSelected
                          ]}>
                            {skinTone === option.value && (
                              <View style={styles.radioButtonInner} />
                            )}
                          </View>
                          <Text style={[
                            styles.radioButtonText,
                            skinTone === option.value && styles.radioButtonTextSelected
                          ]}>
                            {option.label}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                
                {renderFeatureSelector(
                  'Age Group',
                  [
                    { label: 'Child', value: 'Child' },
                    { label: 'Teen', value: 'Teen' },
                    { label: 'Young Adult', value: 'Young Adult' }
                  ],
                  ageGroup,
                  setAgeGroup
                )}
                
                {renderFeatureSelector(
                  'Gender',
                  [
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Kids', value: 'Kids' }
                  ],
                  gender,
                  setGender
                )}
              </ScrollView>
            </View>
            
            {/* Get Recommendations Button */}
            <TouchableOpacity
              style={[
                styles.recommendButton,
                (!selectedCategory || !skinTone || !ageGroup || !gender || processing) && styles.buttonDisabled
              ]}
              disabled={!selectedCategory || !skinTone || !ageGroup || !gender || processing}
              onPress={getRecommendations}
            >
              <Text style={styles.buttonText}>
                {processing ? 'Processing...' : 'Get Recommendations'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FB',
  },
  // Header styles - Blue theme
  headerContainer: {
    height: Platform.OS === 'ios' ? 110 : 80,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: '#1976D2',
    elevation: 4,
  },
  safeAreaHeader: {
    flex: 1,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderSpace: {
    width: 40,
  },
  titleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  // Input toggle styles
  inputToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    margin: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#1976D2',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
  },
  toggleTextActive: {
    color: '#FFF',
  },
  // Content styles
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  // Combined container for image mode
  combinedContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  // Photo upload section
  photoUploadSection: {
    marginBottom: 24,
  },
  photoUploadArea: {
    height: 200,
    borderRadius: 12,
    backgroundColor: '#F5F8FB',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
  },
  uploadPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  uploadInstructionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  messageContainer: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  messageText: {
    color: '#388E3C',
    fontSize: 14,
  },
  photoTipContainer: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1976D2',
  },
  photoTipText: {
    color: '#1976D2',
    fontSize: 14,
  },
  // Categories section
  categoriesSection: {
    marginBottom: 24,
  },
  // Categories row - ensure 3 options per row
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  // Radio button styles - consistent styling
  radioButtonContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    margin: 3,
    backgroundColor: '#F5F8FB',
  },
  radioButtonContainerSelected: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },
  radioButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#1976D2',
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  radioButtonSelected: {
    borderColor: '#FFF',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1976D2',
  },
  radioButtonText: {
    fontSize: 12,
    color: '#333',
  },
  radioButtonTextSelected: {
    color: '#FFF',
  },
  // Feature section styles
  featureSection: {
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    margin: 4,
    backgroundColor: '#F5F8FB',
  },
  optionButtonSelected: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },
  optionButtonText: {
    fontSize: 13,
    color: '#333',
  },
  optionButtonTextSelected: {
    color: '#FFF',
  },
  colorOptionText: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  // Button styles
  analyzeButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  // Text-based container styles
  textBasedContainer: {
    marginBottom: 24,
  },
  textInputCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  featuresScrollView: {
    maxHeight: 600, // Set a maximum height for the scrollable area
  },
  // Skin tone specific styles
  skinToneButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skinToneButtonSelected: {
    borderColor: '#FFF',
    borderWidth: 2,
  },
  skinToneText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  skinToneTextSelected: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AIUnifiedScreen;