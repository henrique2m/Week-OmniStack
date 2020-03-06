import React, { useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import SpotList from '../components/SpotList';

import { 
  AsyncStorage,
  ScrollView, 
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  Alert
} from 'react-native';

import logo from '../assets/logo.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.0.107:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${ booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      })
      
    })
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArras = storagedTechs.split(',').map(tech => tech.trim());
    
      setTechs(techsArras);
    })
  }, []);

 function logout(){
  AsyncStorage.removeItem('user');
  navigation.navigate('Login');
 }
    
  return(
    <SafeAreaView style={styles.container }>
       <Image style={styles.logo} source={logo} />
        
        <ScrollView>
          {techs.map(tech => <SpotList key={tech} tech={tech} />)}
        </ScrollView>

        <TouchableOpacity style={styles.logout} onPress={logout}>
              <Text style={styles.textLogout}>
                  Sair
              </Text>
        </TouchableOpacity>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#800080',
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30
  },

  logout: {
    height: 42,
    backgroundColor: "#1E90FF",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 10,
  },
  textLogout: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#444",
  }

});

