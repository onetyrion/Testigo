import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { stylesAbout } from './StylesAuth';
/**
 * @name ContactList componente que renderiza la view de la sección Acerca de. 
 */
export default class ContactList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {
          data:[
            {key:1, name:'Contacto', image:"md-help-circle-outline", link:"Contact"},
            {key:2, name:'Termino y Condiciones', image:"md-paper", link:"TyC"},
          ]
        },
      ]
    }
  }
  /**
   * @property render contiene la vista del componente.
   */
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={stylesAbout.container}>
        <SectionList
          sections={this.state.data}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={stylesAbout.containerItem} onPress={() => {navigate(item.link)}}>
                <Icon name={item.image} size={42} style={stylesAbout.image} />
              <View style={stylesAbout.content}>
                <View style={stylesAbout.contentHeader}>
                  <Text  style={stylesAbout.name}>{item.name}</Text>
                </View>
              </View>
              </TouchableOpacity>
            )
        }}/>
      </View>
    );
  }
}


 