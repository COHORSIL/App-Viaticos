import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Icon } from "react-native-elements";
import { IconButton } from "react-native-paper";
import LottieImagen from "../Anim/LottieImagen";
interface Photos {
  image: string;
  setImage: (e: string) => void;
}

export default function Photo({ image, setImage }: Photos) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      ResizePhoto(result.uri);
    }
  };

  const pickPhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      ResizePhoto(result.uri);
    }
  };

  useEffect(() => {
    Permisos();
  }, []);

  const Permisos = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    console.log(result);
  };

  const ResizePhoto = async (Foto: string) => {
    const manipResult = await manipulateAsync(
      Foto,
      [{ resize: { width: 600 } }], // resize to width of 300 and preserve aspect ratio
      { compress: 1, format: SaveFormat.JPEG }
    );
    setImage(manipResult.uri);
  };

  return (
    <>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.signIn} onPress={pickPhoto}>
          <Icon
            tvParallaxProperties
            type="material-community"
            name="camera"
            size={25}
            color="white"
          />
          <Text
            style={[
              {
                color: "#fff",
              },
            ]}
          >
            Tomar Foto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signIn} onPress={pickImage}>
          <Icon
            tvParallaxProperties
            type="material-community"
            name="image"
            size={25}
            color="white"
          />
          <Text
            style={[
              {
                color: "#fff",
              },
            ]}
          >
            Selec. Foto
          </Text>
        </TouchableOpacity>
      </View>
      {image ? (
        <View style={{ marginRight: "auto", marginLeft: "auto" }}>
          <Image source={{ uri: image }} style={styles.photo} />
          <View style={styles.contericon}>
            <IconButton
              icon="delete"
              size={25}
              onPress={() => setImage("")}
              color="red"
            />
          </View>
        </View>
      ) : (
        <View>
          <LottieImagen />
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
          >
            Agrega una imagen
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  botones: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
  signIn: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 125,
    backgroundColor: "#DC5E4F",
    margin: 10,
  },
  photo: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: "#969696",
    borderRadius: 15,
    elevation: 5,
    resizeMode: "stretch",
  },
  contericon: {
    position: "absolute",
    borderRadius: 50,
    backgroundColor: "white",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    bottom: -10,
    right: -10,
    borderWidth: 2,
    borderColor: "#969696",
  },
});
