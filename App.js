import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import store from './Store/Store';
import Selection from './Selection';
import Test from './Components/Test';
// versión expo 2.18.4
import { YellowBox } from 'react-native';
import _ from 'lodash';
import SendPostMap from './Components/Auth/SendPostMap';

YellowBox.ignoreWarnings(['Setting a timer']);
YellowBox.ignoreWarnings(['Failed prop type']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
/**
 * @class Clase Main de la aplicación, se encuentra las configuraciones iniciales de la app tanto de REDUX-SAGA, como propias de FIREBASE.
 */
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
