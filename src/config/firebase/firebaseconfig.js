
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC8n7_YBD-BjJjoGjBkhCV-A9nGIv2YUEE",
  authDomain: "blogging-app-react-77b85.firebaseapp.com",
  projectId: "blogging-app-react-77b85",
  storageBucket: "blogging-app-react-77b85.appspot.com",
  messagingSenderId: "586584224200",
  appId: "1:586584224200:web:d69ad9ce9110342f2250fd",
  measurementId: "G-GH50940TMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app