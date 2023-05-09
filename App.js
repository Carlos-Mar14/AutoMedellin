import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import LoginScreen from './screens/LoginScreen';
import RentaScreen from './screens/RentaScreen';
import RegisterScreen from './screens/RegisterScreen';
import CarroScreen from './screens/CarroScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs({ setOptions }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarActiveBackgroundColor: 'powderblue'
      }}
      listeners={({ navigation, route }) => ({
        focus: () => {
          setOptions({ title: route.name });
        }
      })}
    >
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: (tabInfo) => (
            <MaterialIcons name="person" size={22} color={tabInfo.tintColor} />
          )
        }}
      />
      <Tab.Screen
        name="Carro"
        component={CarroScreen}
        options={{
          title: 'Carros', // Establecer el título de la pantalla aquí
          tabBarIcon: (tabInfo) => (
            <MaterialIcons name="compress" size={22} color={tabInfo.tintColor} />
          )
        }}
      />
      <Tab.Screen
        name="renta"
        component={RentaScreen}
        options={{
          tabBarIcon: (tabInfo) => (
            <MaterialIcons name="chat" size={22} color={tabInfo.tintColor} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {props => <HomeTabs {...props} setOptions={props.navigation.setOptions} />}
        </Stack.Screen>
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Registrate en nuestro sistema' }}
        />
        <Stack.Screen
          name="Renta"
          component={RentaScreen}
          options={{ title: 'Rentar' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});