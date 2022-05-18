import { storage, db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getProduct } from "./getProducts";
import { addProduct, uploadImages, editProduct } from "./addProduct";
import { getUser } from "./getUser";


let userLogged = undefined;
let isEdit = false;
let productId = undefined;

const createProductForm = document.getElementById("createProductForm");

createProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Create a new product");

    const name = createProductForm.name.value;
    const description = createProductForm.description.value;
    const price = createProductForm.price.value;
    const review = createProductForm.review.value;
    const category = createProductForm.category.value;
    const images = createProductForm.images.files;

    let gallery = [];

    if (images.length) {
        // Vamos a subir las imagenes a firestore
        const uploadedImages = await uploadImages(storage, [...images]);

        gallery = await Promise.all(uploadedImages);
    }

    const newProduct = {
        name,
        description,
        price,
        review,
        category,
        images: gallery,
    };

    console.log(newProduct);
    if(isEdit){
        await editProduct(db,newProduct,productId);
    } else {
        await addProduct(db, newProduct);
    }
    
});

function getParam(param) {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const Id = searchParams.get(param);
    return Id;
}

async function loadProductEdit() {
    productId = getParam("id");

    if(productId) {
        isEdit = true;

        const data = await getProduct(productId);

        const product = {
            ...data,
            id: productId
        }
    
        seeFeatures(product)
    }

}

function seeFeatures(product) {
    createProductForm.name.value = product.name;
    createProductForm.description.value = product.description;
    createProductForm.price.value = product.price;
    createProductForm.review.value = product.review;
    createProductForm.category.value = product.category;
    
}


onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      getUser(user.uid).then(user=>{
        userLogged = user;
        if(userLogged.isAdmin){
            loadProductEdit();
        } else {
            window.location.href = "shop.html";
        }
        
    });

      // ...
    } else {
        
      // User is signed out
      // ...
    }

  });