import { createStore,combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {reducer as form} from 'redux-form';
import funcionPrimaria from './Sagas/Sagas';
import CONSTANTS from './CONSTANTS';

const reducerSesion = (state=null,action) =>{
    switch(action.type){
        case CONSTANTS.ESTABLECERSESION:
            return {...action.usuario};
        case CONSTANTS.CERRARSESION:
            return null;
        default:
            return state;
    }
}

const reducers = combineReducers({
    reducerSesion,
    form,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(funcionPrimaria);

export default store;