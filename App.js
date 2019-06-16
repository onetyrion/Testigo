import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import store from './Store/Store';
import Selection from './Selection';
// versión expo 2.18.4
export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          <Selection />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
