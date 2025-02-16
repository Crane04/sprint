import Input from "./Input";
import Button from "./Button";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import Text from "./Text";
import getRequest from "../api/getRequest";
import postRequest from "../api/postRequest";
import { useAuth } from "../contexts/AuthContext";
const NewUpdate = ({ type, cancel }) => {
  const { jwt } = useAuth();
  const [loading, setLoading] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    course: "",
    lecturer: "",
    startsBy: new Date(),
    endsBy: new Date(),
    venue: "",
  });
  const [courses, setCourses] = useState([]);
  const handleCreateUpdate = async () => {
    setLoading(true);
    if (
      !newUpdate.course ||
      !newUpdate.lecturer ||
      !newUpdate.startsBy ||
      !newUpdate.endsBy ||
      !type ||
      !newUpdate.venue
    ) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await postRequest(
        "/updates/create",
        {
          courseCode: newUpdate.course,
          lecturer: newUpdate.lecturer,
          startsBy: newUpdate.startsBy,
          endsBy: newUpdate.endsBy,
          type,
          venue: newUpdate.venue,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      console.log(response);
      if (response?.data?.course) {
        alert("Update created successfully!");
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

  const getCourses = async () => {
    try {
      const response = await getRequest("/courses/get", {
        headers: { Authorization: `Bearer ${jwt}` },
      }); // Fetch courses
      setCourses(
        response.map((course) => ({
          label: course.code,
          value: course.code,
        }))
      ); // Map response before setting state
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Create {type} Update</Text>
        <Input
          label="Course"
          value={newUpdate.course}
          onChangeText={(text) =>
            setNewUpdate({ ...newUpdate, course: text.value })
          }
          options={courses}
        />
        <Input
          label="Lecturer"
          value={newUpdate.lecturer}
          onChangeText={(text) =>
            setNewUpdate({ ...newUpdate, lecturer: text })
          }
        />
        <Input
          label="Venue"
          value={newUpdate.venue}
          onChangeText={(text) => setNewUpdate({ ...newUpdate, venue: text })}
        />
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
            <Button text="Create" onPress={handleCreateUpdate} />
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
export default NewUpdate;
