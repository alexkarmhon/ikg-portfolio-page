const menu = document.getElementById('nav-menu');
// const openButton = document.getElementById('open-nav-btn');
// const closeButton = document.getElementById('close-nav-btn');

const openMenu = () => {
  menu.style.display = 'block';
};

const closeMenu = () => {
  menu.style.display = 'none';
};

// openButton.addEventListener('click', openMenu);
// closeButton.addEventListener('click', closeMenu);

window.closeMenu = closeMenu;
window.openMenu = openMenu;
