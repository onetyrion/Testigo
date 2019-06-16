import React, {Component} from 'react';
import { View, Text,Button,TextInput,TouchableOpacity,StyleSheet } from 'react-native';
import {Field, reduxForm} from 'redux-form';
import { stylesLogin } from '../StylesNoAuth';
const fieldNombre = (props) => {
    return(
        <View >
            <TextInput 
            onChangeText={props.input.onChange} 
            value={props.input.value} 
            placeholder={props.pc}
            placeholderTextColor="#b0b0b0"
            keyboardType={props.input.name ==='correo' ? 'email-address' : 'default'}
            autoCapitalize='none'
            secureTextEntry={!!(props.input.name ==='password' || props.input.name ==='confirmacion')}
            onBlur={props.input.onBlur}
            style={props.input.name ==='correo' ? stylesLogin.textInput : stylesLogin.textInput2}/>
            {props.meta.touched && props.meta.error && <Text style={stylesLogin.errors}>{props.meta.error}</Text>}
        </View>
    )
}
const validate =(values)=>{
    const errors ={};
    if(!values.correo){
        errors.correo = 'requerido';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)){
        errors.correo = 'correo invalido';
    } 
    if(!values.password){
        errors.password = 'requerido';
    }else if(values.password.length <5){
        errors.password = 'deben ser al menos 5 caracteres';
    }else if(values.password.length > 15){
        errors.password = 'deben ser menor de 15 caracteres';
    }
    return errors;
}
const SignInForms = (props)=>{
    // console.log(props);
    return(
        <View style={{justifyContent: 'center',alignItems:'center'}}>
            <Field name="correo" component={fieldNombre} pc='Ingrese su RUT'/>
            <Field name="password" component={fieldNombre} pc='Ingrese su Contraseña'/>
            <TouchableOpacity style={stylesLogin.button} onPress={props.handleSubmit(props.login)}>
                <Text style={{color: "#fff",fontSize:15}}>Iniciar Sesión</Text>
            </TouchableOpacity>            
        </View>
    )
};
export default reduxForm({form: 'SignInForms',validate})(SignInForms);