function sendMail() {
  const params = {
    to_email: "rkfnahs12e@gmail.com",
    message: document.getElementById("message").value,
  };
  emailjs
    .send("service_kbglqzg", "template_gheonli", params)
    .then(function (res) {
      alert("Success! " + res.status);
    });
}
