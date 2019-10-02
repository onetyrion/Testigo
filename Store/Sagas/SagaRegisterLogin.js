import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';
import { database, auth } from '../Services/Firebase';
import { call } from 'redux-saga/effects';

/**
 * --------------------------------------------------- SAGA REGISTER ---------------------------------------------------
 */

const registroenFirebase = (values) => {
    var user=null;
    var rut = values.rut.replace(".","");
     rut = rut.replace(".","");
    console.log(values);
    fetch(`http://api.onetyriondev.com/?RUN=${rut}&type=CEDULA&serial=${values.ndoc}`)
    .then(response => response.json())
    .then(response => {     
        console.log(response.estado);   
        if (response.estado === "Vigente") {
            auth.createUserWithEmailAndPassword(values.correo, values.password)  
            .then(function () {
                user = auth.currentUser;
                user.sendEmailVerification();
              })
            .then(function () {
                user.updateProfile({
                  displayName: values.rut.toString(),
                });
              })
            .then(function () {
                database.ref('Usuarios/' + user.uid).set({
                    rut: values.rut,
                    ndoc: values.ndoc,
                    email: values.correo 
                });
            });
        } else {
            ToastAndroid.show("La cedula de identidad no existe o no es valida",ToastAndroid.SHORT); 
        }
    });
};
export function* sagaRegistro(values){
    try {
        yield call(registroenFirebase,values.datos);
    } catch (error) {
        console.log(error);
        if (error.toString().indexOf("The email address is already in use by another account.")!= -1) {
            ToastAndroid.show("El email ingresado ya esta registrado.",ToastAndroid.SHORT);    
        }
        ToastAndroid.show("Ha ocurrido un error, intentelo más tarde.",ToastAndroid.SHORT);
    }
}

/**
 * --------------------------------------------------- SAGA LOGIN ---------------------------------------------------
 */

const loginFirebasebase = ({correo,password}) => auth
.signInWithEmailAndPassword(correo, password)
.then((success)=>success)
.catch((error)=>{
    if (error.toString().indexOf("The password is invalid or the user does not have a password.")!= -1) {
        console.log(error);
        ToastAndroid.show("Credenciales incorrectas, por favor verifique sus datos.",ToastAndroid.SHORT); 
    } else {
        console.log(error);
        ToastAndroid.show("Ha ocurrido un error, intentelo más tarde.",ToastAndroid.SHORT);
    }
});

const getemail= ({rut,password})=>{
    database.ref("Usuarios")
    .orderByChild("rut")
    .on("child_added",
 (snapshot)=>{
    var d = snapshot.val();
    if(d.rut === rut){
        loginFirebasebase({correo:d.email,password:password});
    }
 })
};

export function* sagaLogin(values){
    try {
        console.log(values);
        yield call(getemail,values.datos);
    } catch (error) {
        console.log(error);
        ToastAndroid.show("Ha ocurrido un error, intentelo más tarde.",ToastAndroid.SHORT);
    }
}