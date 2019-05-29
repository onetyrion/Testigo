import React, { Component } from 'react';
import { View, TextInput,StyleSheet,CheckBox  } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  static navigationOptions = {
    title:"Registrarse",
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="RUT" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <TextInput placeholder="N° de serie" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <TextInput placeholder="Contraseña" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <TextInput placeholder="Repita su contraseña" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <TextInput placeholder="Email" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <CheckBox
          title='Click Here'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },textInput:{
      marginTop: 15,
      padding: 5,
      width:270,
      borderRadius: 7,
      backgroundColor:"#f0f0f0"
  },
  });
  
