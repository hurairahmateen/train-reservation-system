import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";

import { FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";
import { getDatabase, ref, set } from "firebase/database";

const SignUpScreen = ({ navigation }) => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    secureTextEntry: true,
  });

  const checkSignUp = () => {
    const db = getDatabase();
    console.log(data);
    const reference = ref(db, "users/" + data.email.replace(".", ""));
    set(reference, {
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      isAdmin: false,
    });
    alert("Successfully Created Account!");
  };

  const nameInputChange = (val) => {
    setData({
      ...data,
      name: val,
    });
  };

  const phoneInputChange = (val) => {
    setData({
      ...data,
      phone: val,
    });
  };

  const emailInputChange = (val) => {
    setData({
      ...data,
      email: val,
    });
  };

  const passwordInputChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Yourself!</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.text_footer}>Name</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} color="#071E22" />
          <TextInput
            style={styles.textInput}
            placeholder="Your Name"
            autoCapitalize="none"
            onChangeText={(val) => nameInputChange(val)}
          />
        </View>

        <Text style={[styles.text_footer, { marginTop: 15 }]}>Phone No</Text>
        <View style={styles.action}>
          <FontAwesome name="phone" size={20} color="#071E22" />
          <TextInput
            style={styles.textInput}
            placeholder="Your Phone"
            autoCapitalize="none"
            onChangeText={(val) => phoneInputChange(val)}
          />
        </View>

        <Text style={[styles.text_footer, { marginTop: 15 }]}>Email</Text>
        <View style={styles.action}>
          <MaterialIcons name="email" size={20} color="#071E22" />
          <TextInput
            style={styles.textInput}
            placeholder="Your Email"
            autoCapitalize="none"
            onChangeText={(val) => emailInputChange(val)}
          />
          {data.email.length !== 0 ? (
            <Feather name="check-circle" size={20} color="#679289" />
          ) : null}
        </View>

        <Text style={[styles.text_footer, { marginTop: 15 }]}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" size={20} color="#071E22" />
          <TextInput
            style={styles.textInput}
            placeholder="Your Password"
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => passwordInputChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" size={20} color="#071E22" />
            ) : (
              <Feather name="eye" size={20} color="#071E22" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={checkSignUp} style={styles.signIn}>
            <Text style={styles.textSign}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.signIn, { marginTop: 15 }]}
          >
            <Text style={styles.textSign}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D7874",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  footer: {
    flex: 6,
    backgroundColor: "#BEBEBE",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  text_header: {
    color: "#BEBEBE",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#071E22",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -12,
    paddingLeft: 10,
    color: "#071E22",
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#1D7874",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default SignUpScreen;
