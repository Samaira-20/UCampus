

let hostel = '';

function selectHostel(h) {
    hostel = h;


    document.querySelectorAll('.hostel-pill')
        .forEach(p => p.classList.remove('selected'));


    document.getElementById(h + 'Pill')
        .classList.add('selected');

    // re-render if a day already selected
    const activeDay = document.querySelector('.days button.active-day');
    if (activeDay) {
        const day = activeDay.textContent.trim().toLowerCase();
        const dayMap = {
            mon: 'monday', tue: 'tuesday', wed: 'wednesday',
            thu: 'thursday', fri: 'friday', sat: 'saturday', sun: 'sunday'
        };
        showMenu(dayMap[day] || day, activeDay);
    }
}



const girlsMenu = {
    monday: { breakfast: "Poha + Sweet Daliya + Bread Toast + Fruit + Tea", lunch: "Dal Makhani + Aloo Gajar Mutter + Veg Pulao + Roti + Boondi Raita", snacks: "Mix Pakode + Green Chutney + Tea", dinner: "Moong Masoor + Paneer + Steamed Rice + Roti + Rasgulla" },
    tuesday: { breakfast: "Mix Paratha + Curd + Chutney + Tea", lunch: "Mix Dal + Soya Chaap + Steamed Rice + Roti + Cucumber Raita", snacks: "Patty / Pastry + Tea", dinner: "Rajma + Dry Aloo + Steamed Rice + Roti + Petha" },
    wednesday: { breakfast: "Vegetable Macaroni + Cornflakes and Milk + Toast + Tea + Bread Butter Jam + Fruit", lunch: "White Channa + Kadoo Sabzi + Steamed Rice + Roti + Mix Raita + Chutney", snacks: "Samosa + Chutney + Tea", dinner: "Sabut Masoor + Mix Vegetable + Mutter Rice + Roti + Salad + Hot Milk" },
    thursday: { breakfast: "Methi Prantha / Plain Prantha + Aloo ki Sabzi + Curd + Butter + Tea", lunch: "Kadhi + Aloo Gobhi + Jeera Rice + Roti + Mix Raita", snacks: "Chips + Tea", dinner: "Black Chana + Tamaloo + Steamed Rice + Roti + Rasgulla" },
    friday: { breakfast: "Masala Sandwich + Idli + Upma + Sambar + Chutney + Tea", lunch: "Dal Palak + Aloo Methi Ki Sabzi + Jeera Rice + Roti + Mix Raita", snacks: "Vegetable Pasta + Tea", dinner: "Amritsari Dal + Paneer Ki Sabzi + Egg Masala + Rice + Roti + Hot Gulab Jamun" },
    saturday: { breakfast: "Pav Bhaji + Bread Toast + Tea", lunch: "Black Chana + Masala Nutri + Mint Raita + Carrot Steamed Rice + Roti", snacks: "Cake + Tea", dinner: "Mix Dal + Subz Miloni + Roti + Steamed Rice + Choco Pie / Ladoo" },
    sunday: { breakfast: "Poori + Aloo Chana Sabzi + Halwa + Tea", lunch: "Rajma Masala + Aloo Palak + Steamed Rice + Roti + Boondi Raita", snacks: "Biscuit + Tea", dinner: "Chana Masala + Aloo Nutri Mutter + Roti + Rice + Kheer + Salad" }
};

const boysMenu = {
    monday: { breakfast: "Mix Prantha + Curd + Chutney + Tea", lunch: "Dal Makhani + Aloo Gajar Mutter + Veg Pulao + Roti + Boondi Raita", snacks: "Patty / Pastry + Tea", dinner: "Moong Masoor + Paneer + Steamed Rice + Roti + Rasgulla" },
    tuesday: { breakfast: "Poha + Sweet Daliya + Toast + Tea", lunch: "Mix Dal + Soya Chaap + Steamed Rice + Roti + Cucumber Raita", snacks: "Mix Pakoda + Green Chutney + Tea", dinner: "Rajma + Dry Aloo + Steamed Rice + Roti + Petha" },
    wednesday: { breakfast: "Vegetable Macaroni + Cornflakes and Milk + Toast + Tea + Bread Butter Jam + Fruit", lunch: "White Channa + Kadoo Sabzi + Steamed Rice + Roti + Mix Raita + Chutney", snacks: "Chips + Tea", dinner: "Sabut Masoor + Mix Vegetable + Mutter Rice + Roti + Salad + Hot Milk" },
    thursday: { breakfast: "Methi Prantha / Plain Prantha + Aloo ki Sabzi + Curd + Butter + Tea", lunch: "Kadhi + Aloo Gobhi + Jeera Rice + Roti + Mix Raita", snacks: "Samosa + Chutney + Tea", dinner: "Black Chana + Tamaloo + Steamed Rice + Roti + Rasgulla" },
    friday: { breakfast: "Pav Bhaji + Bread Toast + Tea", lunch: "Dal Palak + Aloo Methi Ki Sabzi + Jeera Rice + Roti + Mix Raita", snacks: "Cake + Tea", dinner: "Amritsari Dal + Paneer Ki Sabzi + Egg Masala + Rice + Roti + Hot Gulab Jamun" },
    saturday: { breakfast: "Masala Sandwich + Idli + Upma + Sambar + Chutney + Tea", lunch: "Black Chana + Masala Nutri + Mint Raita + Carrot Steamed Rice + Roti", snacks: "Vegetable Pasta + Tea", dinner: "Mix Dal + Subz Miloni + Roti + Steamed Rice + Choco Pie / Ladoo" },
    sunday: { breakfast: "Poori + Aloo Chana Sabzi + Halwa + Tea", lunch: "Rajma Masala + Aloo Palak + Steamed Rice + Roti + Boondi Raita", snacks: "Biscuit + Tea", dinner: "Chana Masala + Aloo Nutri Mutter + Roti + Rice + Kheer + Salad" }
};

function showMenu(day, btn) {
    if (btn) {
        document.querySelectorAll('.days button').forEach(b => b.classList.remove('active-day'));
        btn.classList.add('active-day');
    }

    if (!hostel) {
        document.getElementById('menuBox').innerHTML = `
            <div class="menu-placeholder">
              <div class="emoji">🏠</div>
              <p>Please select your hostel first</p>
            </div>`;
        return;
    }

    const data = hostel === 'girls' ? girlsMenu[day] : boysMenu[day];
    if (!data) {
        document.getElementById('menuBox').innerHTML = `
            <div class="menu-placeholder">
              <div class="emoji">🕐</div>
              <p>Menu coming soon</p>
            </div>`;
        return;
    }

    const meals = [
        { icon: '🌅', label: 'Breakfast', key: 'breakfast' },
        { icon: '☀️', label: 'Lunch', key: 'lunch' },
        { icon: '🍵', label: 'Snacks', key: 'snacks' },
        { icon: '🌙', label: 'Dinner', key: 'dinner' },
    ];

    document.getElementById('menuBox').innerHTML = `
          <div class="meals-grid">
            ${meals.map(m => `
              <div class="meal-card">
                <div class="meal-time">
                  <span class="icon">${m.icon}</span>
                  ${m.label}
                </div>
                <div class="meal-items">${data[m.key]}</div>
              </div>
            `).join('')}
          </div>`;
}