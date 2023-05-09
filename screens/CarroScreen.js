import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { TextInput, Button, Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CarroScreen({ navigation, route }) {
  const [marca, setMarca] = useState("");
  const [placa, setPlaca] = useState("");
  const [disponible, setDisponible] = useState(true);
  const [carros, setCarros] = useState([]);
  const { username } = route.params;

  const getCarros = async () => { 
    try {
      const jsonValue = await AsyncStorage.getItem("@carros");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // Manejar error al obtener carros almacenados
    }
  };

  const storeCarros = async (carros) => {
    try {
      const jsonValue = JSON.stringify(carros);
      await AsyncStorage.setItem("@carros", jsonValue);
    } catch (e) {
      // Manejar error al almacenar carros
    }
  };

  const handleGuardar = async () => {
    const newCarro = { marca, placa, disponible };
    const newCarros = [...carros, newCarro];
    await storeCarros(newCarros);
    setCarros(newCarros);
    setMarca("");
    setPlaca("");
    setDisponible(true);
    console.log(newCarro);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alquiler de Carros</Text>
      <TextInput
        label="Marca"
        mode="outlined"
        onChangeText={(marca) => setMarca(marca)}
        value={marca}
        style={styles.input}
      />
      <TextInput
        label="Placa"
        mode="outlined"
        onChangeText={(placa) => setPlaca(placa)}
        value={placa}
        style={styles.input}
      />
      <View style={styles.checkboxContainer}>
        <Text>Disponible:</Text>
        <Checkbox
          status={disponible ? "checked" : "unchecked"}
          onPress={() => setDisponible(!disponible)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon="content-save"
          mode="contained"
          onPress={handleGuardar}
          style={styles.button}
        >
          Guardar
        </Button>
        <Button
          icon="car"
          mode="outlined"
          onPress={() => navigation.navigate("renta", { username: username })}
          style={styles.button}
        >
          Rentar
        </Button>
      </View>
      <Text style={styles.subtitle}>Carros:</Text>
      {carros.map((carro) => (
        <View key={carro.placa} style={styles.carroContainer}>
          <View style={styles.carroItem}>
            <Text style={styles.carroTexto}>{carro.marca}</Text>
            <Checkbox
              status={carro.disponible ? "checked" : "unchecked"}
              disabled={!carro.disponible}
              onPress={() => handleRentarCarro(carro)}
            />
          </View>
          <Text style={styles.carroPlaca}>{carro.placa}</Text>
        </View>
      ))}
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  carroContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  carroItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  carroTexto: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  carroPlaca: {
    marginLeft: "auto",
    fontSize: 16,
  },
});
