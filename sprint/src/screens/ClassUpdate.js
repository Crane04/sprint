import React, { useState, useEffect } from "react";
import { StyleSheet, View, Modal } from "react-native";
import Container from "../components/Container";
import BackBtn from "../components/BackBtn";
import Text from "../components/Text";
import getRequest from "../api/getRequest";
import moment from "moment";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import RescheduleUpdate from "../components/RescheduleClass";
import postRequest from "../api/postRequest";
import { useNavigation } from "@react-navigation/native";
const ClassUpdate = ({ route }) => {
  const { id } = route.params;
  const [update, setUpdate] = useState([]);
  const [loading, setLoading] = useState([]);
  const [userData, setUserData] = useState({});
  const { jwt } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

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
    } catch (error) {
      console.error("Error loading JWT:", error);
      navigation.navigate("SignIn");
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const fetchClassUpdate = async () => {
    // try {
    const response = await getRequest(`/updates/${id}`, {});
    setUpdate(response);
    // } catch (error) {}
  };
  const closeAddUpdate = () => {
    setModalVisible(false);
    fetchClassUpdate();
  };
  useEffect(() => {
    // alert(id)
    fetchClassUpdate();
  }, []);
  const duration =
    update?.startsBy && update?.endsBy
      ? `${moment(update?.endsBy).diff(moment(update?.startsBy), "hours")}hrs ${
          moment(update?.endsBy).diff(moment(update?.startsBy), "minutes") % 60
        }mins`
      : "Duration not available";
  ("Duration not available");

  const handleDeleteUpdate = async () => {
    try {
      const response = await postRequest(
        `/updates/delete/${id}`,
        {id},
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(response);
      if (response?.data?.success) {
        alert("Update deleted successfully!");
        navigation.navigate("Tabs")
      } else {
        alert(response?.data?.message || "Sorry, an error occurred");
      }
    } catch (error) {
      alert("Failed to create update. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container bg={"#ADD8E6"}>
      <View style={styles.container}>
        <BackBtn title={"Class Update"} />
        <View style={styles.card}>
          <Text style={styles.header}>Class Details</Text>
          {[
            { label: "Course Code", value: update?.course?.code },
            { label: "Course Title", value: update?.course?.title },
            { label: "Lecturer", value: update?.lecturer },
            {
              label: "Starts By",
              value: update?.startsBy
                ? moment.utc(update.startsBy).local().format("MMMM Do YYYY, h:mm A")
                : "",
            },
            {
              label: "Ends By",
              value: update?.endsBy
                ? moment.utc(update?.endsBy).local().format("MMMM Do YYYY, h:mm A")
                : "",
            },
            { label: "Duration", value: duration },
            {
              label: "Posted By",
              value:
                update?.postedBy?.firstName + " " + update?.postedBy?.lastName,
            },
          ].map((item, index) => (
            <View key={index} style={styles.unitCard}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>
        {userData?.studentType !== "normal" && (
          <View style={styles.buttons}>
            <Button
              text={"Reschedule"}
              style={styles.btn}
              onPress={() => {
                setModalVisible(true);
              }}
            />
            <View style={{ padding: 5 }} />
            <Button
              text={"Delete"}
              style={styles.btn}
              onPress={() => {
                handleDeleteUpdate();
              }}
            />
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          visible={modalVisible}
        >
          <RescheduleUpdate
            type="class"
            cancel={closeAddUpdate}
            id={update?._id}
          />
        </Modal>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2A2D34",
    textAlign: "center",
    marginBottom: 15,
  },
  unitCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#F8FAFF",
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4A90E2",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    // marginBottom: 10,
  },
  btn: {
    paddingHorizontal: 20,
    marginLeft: 15,
  },
});

export default ClassUpdate;
