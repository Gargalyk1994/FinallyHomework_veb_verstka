import {
    addToCart,
    updateCart,
    addCardsToCatalog,
    deleteItem,
    changeQuantityProducts
} from "./cards.js";

//Бургер меню
const burger = document.querySelector(".navigation__menu");
const closeMenu = document.querySelector(".hamburger-menu__close");
const openMenu = document.querySelector(".hamburger-menu");

// const urlOnDataCart = "../json/forCart.json";
const urlOnDataCatalog = "../json/forCatalog.json";

const products = addCardsToCatalog(urlOnDataCatalog);

// const cardsFromCart = document.querySelectorAll('.card');

function toggleMenu() {
    openMenu.classList.toggle("hidden");
}

burger.addEventListener("click", toggleMenu);
closeMenu.addEventListener("click", toggleMenu);

changeQuantityProducts();

document.addEventListener("DOMContentLoaded", async () => {
    // let num = document.querySelectorAll(".products__button-add-to-cart").length;
    const counterCart = document.querySelector(".navigation__count-cart");
    products.addEventListener("click", (event) => {
        if (event.target.classList.contains("products__button-add-to-cart")) {
            counterCart.textContent += 0;
            const productId = parseInt(event.target.id);
            addToCart(products, productId);
            updateCart();
        }
    });
    // for (let i = 0; i < num; i++) {
    //     document
    //         .querySelectorAll(".products__button-add-to-cart")
    //         [i].addEventListener("click", function (e) {
    //             counterCart.textContent += i;
    //             addToCart(products, parseInt(e.target.id));
    //             updateCart();
    //         });
    // }
    deleteItem();
});


// function getTotal(cart) {
//     let { totalItem, cartTotal } = cart.reduce(
//         (total, cartItem) => {
//             total.cartTotal += cartItem.price * cartItem.count;
//             total.totalItem += cartItem.count;
//             return total;
//         },
//         { totalItem: 0, cartTotal: 0 }
//     );
//     const totalItemsHTML = document.querySelector(".noOfItems");
//     totalItemsHTML.innerHTML = `${totalItem} items`;
//     const totalAmountHTML = document.querySelector(".total");
//     totalAmountHTML.innerHTML = `$${cartTotal}`;
// }

// function incrItem(id) {
//     for (let i = 0; i < cart.length; i++) {
//         if (cart[i] && cart[i].id == id) {
//             cart[i].quantity += 1;
//         }
//     }
//     updateCart(urlOnDataCart);
//     getTotal(cart);
// }

//удаление карточки

// function decrItem(id) {
//     for (let i = 0; i < cart.length; i++) {
//         if (cart[i].id == id && cart[i].quantity > 1) {
//             cart[i].quantity -= 1;
//         }
//     }
//     updateCart(urlOnDataCart);
//     getTotal(cart);
// }

// addCardsToCart(urlOnDataCart);
// addCardsToCatalog(urlOnDataCatalog);
