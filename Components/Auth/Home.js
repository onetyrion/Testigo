import React from "react"; 
import { StyleSheet,ActivityIndicator, Text, View, Image } from "react-native"; 
import { Constants, Location, Permissions,MapView,Marker  } from "expo"; 
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Home extends React.Component { 
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
    componentWillMount(){
        try { 
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    const lat = position.coords.latitude;
                    const long =position.coords.longitude;
                    this.setState({lat,long});
                }
            );
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount(){
        this.setState({isready:true})
    }
    render() {   
    const {navigate} = this.props.navigation; 
        console.log("Latitude: "+this.state.lat+"\n Longitude: "+this.state.long+"\n LatDelta: "+this.state.latitudeDelta+"\n LongDelta: "+this.state.longitudeDelta);
        return (
            this.state.lat && this.state.isready  ?
            <View style={styles.container}>
                <MapView
                showsUserLocation={true} followUserLocation={true}
                    style={styles.map}
                    initialRegion={{
                        latitude: this.state.lat,
                        longitude: this.state.long,
                        latitudeDelta:this.state.latitudeDelta,
                        longitudeDelta:this.state.longitudeDelta
                    }}
                />
                <ActionButton buttonColor="#dc3545" onPress={()=>{navigate('Camera')}}
                renderIcon={()=>{return <Icon name="md-camera" style={styles.actionButtonIcon}/>}}>
                </ActionButton>
            </View>
             
            : <View style={styles.container}><ActivityIndicator size="large" color="#dc3545" /></View>
            
        ); 
    } 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map:{
        ...StyleSheet.absoluteFillObject,
    },actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
});