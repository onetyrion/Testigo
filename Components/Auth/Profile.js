import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput
} from 'react-native';
import { stylesProfile } from './StylesAuth';
import { auth } from '../../Store/Services/Firebase';
import { stylesRegister } from '../NoAuth/StylesNoAuth';
import { connect } from 'react-redux';
import { Overlay,Text,} from 'react-native-elements';
import ProfileEmailForm from './form/ProfileEmailForm';
import { actionCambiarEmail, actionObtenerPerfil, actionEstablecerSesion, actionCerrarSesion } from '../../Store/ACTIONS'

/**
 * @class contiene la view y las funciones de perfil del .
 */
class Profile extends Component {
  constructor(props){
    super(props);
    this.state={CorreoVisible: false,txtCorreo:""}
  }
  CambiarCorreo = (values) => {
    this.props.ChangeEmail(values.email);
    this.setState({CorreoVisible: false});
  }
  componentWillMount(){
    this.props.autenticacion();
  }
  render() {
    return (
      <View style={stylesProfile.container}>
        <View style={stylesProfile.header}></View>
        <Image style={stylesProfile.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <View style={stylesProfile.body}>
          <View style={stylesProfile.bodyContent}>
            <Text style={stylesProfile.name}>{this.props.usuario.usuario.displayName}</Text>
            <Text style={stylesProfile.info}>{this.props.usuario.usuario.email}</Text>
            
            <TouchableOpacity style={stylesProfile.buttonContainer} onPress={()=>{this.setState({CorreoVisible:!this.state.CorreoVisible})}}>
              <Text style={{color:"#f2f2f2"}} >Cambiar Email</Text>  
            </TouchableOpacity>              
            <TouchableOpacity style={stylesProfile.buttonContainer} onPress={()=>{this.props.ChangePassword(this.props.usuario.usuario.email)}}>
              <Text style={{color:"#f2f2f2"}}>Cambiar Contraseña</Text> 
            </TouchableOpacity>
          </View>
        </View>
        <Overlay
        isVisible={this.state.CorreoVisible}
        onBackdropPress={() => this.setState({ CorreoVisible: false })}
        width="auto"
        height="auto"
        >
          <View style={{marginTop: 22}}>
          <ProfileEmailForm ChangeEmail={this.CambiarCorreo}/>
          </View>
        </Overlay>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usuario: state.reducerSesion,
    prop: state.prop,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    ChangeEmail: (values) => { 
      dispatch(actionCambiarEmail(values))
    },
    ChangePassword:(emailAddress) => {
      
      var user = auth.currentUser;
      if (!user.emailVerified) {
        Alert.alert('Email no verificado, Revisa tu bandeja de entrada...');
        user.sendEmailVerification();
      }else{
        auth.sendPasswordResetEmail(emailAddress).then(function() {
          console.log("Email Enviado");
          Alert.alert(
            'Se ha enviado un correo para restablecer la contraseña...',
         );
        }).catch(function(error) {
          console.log(error)
        });
      }
    },        
    autenticacion: () => {
      auth.onAuthStateChanged(function(usuario) {
        if (usuario) {
          console.log(usuario);
          dispatch(actionEstablecerSesion(usuario));
        } else {
          console.log('no existe sesión');
          dispatch(actionCerrarSesion(usuario));
        }
      });
  }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)