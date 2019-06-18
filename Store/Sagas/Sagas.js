import {takeEvery, call} from 'redux-saga/effects';
import CONSTANTS from '../CONSTANTS';
import { database, auth } from '../Services/Firebase';
const registroenFirebase = (values) => auth
    .createUserWithEmailAndPassword(values.correo, values.password)
    .then(success => success);
const RegisterBD = ({uid,email,rut,ndoc}) =>
    database.ref('Usuarios/' + uid).set({
        rut: rut,
        ndoc: ndoc,
        email: email 
    });

const registroFotoCloudinary = (imagen) => {
    console.log(imagen);
    const uri = imagen;
    const splitname = uri.split('/');
    const name = [...splitname].pop();
    console.log(name);
    const foto = {
        uri,
        type:'image/jpeg',
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
function* sagaRegistro(values){
    try {
        const registro = yield call(registroenFirebase,values.datos);
        //console.log(registro.user);
        const {user:{email, uid}} = registro;
        //console.log(values)
        const { datos: { rut,ndoc } } = values;
        yield call( RegisterBD, { uid, email, rut,ndoc} );
    } catch (error) {
        console.log(error)
    }
}
const getemail= ({rut,password})=>{
    database.ref("Usuarios")
    .orderByChild("email")
    .on("child_added",
 (snapshot)=>{
    var d = snapshot.val();
    if(d.rut == rut){
        loginFirebasebase({correo:d.email,password:password});
    }
 })
};

const loginFirebasebase = ({correo,password}) => auth
.signInWithEmailAndPassword(correo, password)
.then((success)=>success);
function* sagaLogin(values){
    try {
        console.log(values);
        yield call(getemail,values.datos);
        //const resultado =yield call(loginFirebasebase,values.datos);
        
    } catch (error) {
        console.log(error);
    }
}
const RegisterPostBD = (values) =>
    database.ref('Archivos/' + Date.now()).set({
        Archivo: values.profileImageurl,
        Audio: '',
        Comentario: values.description,
        Fecha: values.DateTime,
        Institucion:{
            Ambulancias:true,
            Bomberos:true,
            Carabineros: true,
        },
        Ubicacion:{
            Latitud: -27.00667,
            Longitud: -70.01142,
        },
        id:Date.now(),
    });
function* sagaSubirPublicacion(values){
    try {
        console.log(values);
        const imagen = values.values.captures.uri; 
        const upload = yield call(registroFotoCloudinary,imagen);
        const profileImageurl = upload.secure_url;
        const {DateTime,description} = values.values;
        const uploadPost = yield call(RegisterPostBD,{DateTime,description,profileImageurl});
    } catch (error) {
        console.log(error);
    }
}
export default function* funcionPrimaria(){
    yield takeEvery(CONSTANTS.REGISTRO,sagaRegistro);
    yield takeEvery(CONSTANTS.LOGIN,sagaLogin);
    yield takeEvery(CONSTANTS.SUBIR_PUBLICACION,sagaSubirPublicacion)
    console.log('desde nuestra función generadora');
}