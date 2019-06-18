import React from 'react';
import LocationView from "react-native-location-view";
import {View} from "react-native";


export default class SelectLocationScreen extends React.Component {
  state = {

  };
functionLocationView = (values) => {

}
  render() {
    return(
        <LocationView
          apiKey={"AIzaSyAJKyjh4mUAuJrbKM7yosg9aCjEhZqkXeI"}
          onLocationSelect={(values)=>{console.log(values)}}
          initialLocation={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
        />
    );
  }
}