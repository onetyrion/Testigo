import React, { Component } from 'react';
import {takeEvery, call, put} from 'redux-saga/effects';
import CONSTANTS from '../CONSTANTS';
import { database, auth } from '../Services/Firebase';
import { View,Alert,TouchableOpacity,StyleSheet,ToastAndroid } from 'react-native';
/**
 * 
 * @class Contiene los métodos que se conectan con Firebase
 */
var usuario = null;
const registroenFirebase = (values) => {
    var user=null;
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
    })
};
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
        yield call(registroenFirebase,values.datos);
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
    } catch (error) {
        console.log(error);
        Alert.alert(
            'Ha ocurrido un error...'
         );
    }
}
function* sagaCambiarEmail(values){
    try{
        console.log(values);
        var user = auth.currentUser;
        if (!user.emailVerified) {
            console.log("valid")
            Alert.alert('Email no verificado, Revisa tu bandeja de entrada...');
            user.sendEmailVerification();
        }else{
            database.ref('Usuarios/' + user.uid).update({
                "email": values.values
                });
            user.updateEmail(values.values)  
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
function* sagaObtenerPerfil(){
    try{
        var user = auth.currentUser;
        var name, email, photoUrl, uid, emailVerified;
        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid; 
            yield put({ type: 'OBTENER_PERFIL',value:{name,email,emailVerified,uid}});
            console.log("error");
          }
    }catch(error){
        // An error happened.
        console.log(error)
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
export default function* funcionPrimaria(){
    yield takeEvery(CONSTANTS.REGISTRO,sagaRegistro);
    yield takeEvery(CONSTANTS.LOGIN,sagaLogin);
    yield takeEvery(CONSTANTS.SUBIR_PUBLICACION,sagaSubirPublicacion);
    yield takeEvery(CONSTANTS.CAMBIAR_EMAIL,sagaCambiarEmail);
    yield takeEvery(CONSTANTS.Obtener_Perfil,sagaObtenerPerfil);
    yield takeEvery(CONSTANTS.ENVIAR_CONTACTO,sagaContacto)
    console.log('desde nuestra función generadora');
}