const userKey = "index-memory";

class User {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }
}

const nameInput = document.getElementById("yourName");
const surnameInput = document.getElementById("yourSurname");

const saveBtn = document.getElementById("btn-save");
const resetBtn = document.getElementById("btn-reset");
const form = document.querySelector("form");
const p = document.createElement("p");

const save = (e) => {
  e.preventDefault();

  const newUser = new User(nameInput.value, surnameInput.value);

  localStorage.setItem(userKey, JSON.stringify(newUser));

  nameInput.value = "";
  surnameInput.value = "";

  generateP();
  console.log(newUser);
};

const generateP = () => {
  const savedUsers = localStorage.getItem(userKey);
  const pCont = document.getElementById("p-cont");

  if (savedUsers) {
    const savedUsersArr = JSON.parse(savedUsers);
    pCont.innerHTML = "";

    const p = document.createElement("p");
    p.className = "p-item";
    p.innerText = `${savedUsersArr.name} -- ${savedUsersArr.surname}`;
    pCont.appendChild(p);
  }
};

const reset = () => {
  const confirmed = confirm("Are you sure?");
  if (confirmed) {
    form.value = "";
    localStorage.removeItem(userKey);
    const pCont = document.getElementById("p-cont");
    pCont.innerHTML = "";
  }
};

window.onload = () => {
  form.addEventListener("submit", save);
  resetBtn.addEventListener("click", reset);
};

function timerUp() {
  let counterEl = document.getElementById("counter");
  let timer = sessionStorage.getItem("counter");
  if (timer === null) {
    timer = 0;
  } else {
    timer = parseInt(timer);
    timer = timer + 1;
  }

  sessionStorage.setItem("counter", timer);
  counterEl.textContent = timer;
  setTimeout(timerUp, 1000);
}
timerUp();
