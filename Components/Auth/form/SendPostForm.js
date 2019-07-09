import React, {Component} from 'react';
import { View,Button,TextInput,TouchableOpacity,StyleSheet } from 'react-native';
import {Field, reduxForm} from 'redux-form';
import { Image,Text, Input } from 'react-native-elements';
import { stylesRegister, stylesLogin } from '../../NoAuth/StylesNoAuth';
import { stylesSendPost } from '../StylesAuth';

/**
 * 
 * @method fieldNombre Contiene el componente de los input
 */
const fieldNombre = (props) => {
    return(
        <View >
            <TextInput
            onChangeText={props.input.onChange} 
            value={props.input.value} 
            placeholder={props.pc}
            placeholderTextColor="#b0b0b0"
            autoCapitalize='none'
            onBlur={props.input.onBlur}
            style={stylesRegister.textInput}
            multiline = {props.input.name ===  "description" ? true : false}
            maxLength = {props.input.name === "description" ? 600 : 150}
            />
            {props.meta.touched && props.meta.error && <Text style={stylesLogin.errors}>{props.meta.error}</Text>}
        </View>
    )
}
/**
 * 
 * @method fieldDateTime Contiene el componente de la fecha
 */
const fieldDateTime = (props) => {
    return(
        <View >
            <TouchableOpacity onPress={props.modal}>
            <Text 
            onChangeText={props.input.onChange}
            placeholder={props.pc}
            placeholderTextColor="#b0b0b0"
            autoCapitalize='none'
            onBlur={props.input.onBlur}
            style={stylesSendPost.textInput}>{props.txtDate ? props.txtDate : "Seleccione fecha"}</Text>
            </TouchableOpacity>
            {props.meta.touched && props.meta.error && <Text style={stylesLogin.errors}>{props.meta.error}</Text>}
        </View>
    )
}
/**
 * @method fieldAudio Contiene el componente que recoge el audio
 */
const fieldAudio = (props) => {
    //console.log(props.AudioData)
    return(
        <View >
            <TouchableOpacity onPress={props.AudioPicker}>
            <Text 
            onChangeText={props.input.onChange}
            placeholder={props.pc}
            placeholderTextColor="#b0b0b0"
            autoCapitalize='none'
            onBlur={props.input.onBlur}
            style={stylesSendPost.textInput}>{props.AudioData ? props.AudioData.name : "Seleccione Audio"}</Text>
            </TouchableOpacity>
            {props.meta.touched && props.meta.error && <Text style={stylesLogin.errors}>{props.meta.error}</Text>}
        </View>
    )
}
/**
 * @method fieldPhoto Contiene el componente de la foto
 */
const fieldPhoto = (props) => {
    //console.log(props.photoData)
    return(
        <View>
            <Image source={{uri: props.photoData.uri}}
            style={{marginTop:20,width:200,height:200}}/>
        </View>
    )
}
/**
 * @method fieldMap Contiene el componente de el mapa
 */
const fieldMap = (props) => {
    //console.log(props.MapsData)
    return(
        <View >
            <TouchableOpacity onPress={props.showMapPicker}>
            <Text 
            onChangeText={props.input.onChange}
            placeholder={props.pc}
            placeholderTextColor="#b0b0b0"
            autoCapitalize='none'
            onBlur={props.input.onBlur}
            style={stylesSendPost.textInput}>Seleccione Ubicación</Text>
            </TouchableOpacity>
            {props.meta.touched && props.meta.error && <Text style={stylesLogin.errors}>{props.meta.error}</Text>}
        </View>
    )
}
/**
 * @method validate realiza la validación de cada campo
 * @param values 
 * @param props
 */
const validate =(values,props)=>{
    const errors ={};
    if(!values.rut){
        errors.rut = 'requerido';
    }
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)){
        //     errors.correo = 'correo invalido';
        // } 
        console.log(props.imagen);
    if (!props.imagen) {
        errors.imagen = 'imagen es requerida';
    }
    if(!props.Mapdata){
        errors.ubicacion = 'la ubicación es requerida'; 
    }
    return errors;
    }
/**
 * @method SendPostForms contiene el componente general del formulario
 * @param {*} props 
 */
    const SendPostForms = (props)=>{
        // console.log(props);
        return(
            <View style={{marginTop:130,justifyContent: 'center',alignItems:'center'}}>
            <Field name="Audio" component={fieldAudio} AudioData={props.AudioData} AudioPicker={props.AudioPicker}/>
            <Field name="datetime" component={fieldDateTime} txtDate={props.DateTimePickerText} modal={props.DateTimePickerisVisible} pc='Fecha y hora'/>
            <Field name="description" component={fieldNombre} pc='Ingrese descripción de lo ocurrido'/>
            <Field name="ubicacion" component={fieldMap} showMapPicker={props.showMapPicker} MapsData={props.Mapdata} pc='Ingrese donde ocurrió'/>
            <TouchableOpacity style={stylesLogin.button} onPress={props.handleSubmit(props.SendPost,)}>
                <Text style={{color: "#fff",fontSize:15}}>Enviar denuncia</Text>
            </TouchableOpacity>            
        </View>
    )
};
export default reduxForm({form: 'SendPostForms',validate})(SendPostForms);