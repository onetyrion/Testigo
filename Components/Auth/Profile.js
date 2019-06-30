import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { stylesProfile } from './StylesAuth';
/**
 * @class contiene la view y las funciones de perfil del .
 */
export default class Profile extends Component {

  render() {
    return (
      <View style={stylesProfile.container}>
          <View style={stylesProfile.header}></View>
          <Image style={stylesProfile.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={stylesProfile.body}>
            <View style={stylesProfile.bodyContent}>
              <Text style={stylesProfile.name}>00.000.000-0</Text>
              <Text style={stylesProfile.info}>example@example.com</Text>
              
              <TouchableOpacity style={stylesProfile.buttonContainer}>
                <Text style={{color:"#f2f2f2"}} >Cambiar Email</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={stylesProfile.buttonContainer}>
                <Text style={{color:"#f2f2f2"}}>Cambiar Contraseña</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}


 