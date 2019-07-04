import React, { Component } from 'react';
import { View,TouchableOpacity,StyleSheet,ToastAndroid } from 'react-native';
import {Input,Text,Card,CheckBox,ButtonGroup, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { stylesContact } from './StylesAuth';
import ContactForm from './form/ContactForm';
import { connect } from 'react-redux';
import { actionContacto } from '../../Store/ACTIONS';


/**
 * @class Componente que renderiza el apartado contact.
 */
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
        checked:false,
        selectedIndex: 0,
        color:"#dc3545"
    };
    this.updateIndex = this.updateIndex.bind(this)
  }
  contactsubmit = (values) => {
    values = {values,btnHelp:this.state.selectedIndex};
    this.props.contactsubmitform(values);
    const {navigate} = this.props.navigation;
    navigate("Home");
    }
  updateIndex (selectedIndex) {
    this.setState({selectedIndex,color:"#fff"})
  }

  render() {
    const component1 = () => <Text style={this.state.selectedIndex == 0 ?{fontSize:15,fontWeight:"bold",color:"#fff"}:{fontSize:15,fontWeight:"bold",color:"#000000"}}>Reporte de problemas</Text>
    const component2 = () => <Text style={this.state.selectedIndex == 1 ?{fontSize:15,fontWeight:"bold",color:"#fff"}:{fontSize:15,fontWeight:"bold",color:"#000000"}}>Servicio de ayuda</Text>
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
          <ContactForm contact={this.contactsubmit}/>
        </Card> 
        <View style={{flexDirection: 'row-reverse',paddingLeft:20}}>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  props: state,
  imagen: state.reducerImagenPublicacion,
});

const mapDispatchToProps = dispatch => ({
  contactsubmitform:(values)=>{
    console.log("here");
    dispatch(actionContacto(values));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);

