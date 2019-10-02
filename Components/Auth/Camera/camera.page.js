import React from 'react';
import { View,ScrollView,TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import { stylesCamera } from '../StylesAuth';
import Toolbar from './toolbar.component';
import Gallery from './gallery.component';
import * as ImagePicker from 'expo-image-picker';
/**
 * @class componente que contiene la camara, y la exploración de galeria, se usa para obtener el contenido audiovisual.
 */
export default class CameraPage extends React.Component {
    /**@param {Camera} camera Objeto el cual contiene métodos necesarios para utilizar la camara(Camera expo). */
    camera = null;
    /**
     * @param {*} state propiedad nativa de React Native.
     * @param {ImagePicker} imagePick libreria ImagePicker, se usa para abrir la galeria.
     * @param {Array} captures Contiene las imagenes y videos elegidos por el usuario(Desde la galeria o Camara).
     * @param {boolean} capturing inabilita los botones mientras se captura una fotografia.
     * @param {Permissions} hasCameraPermission Configura y solicita permisos de camara al usuario.
     * @param {Camera} cameraType Configura el tipo de camara.
     * @param {Camera} flashMode Configura el flash de la camera.
     */
    constructor(props){
        super(props);
        state = {
            captures: [],
        };
    }
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

    /**
     * @description método que detiene la grabación.
     */
    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    /**
     * @description método que captura una fotografia y la añade a captures.
     */
    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] });
    };

    /**
     * @description método que inicia la grabación y la añade a captures.
     */
    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    };
    /**
     * @description método nativo de react native, se ejecuta despues de renderizar el componenete, pregunta los permisos de acceso a camara y audio.
     */
    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };
    /**
     * @description método que abre la galeria y la añade a captures.
     */
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
        }); 
        
        if (!result.cancelled) {
          this.setState({ capturing: false, captures: [result, ...this.state.captures] });
        }
      };
      /**
       * @description método que renderiza la view del componente.
       */
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
                        ratio="16:9"
                        type={cameraType}
                        flashMode={flashMode}
                        style={stylesCamera.preview}
                        ref={camera => this.camera = camera}
                    />
                </View> 
                {captures.length>0 ?
            <TouchableOpacity style={{justifyContent:"flex-end",alignItems:"flex-end",height:50,width:50,marginLeft:300,marginTop:32}}
            onPress={()=>{navigate("SendPost",{"PhotoData":captures})}} >
                <Ionicons name="md-send" size={32} color="#f2f2f2" />
            </TouchableOpacity>
                :null}
            {captures.length >= 0 && 
                <ScrollView 
                horizontal={true}
                style={[stylesCamera.bottomToolbar, stylesCamera.galleryContainer]} >
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