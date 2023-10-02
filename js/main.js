// ***** Progress Bar
const progressBar = document.querySelector("#progress-bar");

window.addEventListener("scroll", (e) => {
  let maxScrollHeight = document.body.scrollHeight - innerHeight;
  progressBar.style.width = `${(scrollY / maxScrollHeight) * 100}%`;
});

/* ****** Start Header ****** */

const toggleMenu = document.querySelector(".toggle-menu");

toggleMenu.addEventListener("click", () =>
  toggleMenu.classList.toggle("active")
);

/* ****** End Header ****** */

// ***** Start Landing
const typeWriterSpan = document.querySelector(".type-word");

let words = ["Coding", "Programming", "Developping"],
  wordsNb = words.length;

let wordIndex = 0,
  charIndex = 0,
  isDeleting = false;

const textType = () => {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  typeWriterSpan.classList.add("stop-blink");
  typeWriterSpan.textContent = currentChar;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(textType, 200);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(textType, 100);
  } else {
    isDeleting = !isDeleting;
    typeWriterSpan.classList.remove("stop-blink");
    wordIndex = !isDeleting ? (wordIndex + 1) % wordsNb : wordIndex;
    setTimeout(textType, 1200);
  }
};
textType();

// ===== Start lOGIN/REGISTRATION Form
const loginBtn = document.querySelector(".login-btn"),
  signupBtn = document.querySelector(".signup-btn"),
  formContainer = document.querySelector(".form-container"),
  flipCheckbox = formContainer.querySelector("#flip"),
  forms = formContainer.querySelectorAll(".form"),
  closeBtns = formContainer.querySelectorAll(".close-form-btn"),
  typeInputs = formContainer.querySelectorAll(".type-input input");

const passwordInput = formContainer.querySelector(
    ".signup-form .pass-input input"
  ),
  eyeIcons = formContainer.querySelectorAll(".forms .eye"),
  requirementList = formContainer.querySelectorAll(".req-list li");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  flipCheckbox.checked = false;
  formContainer.classList.add("show");
});
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  flipCheckbox.checked = true;
  formContainer.classList.add("show");
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formContainer.classList.remove("show");
    forms.forEach((form) =>
      form.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    );
    typeInputs.forEach((input) => {
      input.value = "";
    });
    eyeIcons.forEach((icon) => (icon.className = `fas fa-eye eye`));
    requirementList.forEach((item) => item.classList.remove("valid"));
  });
});

const requirements = [
  { regex: /.{8,}/, index: 0, check: false },
  { regex: /\d+/, index: 1, check: false },
  { regex: /[a-z]+/, index: 2, check: false },
  { regex: /[A-Z]+/, index: 3, check: false },
  { regex: /[^\d\w]/, index: 4, check: false },
];

let reqChecks = [];

passwordInput.addEventListener("keyup", (e) => {
  reqChecks = [];
  requirements.forEach((item) => {
    let isValid = item.regex.test(passwordInput.value);
    let requirementItem = requirementList[item.index];

    if (isValid) {
      requirementItem.classList.add("valid");
      requirementItem.firstElementChild.className = `fa fa-check`;
    } else {
      requirementItem.classList.remove("valid");
      requirementItem.firstElementChild.className = `fas fa-circle`;
    }
    item.check = isValid;
    reqChecks.push(item.check);
  });
  console.log(reqChecks);
  !reqChecks.includes(false)
    ? passwordInput.classList.add("checked")
    : passwordInput.classList.remove("checked");
});
eyeIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.previousElementSibling.type =
      icon.previousElementSibling.type == "password" ? "text" : "password";
    icon.className = `fas fa-eye${
      icon.previousElementSibling.type == "password" ? "" : "-slash"
    } eye`;
  });
});
// ***** End Landing

/* ****** Start Skills ******* */

const skillSection = document.querySelector(".skills"),
  skillProgress = skillSection.querySelectorAll(".skill .progress");

let speed = 3000,
  isStart = false;


