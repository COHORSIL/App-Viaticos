import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";
import Navegacion from "./Router/Navegacion";
import { MyGlobalContext } from "./Context/Contex";
import { AlertNotificationRoot } from "react-native-alert-notification";

// configuracion
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [Token, setToken] = useState<string>("");
  const [TokenUser, setTokenUser] = useState<string>("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token ? token : "")
    );
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );
    return () => subscription.remove();
  }, []);

  async function registerForPushNotificationsAsync() {
    let token = "";
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    setToken(token);
    return token;
  }

  return (
    <MyGlobalContext.Provider
      value={{
        TokenUser,
        setTokenUser,
        Token,
        setToken,
      }}
    >
      <AlertNotificationRoot>
        <NavigationContainer>
          <Navegacion />
        </NavigationContainer>
      </AlertNotificationRoot>
    </MyGlobalContext.Provider>
  );
}
