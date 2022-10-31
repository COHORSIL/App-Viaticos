import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Components
import Home from "../Components/Home/Home";
import DetalleSoli from "../Components/Home/DetalleSoli";
import AddGasto from "../Components/Home/AddGasto";

const Stack = createStackNavigator();

export default function StackHome() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={Home}
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="DetalleSoli"
        component={DetalleSoli}
        options={{
          title: "Detalle Solicitud",
        }}
      />
      <Stack.Screen
        name="AddGasto"
        component={AddGasto}
        options={{
          title: "Agregar Gasto",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
