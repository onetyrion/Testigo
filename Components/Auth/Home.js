import React from "react"; 
import { StyleSheet,Platform, Text, View, Image } from "react-native"; 
import { Constants, Location, Permissions,MapView,Marker  } from "expo"; 

export default class Home extends React.Component { 
    constructor(props) {
        super(props);
    
        this.state = {
            lat: null,
            long: null,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
            error:null,
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
    render() { 
        console.log("Latitude: "+this.state.lat+"\n Longitude: "+this.state.long+"\n LatDelta: "+this.state.latitudeDelta+"\n LongDelta: "+this.state.longitudeDelta);
        return (
            this.state.lat  ?
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
            </View>
             
            : null
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
        flex:1
    }
});