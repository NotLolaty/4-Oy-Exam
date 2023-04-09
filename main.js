import { products } from "./data.js";
const productsBox = document.querySelector(".products");
const cardBox = document.querySelector(".cart");
const box = document.querySelector(".box");

let cart = [];

const render = () => {
  productsBox.innerHTML = products
    .map(
      (el) => `
    <div class="card">
    <div class="img">
    <img src="${el.img}" alt="product" />
    </div>
    <div>
    <h2>${el.title}</h2>
    <p>${el.price}$</p>
    <p>${el.count > 0 ? el.count : "Товар не доступен"}</p>
    <button id="${el.id}" class="add">Add</button>
    </div>
    </div>
 `
    )
    .join("");
};

render();

const renderCart = () => {
  cardBox.innerHTML = cart
    .map((el) =>
      el.userCount > 0
        ? `
      <div class="card">
      <div class="img">
      <img src="${el.img}" alt="product" />
      </div>
      <div>
      <h2>${el.title}</h2>
      <p>${el.price}$ --> ${el.userPrice}$</p>
      <button id="${el.id}" class="inc">+</button>
      <span>${el.userCount}</span>
      <button id="${el.id}" class="dec">-</button>
      </div>
      </div>
    `
        : ""
    )
    .join("");
};

box.addEventListener("click", (e) => {
  const { id, className } = e.target;
  for (let i of products) {
    if (className == "add") {
      if (i.id == id) {
        const check = cart.find((item) => item.id == id);
        if (!check) {
          i.count -= 1;
          cart.push({ ...i, userPrice: i.price, userCount: 1 });
        }
        // else {
        //   for (let cartItem of cart) {
        //     if (cartItem.userCount == 0) {
        //       i.count -= 1;
        //       cartItem.userCount += 1;
        //       cartItem.userPrice = cartItem.price * cartItem.userCount;
        //     }
        //   }
        // }
      }
    }
    if (i.id == id) {
      if (i.count > 0 && className == "inc") {
        i.count -= 1;
        for (let cartItem of cart) {
          if (cartItem.id == id) {
            cartItem.userCount += 1;
            cartItem.userPrice = cartItem.price * cartItem.userCount;
          }
        }
      } else if (className == "dec") {
        for (let cartItem of cart) {
          if (cartItem.id == id && cartItem.userCount > 0) {
            i.count += 1;
            cartItem.userCount -= 1;
            cartItem.userPrice = cartItem.price * cartItem.userCount;
          }
          cart = cart.filter((el) => el.userCount > 0);
        }
      }
    }
  }

  render();
  renderCart();
});
