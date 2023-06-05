import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getDatabase, ref, set } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SuggestionScreen = () => {
  const [suggest, setSuggest] = useState("");

  const [user, setUser] = useState();

  const load = async () => {
    const jsonValue = await AsyncStorage.getItem("User");
    setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
  };
  useEffect(() => {
    load();
  }, []);

  const addSuggest = () => {
    const db = getDatabase();
    console.log(suggest);
    const reference = ref(db, "suggestions/" + user.email.replace(".", ""));
    set(reference, {
      name: user.name,
      email: user.email,
      phone: user.phone,
      suggestion: suggest,
    });
    alert("Suggestion Submitted!");
  };

  const suggestionInputChange = (val) => {
    setSuggest(val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formView}>
        <View style={styles.inputView}>
          <Text style={styles.textInputStyle}>Suggestion</Text>
          <TextInput
            placeholder="Enter Suggestion..."
            style={styles.textInputViewSuggestion}
            multiline={true}
            onChangeText={(val) => suggestionInputChange(val)}
          ></TextInput>
        </View>

        <View style={styles.buttonView}>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={addSuggest}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BEBEBE",
  },
  formView: {
    marginTop: 60,
    marginRight: 22,
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textInputView: {
    borderWidth: 2,
    borderColor: "black",
    padding: 8,
    marginLeft: 20,
    width: 230,
  },
  textInputViewSuggestion: {
    borderWidth: 2,
    borderColor: "black",
    padding: 9,
    marginLeft: 20,
    width: 230,
    height: 80,
  },
  buttonView: {
    alignItems: "center",
    marginLeft: 50,
  },
  buttonStyle: {
    marginTop: 10,
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#1D7874",
  },
  textStyle: {
    color: "white",
    fontSize: 18,
  },
  textInputStyle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SuggestionScreen;
