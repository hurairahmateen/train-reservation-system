import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Title, Drawer, Text } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function DrawerContentAdmin({ navigation }) {
  const [user, setUser] = useState();

  const load = async () => {
    const jsonValue = await AsyncStorage.getItem("User");
    setUser(jsonValue != null ? JSON.parse(jsonValue) : null);
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCoS1h0huK1B606Qb4j_hHmwGH8wPmvKLSKQ&usqp=CAU",
                }}
                size={50}
              />
              <View style={{ flexDirection: "column", marginLeft: 15 }}>
                <Title style={styles.title}>{user && user.name}</Title>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="train"
                  color={color}
                  size={size}
                />
              )}
              label="Add Train"
              onPress={() => {
                navigation.navigate("Train");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="schedule" color={color} size={size} />
              )}
              label="Train Schedule"
              onPress={() => {
                navigation.navigate("Schedule");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="ticket"
                  color={color}
                  size={size}
                />
              )}
              label="Ticket Schedule"
              onPress={() => {
                navigation.navigate("TicketSchedule");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons
                  name="format-list-bulleted"
                  color={color}
                  size={size}
                />
              )}
              label="Suggestion List"
              onPress={() => {
                navigation.navigate("SuggestionList");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Sign Out"
          onPress={async () => {
            await AsyncStorage.removeItem("User");
            navigation.navigate("SplashScreen");
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
