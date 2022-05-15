// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth} from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmbovjcD1DIZlbKQmZYbNRHwxraEcjKd4",
  authDomain: "web-icesi-isa.firebaseapp.com",
  projectId: "web-icesi-isa",
  storageBucket: "web-icesi-isa.appspot.com",
  messagingSenderId: "643993867165",
  appId: "1:643993867165:web:2e89c881be4469870c5574"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export {
    app,
    auth,
    db,
    storage
}