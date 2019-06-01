import React from 'react';
import {createStackNavigator,createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Login from './Login';
import Register from './Register';
import TyC from './TyC';
import RoutesAuth from './../Auth/RoutesAuth';

const routesNoAuths = createStackNavigator({
    SignIn:{screen:Login,},
    SignUp:{screen:Register,},
    TyC:{screen:TyC,},
    RoutesAuth:{screen:RoutesAuth,}
},{defaultNavigationOptions:{header:null}});
export default createAppContainer(routesNoAuths);
