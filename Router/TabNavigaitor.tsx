import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";

//StackNavigaitors
import StackHome from "./StackHome";
import StackCuenta from "./StackCuenta";

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigaitor() {
  return (
    <Tab.Navigator
      shifting={true}
      initialRouteName="StackHome"
      activeColor="white"
    >
      <Tab.Screen
        name="StackHome"
        component={StackHome}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "black",
          tabBarIcon: () => (
            <Icon
              color="white"
              type="material-community"
              name="home"
              size={25}
              tvParallaxProperties
            />
          ),
        }}
      />

      <Tab.Screen
        name="StackCuenta"
        component={StackCuenta}
        options={{
          tabBarLabel: "Cuenta",
          tabBarColor: "black",
          tabBarIcon: () => (
            <Icon
              color="white"
              type="material-community"
              name="account-circle-outline"
              size={25}
              tvParallaxProperties
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
