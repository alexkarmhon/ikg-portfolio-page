const form = document.getElementById('contact-form');
// const BASE_URL = 'http://localhost:3000'; //for local server
const BASE_URL = 'https://ikg-portfolio-page.vercel.app';

const sendFeedback = (contact) => {
  fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.sta}`);
      }
      return response.json();
    })
    .then((data) => {
      alert('Feedback send!');
    })
    .catch((error) => alert('Error'));
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const userContactData = Object.fromEntries(formData);

  sendFeedback(userContactData);
  form.reset();
});
