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
            keyboardType={'email-address'}
            autoCapitalize='none'
            onBlur={props.input.onBlur}
            style={stylesRegister.textInput}
            />
            {props.meta.touched && props.meta.error && <Text style={stylesLogin.errors}>{props.meta.error}</Text>}
        </View>
    )
};
/**
 * @method validate realiza la validación de cada campo
 * @param values 
 */
const validate =(values,props)=>{
    const errors ={};
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = 'correo invalido';
    } 
    return errors;
}
/**
 * @method ProfileEmailForm contiene el componente general del formulario
 * @param {*} props 
 */
const ProfileEmailForm = (props)=>{
    // console.log(props);
    return(
    <View style={{justifyContent: 'center',alignItems:'center'}}>
        <Text>Ingrese correo</Text>
        <Field name="email" component={fieldNombre} pc='correo@correo.cl'/>
        <TouchableOpacity style={stylesLogin.button} onPress={props.handleSubmit(props.ChangeEmail)}>
            <Text style={{color: "#fff",fontSize:15}}>Enviar</Text>
        </TouchableOpacity>            
    </View>
    )
};
export default reduxForm({form: 'ProfileEmailForm',validate})(ProfileEmailForm);