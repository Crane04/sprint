import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Text from "./Text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
const Header = ({ userData }) => {
  const navigation = useNavigation();
  const { jwt, logout } = useAuth();
  const logoutUser = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          logout();
          navigation.reset({
            routes: [{ name: "SignIn" }],
            index: 0,
          });
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.text}>Hello,</Text>
        <Text>{userData?.firstName + " " + userData?.lastName}</Text>
      </View>

      <TouchableOpacity style={styles.right} onPress={logoutUser}>
        <MaterialIcons name="logout" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  left: {
    flexDirection: "row",
  },
  text: {
    fontFamily: "Poppins_700Bold",
  },
});
export default Header;
