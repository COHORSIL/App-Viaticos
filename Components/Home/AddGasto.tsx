import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import Photo from "./Photo";
import {
  Button,
  FAB,
  Portal,
  Provider,
  Dialog,
  TextInput,
} from "react-native-paper";
import * as Animatable from "react-native-animatable";
import moment from "moment";
import DatePicker from "react-native-modern-datepicker";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { DetalleSolic, GastosData } from "../Interface/AppinterfaceHome";
import OverlayLoading from "../../Components/Overlay/OverlayLoading";
import PhotoCapture from "./PhotoCapture";
import Format from "../../Utils/Format";
import LottieActividad from "../Anim/LottieActividad";
import LottiePeaje from "../Anim/LottiePeaje";
import LottieHotel from "../Anim/LottieHotel";
import LottiePhone from "../Anim/LottiePhone";
import LottieParqueo from "../Anim/LottieParqueo";
import LottieImpuesto from "../Anim/LottieImpuesto";
import LottieOtros from "../Anim/LottieOtros";
import Lottieaero from "../Anim/Lottieaero";
import LottieGasolina from "../Anim/LottieGasolina";
import LottieTaxi from "../Anim/LottieTaxi";
import LottieBus from "../Anim/LottieBus";
import LottieRepresentacion from "../Anim/LottieRepresentacion";
import { size } from "lodash";

//Lotties Actividades
import LottieAlimentacion from "../Anim/LottieAlimentacion";

interface Over {
  Texto: string;
  Visible: boolean;
}

const Array = [
  {
    Id: "1",
    Id_Solicitud: "25",
    Imagen: "0318200006009",
    Fecha_Gasto: "2022-05-19 11:13:38.357",
    Actividad: "Alimentacion",
    Id_Actividad: "1",
    TotalGasto: "500",
  },
  {
    Id: "1",
    Id_Solicitud: "25",
    Imagen: "0318200006009",
    Fecha_Gasto: "2022-05-19 11:13:38.357",
    Actividad: "Otros",
    Id_Actividad: "12",
    TotalGasto: "500",
  },
  {
    Id: "2",
    Id_Solicitud: "25",
    Imagen: "0318200006009",
    Fecha_Gasto: "2022-05-19 11:13:38.357",
    Actividad: "Alimentacion",
    Id_Actividad: "1",
    TotalGasto: "200",
  },
];

