/* Shared JS for Suswaad Café site */
/* Mobile menu toggle */
function toggleNav() {
  const nav = document.getElementById('navLinks');
  nav.classList.toggle('show');
}

/* Highlight active link based on current page */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path || (a.getAttribute('href') === 'index.html' && path === '')) {
      a.classList.add('active');
    }
  });
});

/* Form helpers: validate and save to localStorage, show confirmation */
function showMessage(message, success=true) {
  const id = 'suswaad-msg';
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    el.style.position = 'fixed';
    el.style.right = '18px';
    el.style.bottom = '18px';
    el.style.padding = '12px 16px';
    el.style.borderRadius = '10px';
    el.style.boxShadow = '0 8px 26px rgba(0,0,0,0.12)';
    el.style.zIndex = 9999;
    el.style.color = '#fff';
    el.style.fontWeight = 600;
    document.body.appendChild(el);
  }
  el.style.background = success ? '#2d7a4b' : '#b23a3a';
  el.textContent = message;
  setTimeout(()=>{ if(el){ el.remove(); } }, 3500);
}

/* Reserve table form */
function handleReserveForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.fullname.value.trim();
  const email = form.email.value.trim();
  const date = form.date.value.trim();
  const time = form.time.value.trim();
  if (!name || !email || !date || !time) { showMessage('Please fill all required fields', false); return; }
  const entry = { name, email, date, time, message: form.message.value.trim(), created: new Date().toISOString() };
  let array = JSON.parse(localStorage.getItem('suswaad_reservations') || '[]');
  array.push(entry);
  localStorage.setItem('suswaad_reservations', JSON.stringify(array));
  form.reset();
  showMessage('Reservation confirmed! See you soon 😊', true);
}

/* Pick lunch - prebook order */
function handlePickForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.fullname.value.trim();
  const email = form.email.value.trim();
  const date = form.date.value.trim();
  const time = form.time.value.trim();
  const item = form.item.value;
  if (!name || !email || !date || !time || !item) { showMessage('Please fill all required fields', false); return; }
  const order = { name, email, date, time, item, created: new Date().toISOString() };
  let arr = JSON.parse(localStorage.getItem('suswaad_preorders') || '[]');
  arr.push(order);
  localStorage.setItem('suswaad_preorders', JSON.stringify(arr));
  form.reset();
  showMessage('Order pre-booked! Pick up time noted ✅', true);
}

/* Attach listeners if forms exist on the page */
document.addEventListener('DOMContentLoaded', () => {
  const reserveForm = document.getElementById('reserveForm');
  if (reserveForm) reserveForm.addEventListener('submit', handleReserveForm);

  const pickForm = document.getElementById('pickForm');
  if (pickForm) pickForm.addEventListener('submit', handlePickForm);
});
