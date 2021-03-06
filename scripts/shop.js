import { db, auth } from "./app";
import { onAuthStateChanged } from "firebase/auth";
import { getProducts } from "./products";
import { createFirebaseCart, getFirebaseCart  } from "./cart";
import { getMyLocalCart, addProductToCart, currencyFormat } from "./utils";
import { removeProduct} from "./addProduct";
import { getUser } from "./getUser";


const productSection = document.getElementById("products");
const extraSection = document.getElementById("extra");
const categoryFilter = document.getElementById("category");
const orderFilterPrice = document.getElementById("order");
const orderFilterReview = document.getElementById("order-review");

let userLogged = undefined;
let products = [];
let cart = [];


async function loadProducts() {
    const firebaseProducts = await getProducts(db);
    productSection.innerHTML = "";
    firebaseProducts.forEach(product => {
        renderProduct(product);
    });

    products = firebaseProducts;
}

function renderProduct(item) {
    const product = document.createElement("a");
    product.className = "product";

    product.setAttribute("href", `./product.html?id=${item.id}`);

    const coverImage = item.images ? item.images[0] : "https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png";

    const isProductAddedToCart = cart.some((productCart) => productCart.id === item.id);

    const productButtonCart = isProductAddedToCart ?
    '<button class="product__cart" disabled>Product added</button>' :
    '<button class="product__cart">Add to cart</button>';

    const editProductButtonCart = '<button class="product__edit" >Edit product</button>'

    const deleteProductButtonCart = '<button class="product__delete">X</button>'

    product.innerHTML = `
    <img src="${coverImage}" alt="" class="product__image">
    <div class="product__info">
        <p class="product__category">${item.category}</p> 
        <h2 class="product__name">${item.name}</h2>
        <p class="product__review"> Review: ${item.review}</p> 
        <h3 class="product__price">${currencyFormat(item.price)}</h3>
        ${ userLogged && userLogged.isAdmin ? editProductButtonCart :productButtonCart}
        ${userLogged && userLogged.isAdmin ? deleteProductButtonCart : "" }
    </div>
    `;

    productSection.appendChild(product);

    const productCartButton = product.querySelector(".product__cart");
    const productEditButton = product.querySelector(".product__edit");
    const productRemoveButton = product.querySelector(".product__delete");

    if(userLogged && !userLogged.isAdmin){
        productCartButton.addEventListener("click", async (e) => {
            e.preventDefault(); // evitar que al dar click en el boton, funcione el enlace del padre.
    
            cart.push(item);
            addProductToCart(cart);
    
            if (userLogged ) {
                await createFirebaseCart(db, userLogged.uid, cart);
            }
    
            productCartButton.setAttribute("disabled", true);
            productCartButton.innerText = "Product added";
    
        });
    }

    if( userLogged && userLogged.isAdmin ){
        productEditButton.addEventListener("click", async (event) => {
            event.preventDefault();
            window.location.href = `./createProduct.html?id=${item.id}`
        })

        productRemoveButton.addEventListener("click", async (event) => {
            event.preventDefault();
            await removeProduct(db,item.id);
            loadProducts();
        })

    }

}

function addBtnOption(){
    const btnAdd = document.createElement('button');
    btnAdd.classList = "btn__add";
    btnAdd.id = "btn__addProduct";
    btnAdd.innerHTML = "+";

    extraSection.appendChild(btnAdd);

    btnAdd.addEventListener("click", ()=>{
        window.location.href = "createProduct.html";
    })

}

function filterBy(){
    const newCategory = categoryFilter.value;
    const newOrder = orderFilterPrice.value;
    const newOrderReview = orderFilterReview.value;

    let filteredProducts = [];

    if (newCategory !== "") {
        filteredProducts = products.filter((product) => product.category === newCategory);
    } else {
        filteredProducts = products;
    }

    if (newOrder === "asc") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (newOrder === "desc") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    }

    if(newOrderReview === "mp") {
        filteredProducts = filteredProducts.sort((a, b) => b.review - a.review)
    }

    if(newOrderReview === "lp") {
        filteredProducts = filteredProducts.sort((a, b) => a.review - b.review);
    }
    
    productSection.innerHTML = "";
    filteredProducts.forEach(product => {
        renderProduct(product);
    });

}

categoryFilter.addEventListener("change", e => {
    filterBy();
});

orderFilterPrice.addEventListener("change", e => {
    filterBy();
});

orderFilterReview.addEventListener("change", e => {
    filterBy();
})

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      
      getUser(user.uid).then(user=>{
          userLogged = user;
          if(userLogged.isAdmin){
              addBtnOption();
          }
         loadProducts();
      });
      

      cart = await getFirebaseCart(db, user.uid);
      
      // ...
    } else {
        cart = getMyLocalCart();
      // User is signed out
      // ...
    }

    loadProducts();

  });

