function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},o=t.parcelRequire0c07;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){n[e]=t},t.parcelRequire0c07=o),o.register("1ZESu",(function(t,r){e(t.exports,"createFirebaseCart",(()=>c)),e(t.exports,"getFirebaseCart",(()=>a));var n=o("etBjH");async function c(e,t,r,o){try{const c=n.doc(n.collection(e,"cart"));await n.setDoc(c,{cart:r,id:c.id,userId:t,total:o})}catch(e){console.log(e)}}async function a(e,t){const r=n.doc(e,"cart",t),o=(await n.getDoc(r)).data();return o?o.cart:[]}})),o.register("7Jg0N",(function(t,r){async function n(e){localStorage.setItem("cart",JSON.stringify(e))}function o(){const e=localStorage.getItem("cart");return e?JSON.parse(e):[]}function c(e){return new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",minimumFractionDigits:0}).format(e)}e(t.exports,"addProductToCart",(()=>n)),e(t.exports,"getMyLocalCart",(()=>o)),e(t.exports,"currencyFormat",(()=>c))}));
//# sourceMappingURL=shop.c6d48f77.js.map
