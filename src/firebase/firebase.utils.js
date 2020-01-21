import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyALe-mzXIEWytmDBBXXdG6APReUBcosHUk',
  authDomain: 'crowndb-d14f1.firebaseapp.com',
  databaseURL: 'https://crowndb-d14f1.firebaseio.com',
  projectId: 'crowndb-d14f1',
  storageBucket: 'crowndb-d14f1.appspot.com',
  messagingSenderId: '119086080678',
  appId: '1:119086080678:web:4cb77c632dee7f8fe70a67',
  measurementId: 'G-77ZWTHQGP6',
};

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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
