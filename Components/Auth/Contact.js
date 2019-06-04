import React, { Component } from 'react';
import { View,TouchableOpacity,StyleSheet,ToastAndroid } from 'react-native';
import {Input,Text,Card,CheckBox,ButtonGroup, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
        checked:false,
        selectedIndex: 2,
        color:"#dc3545"
    };
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex,color:"#fff"})
  }

  render() {
    const component1 = () => <Text style={{fontSize:15,fontWeight:"bold"}}>Reporte de problemas</Text>
    const component2 = () => <Text style={{fontSize:15,fontWeight:"bold"}}>Servicio de ayuda</Text>
    const buttons = [{ element: component1 }, { element: component2 }]
    const { selectedIndex } = this.state
    return (
      <View style={{flex:1,justifyContent:"center",padding:1}}>
        <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        selectedButtonStyle={{backgroundColor:"#dc3545"}}
        containerStyle={{width:320,marginLeft:20}} />
        <Card>
            <Input
            label={"Asunto:"}
            containerStyle={{}}
            maxLength = {120} />
            <Input
            label={"Mensaje:"}
            containerStyle={{marginTop:5}}
            inputStyle={{height:120}}
            multiline = {true}
            maxLength = {340} />
        </Card>
        <View style={{flexDirection: 'row-reverse',paddingLeft:20}}>
        <TouchableOpacity onPress={()=>{ToastAndroid.show('Se ha enviado su mensaje',ToastAndroid.SHORT)}} style={styles.button}>
            <Text  style={{color: "#fff",fontSize:15}}>Enviar</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    button:{
        alignItems:'center',
        width:150,
        marginTop:40,
        padding:10,
        backgroundColor: "#dc3545",
        borderColor: "#dc3545",
        borderRadius:10,
    },
})
