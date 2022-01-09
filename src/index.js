import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-cKgFskJOWpHwpDDPwy7OregoX9ZFKMg",
  authDomain: "fir-user-app-ca751.firebaseapp.com",
  projectId: "fir-user-app-ca751",
  storageBucket: "fir-user-app-ca751.appspot.com",
  messagingSenderId: "138989990666",
  appId: "1:138989990666:web:0b193b125237c221e680f3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
