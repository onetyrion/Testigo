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


  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.state.data}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.containerItem} onPress={() => {navigate(item.link)}}>
                <Icon name={item.image} size={42} style={styles.image} />
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>{item.name}</Text>
                </View>
              </View>
              </TouchableOpacity>
            )
        }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root:{
    marginTop:20,
    padding:10,
  },
  titleContainer:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"#DCDCDC",
    padding:10
  },
  title:{
    fontSize:25,
    color:"#000000"
  },
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },  
  containerItem: {
    margin:2,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#e9e9e9",
    borderWidth: 1,
    borderRadius:2
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
  },
});
 