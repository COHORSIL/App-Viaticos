import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//
import Aprobadas from "../Components/Home/TopTab/Aprobadas";
import Pendientes from "../Components/Home/TopTab/Pendientes";
import Rechazadas from "../Components/Home/TopTab/Rechazadas";

const Tab = createMaterialTopTabNavigator();

export default function TabTopHomeNavigaitor() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tab.Screen
        name="Aprobadas"
        component={Aprobadas}
        options={{
          tabBarActiveTintColor: "#358F61",
          tabBarLabel: "Aprobadas",
          tabBarColor: "black",

          tabBarIndicatorStyle: { color: "red" },
          tabBarIcon: () => (
            <Icon
              color="#358F61"
              type="material-community"
              name="check-circle"
              size={25}
              tvParallaxProperties
            />
          ),
        }}
      />
      <Tab.Screen
        name="Pendientes"
        component={Pendientes}
        options={{
          tabBarActiveTintColor: "#4C7AC6",
          tabBarLabel: "Pendientes",
          tabBarColor: "black",
          tabBarIcon: () => (
            <Icon
              color="#4C7AC6"
              type="material-community"
              name="clock-outline"
              size={25}
              tvParallaxProperties
            />
          ),
        }}
      />
      <Tab.Screen
        name="Rechazadas"
        component={Rechazadas}
        options={{
          tabBarActiveTintColor: "#CB4A30",
          tabBarLabel: "Pendientes",
          tabBarColor: "black",
          tabBarIcon: () => (
            <Icon
              color="#CB4A30"
              type="material-community"
              name="close-circle-outline"
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
