import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { StackScreenProps } from "@react-navigation/stack";

//
import Listado from "../Listado";

interface Props extends StackScreenProps<any, any> {}

export default function Pendientes({ navigation, route }: Props) {
  return (
    <View style={{ backgroundColor: "#E9F2F7", flex: 1 }}>
      <Listado Estado={2} navigation={navigation} route={route} />
    </View>
  );
}

const styles = StyleSheet.create({});
