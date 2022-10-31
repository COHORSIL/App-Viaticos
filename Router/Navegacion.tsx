import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//StackNavigaitors
import TabNavigaitor from "./TabNavigaitor";
import Login from "./Login";
import PreCarga from "./PreCarga";

const Stack = createStackNavigator();

export default function Navegacion() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="PreCarga" component={PreCarga} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="TabNavigaitor" component={TabNavigaitor} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
