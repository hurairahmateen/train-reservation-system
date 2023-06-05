import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getDatabase, ref, onValue, remove } from "firebase/database";

const TicketScheduleScreen = () => {
  const [ticketsList, setTicketsList] = useState([]);

  useEffect(async () => {
    const db = getDatabase();
    const dbRef = ref(db, "/tickets");

    onValue(
      dbRef,
      (snapshot) => {
        const list = [];
        snapshot.forEach((childSnapshot) => {
          const record = childSnapshot.val();
          const key = Object.keys(record)[0];
          list.push(record[key]);
        });
        setTicketsList(list);
      },
      {
        onlyOnce: true,
      }
    );
  });

  const deleteTicket = (value) => {
    Alert.alert("Delete ticket", "Do you want to delete this ticket?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const db = getDatabase();
          const dbRef = ref(db, "/tickets/" + value.ticketNo);
          remove(dbRef);
          alert("Deleted");
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.textTitle}>Ticket List</Text>
      </View>

      <View style={styles.scheduleViewHeader}>
        <Text style={styles.textStyleHeader}>TrainNo</Text>
        <Text style={styles.textStyleHeader}>Email</Text>
        <Text style={styles.textStyleHeader}>Day</Text>
      </View>

      <View style={styles.scheduleViewBody}>
        <ScrollView>
          {ticketsList.map((value) => (
            <View key={value.ticketNo} style={styles.scheduleViewHeader}>
              <Text style={styles.textStyle}>{value.trainNo}</Text>
              <Text style={styles.textStyle}>{value.email}</Text>
              <Text style={styles.textStyle}>{value.day}</Text>
              <View>
                <TouchableOpacity onPress={() => deleteTicket(value)}>
                  <MaterialIcons name="delete" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BEBEBE",
    alignItems: "center",
    padding: "5%",
  },
  titleView: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 35,
  },
  scheduleViewHeader: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
  scheduleViewBody: {
    flexDirection: "row",
    borderWidth: 1,
    padding: 5,
    margin: 5,
    height: 450,
  },
  textStyleHeader: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  textStyle: {
    flex: 1,
    fontSize: 15,
  },
});

export default TicketScheduleScreen;
