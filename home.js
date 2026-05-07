document.addEventListener("DOMContentLoaded", () => {

  /* NAV */
  function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('show');
  }

  function toggleDropdown() {
    document.getElementById('dropdownMenu').classList.toggle('show');
  }

  function closeMenu() {
    document.getElementById('navLinks').classList.remove('show');
    document.getElementById('dropdownMenu').classList.remove('show');
  }

  window.toggleMenu = toggleMenu;
  window.toggleDropdown = toggleDropdown;
  window.closeMenu = closeMenu;

  window.onclick = e => {
    if (!e.target.matches('.dropbtn')) {
      document.getElementById('dropdownMenu').classList.remove('show');
    }
  };

  /* SMOOTH SCROLL */
  const reviewLink = document.querySelector('a[href="#reviews"]');
  if (reviewLink) {
    reviewLink.addEventListener('click', e => {
      e.preventDefault();
      const el = document.getElementById('reviews');
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: 'smooth'
      });
      closeMenu();
    });
  }

  /* SLIDESHOW */
  const slides = document.querySelectorAll('.slide');
  const dotsEl = document.getElementById('slideDots');
  let idx = 0;

  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick = () => { goSlide(i); resetTimer(); };
    dotsEl.appendChild(d);
  });

  function goSlide(n) {
    slides[idx].classList.remove('active');
    dotsEl.children[idx].classList.remove('active');
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add('active');
    dotsEl.children[idx].classList.add('active');
  }

  let timer = setInterval(() => goSlide(idx + 1), 3500);
  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goSlide(idx + 1), 3500);
  }

  /* FADE UP */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  /* ADD REVIEW */
  function addReview() {
    const name = document.getElementById("name").value.trim();
    const msg = document.getElementById("message").value.trim();
    const rating = document.getElementById("rating").value;

    if (!name || !msg) {
      alert("Please fill all fields");
      return;
    }

    const stars = "⭐".repeat(+rating);

    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <div class="review-stars">${stars}</div>
      <div class="review-author">${name}</div>
      <div class="review-text">${msg}</div>
    `;

    document.getElementById("reviewList").prepend(card);

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push({ name, msg, rating });
    localStorage.setItem("reviews", JSON.stringify(reviews));

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
  }

  window.addReview = addReview;

  /* LOAD SAVED REVIEWS */
  const saved = JSON.parse(localStorage.getItem("reviews")) || [];

  saved.forEach((r) => {
    const stars = "⭐".repeat(+r.rating);

    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <div class="review-stars">${stars}</div>
      <div class="review-author">${r.name}</div>
      <div class="review-text">${r.msg}</div>
    `;

    document.getElementById("reviewList").appendChild(card);
  });

  /* SLIDE CLICK REDIRECT */
  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const link = slide.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });
  });

});

window.toggleMenu = toggleMenu;
window.addReview = addReview;