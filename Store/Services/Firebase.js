import * as firebase from 'firebase';

/**
 * @class se usa para almacenar las configuraciones de la base de datos
 */
var firebaseConfig = {
  apiKey: "----------",
  authDomain: "--------",
  databaseURL: "-------",
  projectId: "------",
  storageBucket: "--------",
  messagingSenderId: "----------",
  appId: "--------------"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const database = firebase.database();
