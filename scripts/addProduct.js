import { addDoc, updateDoc, collection, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";

async function addProduct(db, product) {
    try {
        await addDoc(collection(db, "products"), product);
        console.log("Product added! :)");
    } catch(e) {
        console.log(e);
    }
}

async function editProduct(db, product, id) {
    try {
        const updateRef = doc(db, "products", id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(updateRef, product);
    } catch (error) {
        console.log(error);
    }
}

async function imageUploadReference(storage, image) {
    const storageRef = ref(storage, `products/images/${image.name}`);
    return await uploadBytes(storageRef, image);
}

async function uploadImages(storage, images = []) {
    const uploadedImages = images.map( async (image) => {
        const imageReference = await imageUploadReference(storage, image);

        return getDownloadURL(ref(storage, imageReference.ref.fullPath));
    });

    return uploadedImages;

}

export {
    addProduct,
    editProduct,
    uploadImages
}