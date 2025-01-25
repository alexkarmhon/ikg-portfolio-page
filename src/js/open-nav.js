const menu = document.getElementById('nav-menu');

const openMenu = () => {
  menu.classList.add('is-visible');
};

const closeMenu = () => {
  menu.classList.remove('is-visible');
};

document.getElementById('open-menu-btn').addEventListener('click', openMenu);
document.getElementById('close-menu-btn').addEventListener('click', closeMenu);
