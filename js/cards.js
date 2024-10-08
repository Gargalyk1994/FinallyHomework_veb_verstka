
let cart = [];


async function getData(url) {
    try {
        const response = await fetch (url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

//Добавление карточек товара в каталог
export function addCardsToCatalog(url) {
    document.addEventListener("DOMContentLoaded", async (e) => {
        const data = await getData(url);
        const listCards = document.querySelector(".products__cards");
        //добавление карточек через JS
        data.map((element, index) => {
            listCards.insertAdjacentHTML(
                "beforeend",`
                <div class="products__card" id=${element.id}>
                    <div class="products__image-box products__image-box-background${[index + 1]}">
                        <div class="products__dark-background">
                            <button class="products__button-add-to-cart" id=${element.id}>
                                <img src="${element.imageCart}" alt="Cart" class="products__icon-cart">
                                <span class="products__text-add-cart">${element.textAddToCart}</span>
                            </button>
                        </div>
                    </div>
                    <div class="products__text">
                        <h3 class="products__card-title">${element.titleForProduct}</h3>
                        <p class="products__card-description">${element.description}</p>
                        <p class="products__card-price">$${element.price}</p>
                    </div>
                </div>
            `);
        });
        localStorage.setItem("products", JSON.stringify(data));
    });
}

function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

//Изменение количества товаров на разных страницах
export function changeQuantityProducts(){
    const products = getProducts();
    const listMain = Array.from(document.querySelectorAll(".products__cards_for-main .products__card"));
    const listProduct = Array.from(document.querySelectorAll(".products__cards_for-product .products__card"));
    listMain = products.splice(0, 6);
    listProduct = products.splice(0, 3);
}

//Добавление и удаление из корзины
export function updateCart() {
    const list = document.querySelector(".cart__left-block_wrap-cards");
    //добавление карточек через JS
    cart.map((element) => {
        list.insertAdjacentHTML(
            "beforeend",`
            <div class="card" id=${element.id}>
                <img src="${element.imgProductCart}" alt="${element.title}" class="card__image">
                <div class="card__box">
                    <div class="card__top">
                        <a href="#" class="card__title">${element.title}</a>
                        <a href="#" class="card__cross">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" fill="#575757"/>
                            </svg>
                        </a>
                    </div>
                    <div class="card__bottom">
                        <p class="card__character">Price: <span class="card__character_accent-text">$${element.price}</span></p>
                        <p class="card__character">Color: <span class="card__character_other-text">${element.color}</span></p>
                        <p class="card__character">Size: <span class="card__character_other-text">${element.size}</span></p>
                        <p class="card__character card__character_number">Quantity: <input type="number" value="${element.count}" class="card__character_count"></p>
                    </div>
                </div>
            </div>
        `);
    });
}

export function addToCart(products, id) {
    const product = products.find((product) => product.id === id);
    const cartProduct = cart.find((product) => product.id === id);
    if (cartProduct != undefined && product.id === cartProduct.id) {
        incrItem(id);
    } else {
        cart.unshift(product);
    }
    updateCart();
    // getTotal(cart);
}

function incrItem(id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] && cart[i].id === id) {
            cart[i].count += 1;
        }
    }
    updateCart();
    // getTotal(cart);
}

export function deleteItem() {
    const list = document.querySelector(".cart__left-block_wrap-cards");
    list.addEventListener("click", (e) => {
        if (e.target.closest(".card__cross")) {
            const item = e.target.closest(".card");
            if (item) {
                item.remove();
            }
        }
    });
}



