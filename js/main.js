const burger = document.querySelector('.navigation__menu');
const closeMenu = document.querySelector('.hamburger-menu__close');
const openMenu = document.querySelector('.hamburger-menu');

function toggleMenu(){
    openMenu.classList.toggle("hidden");
}

burger.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);