export default function AddGasto(props: any) {
  const { data, ActividadesData }: DetalleSolic = props.route.params;

  //Data
  const [GastoData, setGastoData] = useState<GastosData[]>([]);

  //Agregar Gasto
  const [ButtonAdd, setButtonAdd] = useState<boolean>(false);

  //Camara
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleCamara, setVisibleCamara] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  //select
  const [Select, setSelect] = useState<boolean>(false);
  const [CatureSelect, setCatureSelect] = useState<string>("Selec. Actividad");

  const hideDialog = () => setVisible(false);
  const [Fecha, setFecha] = useState(moment().format("DD/MM/YYYY"));
  const [Fechaselect, setFechaselect] = useState("");
  const [Gastoadd, setGastoadd] = useState<string>("");
  const [DataOverlay, setDataOverlay] = useState<Over>({
    Texto: "Agregando...",
    Visible: false,
  });

  const Fecht = (item: string) => {
    let fecha = moment(item).format("DD/MM/YYYY");
    setFecha(fecha);
    setFechaselect(item);
    hideDialog();
  };

  const AddGasto = () => {
    setDataOverlay({ ...DataOverlay, Visible: true });

    setTimeout(() => {
      setDataOverlay({ ...DataOverlay, Visible: false });
      setButtonAdd(false);
    }, 2000);
  };

  useEffect(() => {
    setGastoData(Array);
  }, []);

  return (
    <>
      <OverlayLoading DataOverlay={DataOverlay} />

      {ButtonAdd ? (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <Animatable.View animation="fadeInRight" delay={500}>
              <Photo
                setImage={setImage}
                image={image}
                setVisibleCamara={setVisibleCamara}
              />

              <View
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginBottom: 15,
                  marginTop: 5,
                }}
              >
                <TouchableOpacity onPress={() => setVisible(true)}>
                  <View style={{ width: "60%" }}>
                    <TextInput
                      style={{ width: 200, backgroundColor: "white" }}
                      label="Fecha"
                      mode="outlined"
                      disabled
                      value={Fecha}
                      activeOutlineColor="black"
                      keyboardType="numeric"
                      right={<TextInput.Icon icon="calendar-multiple-check" />}
                      onChangeText={(valor) => {
                        setGastoadd(valor);
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginBottom: 15,
                  marginTop: 5,
                }}
              >
                <TouchableOpacity onPress={() => setSelect(true)}>
                  <View style={{ width: "60%" }}>
                    <TextInput
                      style={{ width: 200, backgroundColor: "white" }}
                      label="Actividad"
                      mode="outlined"
                      disabled
                      value={CatureSelect}
                      activeOutlineColor="black"
                      keyboardType="numeric"
                      right={<TextInput.Icon icon="chevron-down" />}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {CatureSelect != "Selec. Actividad" ? (
                <View
                  style={{
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                >
                  <View style={{ width: "60%" }}>
                    <TextInput
                      style={{ width: 200, backgroundColor: "white" }}
                      label="Gasto"
                      mode="outlined"
                      value={Gastoadd}
                      activeOutlineColor="black"
                      keyboardType="numeric"
                      right={<TextInput.Icon icon="cash" />}
                      onChangeText={(valor) => {
                        setGastoadd(valor);
                      }}
                    />
                  </View>
                </View>
              ) : null}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => AddGasto()}
              >
                <Text style={styles.loginButtonText}>Agregar Gasto</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
      ) : size(GastoData) > 0 ? (
        <ListaGasto GastoData={GastoData} />
      ) : (
        <View style={{ marginTop: "50%" }}>
          <LottieActividad />
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
          >
            Sin Gastos
          </Text>
        </View>
      )}

      <FAB
        icon={ButtonAdd ? "close-thick" : "plus-thick"}
        style={styles.fab}
        onPress={() => setButtonAdd(!ButtonAdd)}
        color="white"
      />

      <Provider>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <DatePicker
                selected={
                  Fechaselect ? Fechaselect : moment().format("YYYY/MM/DD")
                }
                onDateChange={(date: any) => Fecht(date)}
                minimumDate={moment(data.Fecha_Creacion).format("YYYY/MM/DD")}
              />
              <Button
                icon="close"
                color="#3F8C4D"
                mode="contained"
                onPress={hideDialog}
              >
                Cerrar
              </Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </Provider>

      <PhotoCapture
        visibleCamara={visibleCamara}
        setVisibleCamara={setVisibleCamara}
        setImage={setImage}
      />

      <SelectFuntion
        Select={Select}
        setSelect={setSelect}
        ActividadesData={ActividadesData}
        setCatureSelect={setCatureSelect}
      />
    </>
  );
}

interface SelectProps {
  Select: boolean;
  setSelect: (e: boolean) => void;
  setCatureSelect: (e: string) => void;
  ActividadesData: DetalleSolic[];
}

function SelectFuntion({
  Select,
  setSelect,
  ActividadesData,
  setCatureSelect,
}: SelectProps) {
  const SelectActividad = (item: any) => {
    setCatureSelect(item.Actividad);
    setSelect(false);
  };

  return (
    <>
      <Provider>
        <Portal>
          <Dialog visible={Select} onDismiss={() => setSelect(false)}>
            <Dialog.Content>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginBottom: 25,
                  backgroundColor: "#C25934",
                  marginRight: "18%",
                  marginLeft: "18%",
                  color: "white",
                  borderRadius: 8,
                }}
              >
                Seleccione Actividad
              </Text>
              {ActividadesData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    height: 35,
                    margin: 5,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: "#BEE5D0",
                  }}
                  onPress={() => SelectActividad(item)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      paddingTop: 5,
                    }}
                  >
                    {item.Actividad} ( L. {Format(item.Total)} )
                  </Text>
                </TouchableOpacity>
              ))}
            </Dialog.Content>
          </Dialog>
        </Portal>
      </Provider>
    </>
  );
}

