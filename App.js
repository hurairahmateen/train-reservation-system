import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./screens/RootStackScreen";

import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCwBUtrY26PdoQm9zySpRZa0ubU_WFQBC8",
  authDomain: "train-reservation-system-46208.firebaseapp.com",
  databaseURL:
    "https://train-reservation-system-46208-default-rtdb.firebaseio.com/",
  projectId: "train-reservation-system-46208",
  storageBucket: "train-reservation-system-46208.appspot.com",
};

initializeApp(firebaseConfig);

const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default App;
