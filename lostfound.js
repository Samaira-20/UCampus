document.addEventListener("DOMContentLoaded", () => {

  function createCard(item) {
    let list = document.getElementById("list");

    let card = document.createElement("div");
    card.className = "card " + item.type;

    let imgHTML = item.image
      ? `<img src="${item.image}" class="item-img">`
      : "";

    card.innerHTML = `
      <span class="status">${item.type.toUpperCase()}</span>
      ${imgHTML}
      <h3>${item.title}</h3>

      <p><b>Name:</b> ${item.name}</p>
      <p><b>Roll Number:</b> ${item.roll}</p>
      <p><b>Contact:</b> ${item.contact}</p>

      <p><b>Details:</b> ${item.details}</p>
      <p><b>Date:</b> ${item.date}</p>
      <p><b>Place:</b> ${item.place}</p>
    `;

    list.prepend(card);
  }

  function addItem() {
    let title = document.getElementById("title").value;
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let contact = document.getElementById("contact").value;
    let details = document.getElementById("details").value;
    let date = document.getElementById("date").value;
    let place = document.getElementById("place").value;

    let imageFile = document.getElementById("image").files[0];
    let type = document.getElementById("type").value;

    if (!title || !details || !name) {
      alert("Please fill required fields");
      return;
    }

    let imgURL = "";

    function saveAndRender() {
      let newItem = {
        title,
        name,
        roll,
        contact,
        details,
        date,
        place,
        type,
        image: imgURL,
      };

      let items = JSON.parse(localStorage.getItem("lostItems")) || [];
      items.push(newItem);
      localStorage.setItem("lostItems", JSON.stringify(items));

      createCard(newItem);

      let msg = document.getElementById("successMsg");
      msg.style.display = "block";
      setTimeout(() => (msg.style.display = "none"), 2000);

      document.querySelectorAll("input").forEach((i) => (i.value = ""));
    }

    if (imageFile) {
      let reader = new FileReader();
      reader.onload = function () {
        imgURL = reader.result;
        saveAndRender();
      };
      reader.readAsDataURL(imageFile);
    } else {
      saveAndRender();
    }
  }

  function filterItems(type, btn) {
    let cards = document.querySelectorAll(".card");

    document.querySelectorAll(".filters button").forEach((b) => {
      b.classList.remove("active");
    });

    if (btn) btn.classList.add("active");

    cards.forEach((card) => {
      if (type === "all" || card.classList.contains(type)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // LOAD SAVED ITEMS
  let savedItems = JSON.parse(localStorage.getItem("lostItems")) || [];
  savedItems.forEach((item) => createCard(item));

  // MAKE FUNCTIONS GLOBAL (for onclick)
  window.addItem = addItem;
  window.filterItems = filterItems;

});

document.querySelector("form")?.reset();