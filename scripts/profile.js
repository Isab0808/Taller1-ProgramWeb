import { db, auth } from "./app";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { getUser, getUserOrders } from "./getUser";

const productInfoArticle = document.getElementById("profile");
const productOrdersArticle = document.getElementById("profileOrders");


let userLogged = undefined;


async function loadUser(userId) {

    const data = await getUser(userId);
    const dataOrders = await getUserOrders(userId, data.isAdmin);

    const user = {
        ...data,
        id: userId,
    }

    renderUser(user);
    renderOrders(dataOrders);
}

function renderUser(user) {
    productInfoArticle.innerHTML = `
    <h1 class="profile__name">${user.name}</h1>
    <p class="profile__email">${user.email}</p>
    <h2 class="profile__orders"> Order History </h2>
    <button class="profile__signOut">Cerrar Sesión</button>
    `;

    const signOutBtn = document.querySelector(".profile__signOut");

    signOutBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            alert("Sign-out successful");
            window.location.href = "shop.html";
        }).catch((error) => {
            // An error happened.
            alert("An error occurred: " + error.message);
        });
    })
}

function renderOrders(orders) {
    orders.forEach(order => {
        productOrdersArticle.appendChild(renderOrder(order));
    })

}

function renderOrder(item) {

    const order = document.createElement("a");
    order.className = "order";

    const userInfo = `<div id="shopper>
    <p class="order__id"><strong>Nombre: </strong> ${item.userInfo.name + " " + item.userInfo.lastname}</p>
    <p class="order__total"><strong>Lugar: </strong> ${item.userInfo.country} </p>
    <p class="order__total"><strong>Dirección: </strong> ${item.userInfo.address} </p>
    </div`;

    order.innerHTML = `
    <div class="order__info">
        <h2 class="order__title">Order Info</h2>
        <p class="order__id"><strong>ID: </strong> ${item.id}</p>
        <p class="order__total"><strong>Total: </strong> ${item.total} </p>
        ${userLogged && userLogged.isAdmin ? userInfo : ""}
    </div>

    <section class="order__products" id="order__products__${item.id}">
    <h2 class="order__details">Order Products</h2>
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
    if (user) {
        loadUser(user.uid);

        getUser(user.uid).then(user => {
            userLogged = user;

        });
    } else {
        window.location.href = "./login.html"
    }
})