let currentCard = 0;

const numberList = document.querySelector(".numbers-list"); // <ul>
const cards = document.querySelectorAll(".number-card"); // 4 <li>
// console.log(cards);
const totalCards = cards.length;

const singleCard = document.querySelector(".number-card");

const numText = document.querySelector(".moving-num-txt");
console.log(numText);

const leftArrow = document.querySelector(".nav-arrows div:first-child");
const rightArrow = document.querySelector(".nav-arrows div:last-child");

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const menuImg = document.querySelector(".menu-icon-img");
console.log(menuImg.attributes.src);

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("active");

  if (mobileNav.classList.contains("active")) {
    // console.log("X");
    menuImg.src = "assets/images/close-icon.svg";
    menuImg.classList.add("close-icon-img");
  } else {
    // console.log("Menu");
    menuImg.src = "assets/images/menu-icon.svg";
    menuImg.classList.remove("close-icon-img");
  }
});

function showCard() {
  // const offset = -currentCard * 300;
  const cardWidth = singleCard.offsetWidth;
  const offset = -currentCard * cardWidth;
  numberList.style.transform = `translateX(${offset}px)`;
}
window.addEventListener("resize", showCard);
showCard();
rightArrow.addEventListener("click", () => {
  if (currentCard < totalCards - 1) {
    currentCard++;
    showCard(currentCard);
    numText.textContent = `0${currentCard + 1} - 04`;
    updateArrowBtn();
  }
});

leftArrow.addEventListener("click", () => {
  if (currentCard > 0) {
    currentCard--;
    showCard(currentCard);
    numText.textContent = `0${currentCard + 1} - 04`;
    updateArrowBtn();
  }
});

// number-section
function updateArrowBtn() {
  if (currentCard <= 0) {
    leftArrow.classList.add("disabled");
  } else {
    leftArrow.classList.remove("disabled");
  }

  if (currentCard >= totalCards - 1) {
    rightArrow.classList.add("disabled");
  } else {
    rightArrow.classList.remove("disabled");
  }
}
updateArrowBtn();

// Template section

const cardWrapper = document.querySelector(".g-t-k-card-wrapper");
const templaterRightArrow = document.querySelectorAll(".template-arrow-btn")[1];
const templateLeftArrow = document.querySelectorAll(".template-arrow-btn")[0];

const templateCards = document.querySelectorAll(".template-card");
const templateNumText = document.querySelector(".blue-num-txt");
const totalTemplateCards = templateCards.length;

const scrollAmount = 350;

if (window.innerWidth <= 321) {
  scrollAmount = cardWrapper.clientWidth; // scroll 1 full card
}

templaterRightArrow.addEventListener("click", () => {
  cardWrapper.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
  setTimeout(() => {
    updateTemplateArrowBtn();
    updateTemplateNumText();
  }, 300);
});

templateLeftArrow.addEventListener("click", () => {
  cardWrapper.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
  setTimeout(() => {
    updateTemplateArrowBtn();
    updateTemplateNumText();
  }, 300);
});

function updateTemplateArrowBtn() {
  const scrollLeft = cardWrapper.scrollLeft;
  const scrollWidth = cardWrapper.scrollWidth;
  const clientWidth = cardWrapper.clientWidth;

  if (scrollLeft <= 0) {
    templateLeftArrow.classList.add("disabled");
  } else {
    templateLeftArrow.classList.remove("disabled");
  }

  if (scrollLeft + clientWidth >= scrollWidth - 5) {
    templaterRightArrow.classList.add("disabled");
  } else {
    templaterRightArrow.classList.remove("disabled");
  }
}

function updateTemplateNumText() {
  const scrollLeft = cardWrapper.scrollLeft;
  const cardWidth = templateCards[0].offsetWidth;
  const currentCardIndex = Math.round(scrollLeft / cardWidth);

  const current = (currentCardIndex + 1).toString().padStart(2, "0");
  const total = totalTemplateCards.toString().padStart(2, "0");

  templateNumText.textContent = `${current}`;
}

// Initial load
updateTemplateArrowBtn();
updateTemplateNumText();
