import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXshseiAwaMWHALniIBPWSLtb_ixEgAYE",
  authDomain: "chat-box-4e5d0.firebaseapp.com",
  projectId: "chat-box-4e5d0",
  storageBucket: "chat-box-4e5d0.firebasestorage.app",
  messagingSenderId: "32715296151",
  appId: "1:32715296151:web:80be8c12b61c801a1388d2",
  measurementId: "G-1KNKEBFX1E"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)