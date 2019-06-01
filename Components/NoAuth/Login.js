import React, { Component } from 'react';
import { View,ScrollView, Text,Image,StyleSheet,TextInput,Button,TouchableOpacity } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import icon from '../../assets/LogoV2.jpeg'; 
import {KeyboardAvoidingView} from 'react-native';
import { Font } from 'expo';

export default class Login extends Component {
  constructor(props) {
    super(props),
    this.state={fontLoaded: false}
  }
  static navigationOptions = {
    header:null
  };
  async componentDidMount() {
    await Font.loadAsync({
      'pacifico': require('../../assets/fonts/Pacifico-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    const {navigate} = this.props.navigation;
    const {push} = this.props.navigation;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          {this.state.fontLoaded ? ( <Text style={styles.text}> Testigo </Text>):null}
       
        <Image source={icon} style={styles.img}/> 
        <TextInput placeholder="Ingrese su RUT" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <TextInput placeholder="Ingrese su Contraseña" placeholderTextColor="#b0b0b0" style={styles.textInput2}/>
        <TouchableOpacity style={styles.button}>
          <Text style={{color: "#fff",fontSize:15}} onPress={()=>{push('RoutesAuth')}}>Iniciar Sesión</Text>
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
        width: 140,
        height: 140,
        borderRadius:7
    },
    text:{
        fontFamily: 'pacifico',
        fontSize: 40,
        marginBottom: 30,
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
  
