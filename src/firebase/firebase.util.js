import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBaLzZx4evrMTgdqceu3mXMtNTEWv2gv04",
    authDomain: "clothing-store-9ce44.firebaseapp.com",
    databaseURL: "https://clothing-store-9ce44.firebaseio.com",
    projectId: "clothing-store-9ce44",
    storageBucket: "clothing-store-9ce44.appspot.com",
    messagingSenderId: "121001532324",
    appId: "1:121001532324:web:d2df984371fa26dcb27f31",
    measurementId: "G-XCY7BX56PL"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date()
    

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error){
      console.log(error.message)
    }
  }
  return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase