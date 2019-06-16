import React, { Component } from 'react';
import { View,Dimensions,Image,ScrollView,StyleSheet,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Gallery from './Camera/gallery.component';
import {Input,Text,Card,CheckBox,ButtonGroup, Button,Overlay} from 'react-native-elements';
import { stylesSendPost } from './StylesAuth';

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
      <View style={stylesSendPost.imageContainer}>
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
            <TouchableOpacity onPress={()=>{() => this.setState({ isVisible: !this.state.isVisible })}} style={stylesSendPost.button1}>
              <Text style={{color:'#fff'}}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{() => this.setState({ isVisible: !this.state.isVisible })}} style={stylesSendPost.button1}>
              <Text style={{color:'#fff'}}>Aceptar</Text>
            </TouchableOpacity> 
          </View>                 
        </Overlay>        
        <Card style={stylesSendPost.card}>
          <Input
          label={"Mensaje:"}
          containerStyle={{marginTop:5}}
          inputStyle={{height:120}}
          multiline = {true}
          maxLength = {340} />
        </Card>
        <ScrollView 
          horizontal={true}
          style={[stylesSendPost.images]} >
            <Gallery captures={captures}/>
        </ScrollView>
        <TouchableOpacity onPress={()=>{}} style={stylesSendPost.button}>
          <Text style={{color:'#fff'}}>Enviar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

