import RouteAuth from './Auth/RoutesAuth';
import RouteNoAuth from './NoAuth/RoutesNoAuth';
import {createStackNavigator,createAppContainer} from 'react-navigation';

const Routes = createStackNavigator({
    RouteNoAuth: { screen: RouteNoAuth },
    RouteAuth: { screen: RouteAuth },
},{
    defaultNavigationOptions:{
        header:null,
    }
});

export default createAppContainer(Routes);