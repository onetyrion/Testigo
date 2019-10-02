
import { call} from 'redux-saga/effects';
import CONSTANTS from '../CONSTANTS';
import { database } from '../Services/Firebase';
import { Alert, ToastAndroid } from 'react-native';

export default function* sagaSubirPublicacion(values){
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
        Reportado:false,
        Ubicacion:{
            Latitud: MapData.latitude,
            Longitud: MapData.longitude,
        },
        Visto:false,
        id:Date.now(),
    });