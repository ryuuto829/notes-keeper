import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import config from "./firebaseConfig";

firebase.initializeApp(config);

// Firebase APIs
export const auth = firebase.auth();
export const database = firebase.database();

// Social Sign In Method Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// AUTH API

export const signInWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const signInWithGoogle = () => {
  const provider = googleProvider.setCustomParameters({
    prompt: "select_account"
  });
  auth.signInWithRedirect(provider);
};

export const createUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const updateUsername = username => {
  return auth.currentUser.updateProfile({ displayName: username });
};

export const logout = () => auth.signOut();

export default firebase;
