import React from 'react';
import { View,Image,ScrollView,TouchableOpacity, Text } from 'react-native';
import { Camera, Permissions,ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import styles from './styles';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';

export default class CameraPage extends React.Component {
    camera = null;

    state = {
        imagePick:null,
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: false,
        }); 
        
        if (!result.cancelled) {
          this.setState({ capturing: false, captures: [result, ...this.state.captures] });
        }
      };
    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Acceso denegado a camara.</Text>;
        }
        let { imagePick } = this.state;
        const {navigate} = this.props.navigation;
        return (
            <React.Fragment>    
                <View>           
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View> 
            <TouchableOpacity style={{justifyContent:"flex-end",alignItems:"flex-end",height:50,width:50,marginLeft:300,marginTop:32}}
            onPress={()=>{navigate("SendPost",{"Yeah":captures})}} >
                <Ionicons name="md-send" size={32} color="#f2f2f2" />
            </TouchableOpacity>
                {captures.length >= 0 && 
                
                <ScrollView 
                horizontal={true}
                style={[styles.bottomToolbar, styles.galleryContainer]} >
                    <TouchableOpacity style={{width:72,height:72,marginRight: 5,justifyContent:"center",alignItems:"center"}} 
                    onPress={this._pickImage
                    }>
                        <Ionicons name="md-images" size={52} color="white" />
                    </TouchableOpacity>
                    <Gallery captures={captures}/>
                </ScrollView>}
                <Toolbar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                />
            </React.Fragment>
        );
    };
    
};