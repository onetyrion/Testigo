import CONSTANTS from './CONSTANTS';
export const actionREGISTER = values =>({
    type: CONSTANTS.REGISTRO,
    datos:values
});
export const actionLOGIN = datos => ({
    type: CONSTANTS.LOGIN,
    datos
});
export const actionEstablecerSesion = datos =>({
    type: CONSTANTS.ESTABLECERSESION
});
export const actionCerrarSesion = datos =>({
    type: CONSTANTS.CERRARSESION
})