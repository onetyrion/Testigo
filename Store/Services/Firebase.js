import * as firebase from 'firebase';

// var firebaseConfig = {
//   apiKey: "AIzaSyD8EcBJaLxpeq5d9PpfwjX-N5QzzeynM0I",
//   authDomain: "testigo-220905.firebaseapp.com",
//   databaseURL: "https://testigo-220905.firebaseio.com",
//   projectId: "testigo-220905",
//   storageBucket: "testigo-220905.appspot.com",
//   messagingSenderId: "348818678602",
//   appId: "1:348818678602:web:28ca88298bc86d94"
// };
var firebaseConfig = {
  apiKey: "AIzaSyDR1M5RNY93THt2mWvZArUYLX-q4XRtwJc",
  authDomain: "testigo-18a8c.firebaseapp.com",
  databaseURL: "https://testigo-18a8c.firebaseio.com",
  projectId: "testigo-18a8c",
  storageBucket: "testigo-18a8c.appspot.com",
  messagingSenderId: "652448395046",
  appId: "1:652448395046:web:742327bbf04297c9"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const database = firebase.database();