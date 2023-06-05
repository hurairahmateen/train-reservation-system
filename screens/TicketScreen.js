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

const TicketScreen = () => {
  const [ticket, setTicket] = useState({
    trainNo: "",
    day: "",
  });

  const [user, setUser] = useState();

  const load = async () => {
    const jsonValue = await AsyncStorage.getItem("User");
    setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
  };
  useEffect(() => {
    load();
  }, []);

  const bookTicket = () => {
    const db = getDatabase();
    console.log(ticket);
    const reference = ref(
      db,
      "tickets/" + ticket.trainNo + "/" + user.email.replace(".", "")
    );
    set(reference, {
      ticketNo: ticket.trainNo + "/" + user.email.replace(".", ""),
      trainNo: ticket.trainNo,
      email: user.email,
      day: ticket.day,
    });
    alert("Ticket Successfully Booked!");
  };

  const trainNoInputChange = (val) => {
    setTicket({
      ...ticket,
      trainNo: val,
    });
  };

  const dayInputChange = (val) => {
    setTicket({
      ...ticket,
      day: val,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formView}>
        <View style={styles.inputView}>
          <Text style={styles.textInputStyle}>TrainNo</Text>
          <TextInput
            placeholder="Enter train no..."
            style={styles.textInputView}
            onChangeText={(val) => trainNoInputChange(val)}
          ></TextInput>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.textInputStyle}>Day</Text>
          <TextInput
            placeholder="Enter Day..."
            style={styles.textInputView}
            onChangeText={(val) => dayInputChange(val)}
          ></TextInput>
        </View>

        <View style={styles.buttonView}>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={bookTicket}>
              <Text style={styles.textStyle}>Book Ticket</Text>
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
    marginRight: 30,
  },
  inputView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
  },
  textInputView: {
    borderWidth: 2,
    borderColor: "black",
    padding: 8,
    marginLeft: 20,
    width: 230,
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

export default TicketScreen;
