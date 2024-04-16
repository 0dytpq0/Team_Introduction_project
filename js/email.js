function sendMail() {
  const params = {
    from_name: document.getElementById("fullName").value,
    email_id: document.getElementById("email_id").value,
    message: document.getElementById("message").value,
  };
  emailjs
    .send("service_kbglqzg", "template_gheonli", params)
    .then(function (res) {
      alert("Success! " + res.status);
    });
}
