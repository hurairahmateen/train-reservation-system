import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getDatabase, ref, set } from "firebase/database";

const AddTrainScreen = () => {
  const [train, setTrain] = useState({
    trainNo: "",
    from: "",
    to: "",
    time: "",
  });

  const addTrain = () => {
    const db = getDatabase();
    console.log(train);
    const reference = ref(db, "trains/" + train.trainNo);
    set(reference, {
      trainNo: train.trainNo,
      from: train.from,
      to: train.to,
      time: train.time,
    });
    alert("Train Successfully Added!");
  };

  const trainNoInputChange = (val) => {
    setTrain({
      ...train,
      trainNo: val,
    });
  };

  const fromInputChange = (val) => {
    setTrain({
      ...train,
      from: val,
    });
  };

  const toInputChange = (val) => {
    setTrain({
      ...train,
      to: val,
    });
  };

  const timeInputChange = (val) => {
    setTrain({
      ...train,
      time: val,
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
          <Text style={styles.textInputStyle}>From</Text>
          <TextInput
            placeholder="Enter from..."
            style={styles.textInputView}
            onChangeText={(val) => fromInputChange(val)}
          ></TextInput>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.textInputStyle}>To</Text>
          <TextInput
            placeholder="Enter to..."
            style={styles.textInputView}
            onChangeText={(val) => toInputChange(val)}
          ></TextInput>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.textInputStyle}>Time</Text>
          <TextInput
            placeholder="Enter Time..."
            style={styles.textInputView}
            onChangeText={(val) => timeInputChange(val)}
          ></TextInput>
        </View>

        <View style={styles.buttonView}>
          <View style={styles.buttonStyle}>
            <TouchableOpacity onPress={addTrain}>
              <Text style={styles.textStyle}>Add Train</Text>
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
    margin: 5,
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

export default AddTrainScreen;
