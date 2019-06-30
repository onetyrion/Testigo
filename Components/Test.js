import React from 'react';
import LocationView from "react-native-location-view";
import {View} from "react-native";

/**
 * @class debido a que la aplicación se encuentra en fase alpha este componente se usa para probar funciones para posteriormente agregarla en el commit final para almacenarlo en github
 */
export default class SelectLocationScreen extends React.Component {
  state = {

  };

  render() {
    return(
      <View style={{flex: 1}}>
        <LocationView
          apiKey={"AIzaSyAJKyjh4mUAuJrbKM7yosg9aCjEhZqkXeI"}
          onLocationSelect={(values)=>{console.log(values)}}
          initialLocation={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
        />
      </View>
    );
  }
}