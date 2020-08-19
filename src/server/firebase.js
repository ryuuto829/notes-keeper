// @flow
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import config from "./firebaseConfig";

firebase.initializeApp(config);

// Firebase APIs

const auth = firebase.auth();
const database = firebase.database();

// Social Sign In Method Provider

const googleProvider = new firebase.auth.GoogleAuthProvider();

// AUTH API

const signInWithEmail = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);

const signInWithGoogle = () => {
  const provider = googleProvider.setCustomParameters({
    prompt: "select_account"
  });
  auth.signInWithPopup(provider);
};

const createUser = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

const updateUsername = (username: string) => {
  /* $FlowFixMe currentUser can be null so `updateProfile` property
   * can be missing. In this case call it only when user is logginIn */
  return auth.currentUser.updateProfile({ displayName: username });
};

const logout = () => auth.signOut();

export {
  auth,
  database,
  signInWithEmail,
  signInWithGoogle,
  createUser,
  updateUsername,
  logout
};

export default firebase;
