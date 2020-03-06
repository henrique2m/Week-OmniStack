import React, {useState, useEffect} from 'react';
import {
   View,
   KeyboardAvoidingView,
   Image, 
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   AsyncStorage,
  } from 'react-native';

import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user =>{
      if(user){
        navigation.navigate('List');
      }
    })
  }, [])

  async function handleSubmit(){
    const response = await api.post('/sessions', {
      email
    });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  }
  return (
    <KeyboardAvoidingView  behavior="padding" style={styles.container}>
      <Image source={logo}/>

      <View style={styles.form}>
        <Text style={styles.label}> SEU E-MAIL *</Text>

        <TextInput 
          style={styles.input}
          placeholder='Seu e-mail'
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}> TECNOLOGIAS *</Text>
        <TextInput 
          style={styles.input}
          placeholder='Tecnologias de interesse'
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          Encontrar spots
        </Text>
      </TouchableOpacity>
      
      </View>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#800080',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#FFF',
    height: 44,
    marginBottom: 20,
    borderRadius: 2  
  },

  button: {
    height: 42,
    backgroundColor: "#1E90FF",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }

});
