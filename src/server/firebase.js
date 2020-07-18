import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './firebaseConfig';

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithRedirect(provider);

export const signInWithEmail = (email, password) => auth.signInWithEmailAndPassword(email, password)
  .catch(function (error) {
    console.log(error);
  });

export default firebase;
