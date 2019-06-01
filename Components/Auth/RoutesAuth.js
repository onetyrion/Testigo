import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createDrawerNavigator,createStackNavigator,createAppContainer} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from './Home';
import Profile from './Profile';
import Logout from './Logout';
import About from './About';

class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Icon name='bars' 
            type='font-awesome' 
            containerStyle={{ width: 25, height: 25, marginLeft: 15 }}
            color="#fff"
            underlayColor="#a0a0a0"/>
        </TouchableOpacity>
      </View>
    );
  }
}

const Home_StackNavigator = createStackNavigator({
  First: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Testigo',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#dc3545',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Profile_StackNavigator = createStackNavigator({
  Second: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'Perfil',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#dc3545',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Logout_StackNavigator = createStackNavigator({
  Third: {
    screen: Logout,
    navigationOptions: ({ navigation }) => ({
      title: 'Cerrar sesión',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#dc3545',
      },
      headerTintColor: '#fff',
    }),
  },
});

const About_StackNavigator = createStackNavigator({
  Four: {
    screen: About,
    navigationOptions: ({ navigation }) => ({
      title: 'Acerca de',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#dc3545',
      },
      headerTintColor: '#fff',
    }),
  },
});

const DrawerNavigatorExample = createDrawerNavigator({
  Home: {
    screen: Home_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  Profile: {
    screen: Profile_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Perfil',
    },
  },
  Logout: {
    screen: Logout_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Cerrar Sesión',
    },
  },
  About: {
    screen: About_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Acerca de',
    },
  },
});
export default createAppContainer(DrawerNavigatorExample);