window.addEventListener("scroll", () => {
  if (scrollY >= skillSection.offsetTop - 400 && !isStart) {
    skillProgress.forEach((skill) => {
      let progressStartVal = 0;
      let animate = setInterval(() => {
        progressStartVal++;
        skill.style.background = `conic-gradient(var(--main-color) ${
          3.6 * progressStartVal
        }deg, #fff 0deg)`;
        skill.querySelector(
          ".progress-value"
        ).textContent = `${progressStartVal}%`;
        if (progressStartVal == skill.dataset.target) {
          clearInterval(animate);
        }
      }, speed / skill.dataset.target);
    });
    isStart = true;
  }
});

/* ****** End Skills */

/* ****** Start Events ******* */

// The End Of The Year Date To Countdon To
// 1000 milliseconds = 1second
// getTime() => Get Time In ms From January 1970 To The Precised Date

let countDownDate = new Date("Dec 31, 2023 23:59:59").getTime();
let daysElement = document.querySelector(".days");
let hoursElement = document.querySelector(".hours");
let minuteElement = document.querySelector(".minutes");
let secondElement = document.querySelector(".seconds");

let counter = setInterval(() => {
  // Get Date Now
  let dateNow = new Date().getTime();

  // Get Date Difference Between Date Now And CountDown Date
  let dateDiff = countDownDate - dateNow;

  // Get Time Units
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

  daysElement.innerHTML = days;
  hoursElement.innerHTML = hours < 10 ? `0${hours}` : hours;
  minuteElement.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
  secondElement.innerHTML = seconds < 10 ? `0${seconds}` : seconds;

  if (dateDiff < 0) {
    clearInterval(counter);
  }
}, 1000);

/* ****** End Events ******* */

/* ****** Start Stats ****** */

let numElements = document.querySelectorAll(".stats .num");
let targetSection = document.querySelector(".stats");
let started = false; // Function Started ? No

window.addEventListener("scroll", () => {
  if (window.scrollY >= targetSection.offsetTop - 200) {
    if (!started) {
      numElements.forEach((el) => startCount(el));
    }
    started = true;
  }
});

function startCount(el) {
  let goal = el.dataset.goal;
  let counter = setInterval(() => {
    el.textContent == goal ? clearInterval(counter) : el.textContent++;
  }, 2000 / goal);
}

/* ****** End Stats ****** */

let upButton = document.querySelector(".up-button");

window.addEventListener("scroll", () => {
  this.scrollY > 100
    ? upButton.classList.add("show")
    : upButton.classList.remove("show");
});

upButton.onclick = () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

const sideMenu = document.querySelector(".side-menu"),
  showButton = sideMenu.querySelector(".show-btn"),
  menuLinks = sideMenu.querySelectorAll(".side-list li a");

sideMenu.style.left = `-${sideMenu.offsetWidth}px`;
showButton.addEventListener("click", (e) => {
  e.preventDefault();
  sideMenu.classList.toggle("show");
});
showButton.addEventListener(
  "mouseover",
  () => (sideMenu.style.left = `-${sideMenu.clientWidth - 10}px`)
);
showButton.addEventListener(
  "mouseleave",
  () => (sideMenu.style.left = `-${sideMenu.clientWidth}px`)
);
menuLinks.forEach((link) => {
  link.addEventListener("mouseover", (e) => {
    menuLinks.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");
  });
});

// Change Website Theme
const colorOptions = sideMenu.querySelectorAll(".options span");

// Update Theme On loading
if (localStorage.theme) {
  document.body.className = localStorage.theme;
  colorOptions.forEach((option) => {
    option.classList.remove("active");
    if (localStorage.theme == option.dataset.color) {
      option.classList.add("active");
    }
  });
}

colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    colorOptions.forEach((option) => option.classList.remove("active"));
    option.classList.add("active");
    localStorage.setItem("theme", option.dataset.color);
    document.body.className = localStorage.theme;
  });
});
