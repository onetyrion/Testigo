import React, { Component } from 'react';
import { View,Image, TextInput,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Modal,ActivityIndicator,Alert } from 'react-native';
import { CheckBox,Icon,Text,Button } from 'react-native-elements';
import Carnet from '../../assets/carnet2.jpeg';
import { stylesRegister } from './StylesNoAuth';
import { connect} from 'react-redux';
import RegisterForm from './Forms/RegisterForm';
import { actionREGISTER } from '../../Store/ACTIONS';

/**
 * @class contiene el componente
 */

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {checked:true,modalVisible:false,isready:false}
  }
  /** 
   * @property SignInUser redirige a un método de redux.
   * @param values contiene los valores del formulario.
   */
  registroUsuario = (values) => {
    this.props.registro(values)
  };
  /**
   * @property cambia el valor de los check
   */
  onpressChk = () =>{
    this.setState({checked:!this.state.checked});
  }
  /** @property cambia el estado de la visibilidad del componente  */
  setModalVisible=()=> {
    this.setState({modalVisible: !this.state.modalVisible});
  }
    /**
   * @property navigationOptions indica las opciones de React Navigation
   */
  static navigationOptions = {
    title:"Registrarse",
    headerStyle: {
      backgroundColor: '#dc3545',
    },
    headerTintColor: '#fff',
  };
  /**
   * @property componentDidMount contiene el valor de la visualización de carga
   */
  componentDidMount(){
    this.setState({isready:true});
  }
  /**
   * @property render contiene la vista del componente.
   */
  render() {
    const {goBack} = this.props.navigation;
    const {navigate} = this.props.navigation;
    return (
      this.state.isready ?
      <View style={stylesRegister.container}>
        <Modal
          visible={this.state.modalVisible}
          animationType={'fade'}
          transparent={true}
          onRequestClose={this.setModalVisible}>
          <View style={stylesRegister.modalContainer}>
            <View style={stylesRegister.innerContainer}>
              <Image source={Carnet} style={{width:260,height:380}}/>
              <Button
                onPress={this.setModalVisible} 
                title="Cerrar"
                buttonStyle={stylesRegister.button}
              >
              </Button>
            </View>
          </View>
        </Modal>

        <KeyboardAvoidingView style={stylesRegister.container} behavior="padding" enabled>
          <RegisterForm 
            registro={this.registroUsuario} 
            pressChk={this.state.checked} 
            onpressChk={this.onpressChk}
            navigate={navigate}
            goBack={goBack}
            pressModal={this.setModalVisible}/>
        {/* <TextInput placeholder="RUT" placeholderTextColor="#b0b0b0" maxLength={12} style={stylesRegister.textInput1}/>
        <View style={{flexDirection: "row", backgroundColor:'#f0f0f0',padding:3,marginTop:20,borderRadius:5}}>
        <TextInput placeholder="N° de documento" placeholderTextColor="#b0b0b0" maxLength={12} style={stylesRegister.textInput2}/>
          <Icon name='search' 
            type='font-awesome' 
            containerStyle={{marginTop:3,paddingLeft:10,marginRight:7}}
            underlayColor="#b0b0b0"
            onPress={()=>{this.setModalVisible(true);}}/> 
        </View>
        <TextInput placeholder="Contraseña" placeholderTextColor="#b0b0b0" maxLength={12} style={stylesRegister.textInput}/>
        <TextInput placeholder="Repita su contraseña" placeholderTextColor="#b0b0b0" maxLength={12} style={stylesRegister.textInput}/>
        <TextInput placeholder="Email" placeholderTextColor="#b0b0b0" maxLength={12} style={stylesRegister.textInput}/>
        <CheckBox
          title='Aceptar los terminos y condiciones (Manten para ver más)' 
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked})}
          onLongPress={() => {navigate('TyC')}}
          containerStyle={stylesRegister.CheckBox}
        />
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={stylesRegister.button} onPress={() => {goBack()}}>
            <Text style={{color: "#fff",fontSize:15}}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesRegister.button}>
            <Text style={{color: "#fff",fontSize:15}}>Aceptar</Text>
          </TouchableOpacity>
        </View> */}
        </KeyboardAvoidingView>
      </View>
      : <View style={stylesRegister.container}><ActivityIndicator size="large" color="#dc3545" /></View>
    );
  }
}
/**
 * @constant mapStateToProps transfiere de la store de redux a las propiedades del componente
 */
const mapStateToProps = (state) => {
  return {
    prop: state.prop
  }
}
/**
 * @constant mapDispatchToProps ejecuta las acciones almacenadas en la store por medio de metodos inyectados al componente
 */
const mapDispatchToProps = (dispatch) => ({
  registro: (values) => {
    dispatch(actionREGISTER(values));
  }
})

/**
 * @constant connect exporta el componente e integra los metodos
 * @param mapDispatchToProps
 * @param mapStateToProps
 */
export default connect(mapStateToProps, mapDispatchToProps)(Register);
  
