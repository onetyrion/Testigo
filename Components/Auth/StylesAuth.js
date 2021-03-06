import { StyleSheet,Dimensions } from 'react-native';

const { width: winWidth, height: winHeight } = Dimensions.get('window');
/**
 * @property Contiene los estilos de las rutas autentificadas.
 */
export const stylesSendPost = StyleSheet.create({
  imageContainer:{
    flex:1,
  },
  images:{
    flex:0.2,
    width: winWidth,
    height:50,
    position: "absolute",
    marginTop: 50,
    paddingLeft: 5,
  },
  card:{
    position:'relative',
    marginTop: 100,
  },
  button:{
    alignItems:'center',
    width:150,
    padding:10,
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
    borderRadius:10,
    marginBottom: 250,
    marginLeft: 110,
  },
  button1:{
    alignItems:'center',
    width:150,
    padding:10,
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
    borderRadius:10,
    marginLeft: 5,
  },
  textInput:{
    marginTop:30,
    height: 35,
    padding: 5,
    width:270,
    borderRadius: 7,
    backgroundColor:"#f0f0f0"
  }
});
export const stylesProfile = StyleSheet.create({
    container:{
      flex:1,
    },
    header:{
      backgroundColor: "#00BFFF",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#dc3545",
    },
});
export const stylesAbout = StyleSheet.create({
    root:{
      marginTop:20,
      padding:10,
    },
    titleContainer:{
      shadowColor: '#00000021',
      shadowOffset: {
        width: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      marginVertical: 8,
      backgroundColor:"#DCDCDC",
      padding:10
    },
    title:{
      fontSize:25,
      color:"#000000"
    },
    container: {
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
    },  
    containerItem: {
      margin:2,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: "#e9e9e9",
      borderWidth: 1,
      borderRadius:2
    },
    content: {
      marginLeft: 16,
      flex: 1,
    },
    contentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6
    },
    separator: {
      height: 1,
      backgroundColor: "#CCCCCC"
    },
    image:{
      width:45,
      height:45,
      borderRadius:20,
      marginLeft:20
    },
    time:{
      fontSize:11,
      color:"#808080",
    },
    name:{
      fontSize:16,
      fontWeight:"bold",
    },
});
export const stylesContact = StyleSheet.create({
    button:{
        alignItems:'center',
        width:150,
        marginTop:40,
        padding:10,
        backgroundColor: "#dc3545",
        borderColor: "#dc3545",
        borderRadius:10,
    },
});
export const stylesHome = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map:{
        ...StyleSheet.absoluteFillObject,
    },actionButtonIcon: {
        fontSize: 22,
        height: 22,
        color: 'white',
      },
});
export const stylesCamera = StyleSheet.create({
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  bottomToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 0,
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#FFFFFF",
  },
  captureBtnActive: {
    width: 80,
    height: 80,
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    backgroundColor: "red",
    borderColor: "transparent",
  },
  galleryContainer: { 
    bottom: 100 
  },
  galleryImageContainer: { 
    width: 75, 
    height: 75, 
    marginRight: 5 
  },
  galleryImage: { 
    width: 75, 
    height: 75 
  }
});