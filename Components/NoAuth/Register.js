import React, { Component } from 'react';
import { View,Image, TextInput,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Modal,ActivityIndicator,Alert } from 'react-native';
import { CheckBox,Icon,Text,Button } from 'react-native-elements';
import Carnet from '../../assets/carnet2.jpeg';
import { stylesRegister } from './StylesNoAuth';
import { connect} from 'react-redux';
import RegisterForm from './Forms/RegisterForm';
import { actionREGISTER, actionVALIDAR } from '../../Store/ACTIONS';

/**
 * @class contiene el componente
 */

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {checked:true,modalVisible:false,isready:false,loading:false}
  }
  /** 
   * @property SignInUser redirige a un método de redux.
   * @param values contiene los valores del formulario.
   */
  registroUsuario = (values) => {
    this.props.registro(values);
  };
  /**
   * @property cambia el valor de los check
   */
  onpressChk = () =>{
    this.setState({checked:!this.state.checked});
    this.props.validar();
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
  },
  validar: (values) => {
    dispatch(actionVALIDAR(values));
  }
})

/**
 * @constant connect exporta el componente e integra los metodos
 * @param mapDispatchToProps
 * @param mapStateToProps
 */
export default connect(mapStateToProps, mapDispatchToProps)(Register);
  
