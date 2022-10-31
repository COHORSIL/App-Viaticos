import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../Context/Contex";
import { StackScreenProps } from "@react-navigation/stack";

interface Props extends StackScreenProps<any, any> {}
export default function PreCarga({ navigation }: Props) {
  const { setTokenUser } = useGlobalContext();

  const VerificarSesion = async () => {
    const value = await AsyncStorage.getItem("token");

    if (value !== null) {
      setTokenUser(value);
      navigation.replace("TabNavigaitor");
    } else {
      navigation.replace("Login");
    }
  };

  useEffect(() => {
    VerificarSesion();
  }, []);

  return <></>;
}

const styles = StyleSheet.create({});
