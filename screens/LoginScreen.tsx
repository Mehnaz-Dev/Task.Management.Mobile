import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthRequest } from '../models/AuthRequest';
import requestService from '../service/RequestService'; 
import localStorageService from '../service/LocalStorageService'; 
import PasswordIcon from '../assetes/svg/PasswordIcon';
import UsernameIcon from '../assetes/svg/UsernameIcon';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage('');

    const authRequest: AuthRequest = {
      userName: username,
      password: password,
    };

    try {
      const jwtToken = await requestService.postAsync<string>('Authentication/Login', authRequest);
      if (jwtToken) {
        await localStorageService.saveUserAsync(jwtToken);
        const tokenUser = await localStorageService.getUserAsync();
        // Navigate to the dashboard
        //navigation.navigate('Dashboard');
      } else {
        setErrorMessage('Invalid login credentials');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login');
    }
    setLoading(false);
  };

  const forgotPass = () => {
    //navigation.navigate('ForgotPassword');
  };

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
            style={styles.input} />
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