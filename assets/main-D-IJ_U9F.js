(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const menu = document.getElementById("nav-menu");
const menuLinks = document.querySelectorAll(".nav-menu__link");
const openMenu = () => menu.classList.toggle("is-visible", true);
const closeMenu = () => menu.classList.toggle("is-visible", false);
menuLinks.forEach(
  (menu__link) => menu__link.addEventListener("click", closeMenu)
);
document.getElementById("open-menu-btn").addEventListener("click", openMenu);
document.getElementById("close-menu-btn").addEventListener("click", closeMenu);
const form = document.getElementById("contact-form");
const BASE_URL = "https://ikg-portfolio-page.vercel.app";
const sendFeedback = (contact) => {
  fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contact)
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.sta}`);
    }
    return response.json();
  }).then((data) => {
    alert("Feedback send!");
  }).catch((error) => alert("Error"));
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const form2 = e.target;
  const formData = new FormData(form2);
  const userContactData = Object.fromEntries(formData);
  sendFeedback(userContactData);
  form2.reset();
});
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal__close-button");
const modalContent = document.querySelector(".modal__content");
const images = document.querySelectorAll(".gallery__image");
const openModal = () => {
  modal.classList.add("is-open");
};
const closeModal = () => {
  modal.classList.remove("is-open");
  modalContent.innerHTML = "";
};
modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});
const showBigImage = (e) => {
  openModal();
  const img = document.createElement("img");
  img.src = e.target.dataset.source;
  img.alt = e.target.alt;
  modalContent.innerHTML = "";
  modalContent.appendChild(img);
};
images.forEach((image) => {
  image.addEventListener("click", showBigImage);
});
closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});
