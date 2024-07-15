import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY2,
    authDomain: "barbosa-3f898.firebaseapp.com",
    projectId: "barbosa-3f898",
    storageBucket: "barbosa-3f898.appspot.com",
    messagingSenderId: "214981229178",
    appId: "1:214981229178:web:2bc64e8052240fcee219c3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);