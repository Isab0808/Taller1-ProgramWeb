import { auth, db } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseCart, createFirebaseCart } from "./cart";
import { addProductToCart } from "./utils";
import { getMyLocalCart, currencyFormat } from "./utils";

const cartSection = document.getElementById("cart");
const totalSection = document.getElementById("total");
let cart = [];
let total = 0;

const paymentCartForm = document.getElementById("paymentForm");


function loadCart(cart) {
    total = 0;
    cart.forEach(product => {
        renderProduct(product);
        total += (parseInt(product.price)*parseInt(product.amount));
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
    let amount = product.amount ===1? product.amount: 1;
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
            product.amount = amount;
            document.getElementById(`amount_${product.name}`).innerHTML = amount
            total=0;
            getTotal(cart);
            totalSection.innerText = currencyFormat(total);
        }
        if (e.target.tagName === "BUTTON" &&  e.target.className === "add__item") {
            amount+=1;
            product.amount = amount;
            console.log(amount);
            document.getElementById(`amount_${product.name}`).innerHTML = amount;
            total=0;
            getTotal(cart);
            totalSection.innerText = currencyFormat(total);
        }

    })
};

paymentCartForm.addEventListener('submit', async e =>{
    e.preventDefault();
    const name = paymentCartForm.name.value;
    const lastname = paymentCartForm.lastname.value;
    const country = paymentCartForm.country.value;
    const town = paymentCartForm.town.value;
    const address = paymentCartForm.address.value;
    const card = paymentCartForm.card.value;
    const card_number = paymentCartForm.card_number.value;
    const userInfo = {
        name,
        lastname,
        country,
        town,
        address,
        card,
        card_number,
    }

    if (userLogged) {
        await createFirebaseCart(db, userLogged.uid, cart,total, userInfo);
        cart = [];
        cartSection.innerHTML = "";
        loadCart(cart);
    } else {
        alert("Log in :(")
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

  function getTotal(product =[]) {
    product.forEach(item =>{
        total += (parseInt(item.price)*parseInt(item.amount));
    })
  }