import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBuQIK_k0XutBy4VOZJFSUUhc5YfBoaszc",
  authDomain: "bloodbankandroid28nov19.firebaseapp.com",
  databaseURL: "https://bloodbankandroid28nov19.firebaseio.com",
  projectId: "bloodbankandroid28nov19",
  storageBucket: "bloodbankandroid28nov19.firebasestorage.app",
  messagingSenderId: "406870930884",
  appId: "1:406870930884:web:9909a8a9346af761606091",
  measurementId: "G-VZZ8HC9X60",
};

const app = initializeApp(firebaseConfig);

// let analytics;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }

const analytics = getAnalytics();
logEvent(analytics, 'select_content', {
  content_type: 'image',
  content_id: 'P12453'
});

export { app, analytics };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBuQIK_k0XutBy4VOZJFSUUhc5YfBoaszc",
//   authDomain: "bloodbankandroid28nov19.firebaseapp.com",
//   databaseURL: "https://bloodbankandroid28nov19.firebaseio.com",
//   projectId: "bloodbankandroid28nov19",
//   storageBucket: "bloodbankandroid28nov19.firebasestorage.app",
//   messagingSenderId: "406870930884",
//   appId: "1:406870930884:web:9909a8a9346af761606091",
//   measurementId: "G-VZZ8HC9X60"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
