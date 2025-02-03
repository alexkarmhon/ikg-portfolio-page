const menu = document.getElementById('nav-menu');
const menuLinks = document.querySelectorAll('.nav-menu__link');

const openMenu = () => menu.classList.toggle('is-visible', true);

const closeMenu = () => menu.classList.toggle('is-visible', false);

menuLinks.forEach((menu__link) =>
  menu__link.addEventListener('click', closeMenu)
);

document.getElementById('open-menu-btn').addEventListener('click', openMenu);
document.getElementById('close-menu-btn').addEventListener('click', closeMenu);
