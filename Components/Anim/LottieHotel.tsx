import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

export default function LottieHotel() {
  return (
    <>
      <View style={styles.conten}>
        <LottieView
          style={styles.lottie}
          source={require("../../assets/lottlie/24209-house-ou-apartment.json")}
          autoPlay
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  lottie: {
    marginRight: 20,
    marginTop: 5,
    width: 50,
    height: 50,
  },
  conten: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});
