/**
 * @class Este componente contiene las rutas necesarias para navegar cuando el usuario está autenticado.
 */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createDrawerNavigator,createStackNavigator,createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Home from './Home';
import Profile from './Profile';
import Logout from './Logout';
import About from './About';
import Camera from './Camera/camera.page';
import SendPost from './SendPost';
import TyC from '../NoAuth/TyC';
import Contact from './Contact';
import SendPostMap from './SendPostMap';
import comunity_page from './Comunity/comunity_page';
import comunity_add from './Comunity/comunity_add';
import comunity_mypost from './Comunity/comunity_mypost';
import { stylesHome } from './StylesAuth';
import { Icon } from 'react-native-elements';
/**
 * Se importan los componentes necesarios(Home, Profile, About,Camera, SendPost, Contact, Terms and conditions, Logout)
 */
var colorActive = "d4707a";
class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };
  /**
   * @description Renderiza la barra superior y botón para desplegar barra lateral.
   * @returns {View}
   */
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
/**
 * @property {createStackNavigator} Home_StackNavigator Grupo de rutas dentro de la view Home (Camera,SendPost).
 * @returns {createStackNavigator}
 */
const Comunity_StackNavigator = createMaterialBottomTabNavigator({
  comunity_page: { 
    screen: comunity_page,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "Comunidad",
      tabBarIcon: ({ tintColor }) => (  
        <View>  
          <Icon name = {"home"} type = {"material"} color = {tintColor}/>  
        </View>),  
    }),
  },
  comunity_add: {
    screen: comunity_add,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: "Añadir",
      tabBarIcon: ({ tintColor }) => (  
        <View>  
          <Icon name = {"add-circle"} type = {"material"} color = {tintColor}/>  
        </View>),  
    }),
  },
  comunity_mypost: { 
    screen: comunity_mypost,
    navigationOptions: () => ({
      tabBarLabel: "Mis denuncias",
      tabBarIcon: ({tintColor}) => (  
        <View>  
          <Icon name = {"face"} type = {"material"} color = {tintColor}/>  
        </View>
      ),
    })
  }
},
{
initialRouteName: 'comunity_page',
activeColor: '#d4707a',
inactiveColor: '#000000',
barStyle: { backgroundColor: '#fff' }});

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
  Camera:{
    screen: Camera,
    navigationOptions:{header:null}
  },
  pickMap:{
    screen: SendPostMap,
    navigationOptions:{header:null}
  },
  SendPost:{
    screen: SendPost,
    navigationOptions: ({ navigation }) => ({
      title: 'Enviar denuncia',
      headerStyle: {
        backgroundColor: '#dc3545',
      },
      headerTintColor: '#fff',
    }), 
  },
  Comunity_StackNavigator:{
    screen: Comunity_StackNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Comunidad',
      headerStyle: {
        backgroundColor: '#dc3545',
      },
      headerTintColor: '#fff',
    }),
  }
});
/**
 * @property {createStackNavigator} Profile_StackNavigator Grupo de rutas dentro de la view Profile (Profile).
 * @returns {createStackNavigator}
 */
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
/**
 * @property {createStackNavigator} Logout_StackNavigator Grupo de rutas dentro de la view Logout (Redirecciona al login).
 * @returns {createStackNavigator}
 */
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
/**
 * @property {createStackNavigator} About_StackNavigator Grupo de rutas dentro de la view About (TyC,Contact).
 * @returns {createStackNavigator}
 */
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
  TyC:{
    screen: TyC,
    navigationOptions:{
      title: "Terminos y Condiciones",
      headerStyle: {
        backgroundColor: '#dc3545',
      },
      headerTintColor: '#fff',
    }
  },
  Contact:{
    screen: Contact,
    navigationOptions:{
      title: "Contacto",
      headerStyle: {
        backgroundColor: '#dc3545',
      },
      headerTintColor: '#fff',
    }
  },
});
/**
 * @property {createDrawerNavigator} dnMain Conjunto mayor de rutas. Contiene los grupos de rutas y exporta un unico objeto.
 * @returns {createDrawerNavigator}
 */
const dnMain = createDrawerNavigator({
  Home: {
    screen: Home_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
    },
    navigationOptions:({ navigation }) => {
      let { routeName } = navigation.state.routes[navigation.state.index]
      let navigationOptions = {}
      if (routeName === 'SendPost' || routeName === 'Camera') {
        navigationOptions.drawerLockMode = 'locked-closed';
      }
      return navigationOptions
    } 
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
      drawerLockMode: 'locked-closed',
    },
  }
});
export default createAppContainer(dnMain);