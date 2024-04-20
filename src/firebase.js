import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyBF8gjibMe4b0PPUdLgWTwg0GV9lLLhesA",
  authDomain: "diary2312.firebaseapp.com",
  projectId: "diary2312",
  storageBucket: "diary2312.appspot.com",
  messagingSenderId: "878539085887",
  appId: "1:878539085887:web:091514977104edb8de808a",
  measurementId: "G-VLD9VG41JZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    toast.success("Login successsssssssss ^-^");
  } catch (err) {
    console.log(err);
    toast.error("Login errorrrrrrr :(((");
  }
};

const signInWithGithub = async () => {
  try {
    await signInWithPopup(auth, gitHubProvider);
    toast.success("Login successsssssssss ^-^");
  } catch (err) {
    console.log(err);
    toast.error("Login errorrrrrrr :(((");
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successsssssssss ^-^");
  } catch (err) {
    toast.error("Login errorrrrrrr :(((. Email or Password is invaliddddd");
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    toast.success("Login successsssssssss ^-^");
  } catch (err) {
    console.error(err);
    toast.error("Login errorrrrrrr :(((");
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset link sent successsssssssss ^-^");
  } catch (err) {
    console.error(err);
    toast.error("Password reset link sent errorrrrrrr :(((");
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithGithub,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  storage,
};
