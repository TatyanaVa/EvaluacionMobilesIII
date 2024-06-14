// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCz5YPTW913ZaAR2sP7HWFez8An8lDAR9g",
authDomain: "evaluacionmbiles3.firebaseapp.com",
projectId: "evaluacionmbiles3",
storageBucket: "evaluacionmbiles3.appspot.com",
messagingSenderId: "243883426611",
appId: "1:243883426611:web:6c8894ac4d7a7417993446",
dataBaseURL: "https://evaluacionmbiles3-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//export const auth=getAuth(firebase);


export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

//referencia al servicio de BDD
export const dbRealTime=getDatabase(firebase);