import React, { Component } from 'react';
import {takeEvery, call} from 'redux-saga/effects';
import CONSTANTS from '../CONSTANTS';
import { database, auth } from '../Services/Firebase';
import { View,Alert,TouchableOpacity,StyleSheet,ToastAndroid } from 'react-native';
/**
 * 
 * @class Contiene los métodos que se conectan con Firebase
 */

const registroenFirebase = (values) => auth
    .createUserWithEmailAndPassword(values.correo, values.password)
    .then(success => success);

const RegisterBD = ({uid,email,rut,ndoc}) =>
    database.ref('Usuarios/' + uid).set({
        rut: rut,
        ndoc: ndoc,
        email: email 
    });

const registroFotoCloudinary = ({imagen,type}) => {
    const uri = imagen;
    const splitname = uri.split('/');
    const name = [...splitname].pop();
    console.log(name);
    const foto = {
        uri,
        type:type,
        name,
    }
    const formImagen = new FormData();
    formImagen.append('upload_preset', CONSTANTS.CLOUDINARY_PRESET);
    formImagen.append('file', foto);
    
    return fetch(CONSTANTS.CLOUDINARY_NAME, {
        method: 'POST',
        body: formImagen,
    }).then(response => response.json());
};  
function* sagaRegistro(values){
    try {
        const registro = yield call(registroenFirebase,values.datos);
        //console.log(registro.user);
        const {user:{email, uid}} = registro;
        //console.log(values)
        const { datos: { rut,ndoc } } = values;
        yield call( RegisterBD, { uid, email, rut,ndoc} );
    } catch (error) {
        console.log(error);
        if (error.toString().indexOf("The email address is already in use by another account.")!= -1) {
            ToastAndroid.show("El email ingresado ya esta registrado.",ToastAndroid.SHORT);    
        }
        ToastAndroid.show("Ha ocurrido un error, intentelo más tarde.",ToastAndroid.SHORT);
    }
}
const getemail= ({rut,password})=>{
    database.ref("Usuarios")
    .orderByChild("email")
    .on("child_added",
 (snapshot)=>{
    var d = snapshot.val();
    if(d.rut == rut){
        loginFirebasebase({correo:d.email,password:password});
    }
 })
};

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
function* sagaLogin(values){
    try {
        console.log(values);
        yield call(getemail,values.datos);
        
    } catch (error) {
        console.log(error);
        ToastAndroid.show("Ha ocurrido un error, intentelo más tarde.",ToastAndroid.SHORT);
    }
}
const RegisterPostBD = (values) =>
    database.ref('Archivos/' + Date.now()).set({
        Archivo: values.profileImageurl,
        Audio: values.profileAudiourl,
        Comentario: (values.description ? values.description : ''),
        Fecha: values.DateTime,
        Institucion:{
            Ambulancias:(values.chkAmbulancias ? true : false),
            Bomberos:(values.chkBomberos ? true : false),
            Carabineros: (values.chkCarabineros ? true : false),
        },
        Ubicacion:{
            Latitud: MapData.latitude,
            Longitud: MapData.longitude,
        },
        id:Date.now(),
    });
function* sagaSubirPublicacion(values){
    try {
        var upload,type;
        imagenSubidas = [];
        for (let index = 0; index < values.values.captures.length; index++) {
            const uri = values.values.captures[index];
            const splitname = uri.split('/');
            const name = [...splitname].pop();
            const namesplit = name.split('.');
            const tipo = [...namesplit].pop();
            if (tipo == 'jpg' || tipo == 'jpeg' || tipo == 'png') {
                type='image/jpeg';
            }else if(tipo == 'mp4'){
                type='video/mp4';
            }
            upload = yield call(registroFotoCloudinary,{imagen:values.values.captures[index],type:'image/jpeg'});
            imagenSubidas=[upload.secure_url,...imagenSubidas];
        }
        // console.log("\n 11111");
        // console.log(imagenSubidas);
        var upload2='',audio='',profileAudiourl='';
        if(values.values.Audio!=''){
            audio = values.values.Audio.uri; 
            upload2 = yield call(registroFotoCloudinary,{imagen:audio,type:'audio/mp3'});
            // console.log(upload2);
            profileAudiourl = upload2.secure_url;
        }
        const profileImageurl = imagenSubidas;
        const {navigate,DateTime,description, chkAmbulancias, chkBomberos,MapData, chkCarabineros} = values.values;
        const uploadPost = yield call(RegisterPostBD,{profileAudiourl,MapData,DateTime,description,profileImageurl,chkAmbulancias,chkBomberos,chkCarabineros});        
        ToastAndroid.show("Subido correctamente",ToastAndroid.SHORT);
        Alert.alert(
            'Subido correctamente...',
         );
        console.log(values);
        // if(values.values.captures !== null){
        //     imagen = values.values.captures[0].uri;
        //     upload = yield call(registroFotoCloudinary,{imagen:imagen,type:'image/jpeg'});
        // }
        // var upload2='',audio='',profileAudiourl='';
        // if(values.values.Audio!=''){
        //     audio = values.values.Audio.uri; 
        //     upload2 = yield call(registroFotoCloudinary,{imagen:audio,type:'audio/mp3'});
        //     console.log(upload2);
        //     profileAudiourl = upload2.secure_url;
        // }
        // const profileImageurl = upload.secure_url;
        // const {DateTime,description, chkAmbulancias, chkBomberos, chkCarabineros} = values.values;
        // const uploadPost = yield call(RegisterPostBD,{profileAudiourl,DateTime,description,profileImageurl,chkAmbulancias,chkBomberos,chkCarabineros});
    } catch (error) {
        console.log(error);
        Alert.alert(
            'Ha ocurrido un error...'
         );
    }
}
export default function* funcionPrimaria(){
    yield takeEvery(CONSTANTS.REGISTRO,sagaRegistro);
    yield takeEvery(CONSTANTS.LOGIN,sagaLogin);
    yield takeEvery(CONSTANTS.SUBIR_PUBLICACION,sagaSubirPublicacion)
    console.log('desde nuestra función generadora');
}