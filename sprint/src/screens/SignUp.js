import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import Text from "../components/Text";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import { styles } from "./SignIn";
import postRequest from "../api/postRequest";
const levels_options = [
  { label: "100 Level", value: "100" },
  { label: "200 Level", value: "200" },
  { label: "300 Level", value: "300" },
  { label: "400 Level", value: "400" },
  { label: "500 Level", value: "500" },
];
const departments_options = [
  { label: "Mechanical Engineering", value: "Mechanical Engineering" },
  {
    label: "Electrical and Electronics Engineering",
    value: "Electrical and Electronics Engineering",
  },
  {
    label: "Chemical and Polymer Engineering",
    value: "Chemical and Polymer Engineering",
  },
  { label: "Aerospace Engineering", value: "Aerospace Engineering" },
  { label: "Indsutrial Engineering", value: "Indsutrial Engineering" },
  { label: "Civil Engineering", value: "Civil Engineering" },
];
const SignInScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (
      !firstName ||
      !password ||
      !matricNumber ||
      !email ||
      !department ||
      !level
    ) {
      let errorMessage = "The following fields are required:\n";

      if (!firstName) errorMessage += "- First Name\n";
      if (!password) errorMessage += "- Password\n";
      if (!email) errorMessage += "- Email\n";
      if (!matricNumber) errorMessage += "- Matric Number\n";
      if (!department) errorMessage += "- Department\n";
      if (!level) errorMessage += "- Level\n";

      alert(errorMessage);
      return;
    }

    if (password !== cPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoading(true);

    try {
      const response = await postRequest("/users/create", {
        firstName,
        lastName,
        matricNumber,
        email,
        department,
        level,
        password,
      });

      if (response.status === 201) {
        // Login successful, navigate to the next screen
        alert(response?.data?.message);
        navigation.navigate("SignIn");
      } else {
        // Login failed, display an error message
        alert(response?.data?.message);
      }
    } catch (error) {
      console.error(error);
      alert(error?.data?.message || "An error occured");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Create An Account</Text>
          <Input
            label={"First Name"}
            placeholder="John"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <Input
            label={"Last Name"}
            placeholder="Doe"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <Input
            label={"Matric Number"}
            placeholder="220221XYZ"
            value={matricNumber}
            onChangeText={(text) => setMatricNumber(text)}
            type={"number-pad"}
          />
          <Input
            label={"Email"}
            placeholder="johndoe@lasu.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Input
            label={"Department"}
            placeholder="Mecanical Engineering"
            value={department}
            onChangeText={(text) => {
              return setDepartment(text["value"]);
            }}
            options={departments_options}
          />
          <Input
            label={"Level"}
            placeholder="300 Level"
            value={level}
            onChangeText={(text) => {
              return setLevel(text["value"]);
            }}
            options={levels_options}
          />
          <Input
            label={"Password"}
            placeholder="*******"
            value={password}
            onChangeText={(text) => setPassword(text)}
            // secureTextEntry
          />
          <Input
            label={"Confirm Password"}
            placeholder="*******"
            value={cPassword}
            onChangeText={(text) => setCPassword(text)}
            // secureTextEntry12
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="#7F38FF" />
          ) : (
            <Button text="Sign Up" onPress={handleSignUp} />
          )}
          <View style={styles.bottom}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.authText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default SignInScreen;
