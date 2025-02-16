import Input from "./Input";
import Button from "./Button";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import Text from "./Text";
import getRequest from "../api/getRequest";
import postRequest from "../api/postRequest";
import { useAuth } from "../contexts/AuthContext";
const RescheduleUpdate = ({ type, cancel, id }) => {
  const { jwt } = useAuth();
  const [loading, setLoading] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    startsBy: new Date(),
    endsBy: new Date(),
    venue: "",
  });
  const [courses, setCourses] = useState([]);
  const handleCreateUpdate = async () => {
    setLoading(true);
    if (!newUpdate.startsBy || !newUpdate.endsBy || !type) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await postRequest(
        `/updates/update/${id}`,
        {
          startsBy: newUpdate.startsBy,
          endsBy: newUpdate.endsBy,
          type,
          venue: newUpdate.venue
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(response);
      if (response?.data?.course) {
        alert("Update rescheduled successfully!");
        cancel(false);
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
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Reschedule {type} Update</Text>

        <Input
          label="Start Time"
          placeholder="YYYY-MM-DD HH:mm"
          value={newUpdate.startsBy}
          onChangeText={(text) =>
            setNewUpdate({ ...newUpdate, startsBy: text })
          }
          type={"date"}
        />
        <Input
          label="End Time"
          placeholder="YYYY-MM-DD HH:mm"
          value={newUpdate.endsBy}
          onChangeText={(text) => setNewUpdate({ ...newUpdate, endsBy: text })}
          type={"date"}
        />
        <Input
          label="Venue"
          value={newUpdate.venue}
          onChangeText={(text) => setNewUpdate({ ...newUpdate, venue: text })}
        />
        <View style={styles.buttonContainer}>
          <Button
            text="Cancel"
            color="red"
            onPress={() => cancel(false)}
            style={{ marginBottom: 5 }}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#7F38FF" />
          ) : (
            <Button text="Reschedule" onPress={handleCreateUpdate} />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "capitalize",
  },
});
export default RescheduleUpdate;
