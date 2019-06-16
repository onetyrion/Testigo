import { StyleSheet,Dimensions } from 'react-native';
const { width: winWidth, height: winHeight } = Dimensions.get('window');

export const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errors:{
    color:'#FF0000'
  },
  img: {
    width: 140,
    height: 140,
    borderRadius:7
  },
  text:{
    fontFamily: 'pacifico',
    fontSize: 40,
    marginBottom: 30,
  },
  textInput:{
    marginTop: 40,
    padding: 5,
    width:270,
    backgroundColor:"#f0f0f0"
  },textInput2:{
    marginTop: 15,
    padding: 5,
    width:270,
    backgroundColor:"#f0f0f0"
  },
  button:{
    alignItems:'center',
    width:150,
    marginTop:40,
    padding:10,
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
    borderRadius:10
  },
});
export const stylesRegister = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewInput2: {
    flexDirection: "row",
    backgroundColor:'#f0f0f0',
    padding:3,
    marginTop:20,
    borderRadius:5
  },
  textInput1:{
    padding: 5,
    width:270,
    borderRadius: 7,
    backgroundColor:"#f0f0f0"
  },textInput:{
    marginTop: 20,
    padding: 5,
    width:270,
    borderRadius: 7,
    backgroundColor:"#f0f0f0"
  },textInput2:{
    width:224,
    height:33,
    borderRadius: 7,
    backgroundColor:"#f0f0f0"
  },CheckBox:{
    backgroundColor:'#fff',
    borderColor: '#fff',
    width:270
  },button:{
    alignItems:'center',
    width:123,
    marginTop:20,
    margin:10,
    padding:10,
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
    borderRadius:10
  },
  buttonDisabled:{
    alignItems:'center',
    width:123,
    marginTop:20,
    margin:10,
    padding:10,
    backgroundColor: "#ad7277",
    borderColor: "#ad7277",
    borderRadius:10
  },modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'rgba(0, 0, 0, 0.5)',
  },innerContainer: {
    alignItems: 'center',
    padding:20,
    width:300,
    backgroundColor:"#fff",
    borderRadius:5
  }
});
export const stylesTyC = StyleSheet.create({
  container: {
    margin: 30,
  }
});