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
            <Text >{props.input.name === "asunto" ? "Asunto:" : "Mensaje: " }</Text>
            <TextInput
            onChangeText={props.input.onChange} 
            value={props.input.value} 
            placeholderTextColor="#b0b0b0"
            autoCapitalize='none'
            onBlur={props.input.onBlur}
            style={stylesRegister.textInput}
            multiline = {props.input.name ===  "mensaje" ? true : false}
            maxLength = {props.input.name === "mensaje" ? 340 : 120}
            />
            {props.meta.touched && props.meta.error && <Text style={stylesLogin.errors}>{props.meta.error}</Text>}
        </View>
    )
}
/**
 * @method validate realiza la validación de cada campo
 * @param values 
 */
const validate =(values,props)=>{
    const errors ={};
    if(!values.asunto){
        errors.asunto = 'requerido';
    }if(!values.mensaje){
        errors.mensaje = 'requerido';
    }
    return errors;
    }
/**
 * @method contactForm contiene el componente general del formulario
 * @param {*} props 
 */
const contactForm = (props)=>{
// console.log(props);
return(
    <View style={{justifyContent: 'center',alignItems:'center'}}>
    <Field name="asunto" component={fieldNombre} ph={"Asunto:"}/>
    <Field name="mensaje" component={fieldNombre} ph={"Mensaje:"}/>
    <TouchableOpacity style={stylesLogin.button} onPress={props.handleSubmit(props.contact,)}>
        <Text style={{color: "#fff",fontSize:15}}>Enviar</Text>
    </TouchableOpacity>            
    </View>
)};
export default reduxForm({form: 'contactForm',validate})(contactForm);