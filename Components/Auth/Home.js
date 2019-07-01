import React from "react"; 
import { StyleSheet,ActivityIndicator, Text, View, Image } from "react-native"; 
import { Constants, Location, Permissions,MapView,Marker  } from "expo"; 
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { stylesHome } from "./StylesAuth";
import { database } from "../../Store/Services/Firebase";
import { connect} from 'react-redux';
/**
 * @class Crea componente Home, Contiene vista del mapa, botón a camara, barra lateral.
 */
class Home extends React.Component { 
    /**
     * @description define en propiedad state latitud, longitud y sus respectivas Delta(Posicionamiento de la camara) como tambien isready.
     * @param {*} props propiedad nativa de React Native. contiene parametros heredados.
     * @param {*} state propiedad nativa de React Native.
     * @param {number} lat Inicializado en null, sirve como parametro para el componente mapa.
     * @param {number} long Inicializado en null, sirve como parametro para el componente mapa.
     * @param {number} latitudeDelta Inicializado en 0.009, sirve como parametro para el componente mapa.
     * @param {number} longitudeDelta Inicializado en 0.009, sirve como parametro para el componente mapa.
     * @param {boolean} isready se usa para poner barra de carga en mapa, en caso de internet lento.
     * 
     */
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            long: null,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
            isready:false,
        };
    }
    /**
     * @description Metodo nativo de React Native, se usa para obtener la latitud y longitud cuando el componente mapa ya ha cargado.
     */
    componentWillMount(){
        try { 
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    const lat = position.coords.latitude;
                    const long =position.coords.longitude;
                    this.setState({lat,long});
                }
            );
            this.props.GetMarkerLast();
        } catch (error) {
            console.log(error)
        }
    }
    /**
     * @description Metodo nativo de React Native, se usa para definir false la variable isready en la propiedad estado.
     */
    componentDidMount(){
        this.setState({isready:true})
    }
    Logout(){
        dismiss();
    }
    /**
     * @description renderiza el componente metodo, alberga el mapa principal y botón flotante de camera.
     */
    render() {   
    const {navigate} = this.props.navigation;
    const {dismiss} = this.props.navigation; 
        return (
            this.state.lat && this.state.isready  ?
            <View style={stylesHome.container}>
                <MapView
                showsUserLocation={true} followUserLocation={true}
                    style={stylesHome.map}
                    initialRegion={{
                        latitude: this.state.lat,
                        longitude: this.state.long,
                        latitudeDelta:this.state.latitudeDelta,
                        longitudeDelta:this.state.longitudeDelta
                    }}
                />
                <ActionButton buttonColor="#dc3545" onPress={()=>{navigate('Camera')}}
                renderIcon={()=>{return <Icon name="md-camera" style={stylesHome.actionButtonIcon}/>}}>
                </ActionButton>
            </View>
             
            : <View style={stylesHome.container}><ActivityIndicator size="large" color="#dc3545" /></View>
            
        ); 
    } 
}
// var ref = db.ref("dinosaurs");
// ref.orderByChild("weight").limitToLast(2).on("child_added", function(snapshot) {
//   console.log(snapshot.key);
// });
const mapStateToProps = (state) => {
    return {
      prop: state.prop,
      markers: state.markers
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      GetMarkerLast: () => {
        var ref = database.ref("Archivos").limitToLast(5).on("child_added", function(snapshot) {
          console.log(snapshot);
        });
      }
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
