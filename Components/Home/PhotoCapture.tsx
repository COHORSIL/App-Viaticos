import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import { Camera, CameraType } from "expo-camera";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

interface Photos {
  visibleCamara: boolean;
  setVisibleCamara: (e: boolean) => void;
  setImage: (e: string) => void;
}

export default function PhotoCapture({
  visibleCamara,
  setVisibleCamara,
  setImage,
}: Photos) {
  const [camera, setCamera] = useState<any>(null);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      ResizePhoto(data.uri);
      setVisibleCamara(false);
    }
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
      <Provider>
        <Portal>
          <Dialog
            visible={visibleCamara}
            onDismiss={() => setVisibleCamara(false)}
          >
            <Dialog.Content style={{ height: "80%" }}>
              <View style={styles.cameraContainer}>
                <Camera
                  ref={(ref) => setCamera(ref)}
                  style={styles.fixedRatio}
                  type={CameraType.back}
                  ratio="1:1"
                />
              </View>
              <Button
                icon="camera"
                color="#3F8C4D"
                mode="contained"
                onPress={() => takePicture()}
              >
                Tomar Foto
              </Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    width: "100%",

    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 0.7,
  },
});
