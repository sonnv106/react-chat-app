import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDfe6CVhEgKgnefr5m1I9KBF3cY8iK1NcI",
  authDomain: "react-chat-app-d1ecd.firebaseapp.com",
  projectId: "react-chat-app-d1ecd",
  storageBucket: "react-chat-app-d1ecd.appspot.com",
  messagingSenderId: "1030314606648",
  appId: "1:1030314606648:web:ac25b779904c9d68a1a6cd",
  measurementId: "G-WN87WGWT5Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
connectAuthEmulator(auth, "http://localhost:9099");
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", "8080");
}
export { db, getAuth, auth };
