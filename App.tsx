import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'; 
import LoginScreen from './screens/LoginScreen';
import { enableScreens } from 'react-native-screens';

enableScreens();

type RootStackParamList = {
  Home: undefined; 
  Login: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []); 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} 
         options={{ headerShown: false }} /> 
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
