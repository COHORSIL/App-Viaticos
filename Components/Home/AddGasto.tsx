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
import { Icon } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { DetalleSolic } from "../Interface/AppinterfaceHome";
import OverlayLoading from "../../Components/Overlay/OverlayLoading";

interface Over {
  Texto: string;
  Visible: boolean;
}

export default function AddGasto(props: any) {
  const { data }: DetalleSolic = props.route.params;
  const [image, setImage] = useState<string>("");
  const [ButtonAdd, setButtonAdd] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
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
    }, 2000);
  };

  return (
    <>
      <OverlayLoading DataOverlay={DataOverlay} />
      {ButtonAdd ? (
        <KeyboardAvoidingView>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView>
              <Animatable.View animation="fadeInRight" delay={500}>
                <Photo setImage={setImage} image={image} />

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
                        right={
                          <TextInput.Icon icon="calendar-multiple-check" />
                        }
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

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => AddGasto()}
                >
                  <Text style={styles.loginButtonText}>Agregar Gasto</Text>
                </TouchableOpacity>
              </Animatable.View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : null}
      <FAB
        icon={Button ? "plus-thick" : "close-thick"}
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
    </>
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
