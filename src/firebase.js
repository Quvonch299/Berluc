import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "SENIKI",
  authDomain: "SENIKI",
  projectId: "SENIKI",
  storageBucket: "SENIKI",
  messagingSenderId: "SENIKI",
  appId: "SENIKI"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);