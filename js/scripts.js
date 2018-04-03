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

var slides = document.querySelectorAll('.promo-item');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,4000);
var sliderControl = document.querySelectorAll(".slider-item");

for (var i = 0; i < sliderControl.length; i++) {
  selectSlide(i);
}

function selectSlide(nth) {
  sliderControl[nth].addEventListener("click", function(evt) {
    clearInterval(slideInterval);
    slides[currentSlide].classList.remove("promo-item-current");
    sliderControl[currentSlide].classList.remove("slider-controls-current");
    currentSlide = nth;
    slideInterval = setInterval(nextSlide,4000);
    slides[nth].classList.add("promo-item-current");
    sliderControl[nth].classList.add("slider-controls-current");
  });
}

function nextSlide() {
slides[currentSlide].classList.remove("promo-item-current");
sliderControl[currentSlide].classList.remove("slider-controls-current");
currentSlide = (currentSlide+1)%slides.length;
slides[currentSlide].classList.add("promo-item-current");
sliderControl[currentSlide].classList.add("slider-controls-current");
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
