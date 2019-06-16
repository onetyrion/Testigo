import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { stylesCamera } from '../StylesAuth';

/**
 * @description Componente que recorre la propiedad capturas y retorna la imagen en una view.
 */
export default ({captures=[]}) => (
        
        captures.map(({ uri }) => (
            <View style={stylesCamera.galleryImageContainer} key={uri} >
                <Image source={{ uri }} style={stylesCamera.galleryImage} />
            </View>
        ))
);