import React, { Component } from 'react';
import { View,Dimensions,Image,ScrollView,StyleSheet,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Gallery from './Camera/gallery.component';
import styles from './Camera/styles';
import {Input,Text,Card,CheckBox,ButtonGroup, Button,Overlay} from 'react-native-elements';

export default class Camera extends Component {
  constructor(props) {
    super(props);
    state = {captures: [],isVisible:true,checked:false,checked1:false,checked2:false}
  }
  componentWillMount = async () =>{
    const { navigation } = this.props;
    const photo = navigation.getParam("Yeah");
    this.setState({captures:photo});
  }
  render() {
    const captures = this.state.captures;
    return (
      <View style={styless.imageContainer}>
        <Overlay
        isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
        width="auto"
        height="auto"
        >
          <CheckBox
            checked={this.state.checked}
            title="Ambulancias"
            onPress={() => this.setState({checked: !this.state.checked})}
          />
          <CheckBox
            checked={this.state.checked1}
            title="Carabineros"
            onPress={() => this.setState({checked1: !this.state.checked1})}
          />
          <CheckBox
            checked={this.state.checked2}
            title="Bomberos"
            onPress={() => this.setState({checked2: !this.state.checked2})}
          />
          <View style={{padding:5,flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{}} style={styless.button1}>
              <Text style={{color:'#fff'}}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}} style={styless.button1}>
              <Text style={{color:'#fff'}}>Aceptar</Text>
            </TouchableOpacity> 
          </View>                 
        </Overlay>        
        <Card style={styless.card}>
          <Input
          label={"Mensaje:"}
          containerStyle={{marginTop:5}}
          inputStyle={{height:120}}
          multiline = {true}
          maxLength = {340} />
        </Card>
        <ScrollView 
          horizontal={true}
          style={[styless.images]} >
            <Gallery captures={captures}/>
        </ScrollView>
        <TouchableOpacity onPress={()=>{}} style={styless.button}>
          <Text style={{color:'#fff'}}>Enviar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styless = StyleSheet.create({
  imageContainer:{
    flex:1,
  },
  images:{
    flex:0.2,
    width: winWidth,
    height:50,
    position: "relative",
    marginTop: 50,
    paddingLeft: 5,
  },
  card:{
    position:'relative',
    marginTop: 100,
  },
  button:{
    alignItems:'center',
    width:150,
    padding:10,
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
    borderRadius:10,
    marginBottom: 250,
    marginLeft: 110,
  },
  button1:{
    alignItems:'center',
    width:150,
    padding:10,
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
    borderRadius:10,
    marginLeft: 5,
  },
});
