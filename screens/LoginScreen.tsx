import React, { useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import PasswordIcon from '../assetes/svg/PasswordIcon';
import UsernameIcon from '../assetes/svg/UsernameIcon';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const validateInputs = () => {
    if (!username || !password) {
      setErrorMessage("Username and password can't be empty");
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;
  
    setLoading(true);
    try {
      const response = await axios.post('https://your-api-endpoint.com/auth', {
        username,
        password,
      });
      const token = response.data.token; 
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const forgotPass = async () => {};

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <View style={styles.inputContainer}>
          <UsernameIcon style={styles.icon} />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#FFF"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <PasswordIcon style={styles.icon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#FFF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>
        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>
        <Text onPress={forgotPass} style={styles.forgotText}>Forgot Password?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fb9c9',
    justifyContent: 'center',
  },
  formContainer: {
    paddingHorizontal: 32,
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingVertical: 24,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    height: 50,
    marginBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#abcfe4',
  },
  input: {
    flex: 1,
    color: 'black',
  },
  icon: {
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#4c7c94',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  forgotText:{
    textDecorationLine:'underline',
    textAlign:'center',
    color:'#fff',
    marginTop:20,
  },
});

export default LoginScreen;