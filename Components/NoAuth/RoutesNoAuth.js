import React from 'react';
import {createStackNavigator,createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Login from './Login';
import Register from './Register';
import TyC from './TyC';
import RoutesAuth from './../Auth/RoutesAuth';
/**
 * @property routesNoAuths Las rutas del la navegación sin cuenta ni autentificado, usa la libreria React-Navigator
 */
const routesNoAuths = createStackNavigator({
    SignIn:{screen:Login,},
    SignUp:{screen:Register,},
    TyC:{screen:TyC,},
    RoutesAuth:{screen:RoutesAuth,
        navigationOptions:{ 
        title: 'SignIn',
        header:null 
        },}
});
export default createAppContainer(routesNoAuths);
