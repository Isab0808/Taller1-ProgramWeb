var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequire0c07;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){n[e]=t},e.parcelRequire0c07=r);var a=r("2mFfu"),c=r("1tHc5"),o=r("dKLxC"),d=r("1ZESu"),i=r("7Jg0N");const s=document.getElementById("productInfo"),u=document.getElementById("productAssets");let l,p=[];async function m(){const e=function(e){const t=window.location.search;return new URLSearchParams(t).get(e)}("id");!function(e){let t=0,n=document.createElement("img");e.images.length>0&&_(e.images,n);n.src=e.images[0],n.className="product__mainImage",n.id="mainImage",u.appendChild(n);const r=p.some((t=>t.id===e.id))?'<button class="product__cart" disabled>Producto añadido</button>':'<button class="product__cart">Añadir al carrito</button>';s.innerHTML=`\n    <h1 class="product__name">${e.name}</h1>\n    <p class="product__review">${e.category}</p>\n    <p class="product__review">${e.review}</p>\n    <h3 class="product__price">${i.currencyFormat(e.price)}</h3>\n    <p class="product__description">${e.description}</p>\n        <div class="counter">\n        <button class="remove__item"><</button>\n        <p id="amount_${e.name}" class="counter__text">${t}</p>\n        <button class="add__item">></button>\n        </div>\n    ${r}`;const c=document.querySelector(".product__cart");c.addEventListener("click",(t=>{p.push(e),i.addProductToCart(p),l&&d.createFirebaseCart(a.db,l.uid,p),c.setAttribute("disabled",!0),c.innerText="Producto añadido"}))}({...await o.getProduct(e),id:e})}function _(e,t){const n=document.createElement("div");n.className="product__gallery",e.length>1&&e.forEach((e=>{n.innerHTML+=`<img src="${e}">`})),u.appendChild(n);document.querySelector(".product__gallery").addEventListener("click",(e=>{"IMG"===e.target.tagName&&mainImage.setAttribute("src",e.target.currentSrc)}))}c.onAuthStateChanged(a.auth,(async e=>{e?(l=e,p=await d.getFirebaseCart(a.db,l.uid),console.log(p)):p=i.getMyLocalCart(),m()}));
//# sourceMappingURL=product.e3ea5368.js.map
