import {db} from "./app";
import {doc, collection, getDoc, getDocs} from "firebase/firestore";

async function getUser(id){
    const docRef = doc(db,"users",id);

    try {
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getUserOrders( user){
    const docRef = collection(db,"cart");

    try {
        const {docs} = await getDocs(docRef);

        const data = docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            }
        });
        
        const dataFilter = data.filter(data => data.userId === user);

        console.log(dataFilter);
        return dataFilter;
    } catch (error) {
        console.log(error);
    }
}

export {
    getUser,
    getUserOrders,
}