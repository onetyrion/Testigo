import {takeEvery, call} from 'redux-saga/effects';
import CONSTANTS from '../CONSTANTS';
import { database, auth } from '../Services/Firebase';
const registroenFirebase = (values) => auth
    .createUserWithEmailAndPassword(values.correo, values.password)
    .then(success => success);
const RegisterBD = ({uid,email,rut,ndoc}) =>
    database.ref('usuarios/' + uid).set({
        rut: rut,
        ndoc: ndoc,
        email: email 
    });

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

const loginFirebasebase = ({correo,password}) => auth
.signInWithEmailAndPassword(correo, password)
.then((success)=>success);
function* sagaLogin(values){
    try {
        console.log(values);
        const resultado =yield call(loginFirebasebase,values.datos);
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
}

export default function* funcionPrimaria(){
    yield takeEvery(CONSTANTS.REGISTRO,sagaRegistro);
    yield takeEvery(CONSTANTS.LOGIN,sagaLogin);
    console.log('desde nuestra función generadora');
}