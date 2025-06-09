import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  FlatList,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Footer from './Footer';
import VirtualFittingSection from './VirtualFittingSection';
import { LinearGradient } from 'expo-linear-gradient';
// Import the AIFashionAssistant component directly
import AIFashionAssistant from '../Components/AIFashionAssistant';

const { width } = Dimensions.get('window');

// Replace Reanimated View with regular Animated.View
const Home = () => {
  // Add these animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const navigation = useNavigation(); // Navigation hook

  const topCategories = [
    { id: '1', name: 'Men', image: require('../assets/Men.jpg'), route: 'Mens' },
    { id: '2', name: 'Women', image: require('../assets/Female.jpg'), route: 'Women' },
    { id: '3', name: 'Kids', image: require('../assets/Kids.png'), route: 'Kids' },
  ];

  const banners = [
    require('../assets/B3.png'),
    require('../assets/B2.png'),
    require('../assets/B1.png'),
  ];

  const popularProducts = [
    { id: '1', name: 'Glasses', image: require('../assets/Glasses.png') },
    { id: '2', name: 'Watches', image: require('../assets/Watches.png') },
    { id: '3', name: 'Hats', image: require('../assets/Hats.png') },
  ];

  const glassesProducts = [
    { id: '1', name: 'Mid-Century Modern', price: '$100', image: require('../assets/Glasses.png') },
    { id: '2', name: 'Elegant Golden Base', price: '$150', image: require('../assets/Glasses.png') },
    { id: '3', name: 'Vintage Style', price: '$200', image: require('../assets/Glasses.png') },
    { id: '4', name: 'Contemporary Look', price: '$250', image: require('../assets/Glasses.png') },
    { id: '5', name: 'Classic Frame', price: '$300', image: require('../assets/Glasses.png') },
    { id: '6', name: 'Sleek Finish', price: '$350', image: require('../assets/Glasses.png') },
  ];

  const watchesProducts = [
    { id: '1', name: 'Luxury Watch', price: '$120', image: require('../assets/Watches.png') },
    { id: '2', name: 'Classic Analog', price: '$180', image: require('../assets/Watches.png') },
    { id: '3', name: 'Digital Pro', price: '$240', image: require('../assets/Watches.png') },
    { id: '4', name: 'Modern Minimal', price: '$300', image: require('../assets/Watches.png') },
    { id: '5', name: 'Vintage Style', price: '$400', image: require('../assets/Watches.png') },
    { id: '6', name: 'Sports Edition', price: '$500', image: require('../assets/Watches.png') },
  ];

  const hatsProducts = [
    { id: '1', name: 'Bucket Hat', price: '$50', image: require('../assets/Hats.png') },
    { id: '2', name: 'Fedora Hat', price: '$70', image: require('../assets/Hats.png') },
    { id: '3', name: 'Snapback Cap', price: '$90', image: require('../assets/Hats.png') },
    { id: '4', name: 'Trilby Hat', price: '$110', image: require('../assets/Hats.png') },
    { id: '5', name: 'Cowboy Hat', price: '$130', image: require('../assets/Hats.png') },
    { id: '6', name: 'Panama Hat', price: '$150', image: require('../assets/Hats.png') },
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const flatListRef = useRef(null);

  // Auto-scroll the banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentBannerIndex,
        animated: true,
      });
    }
  }, [currentBannerIndex]);

  // Helper function to validate Image sources
  const getImageSource = (image) => {
    return image ? (typeof image === 'string' ? { uri: image } : image) : require('../assets/new ar.jpg');
  };

  const renderProductSection = (title, products) => (
    <View style={styles[`section_${title.toLowerCase()}`]}>
      <View style={styles[`header_${title.toLowerCase()}`]}>
        <Text style={styles[`heading_${title.toLowerCase()}`]}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles[`seeAll_${title.toLowerCase()}`]}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((product) => (
          <View style={styles[`productCard_${title.toLowerCase()}`]} key={product.id}>
            {title === 'Watches' ? (
              <View style={styles.productWatch3DContainer}>
                <Image
                  source={getImageSource(product.image)}
                  style={styles[`productImage_${title.toLowerCase()}`]}
                />
                <LinearGradient
                  colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0)']}
                  style={styles.productWatch3DHighlight}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <View style={styles.product3DLabel}>
                  <Text style={styles.product3DText}>3D</Text>
                </View>
              </View>
            ) : (
              <Image
                source={getImageSource(product.image)}
                style={styles[`productImage_${title.toLowerCase()}`]}
              />
            )}
            <Text style={styles[`productName_${title.toLowerCase()}`]}>{product.name}</Text>
            <Text style={styles[`productPrice_${title.toLowerCase()}`]}>{product.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <ImageBackground source={require('../assets/new ar.jpg')} style={styles.headerBackground}>
          <View style={styles.headerOverlay} />
          <Text style={styles.headerText}>Try The Best-Then Invest</Text>
          <Text style={styles.headerSubtext}>Find everything you need for your family!</Text>
          <View style={styles.searchBar}>
            <Icon name="search-outline" size={20} color="#888" />
            <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#888" />
          </View>
        </ImageBackground>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Top Categories Section */}
        <View style={styles.section_topCategories}>
          <Text style={styles.heading_topCategories}>Top Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {topCategories.map((category) => (
              <View style={styles.card_topCategories} key={category.id}>
                <Image source={category.image} style={styles.image_topCategories} />
                <TouchableOpacity
                  style={styles.button_topCategories}
                  onPress={() => navigation.navigate(category.route)}
                >
                  <Text style={styles.textButton_topCategories}>{category.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Banner Slider Section */}
        <View style={styles.bannerContainer}>
          <FlatList
            ref={flatListRef}
            data={banners}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={getImageSource(item)} style={styles.bannerImage} />
            )}
          />
        </View>
        
        {/* Popular Products Section */}
        <View style={styles.textBelowImage}>
          <Text style={styles.heading_topCategories}>Popular Products</Text>
        </View>

        {/* Row of Popular Products Containers */}
        <View style={styles.rowContainer}>
          {/* Glasses */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Glasses')}
          >
            <Image source={require('../assets/G3.png')} style={styles.cardImage} />
          </TouchableOpacity>

          {/* Watches */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Watches')}
          >
            <Image source={require('../assets/Watches.png')} style={styles.cardImage} />
          </TouchableOpacity>

          {/* Hats */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Hats')}
          >
            <Image source={require('../assets/Hats.png')} style={styles.cardImage} />
          </TouchableOpacity>
        </View>

        {/* Product Sections */}
        {renderProductSection('Glasses', glassesProducts)}
        {renderProductSection('Watches', watchesProducts)}
        {renderProductSection('Hats', hatsProducts)}
        
        <VirtualFittingSection/>

        {/* AI Fashion Assistant Section */}
        <AIFashionAssistant />

        {/* Get Notified Section */}
        <Animated.View 
          style={[
            styles.notificationContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <LinearGradient
            colors={['#FFE4E6', '#FFF1F2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.notificationGradient}
          >
            <Text style={styles.notificationHeading}>
              Get Notified About New Products
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#999"
                style={styles.emailInput}
              />
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>

      </ScrollView>

      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  // Global Container
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },

  // Header Section
  headerContainer: {
    height: 220,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
    marginTop: -15,
  },
  headerBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(78, 77, 77, 0.68)',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    top: 5
  },
  headerSubtext: {
    fontSize: width * 0.035,
    color: '#eee',
    textAlign: 'center',
    top: 8,
    color: 'rgba(255, 255, 255, 0.98)',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.71)',
    borderRadius: 25,
    width: '70%',
    height: 35,
    paddingHorizontal: 15,
    top: 30,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
    color: 'rgb(0, 0, 0)',
  },
  searchInput: {
    flex: 1,
    fontSize: width * 0.035,
    color: 'rgb(0, 0, 0)',
  },
  
  // Scroll View Content
  contentContainer: {
    paddingBottom: 50,
  },

  // Top Categories Section
  section_topCategories: {
    marginTop: 20,
    left:20,
  },
  heading_topCategories: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(50, 50, 50)',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollView_topCategories: {
    marginTop: 10,
  },
  card_topCategories: {
    alignItems: 'center',
    marginRight: 20,
  },
  image_topCategories: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    left: 2,
  },
  button_topCategories: {
    backgroundColor: 'rgb(228, 105, 105)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginTop: 15,
    width: 80,
    height: 25,
    textAlign: 'center',
  },
  textButton_topCategories: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  // Banner Section
  bannerContainer: {
    marginVertical: 20,
    alignItems: 'center',
    width: 365,
    height: 200,
    left: 10,
    marginTop: 30,
  },
  bannerImage: {
    width: 365,
    height: width * 0.5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: '#fff',
  },
  
  // Popular Products Section
  section_popular: {
    marginTop: 50,
    paddingHorizontal: 15,
  },
  heading_popular: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'rgb(50, 50, 50)',
    marginBottom: 10,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: -30,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10, 
  },

  // Product Sections
  section_glasses: {
    marginTop: -10,
    paddingHorizontal: 10,
  },
  header_glasses: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  heading_glasses: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(50, 50, 50)',
  },
  seeAll_glasses: {
    fontSize: width * 0.035,
    color: 'rgb(228, 50, 50)',
    fontWeight: 'bold',
  },
  scrollView_glasses: {
    marginTop: 2,
  },
  productCard_glasses: {
    width: 130,
    height: 170,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
    marginTop: 4,
    left: 0,
    shadowColor: 'rgba(0, 0, 0, 0.1)', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  productImage_glasses: {
    width: 125,
    height: 110,
    borderRadius: 8,
    marginTop: -8
  },
  productName_glasses: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgb(50, 50, 50)',
    marginTop: 5,
    textAlign: 'center',
  },
  productPrice_glasses: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgb(228, 50, 50)',
  },

  // Watches Section
  section_watches: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  header_watches: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  heading_watches: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: 'rgb(50, 50, 50)',
  },
  seeAll_watches: {
    fontSize: width * 0.035,
    color: 'rgb(228, 50, 50)',
    fontWeight: 'bold',
  },
  scrollView_watches: {
    marginTop: 5,
  },
  productCard_watches: {
    width: 130,
    height: 170,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
    marginTop: 4,
    left: 0,
    shadowColor: 'rgba(0, 0, 0, 0.1)', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  productImage_watches: {
    width: 125,
    height: 110,
    borderRadius: 8,
    marginTop: -8
  },
  productName_watches: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgb(50, 50, 50)',
    marginTop: 5,
    textAlign: 'center',
  },
  productPrice_watches: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgb(228, 50, 50)',
  },

  // Hats Section
  section_hats: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  header_hats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  heading_hats: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: 'rgb(50, 50, 50)',
  },
  seeAll_hats: {
    fontSize: width * 0.035,
    color: 'rgb(228, 50, 50)',
    fontWeight: 'bold',
  },
  scrollView_hats: {
    marginTop: 5,
  },
  productCard_hats: {
    width: 130,
    height: 170,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
    marginTop: 4,
    left: 0,
    shadowColor: 'rgba(0, 0, 0, 0.1)', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  productImage_hats: {
    width: 125,
    height: 110,
    borderRadius: 8,
    marginTop: -8
  },
  productName_hats: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgb(50, 50, 50)',
    marginTop: 5,
    textAlign: 'center',
  },
  productPrice_hats: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgb(228, 50, 50)',
  },

  // Get Notified Section
  notificationContainer: {
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    marginBottom: 20,
  },
  notificationGradient: {
    padding: 20,
  },
  notificationHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emailInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#E46969',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

});

export default Home;
