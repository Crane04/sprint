import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import Text from "../components/Text";
import Container from "../components/Container";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getRequest from "../api/getRequest";

const NAVIGATION_TIMEOUT = 2000;

const Splash = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          try {
            const response = await getRequest("/users/get", {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response._id) {
              navigateToNextScreen("Tabs");
            } else {
              navigateToNextScreen("SignIn");
            }
          } catch (error) {
            console.error("Error fetching user:", error);
            navigateToNextScreen("SignIn");
          } finally {
            setLoading(false);
          }
        } else {
          navigateToNextScreen("SignIn");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading JWT:", error);
        navigateToNextScreen("SignIn");
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const navigateToNextScreen = (screenName) => {
    setTimeout(() => {
      navigation.reset({
        routes: [{ name: screenName }],
        index: 0,
      });
    }, NAVIGATION_TIMEOUT);
  };

  return (
    <Container bg={"#ADD8E6"}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#6A1B9A" />
        ) : (
          <>
            <FontAwesome name="bell" size={150} color="#002366" />
            <Text style={styles.brandName}>UP!</Text>
            <Text>Get latest class updates seamlessly!</Text>
          </>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  brandName: {
    fontSize: 50,
    fontFamily: "ShadowsIntoLight_400Regular",
    margin: 15,
  },
});

export default Splash;
