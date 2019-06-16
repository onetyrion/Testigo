import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { auth } from './Store/Services/Firebase';
import RoutesNoAuths from './Components/NoAuth/RoutesNoAuth';
import { actionEstablecerSesion, actionCerrarSesion } from './Store/ACTIONS';
import RoutesAuth from './Components/Auth/RoutesAuth';

console.ignoredYellowBox = ['Setting a timer'];
// create a component
class Selection extends Component {
    componentDidMount(){
        this.props.autenticacion();
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.usuario ? <RoutesAuth /> : <RoutesNoAuths />} 
            </View>
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
        usuario: state.reducerSesion
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
                } else {
                    console.log('no existe sesión');
                    dispatch(actionCerrarSesion(usuario));
                }
              });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selection)