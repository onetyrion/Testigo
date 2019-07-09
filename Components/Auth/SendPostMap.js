import React from 'react';
import LocationView from "react-native-location-view";
import {View} from "react-native";

/**
 * @class contiene el mapa para elegir la ubicación dentro de la denuncia
 */
export default class SendPostMap extends React.Component {
  state = {

  };
  render() {
    const selectLocation = this.props.showMapPicker;
    console.log(this.props);
    return(
      <LocationView
        apiKey={"AIzaSyAJKyjh4mUAuJrbKM7yosg9aCjEhZqkXeI"}
        onLocationSelect={(values)=>{console.log(values);selectLocation(values);}}
        initialLocation={{
          latitude: -27.36638115795976,
          longitude: -70.33235790207982,
        }}
      />
    );
  }
}