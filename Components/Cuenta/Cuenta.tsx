import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sesion } from "../../Utils/Api";
import { StackScreenProps } from "@react-navigation/stack";
import { useGlobalContext } from "../../Context/Contex";
import jwt_decode from "jwt-decode";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

interface Props extends StackScreenProps<any, any> {}
interface Data {
  Cantidad: string;
  departamento?: string;
  email?: string;
  foto?: string;
  usuario: string;
}

export default function Cuenta({ navigation }: Props) {
  let Foto: string = "https://picsum.photos/500";
  const { TokenUser } = useGlobalContext();
  const [DataUser, setDataUser] = useState<Data>();

  useEffect(() => {
    if (TokenUser) {
      const decode: any = jwt_decode(TokenUser);
      setDataUser(decode.data);
    }
  }, [TokenUser]);

  const logout = () => {
    let url = `${sesion()}&close=${1}`;

    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 1) {
          console.log("sesion cerrada");
          AsyncStorage.removeItem("token");

          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: "Sesion Cerrada",
            textBody: `Inicia Sesion`,
          });
          navigation.replace("Login");
        }
      })
      .catch((error) => {
        console.error(error);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "catch",
          textBody: `${error}`,
        });
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image style={styles.coverImage} source={{ uri: Foto }} />

      <View style={styles.profileContainer}>
        <View>
          <View style={styles.profileImageView}>
            <Image
              style={styles.profileImage}
              source={
                DataUser?.foto
                  ? { uri: DataUser?.foto }
                  : require("../../assets/camara.png")
              }
            />

            <View>
              <Text style={styles.nombre}>{DataUser?.usuario}</Text>
            </View>

            <View>
              <View style={styles.rowt}>
                <Icon
                  style={styles.iconbtr}
                  type="material-community"
                  name="home-city-outline"
                  size={25}
                  tvParallaxProperties
                />
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", paddingLeft: 5 }}
                >
                  Departamento
                </Text>
              </View>

              <Text style={{ textAlign: "center" }}>
                {DataUser?.departamento?.trim()}
              </Text>
            </View>

            <View>
              <View style={styles.rowt}>
                <Icon
                  style={styles.iconbtr}
                  type="material-community"
                  name="email"
                  size={25}
                  tvParallaxProperties
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    paddingLeft: 5,
                  }}
                >
                  Correo
                </Text>
              </View>

              <Text style={{ textAlign: "center" }}>
                {DataUser?.email?.trim()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.interactButtonsView}>
        <TouchableOpacity style={styles.interactButton} onPress={logout}>
          <Text style={styles.interactButtonText}>Cerrar Sesion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: { height: 300, width: "100%" },
  coverImage2: { height: 150, width: "100%" },
  profileContainer: {
    backgroundColor: "#fff",
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: { alignItems: "center", marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#fff",
  },
  nameAndBioView: { alignItems: "center", marginTop: 10 },
  userFullName: { fontSize: 26 },
  userBio: {
    fontSize: 20,
    color: "#333",
    marginTop: 4,
  },
  interactionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  like: {
    position: "absolute",
    right: 25,
    top: 10,
  },
  like2: {
    position: "absolute",
    left: 25,
    top: 10,
  },
  messageInputView: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 14,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  comen: {
    fontSize: 15,
  },
  iconButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    marginTop: 10,
    paddingLeft: "35%",
  },
  comen2: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 25,
    marginTop: 70,
  },
  nombre2: {
    position: "absolute",
    right: 20,
    top: 60,
  },
  userFullName2: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    fontSize: 25,
  },
  rowt: {
    flexDirection: "row",
    marginTop: 25,
    marginRight: "auto",
    marginLeft: "auto",
  },
  iconbtr: {
    paddingLeft: 5,
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 17,
  },
  depa: {
    marginTop: 30,
    fontSize: 17,
  },
  interactButtonsView: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#4b7bec",
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {
    color: "#fff",
    fontSize: 18,
    paddingVertical: 6,
  },
});
