var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},n=e.parcelRequire0c07;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var c={id:e,exports:{}};return t[e]=c,n.call(c.exports,c,c.exports),c.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},e.parcelRequire0c07=n);var c=n("2mFfu"),a=n("1tHc5"),o=n("etBjH");var d=n("1ZESu"),i=n("7Jg0N");const s=document.getElementById("products"),u=document.getElementById("category"),l=document.getElementById("order"),p=document.getElementById("order-review");let g,f=[],m=[];async function v(){const e=await async function(e){const t=o.collection(e,"products");try{const{docs:e}=await o.getDocs(t);return e.map((e=>({...e.data(),id:e.id})))}catch(e){console.log(e)}}(c.db);s.innerHTML="",e.forEach((e=>{h(e)})),f=e}function h(e){const t=document.createElement("a");t.className="product",t.setAttribute("href",`./product.html?id=${e.id}`);const r=e.images?e.images[0]:"https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png",n=m.some((t=>t.id===e.id))?'<button class="product__cart" disabled>Producto añadido</button>':'<button class="product__cart">Añadir al carrito</button>';t.innerHTML=`\n    <img src="${r}" alt="" class="product__image">\n    <div class="product__info">\n        <p class="product__category">${e.category}</p> \n        <h2 class="product__name">${e.name}</h2>\n        <p class="product__review"> Review: ${e.review}</p> \n        <h3 class="product__price">${i.currencyFormat(e.price)}</h3>\n        ${n}\n    </div>\n    `,s.appendChild(t);const a=t.querySelector(".product__cart");a.addEventListener("click",(async t=>{t.preventDefault(),m.push(e),i.addProductToCart(m),g&&await d.createFirebaseCart(c.db,g.uid,m),a.setAttribute("disabled",!0),a.innerText="Producto añadido"}))}function y(){const e=u.value,t=l.value,r=p.value;let n=[];n=""!==e?f.filter((t=>t.category===e)):f,"asc"===t&&(n=n.sort(((e,t)=>t.price-e.price))),"desc"===t&&(n=n.sort(((e,t)=>e.price-t.price))),"mp"===r&&(n=n.sort(((e,t)=>t.review-e.review))),"lp"===r&&(n=n.sort(((e,t)=>e.review-t.review))),s.innerHTML="",n.forEach((e=>{h(e)}))}u.addEventListener("change",(e=>{y()})),l.addEventListener("change",(e=>{y()})),p.addEventListener("change",(e=>{y()})),a.onAuthStateChanged(c.auth,(async e=>{e?(g=e,m=await d.getFirebaseCart(c.db,g.uid)):m=i.getMyLocalCart(),v()}));
//# sourceMappingURL=shop.302643ed.js.map
