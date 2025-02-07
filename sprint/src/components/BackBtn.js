import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Text from "./Text";
const BackBtn = ({ title }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.backBtn}
      onPress={() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }}
    >
      <View style={styles.backIcon}>
        <MaterialIcons name="keyboard-backspace" color={"#fff"} size={24} />
      </View>

      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
  },
  backIcon: {
    backgroundColor: "#000",
    padding: 3,
    borderRadius: 5,
  },
});

export default BackBtn;
