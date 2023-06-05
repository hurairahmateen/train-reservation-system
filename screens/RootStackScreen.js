import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./SplashScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import DrawerNavigation from "./DrawerNavigator";
import DrawerNavigationAdmin from "./DrawerNavigatorAdmin";

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="DrawerScreen" component={DrawerNavigation} />
    <RootStack.Screen
      name="DrawerScreenAdmin"
      component={DrawerNavigationAdmin}
    />
  </RootStack.Navigator>
);

export default RootStackScreen;
