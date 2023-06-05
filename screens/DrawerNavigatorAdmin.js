import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./HomeScreen";
import AddTrainScreen from "./AddTrain";
import TrainScheduleScreen from "./TrainSchedule";
import TicketScheduleScreen from "./TicketSchedule";
import SuggestionListScreen from "./SuggestionList";
import { DrawerContentAdmin } from "./DrawerContentAdmin";

const Drawer = createDrawerNavigator();

const DrawerNavigationAdmin = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContentAdmin {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1D7874",
        },
        headerTintColor: "#BEBEBE",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 25,
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Train" component={AddTrainScreen} />
      <Drawer.Screen name="Schedule" component={TrainScheduleScreen} />
      <Drawer.Screen name="TicketSchedule" component={TicketScheduleScreen} />
      <Drawer.Screen name="SuggestionList" component={SuggestionListScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigationAdmin;
