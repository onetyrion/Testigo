import React, { Component } from 'react';
import { View,Dimensions,Image,ScrollView,ActivityIndicator,StyleSheet,TouchableOpacity } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';
//import Gallery from './Camera/gallery.component';
import DateTimePicker from "react-native-modal-datetime-picker";
import { stylesSendPost } from './StylesAuth';
import { connect } from 'react-redux';
import { blur } from 'redux-form';
import SendPostForm from './form/SendPostForm';
import * as DocumentPicker from 'expo-document-picker';
import { Overlay, CheckBox, Text } from 'react-native-elements';
import { actionCargarImagenPublicacion, actionSubirPublicacion } from '../../Store/ACTIONS';
import Gallery from "./Camera/gallery.component";
import SendPostMap from './SendPostMap';
/**
 * @class contiene las funciones de el envio de una denuncia 
 */
class SendPost extends Component {
  constructor(props) {
    super(props);
    state = {isVisibleMap:false,captures: [],MapsData:{},MapVisible:false,AudioData:{},isDateTimePickerVisible: false,TextDatetime:"Fecha",isVisible:true,chkAmbulancias:false,chkCarabineros:false,chkBomberos:false,uploading:false}
  }
/**
   * @property SendPost redirige a un método de redux.
   * @param values contiene los valores del formulario.
 */
  SendPost = (values) => {
    this.setState({uploading:true});
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
    this.setState({uploading:false});

    const {navigate} = this.props.navigation;
    navigate("First");
  };
/**
 *  METHOD MODAL DATATIME PICKER
*/
/**
 * @property DateTimePickerShow funcion que cambia la visibilidad del componente que toma la fecha y hora
 */
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
  /**
 * @property _pickDocument función que recoge un archivo de la galeria 
 */
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    this.setState({AudioData:result});
    console.log(result);
  };
  /**
 * @property showMapPicker funcion que cambia la visibilidad del componente que toma la ubicación
 */
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
/**
 * @property render contiene la vista del componente.
 */
  render() {
    const captures = this.state.captures;
    return (
      !this.state.uploading ?
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
          Mapdata={this.state.MapData}
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
        width="auto"
        height="auto"
        >
          <View>
          <CheckBox
            checked={this.state.chkAmbulancias}
            title="Organización 1"
            onPress={() => this.setState({chkAmbulancias: !this.state.chkAmbulancias})}
          />
          <CheckBox
            checked={this.state.chkCarabineros}
            title="Organización 2"
            onPress={() => this.setState({chkCarabineros: !this.state.chkCarabineros})}
          />
          <CheckBox
            checked={this.state.chkBomberos}
            title="Organización 3"
            onPress={() => this.setState({chkBomberos: !this.state.chkBomberos})}
          />
          <View style={{padding:5,flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}} style={stylesSendPost.button1}>
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
      : <View style={stylesHome.container}><ActivityIndicator size="large" color="#dc3545" /><Text>Subiendo Archivos</Text> </View>
    );
  }
}
/**
 * @constant mapStateToProps transfiere de la store de redux a las propiedades del componente
 */
const mapStateToProps = state => ({
  props: state,
  imagen: state.reducerImagenPublicacion,
});
/**
 * @constant mapDispatchToProps ejecuta las acciones almacenadas en la store por medio de metodos inyectados al componente
 */
const mapDispatchToProps = dispatch => ({
  cargarImagen: (imagen) => {
    dispatch(actionCargarImagenPublicacion(imagen));
    dispatch(blur('SendPostForm', 'imagen', Date.now()));
  },
  subirPublicacion:(values)=>{
    dispatch(actionSubirPublicacion(values));
  }
});
/**
 * @constant connect exporta el componente e integra los metodos
 * @param mapDispatchToProps
 * @param mapStateToProps
 */
export default connect(mapStateToProps, mapDispatchToProps)(SendPost);