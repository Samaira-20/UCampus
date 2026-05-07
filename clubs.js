// Toggle details
function toggleDetails() {
  document.querySelectorAll(".details").forEach(d => {
    d.classList.add("show");
  });
}

// Filter function
function filterClubs(type) {
  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let status = card.getAttribute("data-status");

    if (type === "all" || status === type) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Search function
function searchClubs() {
  let input = document.getElementById("searchBar").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let title = card.querySelector(".title").innerText.toLowerCase();

    if (title.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}