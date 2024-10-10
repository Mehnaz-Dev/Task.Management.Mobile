import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


const HomeScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textInput}>Welcome to the Home Screen</Text>
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    textInput: {
        color: 'black',
        backgroundColor: 'lightblue',
       },
  });

  export default HomeScreen;

  
