import React, { Component } from 'react';
import { View, TextInput,StyleSheet,TouchableOpacity,Text  } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Icon } from 'react-native-elements';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {checked:true}
  }
  static navigationOptions = {
    title:"Registrarse",
  };

  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput placeholder="RUT" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput1}/>
        <View style={{flexDirection: "row"}}>
        <TextInput placeholder="N° de serie" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <Icon name='search' />
        </View>
        <TextInput placeholder="Contraseña" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <TextInput placeholder="Repita su contraseña" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <TextInput placeholder="Email" placeholderTextColor="#b0b0b0" maxLength={12} style={styles.textInput}/>
        <CheckBox
          title='Aceptar los terminos y condiciones' 
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked})}
          containerStyle={styles.CheckBox}
          titleProps={console.log("TERMINOS")}
        />
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={styles.button} onPress={() => {goBack()}}>
            <Text style={{color: "#fff",fontSize:15}}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: "#fff",fontSize:15}}>Aceptar</Text>
          </TouchableOpacity>
        </View>
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
  },CheckBox:{
    backgroundColor:'#fff',
    borderColor: '#fff',
  },button:{
    alignItems:'center',
    width:123,
    marginTop:20,
    margin:10,
    padding:10,
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
    borderRadius:10
},
});
  
