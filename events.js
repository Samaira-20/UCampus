// ── DATA ──
const eventsData = [
  {
    id: 1, title: 'Hackathon 2026', cat: 'tech',
    date: '2026-05-10', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
    desc: '48-hour coding challenge with amazing prizes and mentors from top tech companies.',
    location: 'Block B, Lab 301', seats: '150 seats'
  },
  {
    id: 2, title: 'Dance Competition', cat: 'cultural',
    date: '2026-05-15', img: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600',
    desc: 'Show your talent on the grand stage and win exciting rewards.',
    location: 'Auditorium', seats: 'Open entry'
  },
  {
    id: 3, title: 'Annual Sports Meet', cat: 'sports',
    date: '2026-05-20', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600',
    desc: 'Annual sports competition across all departments. Multiple categories.',
    location: 'Sports Ground', seats: 'All welcome'
  },
  {
    id: 4, title: 'AI & ML Workshop', cat: 'workshop',
    date: '2026-05-25', img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600',
    desc: 'Hands-on workshop on machine learning basics and building your first model.',
    location: 'Block A, Seminar Hall', seats: '80 seats'
  },
  {
    id: 5, title: 'Music Night', cat: 'cultural',
    date: '2026-06-01', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
    desc: 'Annual music festival with performances from campus bands and solo artists.',
    location: 'Open Air Theatre', seats: '500 seats'
  },
  {
    id: 6, title: 'Web Dev Bootcamp', cat: 'workshop',
    date: '2026-06-08', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
    desc: 'Learn HTML, CSS, JavaScript and React in this intensive 2-day bootcamp.',
    location: 'Computer Lab A', seats: '60 seats'
  },
];

let currentFilter = 'all';
let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
let registeredEvents = JSON.parse(localStorage.getItem('registeredEvents')) || [];
let activeEventId = null;

function setFilter(f, btn) {
  currentFilter = f;
  document.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderEvents();
}

function getDaysLeft(dateStr) {
  const event = new Date(dateStr);
  const now = new Date();
  return Math.ceil((event - now) / (1000 * 60 * 60 * 24));
}

function renderEvents() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const sort = document.getElementById('sortSelect').value;

  let filtered = eventsData.filter(e => {
    const matchFilter = currentFilter === 'all' || e.cat === currentFilter;
    const matchSearch = e.title.toLowerCase().includes(query) || e.desc.toLowerCase().includes(query);
    return matchFilter && matchSearch;
  });

  if (sort === 'name') filtered.sort((a, b) => a.title.localeCompare(b.title));
  else filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  const grid = document.getElementById('eventsGrid');

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results">No events found</div>`;
    return;
  }

  const catLabels = { tech: '💻 Tech', cultural: '🎭 Cultural', sports: '⚽ Sports', workshop: '🛠 Workshop' };
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  grid.innerHTML = filtered.map((e, i) => {
    const days = getDaysLeft(e.date);
    const d = new Date(e.date);
    const dateStr = `${d.getDate()} ${months[d.getMonth()]}`;
    const isReg = registeredEvents.includes(e.id);

    let countdownHTML = days > 0
      ? `⏳ ${days} days left`
      : '🔥 Happening / Passed';

    return `
      <div class="event-card">
        <img src="${e.img}">
        <h3>${e.title}</h3>
        <p>${e.desc}</p>
        <span>${countdownHTML}</span>
        <button onclick="openPopup(${e.id},'${e.title}')" ${isReg ? 'disabled' : ''}>
          ${isReg ? '✓ Registered' : 'Register'}
        </button>
      </div>
    `;
  }).join('');
}

function openPopup(id, title) {
  activeEventId = id;
  document.getElementById('popupEventName').textContent = `Registering for: ${title}`;
  document.getElementById('popup').classList.add('show');
}

function closePopup() {
  document.getElementById('popup').classList.remove('show');
  document.getElementById('registerForm').reset();
}

document.getElementById('popup').addEventListener('click', e => {
  if (e.target.id === 'popup') closePopup();
});

function submitForm(e) {
  e.preventDefault();

  const data = {
    eventId: activeEventId,
    name: document.getElementById('regName').value,
    email: document.getElementById('regEmail').value,
    dept: document.getElementById('regDept').value,
  };

  registrations.push(data);
  registeredEvents.push(activeEventId);

  localStorage.setItem('registrations', JSON.stringify(registrations));
  localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));

  closePopup();
  showToast('Registered successfully!');
  renderEvents();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// INIT
renderEvents();
setInterval(renderEvents, 60000);



document.addEventListener("DOMContentLoaded", () => {
  renderEvents();
  setInterval(renderEvents, 60000);

  document.getElementById('popup').addEventListener('click', e => {
    if (e.target.id === 'popup') closePopup();
  });
});