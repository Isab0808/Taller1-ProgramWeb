var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},n=e.parcelRequire0c07;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in a){var n=a[e];delete a[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){a[e]=t},e.parcelRequire0c07=n);var r=n("fXOuZ"),o=n("1tHc5"),c=n("etBjH"),i=n("aYguL");const s=r.initializeApp({apiKey:"AIzaSyBmbovjcD1DIZlbKQmZYbNRHwxraEcjKd4",authDomain:"web-icesi-isa.firebaseapp.com",projectId:"web-icesi-isa",storageBucket:"web-icesi-isa.appspot.com",messagingSenderId:"643993867165",appId:"1:643993867165:web:2e89c881be4469870c5574"}),d=o.getAuth(),u=c.getFirestore(s);i.getStorage(s);o=n("1tHc5");var l=n("1ZESu"),m=n("7Jg0N");m=n("7Jg0N");const g=document.getElementById("cart"),p=document.getElementById("total");let _=[],b=0;const f=document.getElementById("paymentForm");function v(e){e.forEach((e=>{!function(e){const t=document.createElement("li");let a=1;t.className="product",t.innerHTML=`\n    <button class="product__delete">X</button>\n    <img src="${e.images[0]}" class="product__image">\n    <h2 class="product__name">${e.name}</h2>\n    <div class="counter">\n        <button class="remove__item"><</button>\n        <p id="amount_${e.name}" class="counter__text">${a}</p>\n        <button class="add__item">></button>\n    </div>\n    <h3 class="product__price">${m.currencyFormat(e.price)}</h3>\n    \n    `,g.appendChild(t),t.addEventListener("click",(t=>{"BUTTON"===t.target.tagName&&"product__delete"===t.target.className&&(console.log("remove it!"),async function(e){const t=_.filter((t=>t.id!==e));_=t,m.addProductToCart(t),g.innerHTML="",v(t)}(e.id)),"BUTTON"===t.target.tagName&&"remove__item"===t.target.className&&(a-=1,t.target.className(`amount_${e.name}`).innerHTML=a,document.getElementById(`amount_${e.name}`).innerHTML=a),"BUTTON"===t.target.tagName&&"add__item"===t.target.className&&(a+=1,console.log(a),document.getElementById(`amount_${e.name}`).innerHTML=a)}))}(e),b+=parseInt(e.price)})),p.innerText=m.currencyFormat(b)}f.addEventListener("submit",(async e=>{e.preventDefault();const t={name:f.name.value,lastname:f.lastname.value,country:f.country.value,town:f.town.value,address:f.address.value,card:f.card.value,card_number:f.card_number.value};userLogged?(await l.createFirebaseCart(u,userLogged.uid,_,b,t),_=[],g.innerHTML="",v(_)):alert("inicia sesión :(")})),o.onAuthStateChanged(d,(async e=>{e?(userLogged=e,_=m.getMyLocalCart()):_=m.getMyLocalCart(),v(_)}));
//# sourceMappingURL=cart.b9470192.js.map