import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './firebaseConfig';

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/** Google Sign In configuration */
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithRedirect(provider);

/** Email Sign In configuration */
export const signInWithEmail = (email, password) => auth.signInWithEmailAndPassword(email, password);

export default firebase;
