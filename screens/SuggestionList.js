import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";

const SuggestionListScreen = () => {
  const [suggestionList, setSuggestionList] = useState([]);

  useEffect(async () => {
    const db = getDatabase();
    const dbRef = ref(db, "/suggestions");

    onValue(
      dbRef,
      (snapshot) => {
        const list = [];
        snapshot.forEach((childSnapshot) => {
          list.push(childSnapshot.val());
        });
        setSuggestionList(list);
      },
      {
        onlyOnce: true,
      }
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.textTitle}>Suggestion List</Text>
      </View>

      <View style={styles.scheduleViewHeader}>
        <Text style={styles.textStyleHeader}>Name</Text>
        <Text style={styles.textStyleHeader}>Email</Text>
        <Text style={styles.textStyleHeader}>Suggestion</Text>
      </View>

      <View style={styles.scheduleViewBody}>
        <ScrollView>
          {suggestionList.map((value) => (
            <View key={value.email} style={styles.scheduleViewHeader}>
              <Text style={styles.textStyle}>{value.name}</Text>
              <Text style={styles.textStyle}>{value.email}</Text>
              <Text style={styles.textStyle}>{value.suggestion}</Text>
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

export default SuggestionListScreen;
