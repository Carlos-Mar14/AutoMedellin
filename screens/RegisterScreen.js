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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10 }}>Registro</Text>
      <TextInput
        label="Nombre"
        mode='outlined'
        onChangeText={name => setName(name)}
        value={name}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        style={{ marginTop: 10 }}
        label="Usuario"
        mode='outlined'
        onChangeText={username => setUsername(username)}
        value={username}
        left={<TextInput.Icon icon="account" />}
      />
      <TextInput
        style={{ marginTop: 10, marginBottom: 10 }}
        label="Contraseña"
        mode='outlined'
        onChangeText={password => setPassword(password)}
        value={password}
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
      />
      <Button 
        icon="account-plus" 
        mode="contained" 
        onPress={handleRegister}>
        Registrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({})