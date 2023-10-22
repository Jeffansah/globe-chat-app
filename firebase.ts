import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBUcgvfOSdLXyeQlOHn6_DZFLyEGq2GH0s",
  authDomain: "globechat-e8103.firebaseapp.com",
  projectId: "globechat-e8103",
  storageBucket: "globechat-e8103.appspot.com",
  messagingSenderId: "1030376542599",
  appId: "1:1030376542599:web:7cac8a16d2ae7c367d0322",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };
