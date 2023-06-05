import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";

import { FontAwesome, Feather } from "@expo/vector-icons";
import { getDatabase, ref, child, get } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const checkSignIn = () => {
    const db = getDatabase();
    const dbRef = ref(db);
    get(child(dbRef, `users/${data.email.replace(".", "")}`))
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          const record = snapshot.val();
          if (record.password === data.password) {
            console.log("Successful");

            const jsonValue = JSON.stringify(record);
            await AsyncStorage.setItem("User", jsonValue);
            if (record.isAdmin) {
              navigation.navigate("DrawerScreenAdmin", {
                screen: "Home",
                params: record,
              });
            } else {
              navigation.navigate("DrawerScreen", {
                screen: "Home",
                params: record,
              });
            }
          } else {
            alert("Invalid Password");
          }
        } else {
          alert("User Not Found!");
        }
      })
      .catch((error) => {
        console.error(error);
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
        <Text style={styles.text_header}>Welcome!</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} color="#071E22" />
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

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
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
          <TouchableOpacity onPress={checkSignIn} style={styles.signIn}>
            <Text style={styles.textSign}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={[styles.signIn, { marginTop: 15 }]}
          >
            <Text style={styles.textSign}>Sign Up</Text>
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
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: "#BEBEBE",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
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
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "android" ? 0 : -12,
    paddingLeft: 10,
    color: "#071E22",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
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

export default SignInScreen;
