import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Text from "./Text";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  type,
  options,
}) => {
  const [open, setOpen] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  if (options) {
    console.log(options)
    return (
      <>
        <Text style={styles.label}>{label}</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={options}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={onChangeText}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />
      </>
    );
  }
  if (type === "date") {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text onPress={() => setOpen(true)} style={styles.dateText}>
          {value.toISOString().split("T")[0]}
        </Text>
        <DateTimePicker
          mode="datetime"
          display="default"
          value={value}
          onChange={(event, newDate) => {
            onChangeText(newDate);
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={type ? type : "default"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderColor: "#002366",
    borderWidth: 1,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    padding: 10,
    borderColor: "rgb(79 70 229)",
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default Input;
