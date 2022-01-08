import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuN8ovQH8NApBUDht5ItTXBapVVeYFYsQ",
  authDomain: "cart-e6e7a.firebaseapp.com",
  projectId: "cart-e6e7a",
  storageBucket: "cart-e6e7a.appspot.com",
  messagingSenderId: "820119982198",
  appId: "1:820119982198:web:7d1c4f98bc592986754f57"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
