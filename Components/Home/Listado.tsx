import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import moment from "moment";
import "moment/locale/es";
import { ListData, PropsHome } from "../Interface/AppinterfaceHome";
import Format from "../../Utils/Format";
import { Icon } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
const wait = (timeout: any) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Array = [
  {
    Id_Solicitud: "25",
    Empleado: "0318200006009       ",
    Departamento: "TIC       ",
    Puesto: "PROGRAMADOR         ",
    Lugares: "Siguatepeque",
    Fecha_Salida: "1969-12-31 18:00:00.000",
    Fecha_Regreso: "1969-12-31 18:00:00.000",
    Dias: "10",
    Vehiculo: "Vehiculo de Empresa",
    Total_Solicitado: "800.0000",
    Observaciones:
      "ALEJANDRO RAFAEL LARA ZELAYA, vvdfvdfvfvdfvd dfvdfvdfv dfvdfbdfb fbdbbdfb dfbdfbbddfb",
    Estado: "Pendiente de liquidar",
    Fecha_Creacion: "2022-05-19 11:13:38.357",
    Usuario: "bryan",
    Motivo: "25",
    Hora_Salida: "11:13:38.3570000",
    Hora_Regreso: "11:13:38.3570000",
  },
  {
    Id_Solicitud: "24",
    Empleado: "0318200006009       ",
    Departamento: "TIC       ",
    Puesto: "PROGRAMADOR         ",
    Lugares: "Comayagua",
    Fecha_Salida: "1969-12-31 18:00:00.000",
    Fecha_Regreso: "1969-12-31 18:00:00.000",
    Dias: "9",
    Vehiculo: "Vehiculo de Empresa",
    Total_Solicitado: "800.0000",
    Observaciones:
      "ALEJANDRO RAFAEL LARA ZELAYA, ANTONY JORGE SAUCEDA SAUCEDA, acompa;antes de gira",
    Estado: "Pendiente de liquidar",
    Fecha_Creacion: "2022-04-22 07:47:37.193",
    Usuario: "bryan",
    Motivo: "fdv",
    Hora_Salida: "07:47:37.1930000",
    Hora_Regreso: "07:47:37.1930000",
  },
  {
    Id_Solicitud: "28",
    Empleado: "0318200006009       ",
    Departamento: "TIC       ",
    Puesto: "PROGRAMADOR         ",
    Lugares: "Santa Barbara",
    Fecha_Salida: "1969-12-31 18:00:00.000",
    Fecha_Regreso: "1969-12-31 18:00:00.000",
    Dias: "5",
    Vehiculo: "Vehiculo de Empresa",
    Total_Solicitado: "6600.0000",
    Observaciones:
      "ALEJANDRO RAFAEL LARA ZELAYA, Angel Ricardo Peña Santos, ANTONY JORGE SAUCEDA SAUCEDA,",
    Estado: "Pendiente de liquidar",
    Fecha_Creacion: "2022-10-25 10:33:35.473",
    Usuario: "bryan",
    Motivo: "gfgfgf",
    Hora_Salida: "10:33:35.4730000",
    Hora_Regreso: "10:33:35.4730000",
  },
  {
    Id_Solicitud: "27",
    Empleado: "0318200006009       ",
    Departamento: "TIC       ",
    Puesto: "PROGRAMADOR         ",
    Lugares: "gtf",
    Fecha_Salida: "1969-12-31 18:00:00.000",
    Fecha_Regreso: "1969-12-31 18:00:00.000",
    Dias: "3",
    Vehiculo: "Vehiculo de Empresa",
    Total_Solicitado: "1000.0000",
    Observaciones: "Ninguna",
    Estado: "Pendiente de liquidar",
    Fecha_Creacion: "2022-06-28 08:24:16.600",
    Usuario: "bryan",
    Motivo: "ghf",
    Hora_Salida: "08:24:16.6000000",
    Hora_Regreso: "08:24:16.6000000",
  },
];
interface Props extends StackScreenProps<any, any> {
  Estado: number;
}

export default function Listado({ Estado, navigation, route }: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const [Listado, setListado] = useState<ListData[]>([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    setListado(Array);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={Listado}
        renderItem={({ item }: any) => (
          <Tabla
            data={item}
            navigation={navigation}
            route={route}
            Estado={Estado}
          />
        )}
        keyExtractor={(item) => item.Id_Solicitud}
      />
    </SafeAreaView>
  );
}

interface PropsHomeTabla extends StackScreenProps<any, any> {
  data: {
    Id_Solicitud: string;
    Empleado: string;
    Departamento: string;
    Puesto: string;
    Lugares: string;
    Fecha_Salida: string;
    Fecha_Regreso: string;
    Dias: string;
    Vehiculo: string;
    Total_Solicitado: string;
    Observaciones: string;
    Estado: string;
    Fecha_Creacion: string;
    Usuario: string;
    Motivo: string;
    Hora_Salida: string;
    Hora_Regreso: string;
  };
  Estado: number;
}

function Tabla({ data, navigation, Estado }: PropsHomeTabla) {
  const NavigateDetalles = () => {
    navigation.navigate("DetalleSoli", {
      data: data,
      estado: Estado,
    });
  };

  return (
    <>
      <View style={{ marginLeft: 15, marginRight: 15 }}>
        <TouchableOpacity
          style={styles.storyContentView}
          onPress={() => NavigateDetalles()}
        >
          <View style={styles.nombre}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
              Solicitado L. {Format(data.Total_Solicitado)}
            </Text>
          </View>

          <View style={styles.nombre}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: "bold",
                marginTop: 33,
                color: "#959595",
              }}
            >
              #{data.Id_Solicitud}
            </Text>
          </View>

          <View style={styles.nombre2}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "#787878",
                position: "absolute",
                right: 0,
              }}
            >
              Creado el
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                paddingLeft: 25,
                top: 14,
              }}
            >
              {moment(data.Fecha_Creacion).format("ll")}
            </Text>
          </View>

          <View style={{ position: "absolute", right: 10, bottom: 10 }}>
            <Icon
              color="#7A7374"
              type="material-community"
              name="chevron-right"
              size={25}
              tvParallaxProperties
            />
          </View>

          <View
            style={{
              position: "absolute",
              left: 10,
              top: 10,
              flexDirection: "row",
            }}
          >
            <Icon
              color="#7A7374"
              type="material-community"
              name="calendar-clock"
              size={20}
              tvParallaxProperties
            />
            <Text style={{ fontStyle: "italic" }}>{data.Dias} Dias </Text>
          </View>

          <View style={{ marginRight: "auto", marginLeft: "auto" }}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                color="#4F9723"
                type="material-community"
                name="file-image-marker-outline"
                size={20}
                tvParallaxProperties
              />
              <Text style={{ fontStyle: "italic" }}>{data.Lugares}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  storyContentView: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    borderColor: "#dfe4ea",
    // borderWidth: 1.5,
    marginBottom: 10,
    backgroundColor: "white",
    elevation: 3,
  },

  nombre: {
    position: "absolute",
    top: "30%",
    left: 15,
  },
  nombre2: {
    position: "absolute",
    right: 10,
    top: 5,
  },
});
