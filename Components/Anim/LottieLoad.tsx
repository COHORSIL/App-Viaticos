import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function LottieLoad({ Texto }: any) {
  return (
    <View style={styles.conten}>
      <LottieView
        style={styles.lottie}
        source={require("../../assets/lottlie/98432-loading.json")}
        autoPlay
      />
      <Text style={{ textAlign: "center" }}>{Texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  lottie: {
    // marginTop: "20%",
    width: 150,
    height: 150,
  },
  conten: {
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
});
