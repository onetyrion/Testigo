import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoutesNoAuth from './Components/NoAuth/RoutesNoAuth';
import RoutesAuth from './Components/Auth/RoutesAuth';
import Routes from './Components/Routes';
import Contact from './Components/Auth/Contact';
// versión expo 2.18.4
export default class App extends React.Component {

  render() {
    return (
      <RoutesNoAuth/> 
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
});
