function e(e,o,t,n){Object.defineProperty(e,o,{get:t,set:n,enumerable:!0,configurable:!0})}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=o.parcelRequire0c07;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,o){n[e]=o},o.parcelRequire0c07=r),r.register("aWEll",(function(o,t){e(o.exports,"addProduct",(()=>a)),e(o.exports,"editProduct",(()=>d)),e(o.exports,"removeProduct",(()=>i)),e(o.exports,"uploadImages",(()=>u));var n=r("etBjH"),c=r("aYguL");async function a(e,o){try{await n.addDoc(n.collection(e,"products"),o),console.log("Product added! :)")}catch(e){console.log(e)}}async function d(e,o,t){try{const r=n.doc(e,"products",t);await n.updateDoc(r,o)}catch(e){console.log(e)}}async function i(e,o){await n.deleteDoc(n.doc(e,"products",o))}async function u(e,o=[]){return o.map((async o=>{const t=await async function(e,o){const t=c.ref(e,`products/images/${o.name}`);return await c.uploadBytes(t,o)}(e,o);return c.getDownloadURL(c.ref(e,t.ref.fullPath))}))}}));
//# sourceMappingURL=shop.1edd673d.js.map