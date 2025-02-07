import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Header from "../components/Header";
import ClassUpdates from "../components/ClassUpdates";
import TestUpdates from "../components/TestUpdates";
import getRequest from "../api/getRequest";
import { useAuth } from "../contexts/AuthContext";
import { usePushNotifications } from "../contexts/NotificationContext";
import postRequest from "../api/postRequest";
const Home = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState([]);
  const { jwt } = useAuth();
  const { expoPushToken, notification } = usePushNotifications();

  const getUser = async () => {
    // if (!jwt) return;
    try {
      // if (jwt) {
      try {
        const response = await getRequest("/users/get", {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        if (response._id) {
          console.log(response);
          setUserData(response);
        } else {
          navigation.navigate("SignIn");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigation.navigate("SignIn");
      } finally {
        setLoading(false);
      }
      // } else {
      //   navigation.navigate("SignIn");
      //   setLoading(false);
      // }
    } catch (error) {
      console.error("Error loading JWT:", error);
      navigation.navigate("SignIn");
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const updateExpoPush = async () => {
      if (expoPushToken?.data) {
        // alert(expoPushToken.data);
        if (expoPushToken.data != userData.notificationID) {
          try {
            const response = await postRequest(
              "/users/update-not-id",
              {
                notificationID: expoPushToken?.data,
              },
              {
                headers: { Authorization: `Bearer ${jwt}` },
              }
            );
          } catch (error) {
            console.log(JSON.stringify(error));
          }
        }
      }
    };
    updateExpoPush();
  }, [expoPushToken?.data]);
  return (
    <Container bg={"#ADD8E6"}>
      <ScrollView style={styles.container}>
        <Header userData={userData} />
        <ClassUpdates userData={userData} />
        <TestUpdates userData={userData} />
      </ScrollView>
      {/* <ModalBg /> */}
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
});

export default Home;
