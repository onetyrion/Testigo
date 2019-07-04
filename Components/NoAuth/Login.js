import React, { Component } from 'react';
import { View, Text,Image,TextInput,TouchableOpacity } from 'react-native';
import icon from '../../assets/LogoV2.jpeg'; 
import {KeyboardAvoidingView} from 'react-native';
import { Font } from 'expo';
import { stylesLogin } from './StylesNoAuth';
import { connect} from 'react-redux';
import LoginForm from './Forms/LoginForm';
import { actionLOGIN } from '../../Store/ACTIONS';
import ProfileEmailForm from '../Auth/form/ProfileEmailForm';
import { Overlay } from 'react-native-elements';
import { auth } from '../../Store/Services/Firebase';

/**
 * @class contiene view del login y funcionabilidad anexas a este
 */

class Login extends Component {
  constructor(props) {
    super(props),
    this.state={fontLoaded: false,CorreoVisible:false}
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
  CambiarContrasena = (values) => {
    this.props.ChangePassword(values.email);
    this.setState({CorreoVisible: false});
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
        <TouchableOpacity style={{marginTop:10}} onPress={()=>{navigate("SignUp")}}>  
          <Text style={{color: "#00B4DB",fontSize:15}}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:160}} onPress={()=>{this.setState({CorreoVisible:!this.state.CorreoVisible})}}>  
          <Text style={{color: "#808080",fontSize:13}}>Restablecer Contraseña</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
        <Overlay
        isVisible={this.state.CorreoVisible}
        onBackdropPress={() => this.setState({ CorreoVisible: false })}
        width="auto"
        height="auto"
        >
          <View style={{marginBottom: 22}}>
          <ProfileEmailForm ChangeEmail={this.CambiarContrasena}/>
          </View>
        </Overlay>
      </View>
    );
  } 
}
const mapStateToProps = (state) => {
  return {
    prop: state.prop,
    usuario: state.reducerSesion,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (datos) => {
      dispatch(actionLOGIN(datos))
    },    
    ChangePassword:(emailAddress) => { 
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        console.log("Email Enviado");
        Alert.alert(
          'Se ha enviado un correo para restablecer la contraseña...',
       );
      }).catch(function(error) {
        console.log(error)
      });
    },  
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

