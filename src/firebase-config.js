import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu_M5hcn6yrjCj7wuzbzsiaGK7QHX95zM",
  authDomain: "sneakers-4fa13.firebaseapp.com",
  projectId: "sneakers-4fa13",
  storageBucket: "sneakers-4fa13.appspot.com",
  messagingSenderId: "517875255136",
  appId: "1:517875255136:web:9d47cc89f7d2ffa3018005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
