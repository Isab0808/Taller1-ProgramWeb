import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getProduct } from "./getProducts";
import { getFirebaseCart, createFirebaseCart } from "./cart";
import { getMyLocalCart, addProductToCart, currencyFormat } from "./utils";

const productInfoSection = document.getElementById("productInfo");
const productAssetsSection = document.getElementById("productAssets");

let userLogged = undefined;
let cart = [];

function getParam(param) {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get(param);
    return productId;
}

async function loadProduct() {
    const productId = getParam("id"); // http://localhost:1234/product.html?id=TXQ9Wf1GIoAOJLkIEMYo&age=20

    const data = await getProduct(productId);

    const product = {
        ...data,
        id: productId,
        amount: 1, // docSnap.id,
    }

    renderProduct(product);
}

function renderProduct(product) {
    let amount = 0;
    let mainImage = document.createElement('img');
    if (product.images.length > 0) {
        createGallery(product.images,mainImage);
    }
    
    
    mainImage.src = product.images[0];
    mainImage.className = 'product__mainImage';
    mainImage.id = "mainImage";
    productAssetsSection.appendChild(mainImage);

    const isProductAddedToCart = cart.some((productCart) => productCart.id === product.id);

    const productButtonCart = isProductAddedToCart ?
        '<button class="product__cart" disabled>Producto añadido</button>' :
        '<button class="product__cart">Añadir al carrito</button>';

    productInfoSection.innerHTML = `
    <h1 class="product__name">${product.name}</h1>
    <p class="product__review">${product.category}</p>
    <p class="product__review">${product.review}</p>
    <h3 class="product__price">${currencyFormat(product.price)}</h3>
    <p class="product__description">${product.description}</p>
        <div class="counter">
        <button class="remove__item"><</button>
        <p id="amount_${product.name}" class="counter__text">${amount}</p>
        <button class="add__item">></button>
        </div>
    ${productButtonCart}`;

    const productCartButton = document.querySelector(".product__cart");
    productCartButton.addEventListener("click", e => {
        cart.push(product);

        addProductToCart(cart);

        if (userLogged) {
            createFirebaseCart(db, userLogged.uid, cart);
        }

        productCartButton.setAttribute("disabled", true);
        productCartButton.innerText = "Producto añadido";
    });

    const addItem = document.querySelector(".add__item");
    addItem.addEventListener("click", async (event) =>{
        amount+=1;
        product.amount = amount;
        console.log(amount);
        document.getElementById(`amount_${product.name}`).innerHTML = amount
    })
    const removeItem = document.querySelector(".remove__item");
    removeItem.addEventListener("click", async (event)=>{
        amount-=1;
        product.amount = amount;
        e.target.className(`amount_${product.name}`).innerHTML = amount;
        document.getElementById(`amount_${product.name}`).innerHTML = amount
    })
}

function createGallery(images,main) {
    

    const gallery = document.createElement("div");
    gallery.className = "product__gallery";
    if(images.length > 1){
        images.forEach(image => {
            gallery.innerHTML += `<img src="${image}">`;
        });
    } 


    productAssetsSection.appendChild(gallery);

    const galleryImages = document.querySelector(".product__gallery");

    galleryImages.addEventListener("click", e => {
        if (e.target.tagName === "IMG") {
            mainImage.setAttribute("src", e.target.currentSrc);
        }
    });
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        userLogged = user;
        cart = await getFirebaseCart(db, userLogged.uid);
        console.log(cart);
        // ...
    } else {
        cart = getMyLocalCart();
        // User is signed out
        // ...
    }

    loadProduct();

});