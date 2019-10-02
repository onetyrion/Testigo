import React, { Component } from 'react';
import { View, Text,Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { auth } from './Store/Services/Firebase';
import RoutesNoAuths from './Components/NoAuth/RoutesNoAuth';
import { actionEstablecerSesion, actionCerrarSesion, actionLoading } from './Store/ACTIONS';
import RoutesAuth from './Components/Auth/RoutesAuth';
import { stylesHome } from './Components/Auth/StylesAuth';
console.ignoredYellowBox = ['Setting a timer'];
/**
 * @class Contiene la condición en caso de estar logeado cargar las vistas correspondientes.
 */
class Selection extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.autenticacion();
    }
    render() {
        return (
            this.props.Loading[0]  ?
            <View style={styles.container}>
                {this.props.Usuario ? <RoutesAuth /> : <RoutesNoAuths />} 
            </View>
            :<View style={stylesHome.container}><ActivityIndicator size="large" color="#dc3545" /></View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
/**
 * Loading: pone una pantalla de carga mientras busca una session en el dispositivo
 *  Usuario: carga datos del usuario en caso de que exista una session
 */
const mapStateToProps = (state) => {
    return {
        Loading: state.reducerLoading,
        prop: state.prop,
        Usuario: state.reducerSesion,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        autenticacion: () => {
            // dispatch(actionCreator)
            auth.onAuthStateChanged(function(Usuario) {
                if (Usuario) {
                  dispatch(actionEstablecerSesion(Usuario));
                  dispatch(actionLoading(true));
                } else {
                    console.log('no existe sesión');
                    dispatch(actionCerrarSesion(Usuario));
                    dispatch(actionLoading(true));
                }
              });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selection)