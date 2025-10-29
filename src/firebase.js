// // src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "YOUR_KEY", // <--- REPLACE WITH YOUR ACTUAL API KEY
//   authDomain: "YOUR_DOMAIN", // <--- REPLACE WITH YOUR ACTUAL AUTH DOMAIN
//   projectId: "YOUR_ID", // <--- REPLACE WITH YOUR ACTUAL PROJECT ID
//   storageBucket: "YOUR_STORAGE_BUCKET", // Optional
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Optional
//   appId: "YOUR_APP_ID", // <--- REPLACE WITH YOUR ACTUAL APP ID
//   measurementId: "YOUR_MEASUREMENT_ID" // Optional
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);

// // Initialize Google Auth Provider
// export const provider = new GoogleAuthProvider();

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDWGGRm35jx9EqFQ3OQC03-D2nrdMoKac8",
//   authDomain: "ecomproject-4e5af.firebaseapp.com",
//   projectId: "ecomproject-4e5af",
//   storageBucket: "ecomproject-4e5af.firebasestorage.app",
//   messagingSenderId: "716498904997",
//   appId: "1:716498904997:web:4038d30f70e0f4bdb0aa4c",
//   measurementId: "G-0V9B0HX491"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// ✅ Your real Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWGGRm35jx9EqFQ3OQC03-D2nrdMoKac8",
  authDomain: "ecomproject-4e5af.firebaseapp.com",
  projectId: "ecomproject-4e5af",
  storageBucket: "ecomproject-4e5af.firebasestorage.app",
  messagingSenderId: "716498904997",
  appId: "1:716498904997:web:4038d30f70e0f4bdb0aa4c",
  measurementId: "G-0V9B0HX491"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Optional: Analytics (only works in browser)
const analytics = getAnalytics(app);

// ✅ Initialize Firebase Authentication
export const auth = getAuth(app);

// ✅ Initialize Google Auth Provider
export const provider = new GoogleAuthProvider();

// ✅ (Optional) Export analytics if you need it
export { analytics };
