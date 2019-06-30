import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { auth } from './Store/Services/Firebase';
import RoutesNoAuths from './Components/NoAuth/RoutesNoAuth';
import { actionEstablecerSesion, actionCerrarSesion, actionLoading } from './Store/ACTIONS';
import RoutesAuth from './Components/Auth/RoutesAuth';
import { stylesHome } from './Components/Auth/StylesAuth';
console.ignoredYellowBox = ['Setting a timer'];
/**
 * @class Clase que realiza la autentificación del usuario.
 */
class Selection extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.autenticacion();
    }
    render() {
        console.log(this.props.numero[0]);
        return (
            this.props.numero[0]  ?
            <View style={styles.container}>
                {this.props.usuario ? <RoutesAuth /> : <RoutesNoAuths />} 
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

const mapStateToProps = (state) => {
    return {
        numero: state.reducerPrueba,
        prop: state.prop,
        usuario: state.reducerSesion,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        autenticacion: () => {
            // dispatch(actionCreator)
            auth.onAuthStateChanged(function(usuario) {
                if (usuario) {
                  console.log(usuario);
                  dispatch(actionEstablecerSesion(usuario));
                  dispatch(actionLoading(true));
                } else {
                    console.log('no existe sesión');
                    dispatch(actionCerrarSesion(usuario));
                    dispatch(actionLoading(true));
                }
              });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selection)