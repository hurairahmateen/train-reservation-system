import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./HomeScreen";
import TrainScheduleScreen from "./TrainSchedule";
import TicketScreen from "./TicketScreen";
import SuggestionScreen from "./SuggestionScreen";
import { DrawerContent } from "./DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
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
      <Drawer.Screen name="Schedule" component={TrainScheduleScreen} />
      <Drawer.Screen name="Tickets" component={TicketScreen} />
      <Drawer.Screen name="Suggestion" component={SuggestionScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
