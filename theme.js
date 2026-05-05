window.addEventListener('DOMContentLoaded', () => {
    const savedMode = localStorage.getItem("mode");
    const icon = document.getElementById("modeIcon");

    if (savedMode === "dark") {
        document.body.classList.add("dark");
        if (icon) icon.innerHTML = "🌙";
    } else {
        document.body.classList.remove("dark");
        if (icon) icon.innerHTML = "☀️";
    }
});

function toggleMode() {
    document.body.classList.toggle("dark");

    let icon = document.getElementById("modeIcon");

    if (document.body.classList.contains("dark")) {
        icon.innerHTML = "🌙";
        localStorage.setItem("mode", "dark");
    } else {
        icon.innerHTML = "☀️";
        localStorage.setItem("mode", "light");
    }
}