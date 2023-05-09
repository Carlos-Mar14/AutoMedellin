import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation, route }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        label="Usuario"
        mode='outlined'
        onChangeText={username => setUsername(username)}
        value={username}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        style={styles.input}
        label="Contraseña"
        mode='outlined'
        onChangeText={password => setPassword(password)}
        value={password}
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
      />
      <Button 
        icon="account" 
        mode="contained" 
        onPress={async () => {
          let users = JSON.parse(await AsyncStorage.getItem('users'));
          console.log('Usuarios almacenados:', users);
          if (users) {
            let findUser = users.find(user => user.username == username && user.password == password);
            console.log('Usuario encontrado:', findUser);
            if (findUser != undefined) {
              setUsername('');
              setPassword('');
              console.log('Navegando a la pantalla Carro...');
              navigation.navigate('Carro', { username: findUser.username });
            } else {
              alert('Usuario y/o contraseña inválidos');
            }
          } else {
            alert('No hay usuarios registrados');
          }
        }}>
        Ingresar
      </Button>
      <Button 
        icon="account-plus" 
        mode="outlined" 
        onPress={() => navigation.navigate('Register')}>
        Registrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 10
  },
  input: {
    marginTop: 10,
    marginBottom: 10
  }
});