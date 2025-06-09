import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Animated,
  Dimensions,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Footer from "./Footer";

const { width } = Dimensions.get('window');

const teamMembers = [
  {
    id: "1",
    name: "Mudassir Murtaza Baloch",
    role: "CV/ML Engineer",
    email: "mudassir345b@gmail.com",
    bio: "Machine learning engineer focused on developing computer vision solutions using deep learning and AI tools.",
    image: require("../assets/16.jpeg"),
    social: {
      linkedin: "https://linkedin.com/in/mudassir-baloch",
      facebook: "https://facebook.com/mudassirbaloch",
      instagram: "https://instagram.com/mudassir_baloch",
      github: "https://github.com/mudassir-baloch"
    }
  },
  {
    id: "2",
    name: "Shagufta Shahzadi",
    role: "MERN Stack Developer",
    email: "shaguftashahzadi18@gmail.com",
    bio: "Skilled MERN Stack Developer specializing in building robust web applications with MERN . Passionate about creating efficient, scalable solutions and user-friendly interfaces that deliver exceptional user experiences.",
    image: require("../assets/shagufta.jpg"),
    social: {
      linkedin: "https://www.linkedin.com/in/shagufta-khan-360798284",
      facebook: "https://facebook.com/shagufta.shahzadi",
      instagram: "https://instagram.com/shagufta_design",
      github: "https://github.com/shagufta-shahzadi"
    }
  },
];

export default function OurTeam() {
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const titleAnim = React.useRef(new Animated.Value(0)).current;
  const subtitleAnim = React.useRef(new Animated.Value(0)).current;
  const cardAnims = teamMembers.map(() => React.useRef(new Animated.Value(0)).current);
  
  useEffect(() => {
    // Animate header
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 1200,
        delay: 300,
        useNativeDriver: true,
      })
    ]).start();

    // Animate cards with staggered delay
    const cardAnimations = cardAnims.map((anim, index) => 
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: 600 + (index * 200),
        useNativeDriver: true,
      })
    );
    
    Animated.stagger(200, cardAnimations).start();
  }, []);

  const openLink = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Cannot open URL: " + url);
      }
    });
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4A90E2" barStyle="light-content" />
      
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Animated.Text 
          style={[
            styles.headerTitle,
            { opacity: titleAnim }
          ]}
        >
          Our Team
        </Animated.Text>
      </View>

      {/* Team Members List */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Section */}
        <Animated.View 
          style={[
            styles.introSection,
            { 
              opacity: subtitleAnim,
              transform: [{ 
                translateY: subtitleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })
              }]
            }
          ]}
        >
          <Text style={styles.introTitle}>Meet The Experts</Text>
          <View style={styles.introLine} />
          <Text style={styles.introText}>
            Behind our success is a team of dedicated professionals committed to excellence and innovation in every project.
          </Text>
        </Animated.View>

        <View style={styles.listContainer}>
          {teamMembers.map((item, index) => (
            <Animated.View 
              key={item.id} 
              style={[
                styles.teamMemberCard,
                {
                  opacity: cardAnims[index],
                  transform: [
                    { 
                      translateY: cardAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0]
                      }) 
                    },
                    { 
                      scale: cardAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1]
                      }) 
                    }
                  ]
                }
              ]}
            >
              <View style={styles.cardHeader}>
                <Image source={item.image} style={styles.memberImage} />
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{item.name}</Text>
                  <Text style={styles.memberRole}>{item.role}</Text>
                  <Text style={styles.memberEmail}>{item.email}</Text>
                </View>
              </View>
              
              <Text style={styles.memberBio}>{item.bio}</Text>
                
              <View style={styles.divider} />
                
              <View style={styles.socialIcons}>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => openLink(item.social.linkedin)}
                >
                  <MaterialCommunityIcons name="linkedin" size={22} color="#0077B5" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => openLink(item.social.github)}
                >
                  <MaterialCommunityIcons name="github" size={22} color="#333" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => openLink(item.social.facebook)}
                >
                  <MaterialCommunityIcons name="facebook" size={22} color="#1877F2" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => openLink(item.social.instagram)}
                >
                  <MaterialCommunityIcons name="instagram" size={22} color="#E4405F" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer onTabPress={(tab) => console.log(tab)} activeTab="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  scrollContent: {
    paddingBottom: 100,
    paddingTop: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A90E2",
    paddingTop: 30,
    paddingBottom: 15,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  backButton: {
    position: "absolute",
    left: 20,
    bottom: 15,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    letterSpacing: 0.5,
  },
  introSection: {
    marginTop: 90, // Space for fixed header
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  introTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a56db",
    textAlign: "center",
  },
  introLine: {
    width: 50,
    height: 3,
    backgroundColor: "#1a56db",
    marginVertical: 12,
    borderRadius: 10,
  },
  introText: {
    fontSize: 16,
    color: "#4a5568",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 20,
    fontWeight: "400",
    width: "90%",
  },
  listContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  teamMemberCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    width: width - 40,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  memberImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#C4C4C4",
    borderWidth: 3,
    borderColor: "#F0F4FF",
  },
  memberInfo: {
    marginLeft: 15,
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3748",
  },
  memberRole: {
    fontSize: 14,
    color: "#1a56db",
    marginTop: 4,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  memberEmail: {
    fontSize: 12,
    color: "#718096",
    marginTop: 4,
  },
  memberBio: {
    fontSize: 14,
    color: "#4a5568",
    lineHeight: 22,
    marginBottom: 15,
    fontWeight: "400",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 15,
    width: "100%",
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 8,
  },
  socialButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#F7FAFC",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EDF2F7",
  },
});