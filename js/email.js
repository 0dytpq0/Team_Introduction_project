// import { emails } from "../constant/constants";

class Mail {
  #to_email;
  #emails;

  constructor() {
    this.#to_email = "";
    this.#emails = {
      박요셉: "rkfnahs12e@gmail.com",
      박하린: "rkfnahs12e@gmail.com",
      이성찬: "rkfnahs12e@gmail.com",
      조민수: "textign@gmail.com",
      김용: "0dytpq0@naver.com",
      이효현: "rkfnahs12e@gmail.com",
    };
  }

  sendMail() {
    const params = {
      to_email: this.#to_email,
      message: document.getElementById("message").value,
    };
    emailjs
      .send("service_kbglqzg", "template_gheonli", params)
      .then(function (res) {
        alert("Success! " + res.status);
      });
  }

  getSelectedValue() {
    const selector = document.querySelector(".selector_box");
    const selectedValue = selector.value;
    const myEmails = this.#emails;
    for (const name in myEmails) {
      if (selectedValue === name) {
        this.#to_email = myEmails[name];
      }
    }
  }
}
