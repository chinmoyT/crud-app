import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDJzrIDC52GNxvh9FCI7Nj25rssa4cZXMU",
    authDomain: "user-dashboard-d6bc3.firebaseapp.com",
    projectId: "user-dashboard-d6bc3",
    storageBucket: "user-dashboard-d6bc3.firebasestorage.app",
    messagingSenderId: "735317312763",
    appId: "1:735317312763:web:d5d39bad49a5640c2cdc5e"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  export { app, auth };

