import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Expo version
// import LinearGradient from 'react-native-linear-gradient'; // Uncomment for non-Expo projects

const { height, width } = Dimensions.get("window");

const ModalBg = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2193b0", "#6dd5ed"]} // Gradient colors (customize as needed)
        style={styles.gradient}
      >
        {/* Your modal content will go here */}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute", // Position the modal absolutely
    top: 0,
    left: 0,
    height: height, // Full screen height
    width: width, // Full screen width
    justifyContent: "center", // Centers the content vertically
    alignItems: "center", // Centers the content horizontally
    zIndex: 1000, // Ensure it appears above other content
  },
  gradient: {
    height: "100%", // Full screen height
    width: "100%", // Full screen width
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
});

export default ModalBg;
