import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Solicitu } from "../../Utils/Api";
import { useGlobalContext } from "../../Context/Contex";
import { PieChart } from "react-native-chart-kit";
import { Graphit, DetalleSolic } from "../Interface/AppinterfaceHome";
import { size } from "lodash";
import LottieLoad from "../Anim/LottieLoad";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import moment from "moment";
import "moment/locale/es";
import { DataTable } from "react-native-paper";
import Format from "../../Utils/Format";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, FAB } from "react-native-paper";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export default function DetalleSoli(props: any) {
  const { Token } = useGlobalContext();

  const { data }: DetalleSolic = props.route.params;
  const [Texto, setTexto] = useState<string>("");
  const [ActividadesData, setActividadesData] = useState<DetalleSolic[]>([]);
  const [Elevat, setElevat] = useState<number>(0);
  const [isExtended, setIsExtended] = useState<boolean>(true);

  props.navigation.setOptions({ title: `Solicitud # ${data.Id_Solicitud}` });

  const [GraphiData, setGraphiData] = useState<Graphit[]>([]);
  useEffect(() => {
    setTexto("Cargando");
    let h: Graphit[] = [];
    let url = Solicitu();
    let options1 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: Token,
      },
    };

    fetch(`${url}&id=${data.Id_Solicitud}`, options1)
      .then((res) => res.json())
      .then((result) => {
        setTexto("Espere...");
        setActividadesData(result);
        result.forEach((element: any) => {
          var x = Math.round(0xffffff * Math.random()).toString(16);
          var y = 6 - x.length;
          var z = "000000";
          var z1 = z.substring(0, y);
          var color = "#" + z1 + x;

          h.push({
            name: element.Actividad,
            population: Number(element.Total),
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
            color: color,
            key: element.Actividad,
            label: element.Actividad,
          });
        });

        setGraphiData(h);
      })
      .catch((error) => {
        console.log(error);
        setTexto("Sin Actividades");
      });

    setTimeout(() => {
      setElevat(1.5);
    }, 1100);
  }, []);

  const NavigateGasto = () => {
    props.navigation.navigate("AddGasto", {
      data: data,
    });
  };

  return (
    <>
      {size(GraphiData) > 0 ? (
        <View style={{ marginBottom: 25 }}>
          <PieChart
            data={GraphiData}
            height={220}
            width={Dimensions.get("window").width}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"5"}
            center={[5, 20]}
            absolute
          />
        </View>
      ) : (
        <>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LottieLoad Texto={Texto} />
          </View>
        </>
      )}

      <Animatable.View
        animation="fadeInRight"
        delay={500}
        style={styles.profileContainer}
      >
        <ScrollView>
          <View style={styles.contenedor}>
            <View style={styles.iconconter}>
              <Icon
                color="white"
                type="material-community"
                name="account-tie"
                size={25}
                tvParallaxProperties
              />
            </View>
            <View style={{ width: "80%", margin: 5 }}>
              <Text
                style={{
                  fontSize: 15,
                  color: "#2976AA",
                  fontWeight: "600",
                }}
              >
                Empleado
              </Text>
              <Text>{data.Usuario}</Text>
            </View>
          </View>

          <View style={styles.contenedor}>
            <View style={styles.iconconter}>
              <Icon
                color="white"
                type="material-community"
                name="home-circle-outline"
                size={25}
                tvParallaxProperties
              />
            </View>
            <View style={{ width: "80%", margin: 5 }}>
              <Text
                style={{ fontSize: 15, color: "#2976AA", fontWeight: "600" }}
              >
                Departamento
              </Text>
              <Text>{data.Departamento?.trim()}</Text>
            </View>
          </View>

          <View style={styles.contenedor}>
            <View style={styles.iconconter}>
              <Icon
                color="white"
                type="material-community"
                name="car-lifted-pickup"
                size={25}
                tvParallaxProperties
              />
            </View>
            <View style={{ width: "80%", margin: 5 }}>
              <Text
                style={{ fontSize: 15, color: "#2976AA", fontWeight: "600" }}
              >
                Vehiculo
              </Text>
              <Text>{data.Vehiculo}</Text>
            </View>
          </View>

          <View style={{ ...styles.card, elevation: Elevat }}>
            <View style={{ width: "50%" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <View style={styles.contericoncard}>
                  <Icon
                    color="#497AC6"
                    type="material-community"
                    name="calendar-arrow-right"
                    size={15}
                    tvParallaxProperties
                  />
                </View>
                <Text style={{ fontWeight: "bold" }}>Fecha Salida</Text>
              </View>
              <Text style={{ textAlign: "center" }}>
                {moment(data.Fecha_Salida).format("ll")}
              </Text>
            </View>
            <View style={{ width: "50%" }}>
              <View
                style={{
                  flexDirection: "row",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Fecha Regreso</Text>
                <View style={styles.contericoncard}>
                  <Icon
                    color="#497AC6"
                    type="material-community"
                    name="calendar-arrow-left"
                    size={15}
                    tvParallaxProperties
                  />
                </View>
              </View>
              <Text style={{ textAlign: "center" }}>
                {moment(data.Fecha_Regreso).format("ll")}
              </Text>
            </View>
          </View>
          <View style={{ ...styles.profileImageView, elevation: Elevat }}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Total Dias ({data.Dias})
            </Text>
          </View>

          <DataTable style={{ marginTop: 15 }}>
            <DataTable.Header
              style={{
                backgroundColor: "#C25934",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
            >
              <DataTable.Title>
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, color: "white" }}
                >
                  Actividad
                </Text>
              </DataTable.Title>
              <DataTable.Title>{}</DataTable.Title>

              <DataTable.Title>
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, color: "white" }}
                >
                  Total Actividad
                </Text>
              </DataTable.Title>
            </DataTable.Header>

            {ActividadesData.map((item, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{item.Actividad}</DataTable.Cell>
                <DataTable.Cell numeric>L. {Format(item.Total)}</DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Row>
              <DataTable.Cell>
                <Text style={{ color: "#7E7E7E" }}> Total Gasto</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{ color: "#7E7E7E" }}>
                  L. {Format(data.Total_Solicitado)}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>

            {/* <DataTable.Header>
            <DataTable.Title> Total Gasto</DataTable.Title>

            <DataTable.Title>
              L. {Format(data.Total_Solicitado)}
            </DataTable.Title>
          </DataTable.Header> */}
          </DataTable>

          <View style={{ margin: 10, marginTop: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.contericoncard2}>
                <Icon
                  color="white"
                  type="material-community"
                  name="chat-question"
                  size={15}
                  tvParallaxProperties
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 5,
                  fontWeight: "600",
                }}
              >
                Motivo
              </Text>
            </View>

            <TextInput
              theme={{
                colors: {
                  placeholder: "white",
                  text: "black",
                  primary: "white",
                },
              }}
              style={{
                backgroundColor: "white",
                borderColor: "#969696",
                borderWidth: 1,
              }}
              value={data.Motivo?.toLowerCase().replace(/\b\w/g, (l) =>
                l.toUpperCase()
              )}
              multiline={true}
              disabled={true}
            />
          </View>

          <View style={{ margin: 10, marginBottom: 70 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.contericoncard2}>
                <Icon
                  color="white"
                  type="material-community"
                  name="chat-processing-outline"
                  size={15}
                  tvParallaxProperties
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 5,
                  fontWeight: "600",
                }}
              >
                Observaciones
              </Text>
            </View>

            <TextInput
              theme={{
                colors: {
                  placeholder: "white",
                  text: "black",
                  primary: "white",
                },
              }}
              style={{
                backgroundColor: "white",
                borderColor: "#969696",
                borderWidth: 1,
              }}
              value={data.Observaciones?.toLowerCase().replace(/\b\w/g, (l) =>
                l.toUpperCase()
              )}
              multiline={true}
              disabled={true}
            />
          </View>
        </ScrollView>
      </Animatable.View>

      <View style={styles.button}>
        <TouchableOpacity style={styles.signIn} disabled>
          <Icon
            style={styles.icon}
            type="material-community"
            name="cash"
            size={25}
            color="white"
            tvParallaxProperties
          />
          <Text
            style={[
              {
                color: "#fff",
              },
            ]}
          >
            Solicitado L. {Format(data.Total_Solicitado)}
          </Text>
        </TouchableOpacity>
      </View>

      <FAB
        icon="basket-plus-outline"
        style={styles.fab}
        onPress={() => NavigateGasto()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: "#fff",
    marginTop: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  contenedor: {
    flexDirection: "row",
  },
  card: {
    height: 80,
    elevation: 0,
    backgroundColor: "#FCFCFB",
    borderRadius: 15,
    flexDirection: "row",
    margin: 25,
  },
  contericoncard: {
    height: 30,
    width: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#A7C8DE",
    color: "black",
    margin: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contericoncard2: {
    height: 30,
    width: 30,
    borderRadius: 50,
    backgroundColor: "#C25934",
    margin: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconconter: {
    width: "12%",
    backgroundColor: "#C25934",
    borderRadius: 5,
    margin: 10,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImageView: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: -17,
    backgroundColor: "#FCFCFB",
    width: 120,
    borderRadius: 10,

    elevation: 1.5,
  },
  button: {
    borderRadius: 30,
    width: 220,
    marginTop: 10,
    backgroundColor: "#318EFF",
    position: "absolute",
    bottom: 20,
    left: 6,
    elevation: 2,
  },
  signIn: {
    flexDirection: "row",
    paddingBottom: 5,
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  icon: {
    paddingRight: 5,
  },
  fab: {
    position: "absolute",
    margin: 10,
    right: 0,
    bottom: 0,
    backgroundColor: "#318EFF",
  },
});
