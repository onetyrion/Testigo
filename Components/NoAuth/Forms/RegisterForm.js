import React, {Component} from 'react';
import { View,TextInput,StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native';
import { CheckBox,Icon,Text,Button } from 'react-native-elements';
import {Field, reduxForm} from 'redux-form';
import {auth} from '../../../Store/Services/Firebase';
import { stylesRegister, stylesLogin } from '../StylesNoAuth';

const fieldNombre = (props) => {
    //  console.log(props);
    return(
        <View>
        <TextInput 
            onChangeText={props.input.onChange} 
            value={props.input.value} 
            placeholderTextColor="#b0b0b0"
            style={props.input.name === 'rut' ? stylesRegister.textInput1 : (props.input.name ==='ndoc' ? stylesRegister.textInput2 : stylesRegister.textInput)}
            placeholder={props.pc}
            keyboardType={props.input.name ==='correo' ? 'email-address' : 'default'}
            autoCapitalize='none'
            secureTextEntry={!!(props.input.name ==='password' || props.input.name ==='confirmacion')}
            onBlur={props.input.onBlur}/>
            {props.meta.touched && props.meta.error && <Text style={stylesLogin.errors}>{props.meta.error}</Text>}
        </View>
    )
};
const fieldPopUp = (props) =>{
    return(
        <View>
        <View style={{flexDirection: "row",width:270,backgroundColor:'#f0f0f0',padding:3,marginTop:20,borderRadius:5}}>
        <TextInput 
        onChangeText={props.input.onChange} 
        value={props.input.value} 
        placeholderTextColor="#b0b0b0"
        style={stylesRegister.textInput2}
        placeholder={props.pc}
        autoCapitalize='none'
        onBlur={props.input.onBlur}
        />
          <Icon name='search' 
            type='font-awesome' 
            containerStyle={{marginTop:3,paddingLeft:10,marginRight:7}}
            underlayColor="#b0b0b0"
            onPress={props.pressModal}/> 
        </View>
        {props.meta.touched && props.meta.error && <Text style={stylesLogin.errors}>{props.meta.error}</Text>}
        </View>
    )
}

const validate =(values)=>{
    const errors ={};
    if(!values.rut){
        errors.rut = 'requerido';
    } else if(values.rut.length > 12){
        errors.nombre = 'deben ser maximo 12 caracteres';
    }
    if(!values.ndoc){
        errors.ndoc = 'requerido';
    } else if(values.ndoc.length > 12){
        errors.ndoc = 'deben ser maximo 12 caracteres';
    }
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
    if(!values.confirmacion){
        errors.password = 'requerido';
    }else if(values.password !== values.confirmacion){
        errors.confirmacion = 'el password debe coincidir';
    }
    return errors;
}

const SignUpForms = (props)=>{
    //console.log(props);
    return(
        <View>
            <Field name="rut" component={fieldNombre} pc='RUT'/>
            <Field name="ndoc" component={fieldPopUp} pc='N° de documento'/>
            <Field name="password" component={fieldNombre} pc='Contraseña'/>
            <Field name="confirmacion" component={fieldNombre} pc='Repita su contraseña'/>
            <Field name="correo" component={fieldNombre} pc='Email'/>
            <CheckBox
                title={'Aceptar los terminos y condiciones (Manten para ver más)'} 
                checked={props.pressChk}
                onPress={props.onpressChk}
                onLongPress={() => {props.navigate('TyC')}}
                containerStyle={stylesRegister.CheckBox}
            />  
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={stylesRegister.button} onPress={()=>props.goBack()}>
                    <Text style={{color: "#fff",fontSize:15}}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={props.pressChk ? stylesRegister.button : stylesRegister.buttonDisabled} onPress={props.handleSubmit(props.registro,)} disabled={!props.pressChk}>
                    <Text style={{color: "#fff",fontSize:15}}>Aceptar</Text>
                </TouchableOpacity>
            </View>                      
        </View>
    )
};

export default reduxForm({form: 'SignUpForm',validate})(SignUpForms);