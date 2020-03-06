import React, { useState } from 'react';
import { 
  SafeAreaView, 
  AsyncStorage, 
  Text, 
  StyleSheet, 
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
  const [date, setDate ] = useState();

  const id = navigation.getParam('id');


  async function handleSubmit() {
   const user_id = await AsyncStorage.getItem('user');

   const res = await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    });

    if(res.data){
      Alert.alert('Solicitação bem sucedida!');
      navigation.navigate('List');
    }else{
      Alert.alert('Algo deu errado, tente novamente!');
    }

    
  };

  function handleCancel(){
    navigation.navigate('List');
  }

  return( 
    <SafeAreaView style={styles.container} >
      <Text style={styles.label}> DATA DE SEU INTERESSE *</Text>
      <TextInput 
        style={styles.input}
        placeholder='Qual data você quer reservar?'
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          Solicitar reserva
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.cancelbutton]} onPress={handleCancel}>
        <Text style={styles.buttonText}>
          Cancelar reserva
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
   flex: 1,
   margin : 30,
   justifyContent: "center",
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
    color: '#000',
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
    marginTop: 10,
  },

  cancelbutton: {
    backgroundColor: "#CCC",
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }

});