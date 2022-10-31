// import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
// import { Tab, TabView } from "react-native-elements";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { View, useWindowDimensions, StyleSheet, Text } from "react-native";
import Listado from "./Listado";
import { Icon } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";

interface Props extends StackScreenProps<any, any> {}
export default function Home({ navigation, route }: Props) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "Aprobadas",
      title: "Aprobadas",
      icon: "check-circle",
      color: "#358F61",
    },
    {
      key: "Pendientes",
      title: "Pendientes",
      icon: "clock-outline",
      color: "#4C7AC6",
    },
    {
      key: "Rechazadas",
      title: "Rechazadas",
      icon: "close-circle-outline",
      color: "#CB4A30",
    },
  ]);

  const Aprobadas = () => (
    <View style={{ backgroundColor: "#E9F7E9", flex: 1 }}>
      <Listado Estado={1} navigation={navigation} route={route} />
    </View>
  );
  const Pendientes = () => (
    <View style={{ backgroundColor: "#E9F2F7", flex: 1 }}>
      <Listado Estado={2} navigation={navigation} route={route} />
    </View>
  );
  const Rechazadas = () => (
    <View style={{ backgroundColor: "#F7E9EB", flex: 1 }}>
      <Listado Estado={3} navigation={navigation} route={route} />
    </View>
  );

  const renderScene = SceneMap({
    Aprobadas: Aprobadas,
    Pendientes: Pendientes,
    Rechazadas: Rechazadas,
  });

  return (
    <TabView
      style={{ backgroundColor: "white" }}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "black" }}
          style={{ backgroundColor: "white" }}
          renderIcon={({ route }) => (
            <Icon
              color={route.color}
              type="material-community"
              name={route.icon}
              size={25}
              tvParallaxProperties
            />
          )}
          renderLabel={({ route }) => (
            <Text style={{ color: "black", margin: 8, fontWeight: "bold" }}>
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
}
