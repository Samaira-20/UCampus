// EmailJS init (page load hote hi)
document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("h3JpsJW91pEwacCi0");
});

// Form submit
function sendMail(e) {
    e.preventDefault();

    let params = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    emailjs.send("service_phpo5j9", "template_bccbhoe", params).then(
        function () {
            document.getElementById("status").innerText =
                "Message Sent Successfully! ✅";

            document.querySelector("form").reset();

            setTimeout(() => {
                location.reload();
            }, 2000);
        },
        function () {
            document.getElementById("status").innerText =
                "Failed to send! ❌";
        }
    );
}