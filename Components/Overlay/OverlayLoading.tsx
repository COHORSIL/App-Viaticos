import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import LottieLoading from "../Anim/LottieLoading";

interface Props {
  DataOverlay: {
    Texto: string;
    Visible: boolean;
  };
}

export default function OverlayLoading({ DataOverlay }: Props) {
  return (
    <Overlay
      isVisible={DataOverlay.Visible}
      overlayStyle={{
        backgroundColor: "transparent",
        elevation: 0,
        shadowOpacity: 0,
      }}
    >
      <View style={styles.view}>
        <LottieLoading />
        <Text style={{ fontWeight: "bold", color: "white" }}>
          {DataOverlay.Texto}
        </Text>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000000",
    marginTop: 10,
  },
});
