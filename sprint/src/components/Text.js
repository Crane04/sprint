import { Text, StyleSheet } from "react-native";

const WText = ({ children, style }) => {
  return <Text style={[styles.text, style]}> {children}</Text>;
};
const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins_400Regular",
    color: "#002366",
    fontSize: 16
  },
});
export default WText;
