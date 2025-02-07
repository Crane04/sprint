import { Touchable, TouchableOpacity, View, Modal } from "react-native";
import Text from "./Text";
import { StyleSheet, FlatList } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import getRequest from "../api/getRequest";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import moment from "moment";
import NewUpdate from "./NewUpdate";
import { styles } from "./ClassUpdates";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const TestUpdates = ({ userData }) => {
  const navigation = useNavigation();
  const { jwt } = useAuth();
  const [updates, setUpdates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchClassUpdates = async () => {
    try {
      const response = await getRequest("/updates/all?type=test", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setUpdates(response);
      console.log(response.length);
    } catch (error) {}
  };

  useEffect(() => {
    fetchClassUpdates();
  }, []);
  const closeAddUpdate = () => {
    setModalVisible(false);
    fetchClassUpdates();
  };
  const renderItem = ({ item }) => {
    const startTime = moment.utc(item.startsBy).local().add(-1, "hours"); // Add 1 hour
    const endTime = moment.utc(item.endsBy).local().add(-1, "hours"); // Add 1 hour
    const currentTime = moment(); // Local time

    const timeDifference = startTime.diff(currentTime, "minutes");
    const hasEnded = currentTime.isAfter(endTime);

    const timeLeftToStart =
      timeDifference > 0
        ? `Starts in ${startTime.fromNow()}`
        : hasEnded
        ? `Ended ${endTime.fromNow(true)} ago`
        : `Started ${startTime.fromNow(true)} ago`;

    // Conditional styles
    const backgroundColor = hasEnded
      ? "#002366" // Dark blue for ended
      : timeDifference > 0
      ? "#fff" // White for not started
      : "#d4f8d4"; // Green for started

    const textColor = hasEnded ? "#fff" : "#333"; // White text for ended, dark text otherwise

    return (
      <TouchableOpacity
        style={[styles.update, { backgroundColor }]} // Apply conditional background color
        onPress={() => {
          navigation.navigate("ClassUpdate", {
            id: item._id,
          });
        }}
      >
        <View style={styles.left}>
          <Text style={[styles.boldText, { color: textColor }]}>
            {item?.course?.code}
          </Text>
          <Text style={[styles.text, { color: textColor }]}>
            {item.lecturer}
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={[styles.text, { color: textColor }]}>
            {`${timeLeftToStart}`}
          </Text>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={textColor}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.sectionTitle}>Latest Test Updates</Text>
          {userData?.studentType !== "normal" && (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MaterialIcons name="add-box" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.updatesBox}>
          <View style={styles.updates}>
            {updates.length === 0 ? (
              <Text style={styles.noUpdatesText}>No Class Updates</Text>
            ) : (
              <FlatList
                data={updates}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
              />
            )}
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <NewUpdate type="test" cancel={closeAddUpdate} />
      </Modal>
    </>
  );
};

export default TestUpdates;
