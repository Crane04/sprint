// navigation/BottomTabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Courses from "../screens/Courses";
import Ionicons from "@expo/vector-icons/Ionicons";
const Tab = createBottomTabNavigator();


const EventsScreen = () => {};
const BottomTabs = () => {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Courses") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Events") {
            iconName = focused ? "calendar" : "calendar-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.activeTintColor,
        inactiveTintColor: Colors.inactiveTintColor,
        style: {
          backgroundColor: Colors.tabBarBackground,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Courses"
        component={Courses}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};
const Colors = {
  activeTintColor: "#3498db",
  inactiveTintColor: "#ccc",
  tabBarBackground: "#fff",
};
export default BottomTabs;
