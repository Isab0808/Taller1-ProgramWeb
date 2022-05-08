import { db, auth } from "./app";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const createUserForm = document.getElementById("createUserForm");
const loginForm = document.getElementById("loginForm");

createUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = createUserForm.name.value;
    const email = createUserForm.email.value;
    const password = createUserForm.password.value;

    const userInfo = {
        name,
        email,
        password,
        isAdmin: false,
    };

    const newUser = await createUser(auth, userInfo);
    await addUserToDatabase(db, newUser.uid, userInfo);

    alert(`Bienvenido, ${name}`);
    // window.location.href = "/products.html";
});

loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    login(auth, email, password);
});



async function createUser(auth, { email, password }) {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        return user;
    } catch(e) {
 
     if(e.code === "auth/weak-password") {
         alert("Tu contraseña debe tener al menos 6 caracteres");
     }
 
     if(e.code === "auth/email-already-in-use") {
         alert("Este correo ya se encuentra en uso");
     }
    }
 }
 
 async function login(auth, email, password) {
     try {
         const { user } = await signInWithEmailAndPassword(auth, email, password);
         alert(`Bienvenido, usuario ${user.email}`);
     } catch(e) {
         alert("Correo o contraseña inválida :(");
     }
 }

 async function addUserToDatabase(db, userId, userInfo = {}) {
     try {
         await setDoc(doc(db, "users", userId), userInfo)
     } catch (e) {
         console.log(e);
     }
 }

 export {
     createUser,
     login,
     addUserToDatabase
 }