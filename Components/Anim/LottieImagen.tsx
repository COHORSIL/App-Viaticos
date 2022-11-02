import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function LottieImagen() {
  return (
    <View style={styles.conten}>
      <LottieView
        style={styles.lottie}
        source={require("../../assets/lottlie//107376-add-image.json")}
        autoPlay
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    // marginTop: "20%",
    width: 150,
    height: 150,
    marginLeft: 15,
  },
  conten: {
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
});
