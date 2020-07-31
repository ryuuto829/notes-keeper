import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './firebaseConfig';

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();

/** Google Sign In configuration */
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithRedirect(provider);

/** Email Sign In configuration */
export const signInWithEmail = (email, password) => auth.signInWithEmailAndPassword(email, password);

/** Create a new account */
export const createUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

/** Add display name (username) for new user */
export const updateUsername = username => {
  return auth.currentUser.updateProfile({ displayName: username });
};

export const logout = () => auth.signOut();

export const getShortcuts = () => {
  return database.ref('/users/' + 'zbAgXSyIcXRmwR06QL47CdvV4zw1' + '/shortcuts').once('value')
    .then(data => {
      console.log(data.val())
      return data.val();
    });
}

export default firebase;
