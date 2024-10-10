// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://your-api-endpoint.com/auth', {
        username,
        password,
      });
      const token = response.data.token;  // Assuming the API returns the token in 'token' field

      // Save the token (you can use AsyncStorage or secure storage)
      // Navigate to the HomeScreen
      //navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#FFF"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#FFF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={handleLogin}>
      <Text style={{ color: 'white', textAlign:'center'}}>
        {loading ? "Logging in..." : "Login"}
      </Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#8fb9c9',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    marginLeft: 30,
    marginRight: 30,
    borderRadius:15,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer:{
    marginLeft: 30,
    marginRight: 30,
    marginTop:20,
    height: 40,
    backgroundColor: '#486890',
    padding: 10,
    borderRadius: 15
  },
  icon: {
    marginRight: 10,
  },
});

export default LoginScreen;
