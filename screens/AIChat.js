import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
  Animated,
  FlatList,
  Easing,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from './Footer';

const { width } = Dimensions.get('window');

const AIChat = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [skinColor, setSkinColor] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);
  const [gender, setGender] = useState(null);
  const [image, setImage] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);
  const [inputMode, setInputMode] = useState('image'); // Add state for input mode toggle

  // Load history from AsyncStorage
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('recommendationHistory');
      if (savedHistory !== null) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const saveHistory = async (historyItem) => {
    try {
      const updatedHistory = [historyItem, ...history];
      await AsyncStorage.setItem('recommendationHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };
  
  // Toggle category selection
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(item => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
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
    }
  };
  
  // Get recommendations
  const getRecommendations = () => {
    // Mock recommendations based on selections
    const mockRecommendations = {
      'Glasses': [
        'Cat Eye Frames',
        'Round Frames',
        'Clear Frames',
        'Oval Glasses',
        'Wayfarer Glasses'
      ],
      'Watches': [
        'Luxury Watch',
        'Minimalist Watch',
        'Chronograph Watch',
        'Pilot Watch',
        'Dress Watch'
      ],
      'Hats': [
        'Wide-Brim Hat',
        'Trilby',
        'Newsboy Cap',
        'Cowboy Hat',
        'Classic Fedora'
      ],
      'Jewelry': [
        'Statement Necklace',
        'Layered Bracelets',
        'Hoop Earrings',
        'Minimalist Rings',
        'Pendant Necklace'
      ],
      'Scarves': [
        'Silk Scarf',
        'Wool Scarf',
        'Infinity Scarf',
        'Printed Scarf',
        'Cashmere Scarf'
      ]
    };
    
    let recs = [];
    
    if (inputMode === 'text') {
      selectedCategories.forEach(cat => {
        if (mockRecommendations[cat]) {
          recs = [...recs, ...mockRecommendations[cat]];
        }
      });
    } else {
      // For image mode, we'll use all categories for demo purposes
      Object.keys(mockRecommendations).forEach(cat => {
        recs = [...recs, ...mockRecommendations[cat].slice(0, 2)]; // Show 2 items per category
      });
    }
    
    setRecommendations(recs);
    
    // Save to history
    const historyItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      image: image,
      categories: inputMode === 'text' ? selectedCategories : ['Image Analysis'],
      skinColor: skinColor,
      ageGroup: ageGroup,
      gender: gender,
      recommendations: recs,
      inputMode: inputMode // Add inputMode to history
    };
    saveHistory(historyItem);
    
    setCurrentScreen('results');
  };
  
  // Header with back button
  const Header = ({ title, showBack = false }) => (
    <View style={styles.header}>
      {showBack && (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentScreen('welcome')}
        >
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      {showBack && (
        <TouchableOpacity 
          style={styles.historyButton}
          onPress={() => setCurrentScreen('history')}
        >
          <Icon name="history" size={24} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
  
  // Welcome screen
  const WelcomeScreen = () => {
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
        setCurrentScreen('unifiedScreen');
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

  // Unified Screen (Image Upload + Preferences)
  const UnifiedScreen = () => {
    return (
      <View style={styles.screenContainer}>
        <StatusBar 
          backgroundColor="#4A90E2" 
          barStyle="light-content" 
        />
        <LinearGradient
          colors={['#4A90E2', '#4169E1']}
          style={styles.headerGradient}
        >
          <Header title="Create Your Style Profile" showBack={true} />
        </LinearGradient>
        
        <ScrollView style={styles.contentContainer}>
          {/* Input Mode Toggle - Enhanced UI */}
          <View style={styles.inputModeToggleContainer}>
            <TouchableOpacity
              style={[
                styles.inputModeButton,
                inputMode === 'image' && styles.inputModeButtonActive
              ]}
              onPress={() => setInputMode('image')}
            >
              <Icon name="photo-camera" size={20} color={inputMode === 'image' ? "#FFF" : "#4169E1"} />
              <Text style={[
                styles.inputModeText,
                inputMode === 'image' && styles.inputModeTextActive
              ]}>Image Input</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.inputModeButton,
                inputMode === 'text' && styles.inputModeButtonActive
              ]}
              onPress={() => setInputMode('text')}
            >
              <Icon name="text-fields" size={20} color={inputMode === 'text' ? "#FFF" : "#4169E1"} />
              <Text style={[
                styles.inputModeText,
                inputMode === 'text' && styles.inputModeTextActive
              ]}>Text Input</Text>
            </TouchableOpacity>
          </View>
          
          {/* Image Input Section - Enhanced UI */}
          {inputMode === 'image' && (
            <View style={styles.cardContainerPro}>
              <View style={styles.cardHeaderPro}>
                <Icon name="photo-library" size={22} color="#4169E1" />
                <Text style={styles.cardTitlePro}>Upload Your Photo</Text>
              </View>
              <View style={styles.uploadSectionPro}>
                <TouchableOpacity 
                  style={styles.uploadButtonPro}
                  onPress={pickImage}
                >
                  {image ? (
                    <Image 
                      source={{ uri: image }} 
                      style={styles.uploadedImagePro}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.uploadPlaceholderPro}>
                      <Icon name="add-a-photo" size={40} color="#4169E1" />
                      <Text style={styles.uploadTextPro}>Tap to upload</Text>
                    </View>
                  )}
                </TouchableOpacity>
                <View style={styles.uploadInstructionsPro}>
                  <Icon name="info-outline" size={18} color="#4169E1" style={{marginRight: 8}} />
                  <Text style={styles.uploadTextPro}>
                    Upload a clear face photo for best recommendations
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity
                style={[
                  styles.analyzeButtonPro,
                  !image && styles.buttonDisabledPro
                ]}
                disabled={!image}
                onPress={() => {
                  // Set some default values for demo purposes
                  setSkinColor('Medium');
                  setAgeGroup('21-40');
                  setGender('Female');
                  setSelectedCategories(['Glasses', 'Jewelry']);
                  getRecommendations();
                }}
              >
                <Text style={styles.buttonTextPro}>Analyze Image</Text>
                <Icon name="analytics" size={20} color="#FFF" style={styles.buttonIconPro} />
              </TouchableOpacity>
            </View>
          )}
          
          {/* Text Input Section - Enhanced UI */}
          {inputMode === 'text' && (
            <>
              <View style={styles.cardContainerPro}>
                <View style={styles.cardHeaderPro}>
                  <Icon name="category" size={22} color="#4169E1" />
                  <Text style={styles.cardTitlePro}>Select Categories</Text>
                </View>
                
                {/* Only 3 categories in one row */}
                <View style={styles.optionsRowPro}>
                  {['Glasses', 'Watches', 'Hats'].map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.optionButtonPro,
                        selectedCategories.includes(category) && styles.optionButtonSelectedPro
                      ]}
                      onPress={() => toggleCategory(category)}
                    >
                      <Text 
                        style={[
                          styles.optionTextPro,
                          selectedCategories.includes(category) && styles.optionTextSelectedPro
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.cardContainerPro}>
                <View style={styles.cardHeaderPro}>
                  <Icon name="person" size={22} color="#4169E1" />
                  <Text style={styles.cardTitlePro}>Your Features</Text>
                </View>
                
                <Text style={styles.sectionTitlePro}>Skin Tone</Text>
                <View style={styles.optionsRowPro}>
                  {['Fair', 'Medium', 'Dark'].map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.optionButtonPro,
                        skinColor === color && styles.optionButtonSelectedPro
                      ]}
                      onPress={() => setSkinColor(color)}
                    >
                      <View 
                        style={[
                          styles.colorSwatch, 
                          { 
                            backgroundColor: 
                              color === 'Fair' ? '#F8D5C2' : 
                              color === 'Medium' ? '#C68642' : '#8D5524'
                          }
                        ]} 
                      />
                      <Text 
                        style={[
                          styles.optionTextPro,
                          skinColor === color && styles.optionTextSelectedPro
                        ]}
                      >
                        {color}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                <Text style={styles.sectionTitlePro}>Age Group</Text>
                <View style={styles.optionsRowPro}>
                  {['13-20', '21-40', '41+'].map((age) => (
                    <TouchableOpacity
                      key={age}
                      style={[
                        styles.optionButtonPro,
                        ageGroup === age && styles.optionButtonSelectedPro
                      ]}
                      onPress={() => setAgeGroup(age)}
                    >
                      <Text 
                        style={[
                          styles.optionTextPro,
                          ageGroup === age && styles.optionTextSelectedPro
                        ]}
                      >
                        {age}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                <Text style={styles.sectionTitlePro}>Gender</Text>
                <View style={styles.optionsRowPro}>
                  {['Male', 'Female', 'Non-binary'].map((g) => (
                    <TouchableOpacity
                      key={g}
                      style={[
                        styles.optionButtonPro,
                        gender === g && styles.optionButtonSelectedPro
                      ]}
                      onPress={() => setGender(g)}
                    >
                      <Text 
                        style={[
                          styles.optionTextPro,
                          gender === g && styles.optionTextSelectedPro
                        ]}
                      >
                        {g}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <TouchableOpacity
                style={[
                  styles.generateButtonPro,
                  (selectedCategories.length === 0 || !skinColor || !ageGroup || !gender) && styles.buttonDisabledPro
                ]}
                disabled={selectedCategories.length === 0 || !skinColor || !ageGroup || !gender}
                onPress={getRecommendations}
              >
                <Text style={styles.buttonTextPro}>Get Recommendations</Text>
                <Icon name="style" size={20} color="#FFF" style={styles.buttonIconPro} />
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
        <Footer />
      </View>
    );
  };
  
  // Results screen
  const ResultsScreen = () => {
    return (
      <View style={styles.screenContainer}>
        <StatusBar 
          backgroundColor="#4169E1" 
          barStyle="light-content" 
        />
        <LinearGradient
          colors={['#4169E1', '#1E90FF']}
          style={styles.headerGradient}
        >
          <Header title="Your Recommendations" showBack={true} />
        </LinearGradient>
        
        <ScrollView style={styles.contentContainer}>
          <View style={styles.resultSummaryCard}>
            <Image 
              source={{ uri: image }} 
              style={styles.resultUserImage}
              resizeMode="cover"
            />
            <View style={styles.resultSummaryText}>
              <Text style={styles.resultTitle}>Perfect For You</Text>
              <Text style={styles.resultSubtitle}>
                Based on your {gender}, {skinColor} skin tone, {ageGroup} age group
              </Text>
            </View>
          </View>
          
          <View style={styles.recommendationsContainer}>
            {selectedCategories.map((category) => (
              <View key={category} style={styles.categoryCard}>
                <Text style={styles.categoryTitleBlue}>{category}</Text>
                <View style={styles.recommendationsList}>
                  {recommendations
                    .filter((_, index) => index % selectedCategories.length === selectedCategories.indexOf(category))
                    .map((item, index) => (
                      <View key={index} style={styles.recommendationCard}>
                        <View style={styles.recommendationIconBlue}>
                          <Icon 
                            name={
                              category === 'Glasses' ? 'visibility' : 
                              category === 'Watches' ? 'watch' : 
                              category === 'Hats' ? 'face' : 
                              category === 'Jewelry' ? 'diamond' : 'style'
                            } 
                            size={24} 
                            color="#FFF" 
                          />
                        </View>
                        <Text style={styles.recommendationText}>{item}</Text>
                      </View>
                    ))
                  }
                </View>
              </View>
            ))}
          </View>
          
          <View style={styles.chatContainer}>
            <LinearGradient
              colors={['#4169E1', '#1E90FF']}
              style={styles.chatBotIconContainer}
            >
              <Icon name="smart-toy" size={30} color="#FFF" />
            </LinearGradient>
            <View style={styles.chatBubble}>
              <Text style={styles.chatText}>
                These recommendations are tailored to your features and preferences. 
                Would you like to refine your choices or see more options?
              </Text>
            </View>
          </View>
          
          <View style={styles.resultsButtons}>
            <TouchableOpacity
              style={styles.secondaryButtonCompact}
              onPress={() => setCurrentScreen('unifiedScreen')}
            >
              <Text style={styles.secondaryButtonText}>Refine Choices</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.primaryButtonBlue}
              onPress={() => console.log('Share recommendations')}
            >
              <Text style={styles.primaryButtonText}>Share Results</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };
  
  // History screen
  const HistoryScreen = () => {
    const deleteHistoryItem = (id) => {
      const updatedHistory = history.filter(item => item.id !== id);
      setHistory(updatedHistory);
      AsyncStorage.setItem('recommendationHistory', JSON.stringify(updatedHistory));
    };
    
    const clearAllHistory = () => {
      setHistory([]);
      AsyncStorage.removeItem('recommendationHistory');
    };
    
    return (
      <View style={styles.screenContainer}>
        <StatusBar 
          backgroundColor="#4169E1" 
          barStyle="light-content" 
        />
        <LinearGradient
          colors={['#4169E1', '#1E90FF']}
          style={styles.headerGradient}
        >
          <Header title="Your History" showBack={true} />
        </LinearGradient>
        
        <View style={styles.contentContainer}>
          <Footer />
          {history.length > 0 ? (
            <>
              <View style={styles.historyHeader}>
                <Text style={styles.historyHeaderTitle}>Previous Recommendations</Text>
                <TouchableOpacity 
                  style={styles.clearAllButton}
                  onPress={clearAllHistory}
                >
                  <Icon name="delete-sweep" size={20} color="#4169E1" />
                  <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.historyItem}>
                    <View style={styles.historyItemHeader}>
                      <Image 
                        source={{ uri: item.image }} 
                        style={styles.historyImage}
                        resizeMode="cover"
                      />
                      <View style={styles.historyInfo}>
                        <Text style={styles.historyDate}>{item.date}</Text>
                        <Text style={styles.historyCategories}>
                          {item.categories.join(', ')}
                        </Text>
                      </View>
                      <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={() => deleteHistoryItem(item.id)}
                      >
                        <Icon name="delete" size={20} color="#FF6B6B" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.historyRecommendations}>
                      {item.recommendations.slice(0, 3).map((rec, index) => (
                        <Text key={index} style={styles.historyRecommendationText}>
                          • {rec}
                        </Text>
                      ))}
                      {item.recommendations.length > 3 && (
                        <Text style={styles.historyMoreText}>
                          +{item.recommendations.length - 3} more
                        </Text>
                      )}
                    </View>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
              />
            </>
          ) : (
            <View style={styles.emptyHistory}>
              <Icon name="history" size={60} color="#CCC" />
              <Text style={styles.emptyHistoryText}>No recommendations history yet</Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {currentScreen === 'welcome' && <WelcomeScreen />}
      {currentScreen === 'unifiedScreen' && <UnifiedScreen />}
      {currentScreen === 'results' && <ResultsScreen />}
      {currentScreen === 'history' && <HistoryScreen />}
    </View>
  );
};

// ... existing code ...

const styles = StyleSheet.create({
  // Input Mode Toggle Styles
  inputModeToggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F0F4FF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputModeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  inputModeButtonActive: {
    backgroundColor: '#4169E1',
  },
  inputModeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    color: '#4169E1',
  },
  inputModeTextActive: {
    color: '#FFF',
  },
  // Category Grid Layout
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  // Image Analysis Button
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4169E1',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  // Enhanced Pro UI Styles
  cardContainerPro: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardHeaderPro: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitlePro: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginLeft: 8,
  },
  uploadSectionPro: {
    alignItems: 'center',
  },
  uploadButtonPro: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E7FF',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#F8FAFF',
  },
  uploadedImagePro: {
    width: '100%',
    height: '100%',
  },
  uploadPlaceholderPro: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  uploadTextPro: {
    fontSize: 16,
    color: '#4169E1',
    marginTop: 8,
  },
  uploadInstructionsPro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
  },
  analyzeButtonPro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4169E1',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 16,
    elevation: 3,
    shadowColor: '#4169E1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonDisabledPro: {
    backgroundColor: '#CCCCCC',
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonTextPro: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIconPro: {
    marginLeft: 8,
  },
  optionsRowPro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionButtonPro: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F4FF',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginHorizontal: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionButtonSelectedPro: {
    backgroundColor: '#4169E1',
  },
  optionIconPro: {
    marginRight: 6,
  },
  optionTextPro: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4169E1',
  },
  optionTextSelectedPro: {
    color: '#FFFFFF',
  },
  sectionTitlePro: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 12,
  },
  colorSwatch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  generateButtonPro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4169E1',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#4169E1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionButtonCompact: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  optionButtonSelectedBlue: {
    backgroundColor: "#4A90E2",
    borderColor: '#4A90E2',
  },
  optionText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  uploadButtonSmall: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 10,
  },
  uploadedImageSmall: {
    width: '100%',
    height: '100%',
  },
  uploadPlaceholderSmall: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  uploadTextCentered: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  categoryOptionCompact: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryOptionSelectedBlue: {
    backgroundColor: '#4169E1',
  },
  optionButtonCompact: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    elevation: 2,
  },
  optionButtonSelectedBlue: {
    backgroundColor: '#4169E1',
  },
  generateButtonCompact: {
    backgroundColor: '#4169E1',
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F8FA',
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  backButton: {
    position: 'absolute',
    left: 15,
  },
  historyButton: {
    position: 'absolute',
    right: 15,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  powerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiHighlight: {
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 5,
  },
  aiText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  robotImageWrapper: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    shadowColor: '#6A5ACD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  robotImage: {
    width: 180,
    height: 180,
  },
  startButtonContainer: {
    width: '100%',
    marginTop: 20,
  },
  startButton: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  
  // Add all other styles you need here
  
  // Image picker styles
  imagePickerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  imagePickerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  uploadButton: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#8A2BE2',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    marginTop: 15,
    fontSize: 16,
    color: '#8A2BE2',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  nextButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  
  // Recommendation screen styles
  userImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryOption: {
    width: '48%',
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryOptionSelected: {
    backgroundColor: '#8A2BE2',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  categoryTextSelected: {
    color: '#FFF',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#8A2BE2',
  },
  optionText: {
    fontSize: 14,
    color: '#4169E1',
    marginLeft: 8,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#FFF',
  },
  generateButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  generateButtonDisabled: {
    backgroundColor: '#D0D0D0',
  },
  generateButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  
  // Results screen styles
  resultSummaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  uploadSection: {
    alignItems: 'center',
  },
  resultSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  resultUserImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  resultSummaryText: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  recommendationsContainer: {
    marginBottom: 30,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryTitleBlue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4169E1',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  recommendationsList: {
    marginLeft: 10,
  },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  recommendationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  recommendationIconBlue: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4169E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  recommendationText: {
    fontSize: 16,
    color: '#333',
  },
  chatContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  chatBotIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  chatBubble: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 20,
    borderTopLeftRadius: 5,
  },
  chatText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  resultsButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  primaryButtonBlue: {
    backgroundColor: '#4169E1',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  secondaryButtonCompact: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // History screen styles
  historyItem: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  clearAllText: {
    color: '#4169E1',
    marginLeft: 5,
    fontWeight: '500',
  },
  historyItemHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  deleteButton: {
    padding: 8,
    alignSelf: 'center',
  },
  historyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  historyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  historyDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  historyCategories: {
    fontSize: 14,
    color: '#666',
  },
  historyRecommendations: {
    backgroundColor: '#F8F8FA',
    padding: 10,
    borderRadius: 10,
  },
  historyRecommendationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#8A2BE2',
    paddingVertical: 5,
  },
  emptyHistory: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyHistoryText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyHistoryButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  emptyHistoryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AIChat;