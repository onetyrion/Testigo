import React from 'react';
import {createStackNavigator,createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Login from './Login';
import Register from './Register';

const routesNoAuths = createStackNavigator({
    SignIn:{screen:Login,},
    SignUp:{screen:Register,},
});
export default createAppContainer(routesNoAuths);
