import React, { Component } from 'react';
import { View, Text,Image,TextInput,TouchableOpacity } from 'react-native';
import icon from '../../assets/LogoV2.jpeg'; 
import {KeyboardAvoidingView} from 'react-native';
import { Font } from 'expo';
import { stylesLogin } from './StylesNoAuth';
import { connect} from 'react-redux';
import LoginForm from './Forms/LoginForm';
import { actionLOGIN } from '../../Store/ACTIONS';

/**
 * @class contiene view del login y funcionabilidad anexas a este
 */

class Login extends Component {
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
  SignInUser = (values) => {
    this.props.login(values);
  }
  render() {
    const {navigate} = this.props.navigation;
    const {push} = this.props.navigation;
    return (
      <View style={stylesLogin.container}>
        <KeyboardAvoidingView style={stylesLogin.container} behavior="padding" enabled>
          {this.state.fontLoaded ? ( <Text style={stylesLogin.text}> Testigo </Text>):null}
       
        <Image source={icon} style={stylesLogin.img}/> 
        <LoginForm login={this.SignInUser} />
        {/* <TextInput placeholder="Ingrese su RUT" placeholderTextColor="#b0b0b0" maxLength={12} style={stylesLogin.textInput}/>
        <TextInput placeholder="Ingrese su Contraseña" placeholderTextColor="#b0b0b0" style={stylesLogin.textInput2}/>
        <TouchableOpacity style={stylesLogin.button}>
          <Text style={{color: "#fff",fontSize:15}} onPress={()=>{push('RoutesAuth')}}>Iniciar Sesión</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={{marginTop:10}} onPress={()=>{navigate("SignUp")}}>  
          <Text style={{color: "#00B4DB",fontSize:15}}>Registrarse</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  } 
}
const mapStateToProps = (state) => {
  return {
    prop: state.prop
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (datos) => {
      dispatch(actionLOGIN(datos))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

