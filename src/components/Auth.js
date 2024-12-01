import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYilFL3qu_yoihFbjJjxELux5l3dxJHWs",
  authDomain: "dashboard-cacc7.firebaseapp.com",
  projectId: "dashboard-cacc7",
  storageBucket: "dashboard-cacc7.firebasestorage.app",
  messagingSenderId: "1031256891386",
  appId: "1:1031256891386:web:7832f9df49c35497828e43",
  measurementId: "G-PTDEVPRSRR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
