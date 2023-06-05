import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";

const TrainScheduleScreen = () => {
  const [trainsList, setTrainsList] = useState([]);

  useEffect(async () => {
    const db = getDatabase();
    const dbRef = ref(db, "/trains");

    onValue(
      dbRef,
      (snapshot) => {
        const list = [];
        snapshot.forEach((childSnapshot) => {
          list.push(childSnapshot.val());
        });
        setTrainsList(list);
      },
      {
        onlyOnce: true,
      }
    );
  });
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.textTitle}>Train Schedule</Text>
      </View>

      <View style={styles.scheduleViewHeader}>
        <Text style={styles.textStyleHeader}>TrainNo</Text>
        <Text style={styles.textStyleHeader}>From</Text>
        <Text style={styles.textStyleHeader}>To</Text>
        <Text style={styles.textStyleHeader}>Time</Text>
      </View>

      <View style={styles.scheduleViewBody}>
        <ScrollView>
          {trainsList.map((value) => (
            <View key={value.trainNo} style={styles.scheduleViewHeader}>
              <Text style={styles.textStyle}>{value.trainNo}</Text>
              <Text style={styles.textStyle}>{value.from}</Text>
              <Text style={styles.textStyle}>{value.to}</Text>
              <Text style={styles.textStyle}>{value.time}</Text>
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

export default TrainScheduleScreen;
