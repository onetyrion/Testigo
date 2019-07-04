import CONSTANTS from './CONSTANTS';

/**
 * 
 * @class almacena los action que usa la libreria redux 
 */
export const actionREGISTER = values =>({
    type: CONSTANTS.REGISTRO,
    datos:values
});
export const actionLOGIN = datos => ({
    type: CONSTANTS.LOGIN,
    datos
});
export const actionEstablecerSesion = datos =>({
    type: CONSTANTS.ESTABLECERSESION,
    datos
});
export const actionCerrarSesion = datos =>({
    type: CONSTANTS.CERRARSESION,
    datos
});
export const actionLoading = datos =>({
    type: CONSTANTS.LOADING,
    datos,
});
export const actionCargarImagenPublicacion = imagen => ({
    type: CONSTANTS.CARGAR_IMAGEN_PUBLICACION,
    imagen,
  });
export const actionSubirPublicacion = values => ({
    type: CONSTANTS.SUBIR_PUBLICACION,
    values,
  });
export const actionAnadirMarkers = values => ({
    type: CONSTANTS.ANADIR_MARKERS,
    values,
});
export const actionCambiarEmail = values => ({
    type: CONSTANTS.CAMBIAR_EMAIL,
    values,
});
export const actionObtenerPerfil = values => ({
    type: CONSTANTS.Obtener_Perfil,
    values,
});