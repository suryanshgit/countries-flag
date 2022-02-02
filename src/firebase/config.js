import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

 const app=firebase.initializeApp({
    "projectId": "upload-download-img",
    "appId": "1:738700051903:web:89fbe7d3b778652d0a4d0a",
    "databaseURL": "https://upload-download-img-default-rtdb.firebaseio.com",
    "storageBucket": "upload-download-img.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyDGihSKN7bwqVnN1xsfk_Gjfcal4UtGpuA",
    "authDomain": "upload-download-img.firebaseapp.com",
    "messagingSenderId": "738700051903"
  });

  const storage=firebase.storage();
  const db=firebase.firestore();
  export default storage;
  export {db}