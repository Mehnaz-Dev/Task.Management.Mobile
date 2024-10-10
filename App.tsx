import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'; 
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

type RootStackParamList = {
  Home: undefined; 
  Login: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // useEffect to hide the splash screen once the app has mounted
  useEffect(() => {
    SplashScreen.hide();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} /> 
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
