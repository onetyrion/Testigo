import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,TextInput,Button,TouchableOpacity } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import icon from '../../assets/Logo.png'; 
import {KeyboardAvoidingView} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props)
  }
  static navigationOptions = {
    header:null
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.text}> Testigo </Text>
        <Image source={icon} style={styles.img}/> 
        <TextInput placeholder="Ingrese su RUT" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <TextInput placeholder="Ingrese su Contraseña" placeholderTextColor="#b0b0b0" style={styles.textInput2}/>
        <TouchableOpacity style={styles.button}>
            <Text style={{color: "#fff",fontSize:15}}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:10}} onPress={()=>{navigate("SignUp")}}>  
            <Text style={{color: "#00B4DB",fontSize:15}}>Registrarse</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
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
    },
    img: {
        width: 200,
        height: 200
    },
    text:{
        fontSize: 35,
        marginBottom: 60,
    },
    textInput:{
        marginTop: 40,
        padding: 5,
        width:270,
        backgroundColor:"#f0f0f0"
    },textInput2:{
        marginTop: 15,
        padding: 5,
        width:270,
        backgroundColor:"#f0f0f0"
    },
    button:{
        alignItems:'center',
        width:150,
        marginTop:40,
        padding:10,
        backgroundColor: "#dc3545",
        borderColor: "#dc3545",
        borderRadius:10
    },
  });
  
