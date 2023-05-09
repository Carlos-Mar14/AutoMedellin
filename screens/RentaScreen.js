import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RentaScreen({ navigation, route }) {
  const username = route.params ? route.params.username : "";
  const [rentaNum, setRentaNum] = useState("");
  const [placa, setPlaca] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rentas, setRentas] = useState([]);
  const [rentedCar, setRentedCar] = useState(null);

  const getCarros = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@carros");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // Manejar error al obtener carros almacenados
    }
  };

  const buscarCarro = async (placa) => {
    let carros = await getCarros();
    return carros.find((carro) => carro.placa === placa);
  };

  const handleRentar = async () => {
    console.log(
      `Datos enviados: rentaNum=${rentaNum}, placa=${placa}, startDate=${startDate}, endDate=${endDate}`
    );
    const carroEncontrado = await buscarCarro(placa);
    if (!carroEncontrado) {
      alert("La placa ingresada no se encuentra registrada.");
      return;
    }
    // Crear objeto de renta y agregarlo a la lista de rentas
    const renta = {
      rentaNum: rentaNum,
      placa: placa,
      username: username,
      startDate: startDate,
      endDate: endDate,
    };
    setRentas([...rentas, renta]);
    setRentaNum("");
    setPlaca("");
    setStartDate("");
    setEndDate("");
    setRentedCar({ placa: placa, username: username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alquiler de Carros</Text>
      <TextInput
        label="Número de Renta"
        mode="outlined"
        onChangeText={(rentaNum) => setRentaNum(rentaNum)}
        value={rentaNum}
      />
      <TextInput
        style={styles.input}
        label="Placa"
        mode="outlined"
        onChangeText={(placa) => setPlaca(placa)}
        value={placa}
      />
      <TextInput
        style={styles.input}
        label="Fecha de Inicio"
        mode="outlined"
        onChangeText={(startDate) => setStartDate(startDate)}
        value={startDate}
      />
      <TextInput
        style={styles.input}
        label="Fecha de Fin"
        mode="outlined"
        onChangeText={(endDate) => setEndDate(endDate)}
        value={endDate}
      />
      <Button icon="content-save" mode="contained" onPress={handleRentar}>
        Rentar
      </Button>
      {rentedCar && (
        <View style={styles.rentedCarContainer}>
          <Text style={styles.rentedCarTitle}>Información de alquiler:</Text>
          <Text>Usuario: {rentedCar.username}</Text>
          <Text>Placa: {rentedCar.placa}</Text>
          {rentas.length > 0 && (
            <View>
              <Text>
                Fecha de inicio: {rentas[rentas.length - 1].startDate}
              </Text>
              <Text>Fecha de fin: {rentas[rentas.length - 1].endDate}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 10,
  },
  input: {
    marginTop: 10,
  },
  rentedCarContainer: {
    marginTop: 20,
  },
  rentedCarTitle: {
    fontWeight: "bold",
  },
});
