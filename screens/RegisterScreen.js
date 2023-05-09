import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    let users = JSON.parse(await AsyncStorage.getItem('users')) || [];
    let findUser = users.find(user => user.username == username);
    if (findUser != undefined){
      alert('El nombre de usuario ya está en uso')
    }
    else{
      let newUser = {name: name, username: username, password: password};
      users.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      // Borrar datos del registro
      setName('');
      setUsername('');
      setPassword('');
      navigation.navigate('Login')
      console.log(users)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        label="Nombre"
        mode='outlined'
        onChangeText={name => setName(name)}
        value={name}
        left={<TextInput.Icon name="account" />}
        style={styles.input}
      />
      <TextInput
        label="Usuario"
        mode='outlined'
        onChangeText={username => setUsername(username)}
        value={username}
        left={<TextInput.Icon name="account" />}
        style={styles.input}
      />
      <TextInput
        label="Contraseña"
        mode='outlined'
        onChangeText={password => setPassword(password)}
        value={password}
        secureTextEntry
        right={<TextInput.Icon name="eye" />}
        style={styles.input}
      />
      <Button 
        icon="account-plus" 
        mode="contained" 
        onPress={handleRegister}
        style={styles.button}
      >
        Registrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    width: '80%',
  },
  button: {
    marginTop: 20,
    width: '50%',
  },
});