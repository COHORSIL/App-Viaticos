import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function LottieArrowDow() {
  return (
    <View style={styles.conten}>
      <LottieView
        style={styles.lottie}
        source={require("../../assets/lottlie/80696-arrow-down.json")}
        autoPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    // marginTop: "20%",
    width: 25,
    height: 25,
  },
  conten: {
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
