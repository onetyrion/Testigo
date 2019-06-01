import React, { Component } from 'react';
import { View,Image, TextInput,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Modal,ActivityIndicator,Alert } from 'react-native';
import { CheckBox,Icon,Text,Button } from 'react-native-elements';
import Carnet from '../../assets/carnet2.jpeg';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {checked:true,modalVisible:false,isready:false}
  }

  static navigationOptions = {
    title:"Registrarse",
  };
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  componentDidMount(){
    this.setState({isready:true});
  }
  render() {
    const {goBack} = this.props.navigation;
    const {navigate} = this.props.navigation;
    return (
      this.state.isready ?
      <View style={styles.container}>
        <Modal
          visible={this.state.modalVisible}
          animationType={'fade'}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Image source={Carnet} style={{width:260,height:380}}/>
              <Button
                onPress={() => this.setModalVisible(false)} 
                title="Cerrar"
                buttonStyle={styles.button}
              >
              </Button>
            </View>
          </View>
        </Modal>

        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput placeholder="RUT" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput1}/>
        <View style={{flexDirection: "row", backgroundColor:'#f0f0f0',padding:3,marginTop:20,borderRadius:5}}>
        <TextInput placeholder="N° de documento" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput2}/>
          <Icon name='search' 
            type='font-awesome' 
            containerStyle={{marginTop:3,paddingLeft:10,marginRight:7}}
            underlayColor="#b0b0b0"
            onPress={()=>{this.setModalVisible(true);}}/> 
        </View>
        <TextInput placeholder="Contraseña" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <TextInput placeholder="Repita su contraseña" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <TextInput placeholder="Email" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <CheckBox
          title='Aceptar los terminos y condiciones (Manten para ver más)' 
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked})}
          onLongPress={() => {navigate('TyC')}}
          containerStyle={styles.CheckBox}
        />
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={styles.button} onPress={() => {goBack()}}>
            <Text style={{color: "#fff",fontSize:15}}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: "#fff",fontSize:15}}>Aceptar</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </View>
      : <View style={styles.container}><ActivityIndicator size="large" color="#dc3545" /></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },textInput1:{
    padding: 5,
    width:270,
    borderRadius: 7,
    backgroundColor:"#f0f0f0"
  },textInput:{
    marginTop: 20,
    padding: 5,
    width:270,
    borderRadius: 7,
    backgroundColor:"#f0f0f0"
  },textInput2:{
    width:224,
    height:33,
    borderRadius: 7,
    backgroundColor:"#f0f0f0"
  },CheckBox:{
    backgroundColor:'#fff',
    borderColor: '#fff',
    width:270
  },button:{
    alignItems:'center',
    width:123,
    marginTop:20,
    margin:10,
    padding:10,
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
    borderRadius:10
},modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems:'center',
  backgroundColor:'rgba(0, 0, 0, 0.5)',
},innerContainer: {
  alignItems: 'center',
  padding:20,
  width:300,
  backgroundColor:"#fff",
  borderRadius:5
}
});
  
