import Container from "../components/Container";
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Text from "../components/Text";
import getRequest from "../api/getRequest";
import postRequest from "../api/postRequest";
// import deleteRequest from "../api/deleteRequest";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const Courses = () => {
  const { jwt } = useAuth();
  const [courses, setCourses] = useState({
    registeredCourses: [],
    unregisteredCourses: [],
  });
  const [selectedCourses, setSelectedCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await getRequest("/users/courses", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setCourses(response);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const toggleSelect = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course.code)
        ? prev.filter((code) => code !== course.code)
        : [...prev, course.code]
    );
  };

  const registerCourses = async () => {
    try {
      await postRequest(
        "/users/register-course",
        { courseCodes: selectedCourses },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      fetchCourses(); // Refresh the course list
      setSelectedCourses([]);
    } catch (error) {
      console.error("Error registering courses:", error);
    }
  };

  const unregisterCourses = async () => {
    try {
      await postRequest(
        "/users/unregister-course",
        { courseCodes: selectedCourses },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      fetchCourses(); // Refresh the course list
      setSelectedCourses([]);
    } catch (error) {
      console.error("Error unregistering courses:", error);
    }
  };

  const renderCourseItem = ({ item }) => {
    const isSelected = selectedCourses.includes(item.code);

    return (
      <TouchableOpacity
        style={[styles.courseItem, isSelected && styles.selected]}
        onPress={() => toggleSelect(item)}
      >
        <Text style={styles.courseCode}>{item.code}</Text>
        <Text style={styles.courseTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container bg={"#ADD8E6"}>
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Registered Courses</Text>
        <FlatList
          data={courses.registeredCourses}
          renderItem={({ item }) =>
            renderCourseItem({ item, isRegistered: true })
          }
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No registered courses</Text>
          }
        />

        <Text style={styles.sectionTitle}>Unregistered Courses</Text>
        <FlatList
          data={courses.unregisteredCourses}
          renderItem={({ item }) =>
            renderCourseItem({ item, isRegistered: false })
          }
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No unregistered courses</Text>
          }
        />

        {selectedCourses.length > 0 && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={registerCourses}
            >
              <Text style={styles.buttonText}>Register Selected</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.unregisterButton}
              onPress={unregisterCourses}
            >
              <Text style={styles.buttonText}>Unregister Selected</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
  },
  courseItem: {
    backgroundColor: "#f3e5f5",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  selected: {
    backgroundColor: "#d1c4e9",
  },
  courseCode: {
    fontSize: 16,
    color: "#333",
  },
  courseTitle: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 14,
    color: "#999",
    marginVertical: 10,
  },
  buttonContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  registerButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  unregisterButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Courses;
