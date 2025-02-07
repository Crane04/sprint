import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";
import Home from "./src/screens/Home";
import Tabs from "./src/components/Tabs";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "@expo-google-fonts/open-sans";
import { AuthProvider } from "./src/contexts/AuthContext";
import Splash from "./src/screens/Splash";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { ShadowsIntoLight_400Regular } from "@expo-google-fonts/shadows-into-light";
import ClassUpdate from "./src/screens/ClassUpdate";

const Stack = createNativeStackNavigator();

const App = () => {
  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    ShadowsIntoLight_400Regular,
  });

  // Manage splash screen visibility
  useEffect(() => {
    const prepareSplashScreen = async () => {
      if (!fontsLoaded) {
        await SplashScreen.preventAutoHideAsync(); // Keep splash screen visible
      } else {
        await SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
      }
    };
    prepareSplashScreen();
  }, [fontsLoaded]);

  // Fallback UI while fonts are loading
  if (!fontsLoaded) {
    return null; // Or a custom loading component
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ title: "Sign Up", headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "Sign Up", headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "Sign In", headerShown: false }}
          />

          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ClassUpdate"
            component={ClassUpdate}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
