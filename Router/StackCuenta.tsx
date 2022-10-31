import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Components
import Cuenta from "../Components/Cuenta/Cuenta";

const Stack = createStackNavigator();

export default function StackCuenta() {
  return (
    <Stack.Navigator
      initialRouteName="Cuenta"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#292828",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Cuenta"
        component={Cuenta}
        options={{
          title: "Cuenta",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
