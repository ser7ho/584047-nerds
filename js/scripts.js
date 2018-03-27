var contactBtn = document.querySelector(".contact-btn");
var modalWrite = document.querySelector(".modal-write");
var close = modalWrite.querySelector(".modal-close");
var form = modalWrite.querySelector(".modal-form");
var fullname = modalWrite.querySelector("[name=fullname]");
var email = modalWrite.querySelector("[name=email]");
var letter = modalWrite.querySelector("[name=letter]");
var overlay = document.querySelector(".overlay");

var isStorageSupport = true;
var fullnameStorage = "";
var emailStorage = "";

try {
  fullnameStorage = localStorage.getItem("fullname");
  emailStorage = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

contactBtn.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalWrite.classList.add("modal-show");
  overlay.style.display = "block";
  if (fullnameStorage) {
    fullname.value = fullnameStorage;
    email.value = emailStorage;
    letter.focus();
  } else {
    fullname.focus();
  }
});

close.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalWrite.classList.remove("modal-show");
  modalWrite.classList.remove("modal-error");
  overlay.style.display = "none";
})

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27 && modalWrite.classList.contains("modal-show")) {
    evt.preventDefault();
    modalWrite.classList.remove("modal-show");
    modalWrite.classList.remove("modal-error");
    overlay.style.display = "none";
  }
});

form.addEventListener("submit", function(evt) {
  if (!fullname.value || !email.value || !letter.value) {
    evt.preventDefault();
    modalWrite.classList.remove("modal-error");
    modalWrite.offsetWidth = modalWrite.offsetWidth;
    modalWrite.classList.add("modal-error");
  } else if (isStorageSupport) {
    localStorage.setItem("fullname", fullname.value);
    localStorage.setItem("email", email.value);
  }
});
