import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Welcome To</Text>
      <Text style={styles.textStyle}>Train Reservation System!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BEBEBE",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default HomeScreen;