interface GastosProps {
  GastoData: GastosData[];
}

function ListaGasto({ GastoData }: GastosProps) {
  const GastoDeta = (item: any) => {
    console.log(item);
  };

  return (
    <ScrollView>
      {GastoData.map((item) => (
        <>
          {Number(item.Id_Actividad) === 1 ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => GastoDeta(item)}
            >
              <View style={{ width: "25%" }}>
                <LottieAlimentacion />
              </View>
              <View style={{ width: "35%", marginTop: 22 }}>
                <Text style={{ color: "#919693", fontSize: 12 }}>
                  {moment(item.Fecha_Gasto).format("ll")}
                </Text>
                <Text style={{ color: "#599876", fontSize: 17 }}>
                  {item.Actividad}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginTop: 25,
                  }}
                >
                  L. {Format(item.TotalGasto)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {Number(item.Id_Actividad) === 2 ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => GastoDeta(item)}
            >
              <View style={{ width: "25%" }}>
                <LottieHotel />
              </View>
              <View style={{ width: "35%", marginTop: 22 }}>
                <Text style={{ color: "#919693", fontSize: 12 }}>
                  {moment(item.Fecha_Gasto).format("ll")}
                </Text>
                <Text style={{ color: "#599876", fontSize: 17 }}>
                  {item.Actividad}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginTop: 25,
                  }}
                >
                  L. {Format(item.TotalGasto)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {Number(item.Id_Actividad) === 3 ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => GastoDeta(item)}
            >
              <View style={{ width: "25%" }}>
                <LottiePhone />
              </View>
              <View style={{ width: "35%", marginTop: 22 }}>
                <Text style={{ color: "#919693", fontSize: 12 }}>
                  {moment(item.Fecha_Gasto).format("ll")}
                </Text>
                <Text style={{ color: "#599876", fontSize: 17 }}>
                  {item.Actividad}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginTop: 25,
                  }}
                >
                  L. {Format(item.TotalGasto)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {Number(item.Id_Actividad) === 4 ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => GastoDeta(item)}
            >
              <View style={{ width: "25%" }}>
                <LottiePeaje />
              </View>
              <View style={{ width: "35%", marginTop: 22 }}>
                <Text style={{ color: "#919693", fontSize: 12 }}>
                  {moment(item.Fecha_Gasto).format("ll")}
                </Text>
                <Text style={{ color: "#599876", fontSize: 17 }}>
                  {item.Actividad}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginTop: 25,
                  }}
                >
                  L. {Format(item.TotalGasto)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {Number(item.Id_Actividad) === 5 ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => GastoDeta(item)}
            >
              <View style={{ width: "25%" }}>
                <LottieParqueo />
              </View>
              <View style={{ width: "35%", marginTop: 22 }}>
                <Text style={{ color: "#919693", fontSize: 12 }}>
                  {moment(item.Fecha_Gasto).format("ll")}
                </Text>
                <Text style={{ color: "#599876", fontSize: 17 }}>
                  {item.Actividad}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginTop: 25,
                  }}
                >
                  L. {Format(item.TotalGasto)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {Number(item.Id_Actividad) === 6 ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => GastoDeta(item)}
            >
              <View style={{ width: "25%" }}>
                <LottieImpuesto />
              </View>
              <View style={{ width: "35%", marginTop: 22 }}>
                <Text style={{ color: "#919693", fontSize: 12 }}>
                  {moment(item.Fecha_Gasto).format("ll")}
                </Text>
                <Text style={{ color: "#599876", fontSize: 17 }}>
                  {item.Actividad}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginTop: 25,
                  }}
                >
                  L. {Format(item.TotalGasto)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {Number(item.Id_Actividad) === 7 ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => GastoDeta(item)}
            >
              <View style={{ width: "25%" }}>
                <Lottieaero />
              </View>
              <View style={{ width: "35%", marginTop: 22 }}>
                <Text style={{ color: "#919693", fontSize: 12 }}>
                  {moment(item.Fecha_Gasto).format("ll")}
                </Text>
                <Text style={{ color: "#599876", fontSize: 17 }}>
                  {item.Actividad}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginTop: 25,
                  }}
                >
                  L. {Format(item.TotalGasto)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {Number(item.Id_Actividad) === 8 ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => GastoDeta(item)}
            >
              <View style={{ width: "25%" }}>
                <LottieRepresentacion />
              </View>
              <View style={{ width: "35%", marginTop: 22 }}>
                <Text style={{ color: "#919693", fontSize: 12 }}>
                  {moment(item.Fecha_Gasto).format("ll")}
                </Text>
                <Text style={{ color: "#599876", fontSize: 17 }}>
                  {item.Actividad}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginTop: 25,
                  }}
                >
                  L. {Format(item.TotalGasto)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {Number(item.Id_Actividad) === 9 ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => GastoDeta(item)}
            >
              <View style={{ width: "25%" }}>
                <LottieGasolina />
              </View>
              <View style={{ width: "35%", marginTop: 22 }}>
                <Text style={{ color: "#919693", fontSize: 12 }}>
                  {moment(item.Fecha_Gasto).format("ll")}
                </Text>
                <Text style={{ color: "#599876", fontSize: 17 }}>
                  {item.Actividad}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginTop: 25,
                  }}
                >
                  L. {Format(item.TotalGasto)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {Number(item.Id_Actividad) === 10 ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => GastoDeta(item)}
            >
              <View style={{ width: "25%" }}>
                <LottieTaxi />
              </View>
              <View style={{ width: "35%", marginTop: 22 }}>
                <Text style={{ color: "#919693", fontSize: 12 }}>
                  {moment(item.Fecha_Gasto).format("ll")}
                </Text>
                <Text style={{ color: "#599876", fontSize: 17 }}>
                  {item.Actividad}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginTop: 25,
                  }}
                >
                  L. {Format(item.TotalGasto)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {Number(item.Id_Actividad) === 11 ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => GastoDeta(item)}
            >
              <View style={{ width: "25%" }}>
                <LottieBus />
              </View>
              <View style={{ width: "35%", marginTop: 22 }}>
                <Text style={{ color: "#919693", fontSize: 12 }}>
                  {moment(item.Fecha_Gasto).format("ll")}
                </Text>
                <Text style={{ color: "#599876", fontSize: 17 }}>
                  {item.Actividad}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginTop: 25,
                  }}
                >
                  L. {Format(item.TotalGasto)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {Number(item.Id_Actividad) === 12 ? (
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => GastoDeta(item)}
            >
              <View style={{ width: "25%" }}>
                <LottieOtros />
              </View>
              <View style={{ width: "35%", marginTop: 22 }}>
                <Text style={{ color: "#919693", fontSize: 12 }}>
                  {moment(item.Fecha_Gasto).format("ll")}
                </Text>
                <Text style={{ color: "#599876", fontSize: 17 }}>
                  {item.Actividad}
                </Text>
              </View>
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    marginTop: 25,
                  }}
                >
                  L. {Format(item.TotalGasto)}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#969696",
  },
  loginButton: {
    backgroundColor: "#5352ed",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
  },
  loginButtonText: {
    color: "#fff",

    alignSelf: "center",
    fontSize: 18,
  },
});
