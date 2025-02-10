const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.modal__close-button');
const modalContent = document.querySelector('.modal__content');
const images = document.querySelectorAll('.gallery__image');
const openModal = () => {
  modal.classList.add('is-open');
};
const closeModal = () => {
  modal.classList.remove('is-open');
  modalContent.innerHTML = '';
};

modal.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});

const showBigImage = (e) => {
  openModal();
  const img = document.createElement('img');
  img.src = e.target.src;
  img.alt = e.target.alt;
  modalContent.innerHTML = '';
  modalContent.appendChild(img);
};

images.forEach((image) => {
  image.addEventListener('click', showBigImage);
});
closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});
