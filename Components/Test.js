import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';


export default class Test extends Component {

  render() {
    return (
        <ActionButton buttonColor="#dc3545">
          <Icon name="ios-camera" style={styles.actionButtonIcon} />
        </ActionButton>
    );
  }

}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});