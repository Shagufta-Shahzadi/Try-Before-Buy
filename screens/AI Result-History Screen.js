import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Header with back button
const Header = ({ title, showBack = false, navigation }) => (
  <View style={styles.header}>
    {showBack && (
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>
    )}
    <Text style={styles.headerTitle}>{title}</Text>
    {showBack && (
      <TouchableOpacity 
        style={styles.historyButton}
        onPress={() => navigation.navigate('history')}
      >
        <Icon name="history" size={24} color="#FFF" />
      </TouchableOpacity>
    )}
  </View>
);

// Results screen
export const ResultsScreen = ({ navigation, route }) => {
  const { 
    image, 
    gender, 
    skinTone, 
    ageGroup, 
    selectedCategory, 
    recommendations 
  } = route.params;

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
        <Header title="Your Recommendations" showBack={true} navigation={navigation} />
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
              Based on your {gender}, {skinTone} skin tone, {ageGroup} age group
            </Text>
          </View>
        </View>
        
        <View style={styles.recommendationsContainer}>
          {Object.entries(recommendations).map(([category, items]) => (
            <View key={category} style={styles.categoryCard}>
              <Text style={styles.categoryTitleBlue}>{category}</Text>
              <View style={styles.recommendationsList}>
                {items.map((item, index) => (
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
                ))}
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
            onPress={() => navigation.goBack()}
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
export const AIResultHistoryScreen = ({ navigation, route }) => {
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (route.params?.historyItem) {
      // Add new item to history if it exists in route params
      const newHistory = [route.params.historyItem, ...history];
      setHistory(newHistory);
      saveHistory(newHistory);
    }
  }, [route.params?.historyItem]);

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

  const saveHistory = async (historyData) => {
    try {
      await AsyncStorage.setItem('recommendationHistory', JSON.stringify(historyData));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };
  
  const deleteHistoryItem = async (id) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    await saveHistory(updatedHistory);
  };
  
  const clearAllHistory = async () => {
    setHistory([]);
    await AsyncStorage.removeItem('recommendationHistory');
  };
  
  const viewHistoryItem = (item) => {
    navigation.navigate('ResultsScreen', {
      image: item.image,
      gender: item.gender,
      skinTone: item.skinTone,
      ageGroup: item.ageGroup,
      selectedCategory: item.selectedCategory,
      recommendations: item.recommendations
    });
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
        <Header title="Your History" showBack={true} navigation={navigation} />
      </LinearGradient>
      
      <View style={styles.contentContainer}>
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
                <TouchableOpacity 
                  style={styles.historyItem}
                  onPress={() => viewHistoryItem(item)}
                >
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
                    {Object.entries(item.recommendations).map(([category, items]) => (
                      <View key={category}>
                        <Text style={styles.historyCategoryText}>{category}:</Text>
                        {items.slice(0, 2).map((rec, index) => (
                          <Text key={index} style={styles.historyRecommendationText}>
                            • {rec}
                          </Text>
                        ))}
                        {items.length > 2 && (
                          <Text style={styles.historyMoreText}>
                            +{items.length - 2} more
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <View style={styles.emptyHistory}>
            <Icon name="history" size={60} color="#CCC" />
            <Text style={styles.emptyHistoryText}>No recommendations history yet</Text>
            <Text style={styles.emptyHistorySubtext}>
              Your previous recommendations will appear here
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
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
  historyItemHeader: {
    flexDirection: 'row',
    marginBottom: 15,
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
  deleteButton: {
    padding: 8,
    alignSelf: 'center',
  },
  historyRecommendations: {
    backgroundColor: '#F8F8FA',
    padding: 10,
    borderRadius: 10,
  },
  historyCategoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4169E1',
    marginBottom: 5,
  },
  historyRecommendationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    paddingLeft: 10,
  },
  historyMoreText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
    paddingLeft: 10,
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
    marginTop: 20,
  },
  emptyHistorySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  }
});

export default AIResultHistoryScreen;