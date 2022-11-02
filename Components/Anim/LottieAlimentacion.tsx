import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function LottieAlimentacion() {
  return (
    <>
      <LottieView
        style={styles.lottie}
        source={require("../../assets/lottlie/43298-app-icon-remote-shopping.json")}
        autoPlay
      />
    </>
  );
}

const styles = StyleSheet.create({
  lottie: {
    // marginTop: "20%",
    width: 80,
    height: 80,
  },
});
