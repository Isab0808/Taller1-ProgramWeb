import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import {getUser, getUserOrders} from "./getUser";

const productInfoArticle = document.getElementById("profileInfo");
const productOrdersArticle = document.getElementById("profileOrders");

function getParam(param){
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get(param);
    return productId;
}

async function loadUser(userId){
    
    const data = await getUser(userId);
    const dataOrders = await getUserOrders(userId);

    const user = {
        ...data,
        id: userId,
    }

    renderUser(user);
    renderOrders(dataOrders);
}

function renderUser(user){
    productInfoArticle.innerHTML = `
    <h1 class="profile__name">${user.name}</h1>
    <p class="profile__email">${user.email}</p>
    <h2 class="profile__orders"> Order History </h2>
    `;
}

function renderOrders(orders){
    orders.forEach(order => {
        productOrdersArticle.appendChild(renderOrder(order));
    })
    
}

function renderOrder(item){

    const order = document.createElement("a");
    order.className = "order";

    
    order.innerHTML = `
    <h2 class="order__title">Order Info</h2>
    <p class="order__id">${item.id}</p>
    <p class="order__total"> ${item.total} </p>
    <h2 class="order__details">Order Products</h2>
    <section class="order__products" id="order__products__${item.id}">
    ${item.cart.map(item => {
        return `<div class="order__product">
            <h3 class="order__product__name">${item.name}</h3>
            <p class="order__product__price">${item.price}</p>
        </div>`
    })}
    </section>
    `;
    return order;
    
}



onAuthStateChanged(auth, async (user) => {
    if(user) {
        loadUser(user.uid);

    } else{
        window.location.href = "login.html"
    }
})