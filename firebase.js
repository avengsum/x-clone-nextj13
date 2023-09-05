import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "x-clone-4b91f.firebaseapp.com",
  projectId: "x-clone-4b91f",
  storageBucket: "x-clone-4b91f.appspot.com",
  messagingSenderId: "44235111506",
  appId: "1:44235111506:web:4a014c7e5cf1087fa5338b",
  databaseURL: "https://x-clone-4b91f-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const database = getFirestore(app)
export const storage = getStorage(app);

export {db};