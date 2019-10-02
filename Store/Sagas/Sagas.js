import React, { Component } from 'react';
import {takeEvery, call, put} from 'redux-saga/effects';
import CONSTANTS from '../CONSTANTS';
import { database, auth } from '../Services/Firebase';
import { View,Alert,TouchableOpacity,StyleSheet,ToastAndroid } from 'react-native';
import { sagaRegistro, sagaLogin } from './SagaRegisterLogin';
import sagaSubirPublicacion from './SagaUploadDenuncia';
/**
 * 
 * @class Contiene los métodos que se conectan con Firebase
 */

function* sagaCambiarEmail(values){
    try{
        console.log(values);
        var user = auth.currentUser;
        if (!user.emailVerified) {
            console.log("valid")
            Alert.alert('Email no verificado, Revisa tu bandeja de entrada...');
            user.sendEmailVerification();
            auth.signOut();
        }else{
            user.updateEmail(values.values)
            .then(function(){
                database.ref('Usuarios/' + user.uid).update({
                    "email": values.values
                    });
            })  
            .then(function(userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                //auth.signOut();
                console.log("Successfully updated user", userRecord);
                auth.signOut();
            })
            .catch(function(error) {
                console.log("Error updating user:", error);
            });
            Alert.alert('Correo cambiado, por favor inicie sesión denuevo...');
        }
    }catch(error){
        // An error happened.
        const value = {value:error};
        yield put({ type: 'CAMBIAR_CORREO', value });
        Alert.alert('Ha ocurrido un error mientras se cambiaba el email...');
        console.log(error);
    }
}
function* sagaContacto(values){
    console.log(values);
    try {
        var user = auth.currentUser;
        database.ref('Contacto/' + Date.now().toString()).set({
            "asunto": values.values.values.asunto,
            "mensaje": values.values.values.mensaje,
            "tipo": (values.values.btnHelp == 0 ? "Reporte de problemas" : "Servicio de ayuda"),
            "usuario": user.uid
        }).then(success => 
            Alert.alert('Se ha enviado correctamente...'))
    } catch (error) {
        console.log(error);
    }
}
function* sagaValidCEDULA(values){

    //?RUN=19767283-8&type=CEDULA&serial=110017253
    const formDocument = new FormData();
    formDocument.append('RUN', "19767283-8");
    formDocument.append('type', "CEDULA");
    formDocument.append('serial', "110017253");
    
    console.log(formDocument); 
    fetch("http://api.onetyriondev.com/?RUN=19767283-8&type=CEDULA&serial=110017253")
    .then(response => response.json())
    .then(response => {console.log(response.estado)});
}
export default function* funcionPrimaria(){
    yield takeEvery(CONSTANTS.REGISTRO,sagaRegistro);
    yield takeEvery(CONSTANTS.LOGIN,sagaLogin);
    yield takeEvery(CONSTANTS.SUBIR_PUBLICACION,sagaSubirPublicacion);
    yield takeEvery(CONSTANTS.CAMBIAR_EMAIL,sagaCambiarEmail);
    yield takeEvery(CONSTANTS.ENVIAR_CONTACTO,sagaContacto);
    yield takeEvery(CONSTANTS.VALIDAR_CEDULA,sagaValidCEDULA);
    console.log('desde nuestra función generadora');
}