const menu = document.getElementById('nav-menu');

const openMenu = () => {
  menu.style.display = 'block';
};

const closeMenu = () => {
  menu.style.display = 'none';
};

window.closeMenu = closeMenu;
window.openMenu = openMenu;
