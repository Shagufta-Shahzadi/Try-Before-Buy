import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";


// Import all screens
import Home1 from './screens/Home1';
import LOGIN from './screens/LOGIN';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Men from "./screens/Mens";
import ProductList from "./Components/ProductList";
import AddtoCart from "./screens/AddtoCart";
import Footer from "./screens/Footer";
import ECommerceSettings from "./screens/ECommerceSettings";
import UserProfile from "./screens/UserProfile";
import ProductDetail from "./screens/ProductDetail";
import OrderDisplayScreen from "./screens/OrderDisplayScreen";
import Women from "./screens/Women";
import Kids from "./screens/Kids";
import CameraWithCategorie1 from "./screens/CameraWithCategorie1";
import OurTeam from "./screens/OurTeam";
import SplashScreen from "./screens/SplashScreen";
import AIChat from "./screens/AIChat";
import AIFashionAssistant from './Components/AIFashionAssistant';
import AIWelcomeScreen from "./screens/AIWelcomeScreen";
import AIUnifiedScreen from "./screens/AIUnifiedScreen";
import { AIResultHistoryScreen } from "./screens/AI Result-History Screen";


const Stack = createStackNavigator(); // Define Stack Navigator

const App = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "PoltawskiNowy-Regular": require("./assets/fonts/PoltawskiNowy-Regular.ttf"),
    "PoltawskiNowy-SemiBold": require("./assets/fonts/PoltawskiNowy-SemiBold.ttf"),
    "PoltawskiNowy-Bold": require("./assets/fonts/PoltawskiNowy-Bold.ttf"),
    "Convergence-Regular": require("./assets/fonts/Convergence-Regular.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "PlusJakartaSans-SemiBold": require("./assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-ExtraBold": require("./assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer>
         <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Home1" component={Home1} />
          <Stack.Screen name="LOGIN" component={LOGIN} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Mens" component={Men} />
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen name="AddtoCart" component={AddtoCart} />
          <Stack.Screen name="Footer" component={Footer} />
          <Stack.Screen name="ECommerceSettings" component={ECommerceSettings} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="OrderDisplayScreen" component={OrderDisplayScreen} />
          <Stack.Screen name="Women" component={Women} />
          <Stack.Screen name="Kids" component={Kids} />
          <Stack.Screen name="CameraWithCategorie1" component={CameraWithCategorie1} />
          <Stack.Screen name="OurTeam" component={OurTeam} />
          <Stack.Screen name="AIChat" component={AIChat} />
          <Stack.Screen name="AIFashionAssistant" component={AIFashionAssistant} />
          <Stack.Screen name="AIWelcomeScreen" component={AIWelcomeScreen} />
          <Stack.Screen name="AIUnifiedScreen" component={AIUnifiedScreen} />
          <Stack.Screen name="AIResultHistoryScreen" component={AIResultHistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;