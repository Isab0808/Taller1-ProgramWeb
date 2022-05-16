import { auth, db } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseCart, createFirebaseCart } from "./cart";
import { addProductToCart } from "./utils";
import { getMyLocalCart, currencyFormat } from "./utils";

const cartSection = document.getElementById("cart");
const totalSection = document.getElementById("total");
const sendOrder = document.getElementById("send__order");
let cart = [];
let total = 0;

function loadCart(cart) {
    
    cart.forEach(product => {
        renderProduct(product);
        total += parseInt(product.price);
    });

    totalSection.innerText = currencyFormat(total);
};

async function removeProduct(productId) {
    const newCart = cart.filter(product => product.id !== productId);
    
    cart = newCart;



    addProductToCart(newCart);

    cartSection.innerHTML = "";

    loadCart(newCart);

}


function renderProduct(product) {
    const productCart = document.createElement("li");
    let amount = 1;
    productCart.className = "product";
    productCart.innerHTML = `
    <button class="product__delete">X</button>
    <img src="${product.images[0]}" class="product__image">
    <h2 class="product__name">${product.name}</h2>
    <div class="counter">
        <button class="remove__item"><</button>
        <p id="amount_${product.name}" class="counter__text">${amount}</p>
        <button class="add__item">></button>
    </div>
    <h3 class="product__price">${currencyFormat(product.price)}</h3>
    
    `;

    cartSection.appendChild(productCart);

    productCart.addEventListener("click", e => {
         if (e.target.tagName === "BUTTON" &&  e.target.className === "product__delete") {
             console.log("remove it!");
             removeProduct(product.id);
         }
         if (e.target.tagName === "BUTTON" &&  e.target.className === "remove__item") {
            amount-=1;
            e.target.className(`amount_${product.name}`).innerHTML = amount;
            document.getElementById(`amount_${product.name}`).innerHTML = amount
        }
        if (e.target.tagName === "BUTTON" &&  e.target.className === "add__item") {
            amount+=1;
            console.log(amount);
            document.getElementById(`amount_${product.name}`).innerHTML = amount
            
        }

    })
};

sendOrder.addEventListener('click', async e =>{
    e.preventDefault();
    if (userLogged) {
        await createFirebaseCart(db, userLogged.uid, cart,total);
        cart = [];
        cartSection.innerHTML = "";
        loadCart(cart);
    }
})

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      userLogged = user;
      cart = getMyLocalCart();
      //cart = await getFirebaseCart(db, userLogged.uid);
    } else {
        cart = getMyLocalCart();  
      // User is signed out
      // ...
    }

    loadCart(cart);

  });