

function showToast(msg, type) {
    const t = document.getElementById("toast");
    t.textContent = msg;
    t.className = "toast " + (type || "");
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2500);
}

function togglePass(id, btn) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

function checkStrength(val) {
    let score = 0;
    if (val.length >= 6) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const colors = ["#E8192A", "#f97316", "#eab308", "#22c55e"];
    const labels = ["Weak", "Fair", "Good", "Strong"];

    for (let i = 1; i <= 4; i++) {
        document.getElementById("s" + i).style.background =
            i <= score ? colors[score - 1] : "#ddd";
    }

    document.getElementById("strength-label").textContent = val.length
        ? labels[score - 1]
        : "";
}

function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (pass !== confirm) {
        showToast("Passwords do not match", "error");
        return;
    }

    localStorage.setItem("username", email);
    localStorage.setItem("password", pass);
    localStorage.setItem("name", name);

    showToast("Account created!", "success");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}
