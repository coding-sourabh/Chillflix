import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC2VLkZMzmxZw32jcbTSOyaKz1gqTbFDN0",
  authDomain: "netfilx-clone-d52f7.firebaseapp.com",
  projectId: "netfilx-clone-d52f7",
  storageBucket: "netfilx-clone-d52f7.appspot.com",
  messagingSenderId: "663852930068",
  appId: "1:663852930068:web:b07ab345f9fdaabe0fc301",
};

const firebaseApp = firebase.initializeApp(firebaseConfig); //initializing our app
const db = firebaseApp.firestore(); // firestore is the real time database that we are gonna use for our app
const auth = firebase.auth();


export { auth };
export default db;
