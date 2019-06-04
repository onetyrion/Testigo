import React from 'react';
import { View, Image, ScrollView } from 'react-native';

import styles from './styles';

export default ({captures=[]}) => (
        
        // (captures.length ==0)?
        // captures.map(() => (
        //     <View style={styles.galleryImageContainer} key={require("../screenshots/camera-preview.png")} >
        //         <Image source={require("../screenshots/camera-preview.png")} style={styles.galleryImage} />
        //     </View>
        // )):
        captures.map(({ uri }) => (
            <View style={styles.galleryImageContainer} key={uri} >
                <Image source={{ uri }} style={styles.galleryImage} />
            </View>
        ))
);