import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { StackScreenProps } from "@react-navigation/stack";

//
import Listado from "../Listado";

interface Props extends StackScreenProps<any, any> {}

export default function Rechazadas({ navigation, route }: Props) {
  return (
    <View style={{ backgroundColor: "#F7E9EB", flex: 1 }}>
      <Listado Estado={3} navigation={navigation} route={route} />
    </View>
  );
}

const styles = StyleSheet.create({});
