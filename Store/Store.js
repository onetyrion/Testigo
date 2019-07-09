import { createStore,combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {reducer as form} from 'redux-form';
import funcionPrimaria from './Sagas/Sagas';
import CONSTANTS from './CONSTANTS';

/**
 * 
 * @class clase principal de redux libreria que almacena un contenedor predecible del estado de aplicaciones a través de actions,reducers,y store.
 */
const reducerSesion = (state={usuario:null},action) =>{
  switch(action.type){
    case CONSTANTS.ESTABLECERSESION:
      return {usuario : action.datos };
    case CONSTANTS.CERRARSESION:
      return null;
    default:
      return state;
  }
}
const reducerPerfil = (state=null,action) => {
  switch (action.type) {
    case "CAMBIAR_CORREO":
      console.log(action);
      return {...action.value};
    default:
      return state;
  }
}
const reducerObtenerPerfil = (state=null,action) => {
  switch (action.type) {
    case "OBTENER_PERFIL":
      console.log(action);
      return null;
    default:
      return state;
  }
}
const reducerImagenPublicacion = (state = { imagen: null }, action) => {
    switch (action.type) {
      case CONSTANTS.CARGAR_IMAGEN_PUBLICACION:
        return { imagen: action.imagen };
      case CONSTANTS.LIMPIAR_IMAGEN_PUBLICACION:
        return { imagen: null };
      default:
        return state;
    }
  };
const reducerMarkers= (state = [], action) => {
  switch (action.type) {
    case CONSTANTS.ANADIR_MARKERS:
      //state = {markers: action.values}
      return [...action.values];
    default:
      return state;
  }
};
const reducerPrueba = (state=[0],action) => {
    switch (action.type) {
        case 'LOADING':
          return [action.datos];
    
        default:
          return state;
    }
};
const reducers = combineReducers({
    reducerSesion,
    form,
    reducerPerfil,
    reducerObtenerPerfil,
    reducerMarkers,
    reducerImagenPublicacion,
    reducerPrueba
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(funcionPrimaria);

export default store;