var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},o=e.parcelRequire0c07;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in n){var o=n[e];delete n[e];var t={id:e,exports:{}};return r[e]=t,o.call(t.exports,t,t.exports),t.exports}var d=new Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,r){n[e]=r},e.parcelRequire0c07=o);var t=o("2mFfu"),d=o("1tHc5"),i=o("3iQ2G");const a=document.getElementById("profile"),s=document.getElementById("profileOrders");async function l(e){const r=await i.getUser(e),n=await i.getUserOrders(e);!function(e){a.innerHTML=`\n    <h1 class="profile__name">${e.name}</h1>\n    <p class="profile__email">${e.email}</p>\n    <h2 class="profile__orders"> Order History </h2>\n    `}({...r,id:e}),n.forEach((e=>{s.appendChild(function(e){const r=document.createElement("a");return r.className="order",r.innerHTML=`\n    <h2 class="order__title">Order Info</h2>\n    <p class="order__id">${e.id}</p>\n    <p class="order__total"> ${e.total} </p>\n    <h2 class="order__details">Order Products</h2>\n    <section class="order__products" id="order__products__${e.id}">\n    ${e.cart.map((e=>`<div class="order__product">\n            <h3 class="order__product__name">${e.name}</h3>\n            <p class="order__product__price">${e.price}</p>\n        </div>`))}\n    </section>\n    `,r}(e))}))}d.onAuthStateChanged(t.auth,(async e=>{e?l(e.uid):window.location.href="login.html"}));
//# sourceMappingURL=profile.77185dd1.js.map