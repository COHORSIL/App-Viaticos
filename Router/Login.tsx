import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  Platform,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../Utils/Api";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import * as Animatable from "react-native-animatable";
import { StackScreenProps } from "@react-navigation/stack";
import OverlayLoading from "../Components/Overlay/OverlayLoading";
import { useGlobalContext } from "../Context/Contex";

interface Data {
  nombre: string;
  password: string;
  secureTextEntry?: boolean;
  check_textInputChange?: boolean;
}

interface Over {
  Texto: string;
  Visible: boolean;
}

interface Props extends StackScreenProps<any, any> {}

export default function Login({ navigation }: Props) {
  const [datos, setDatos] = useState<Data>({
    nombre: "",
    password: "",
    secureTextEntry: true,
    check_textInputChange: false,
  });
  const [DataOverlay, setDataOverlay] = useState<Over>({
    Texto: "Cargando...",
    Visible: false,
  });
  const { setTokenUser, Token } = useGlobalContext();
  const BackgroundImage = require("../assets/Login.png");

  //leer inputs
  const leer = (e: any, name: string) => {
    setDatos({
      ...datos,
      [name]: e.nativeEvent.text,
      check_textInputChange: true,
    });
  };

  const { colors } = useTheme();

  const updateSecureTextEntry = () => {
    setDatos({
      ...datos,
      secureTextEntry: !datos.secureTextEntry,
    });
  };

  const submiPost = async () => {
    setDataOverlay({ ...DataOverlay, Visible: true });
    Keyboard.dismiss();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: datos.nombre,
        clave: datos.password,
        token: Token,
        app: 5,
      }),
    };
    var url = User();
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 1) {
          setTokenUser(`Bearer ${responseJson.token}`);
          AsyncStorage.setItem("token", `Bearer ${responseJson.token}`);
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Bienvenido",
            textBody: `Inicio de Sesion Correctamente`,
          });
          setDatos({
            nombre: "",
            password: "",
          });
          setDataOverlay({ ...DataOverlay, Visible: false });
          navigation.replace("TabNavigaitor");
          return;
        }
        if (responseJson.status === 2) {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: `${responseJson.descripcion}`,
          });
          setDataOverlay({ ...DataOverlay, Visible: false });
          return;
        }
      })
      .catch((error) => {
        // console.error(error);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "catch",
          textBody: `${error}`,
        });
        setDataOverlay({ ...DataOverlay, Visible: false });
      });
  };

  return (
    <>
      <OverlayLoading DataOverlay={DataOverlay} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Image
              style={{
                flex: 2,
                width: "100%",
                height: "100%",
                display: "flex",
                marginBottom: 100,
              }}
              source={BackgroundImage}
            />
          </View>
          <Animatable.Text
            style={styles.titleText}
            animation="fadeInUp"
            delay={1200}
          >
            <Text style={styles.titulocolor}> COHORSIL</Text>
          </Animatable.Text>

          <Animatable.Text
            style={styles.titleText2}
            animation="fadeInUp"
            delay={1400}
          >
            ¡Somos Innovación Agropecuaria!
          </Animatable.Text>
          <View style={styles.bottomView}>
            <Text style={styles.loginText}>Login</Text>

            <View style={styles.action}>
              <Feather name="user" color="#3BA6CF" size={20} />
              <TextInput
                autoCapitalize="none"
                placeholderTextColor="#666666"
                placeholder="Usuario"
                style={styles.textInput}
                onChange={(e) => leer(e, "nombre")}
                value={datos.nombre}
              />
              <Animatable.View animation="bounceIn">
                {datos.check_textInputChange ? (
                  <Animatable.View animation="bounceIn">
                    <Feather name="check-circle" color="green" size={20} />
                  </Animatable.View>
                ) : null}
              </Animatable.View>
            </View>

            <View style={styles.action}>
              <Feather name="lock" color="#3BA6CF" size={20} />
              <TextInput
                placeholderTextColor="#666666"
                secureTextEntry={datos.secureTextEntry ? true : false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
                autoCapitalize="none"
                placeholder="Contraseña"
                onChange={(e) => leer(e, "password")}
                value={datos.password}
              />

              <TouchableOpacity onPress={updateSecureTextEntry}>
                {datos.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => submiPost()}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    position: "absolute",
    top: Dimensions.get("screen").height * 0.2,
    alignSelf: "center",
    color: "#fff",
    fontSize: 60,
  },
  titleText2: {
    position: "absolute",
    top: Dimensions.get("screen").height * 0.3,
    alignSelf: "center",
    color: "#fff",
    fontSize: 17,
  },
  bottomView: {
    backgroundColor: "#fff",
    opacity: 0.95,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
  },
  inputView: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f1f3f6",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    flex: 1,

    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#5352ed",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",

    alignSelf: "center",
    fontSize: 18,
  },
  registerText: {
    alignSelf: "center",
    marginTop: 12,

    fontSize: 16,
  },
  fpText: {
    marginTop: 10,
    alignSelf: "flex-end",

    fontSize: 16,
    color: "#5352ed",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    height: 40,
    fontSize: 16,
  },
  titulocolor: {
    fontWeight: "bold",
  },
  botones: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    height: 62,
  },
  signIn: {
    flexDirection: "row",
    paddingBottom: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 120,
    marginTop: 10,
    backgroundColor: "#DC5E4F",
    paddingRight: 15,
    marginLeft: 15,
  },
  signIn2: {
    flexDirection: "row",
    paddingBottom: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 170,
    marginTop: 10,
    backgroundColor: "#DCAF4F",
    paddingRight: 15,
    marginLeft: 15,
  },
  signIn3: {
    flexDirection: "row",
    paddingBottom: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    width: 120,
    marginTop: 10,
    backgroundColor: "#4FB6DC",
    paddingRight: 15,
    marginLeft: 15,
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 180,
  },
});
