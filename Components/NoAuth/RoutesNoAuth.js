import React from 'react';
import {createStackNavigator,createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Login from './Login';
import Register from './Register';
import TyC from './TyC';
import Home from './../Auth/Home';

const routesNoAuths = createStackNavigator({
    SignIn:{screen:Login,},
    SignUp:{screen:Register,},
    TyC:{screen:TyC,},
    Home:{screen:Home,},
});
export default createAppContainer(routesNoAuths);
