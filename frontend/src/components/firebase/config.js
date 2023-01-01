// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { modalUnstyledClasses } from "@mui/material";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyABRObru-2eo49xzz0fCTwE2b7WBbXHDpc",

  authDomain: "asier-web.firebaseapp.com",

  projectId: "asier-web",

  storageBucket: "asier-web.appspot.com",

  messagingSenderId: "44588353133",

  appId: "1:44588353133:web:0e34bd13e59090bd6be164",

  measurementId: "G-58ZXBEJ7RF"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

module.exports = {app, analytics}