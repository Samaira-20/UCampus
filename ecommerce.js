function goNow() {
  window.location.href = "https://www.amazon.in/fresh";
}

setTimeout(() => {
  window.location.href = "https://www.amazon.in/fresh";
}, 2000);
let redirectTimer = setTimeout(() => {
  window.location.href = "https://www.amazon.in/fresh";
}, 2000);

function goNow() {
  clearTimeout(redirectTimer);
  window.location.href = "https://www.amazon.in/fresh";
}