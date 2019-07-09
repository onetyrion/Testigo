import RNRestart from 'react-native-restart';
import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { auth } from '../../Store/Services/Firebase';
import { stylesHome } from './StylesAuth';

/**
 * @class componente que pone una pantalla de carga mientras carga el logout con los servidores de Firebase
 */
export default class Logout extends Component {
  constructor(props) {
    super(props);
    auth.signOut();
  }
  render(){
    return(
      <View style={stylesHome.container}>
        <ActivityIndicator  size="large" color="#dc3545"/>
      </View>
    )
  }
}
