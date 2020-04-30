import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyC5iSpsu5UkS0yphqvTklANMiVTJQ3nqOQ',
  authDomain: 'clotheshop.firebaseapp.com',
  databaseURL: 'https://clotheshop.firebaseio.com',
  projectId: 'clotheshop',
  storageBucket: 'clotheshop.appspot.com',
  messagingSenderId: '961117037214',
  appId: '1:961117037214:web:0bc887a054860eeb12118f',
  measurementId: 'G-5HLLDW35XT',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
