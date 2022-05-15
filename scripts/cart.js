import { getDoc, setDoc, doc, collection } from "firebase/firestore"; 

async function createFirebaseCart(db, userId, cart,total) {
    try {
        const newCart = doc(collection(db,"cart"));
        await setDoc(newCart, {
            cart,
            id: newCart.id,
            userId: userId,
            total: total,
        });
    } catch (e) {
        console.log(e);
    }
}

async function getFirebaseCart(db, userId) {
    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    return (result) ? result.cart : [];
}

export {
    createFirebaseCart,
    getFirebaseCart
}