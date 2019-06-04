import RNRestart from 'react-native-restart';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log("Holaaa");
    return (
      <View>
        <Button onPress={()=>{}}>Hola</Button>
      </View>
    );
  }
}
