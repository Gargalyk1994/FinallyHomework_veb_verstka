//Бургер меню
const burger = document.querySelector('.navigation__menu');
const closeMenu = document.querySelector('.hamburger-menu__close');
const openMenu = document.querySelector('.hamburger-menu');

function toggleMenu(){
    openMenu.classList.toggle("hidden");
}

burger.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

//Добавление карточек товара в каталог
const urlOnDataCatalog = '../json/forCatalog.json';
async function getDataForCatalog(urlOnDataCatalog) {
    try {
        const response = await fetch (urlOnDataCatalog);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}
document.addEventListener("DOMContentLoaded", async (e) => {
    const data = await getDataForCatalog(urlOnDataCatalog);
    const listCatalog = document.querySelector(".products__cards_for-catalog");
    const listMain = document.querySelector(".products__cards_for-main");
    const listProduct = document.querySelector(".products__cards_for-product");
    //добавление карточек через JS
    data.forEach((element, index) => {
        listCatalog.insertAdjacentHTML(
            "beforeend",`
            <div class="products__card">
                <div class="products__image-box products__image-box-background${[index + 1]}">
                    <div class="products__dark-background">
                        <button class="products__button-add-to-cart">
                            <img src="${element.imageCart}" alt="Cart" class="products__icon-cart">
                            <span class="products__text-add-cart">${element.textAddToCart}</span>
                        </button>
                    </div>
                </div>
                <div class="products__text">
                    <h3 class="products__card-title">${element.title}</h3>
                    <p class="products__card-description">${element.description}</p>
                    <p class="products__card-price">$${element.price}</p>
                </div>
            </div>
        `);
    });
    console.log(listMain.parentNode.children);
    listMain = listCatalog.parentNode.children.splice(0, 6);
    listProduct = listCatalog.parentNode.children.splice(0, 3);
});


//Добавление и удаление из корзины
const urlOnDataCart = '../json/forCart.json';
async function getDataForCart(urlOnDataCart) {
    try {
        const response = await fetch (urlOnDataCart);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}
document.addEventListener("DOMContentLoaded", async (e) => {
    const data = await getDataForCart(urlOnDataCart);
    const list = document.querySelector(".cart__left-block_wrap-cards");
    //добавление карточек через JS
    data.forEach((element) => {
        list.insertAdjacentHTML(
            "beforeend",`
            <div class="card">
                <img src="${element.img}" alt="${element.title}" class="card__image">
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
    //удаление карточки
    list.addEventListener("click", (e) => {
        if (e.target.closest(".card__cross")) {
            const item = e.target.closest(".card");
            if (item) {
                item.remove();
            }
        }
    });
});