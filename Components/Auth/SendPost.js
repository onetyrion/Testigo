import React, { Component } from 'react';
import { View,Dimensions,Image,ScrollView,StyleSheet,TouchableOpacity } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';
//import Gallery from './Camera/gallery.component';
import DateTimePicker from "react-native-modal-datetime-picker";
import { stylesSendPost } from './StylesAuth';
import { connect } from 'react-redux';
import { blur } from 'redux-form';
import SendPostForm from './form/SendPostForm';
import { DocumentPicker } from 'expo';
import LocationView from "react-native-location-view";
import { Overlay, CheckBox, Text, Card, Input } from 'react-native-elements';
import { actionCargarImagenPublicacion, actionSubirPublicacion } from '../../Store/ACTIONS';
import Gallery from "./Camera/gallery.component";
import SendPostMap from './SendPostMap';
/**
 * @class contiene las funciones de el envio de una denuncia 
 */
class SendPost extends Component {
  constructor(props) {
    super(props);
    state = {isVisibleMap:false,captures: [],MapsData:{},MapVisible:false,AudioData:{},isDateTimePickerVisible: false,TextDatetime:"Fecha",isVisible:true,chkAmbulancias:false,chkCarabineros:false,chkBomberos:false}
  }
  SendPost = (values) => {
    captures= [];
    audio=(this.state.AudioData ? this.state.AudioData : '');
    datetime=(this.state.TextDatetime ? this.state.TextDatetime : '');
    if (this.state.captures[0]) {
      this.state.captures.forEach(element => {
        captures=[element.uri,...captures];
      });
    }
    MapData=this.state.MapData;
    values={...values,MapData:MapData,captures: captures,Audio:audio,DateTime:datetime,chkAmbulancias:this.state.chkAmbulancias,chkBomberos:this.state.chkBomberos,chkCarabineros:this.state.chkCarabineros};
    console.log(values);
    this.props.subirPublicacion(values);
    const {navigate} = this.props.navigation;
    navigate("Home");
  };
/**
 *  METHOD MODAL DATATIME PICKER
 */
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  DateTimePickerShow = () =>{
    this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    var dateformat= date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
    this.setState({TextDatetime:dateformat});
    this.hideDateTimePicker();
  };
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    this.setState({AudioData:result});
    console.log(result);
  };
  showMapPicker = ({latitude,longitude}) =>{
    this.setState({ isVisibleMap: !this.state.isVisibleMap,MapData:{latitude,longitude} });
  };
  /**
   * Metodo nativo de react native y retorno de view
   */
  componentWillMount = async () =>{
    const { navigation } = this.props;
    const photo = navigation.getParam("PhotoData");
    this.setState({captures:photo});
    this.props.cargarImagen(photo);
  }
  render() {
    const captures = this.state.captures;
    return (
      <View style={stylesSendPost.imageContainer}>
        {this.state.isVisibleMap ? <SendPostMap style={{position:'abolute'}} showMapPicker={this.showMapPicker}/> : 
        <View>
        <ScrollView 
          horizontal={true}
          style={[stylesSendPost.images]} >
          <Gallery captures={captures}/>
        </ScrollView>
        <SendPostForm 
          showMapPicker={this.showMapPicker}
          DateTimePickerisVisible={this.DateTimePickerShow}
          DateTimePickerText={this.state.TextDatetime}
          photoData={this.state.captures[0]}
          AudioData={this.state.AudioData}
          AudioPicker={this._pickDocument}
          SendPost={this.SendPost}
          imagen={this.props.imagen}/>
         <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          mode={"datetime"}
          onCancel={this.hideDateTimePicker}
          />
        
        <Overlay
        isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
        width="auto"
        height="auto"
        >
          <View>
          <CheckBox
            checked={this.state.chkAmbulancias}
            title="Ambulancias"
            onPress={() => this.setState({chkAmbulancias: !this.state.chkAmbulancias})}
          />
          <CheckBox
            checked={this.state.chkCarabineros}
            title="Carabineros"
            onPress={() => this.setState({chkCarabineros: !this.state.chkCarabineros})}
          />
          <CheckBox
            checked={this.state.chkBomberos}
            title="Bomberos"
            onPress={() => this.setState({chkBomberos: !this.state.chkBomberos})}
          />
          <View style={{padding:5,flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{this.setState({ isVisible: false })}} style={stylesSendPost.button1}>
              <Text style={{color:'#fff'}}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({ isVisible: false })}} style={stylesSendPost.button1}>
              <Text style={{color:'#fff'}}>Aceptar</Text>
            </TouchableOpacity>
            </View>
          </View>                 
        </Overlay>        
        </View>
      }
      </View>
    );
  }
}
const mapStateToProps = state => ({
  props: state,
  imagen: state.reducerImagenPublicacion,
});

const mapDispatchToProps = dispatch => ({
  cargarImagen: (imagen) => {
    dispatch(actionCargarImagenPublicacion(imagen));
    dispatch(blur('SendPostForm', 'imagen', Date.now()));
  },
  subirPublicacion:(values)=>{
    dispatch(actionSubirPublicacion(values));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SendPost);


