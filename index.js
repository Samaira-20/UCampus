function showToast(msg, type) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast ' + (type || '');
    t.classList.add('show');

    setTimeout(() => t.classList.remove('show'), 2500);
}

function togglePass(id) {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function handleLogin(e) {
    e.preventDefault();

    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    const storedUser = localStorage.getItem('username');
    const storedPass = localStorage.getItem('password');

    if (user === storedUser && pass === storedPass) {
        showToast("Login successful!", "success");

        setTimeout(() => {
            window.location.href = "home.html";
        }, 1500);
    } else {
        showToast("Invalid credentials", "error");
        document.getElementById('password').value = "";
    }
}