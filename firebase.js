import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB5GGiraYYilQM-b4vL5xGZTpPmJyTawCk",
  authDomain: "face-clone-68a93.firebaseapp.com",
  projectId: "face-clone-68a93",
  storageBucket: "face-clone-68a93.appspot.com",
  messagingSenderId: "577535903636",
  appId: "1:577535903636:web:d30a83d841e69b25f93181",
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

//const app = firebase.initializeApp(firebaseConfig)

const db = getFirestore()
const storage = firebase.storage()

export { db, storage }
