const storageKey = "index-memory";

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

const save = (e) => {
  e.preventDefault();

  const newUser = new User(nameInput.value, surnameInput.value);
  const savedUsers = localStorage.getItem(storageKey);
  if (savedUsers) {
    const savedUsersArr = JSON.parse(savedUsers);
    savedUsersArr.push(newUser);
    localStorage.setItem(storageKey, JSON.stringify(savedUsersArr));
  } else {
    const users = [];
    users.push(newUser);
    localStorage.setItem(storageKey, JSON.stringify(users));
  }
  nameInput.value = "";
  surnameInput.value = "";

  //   text();
  generateP();
  console.log(newUser);
};

const generateP = () => {
  const savedUsers = localStorage.getItem(storageKey);
  const pCont = document.getElementById("p-cont");

  if (savedUsers) {
    const savedUsersArr = JSON.parse(savedUsers);
    pCont.innerHTML = "";

    savedUsersArr.forEach((el) => {
      const p = document.createElement("p");
      p.className = "p-item";
      p.innerText = `${el.name} -- ${el.surname}`;
      pCont.appendChild(p);
    });
  }
};
//
// const text = () => {
//   if (localStorage.getItem(yourName) && localStorage.getItem(yourSurname)) {
//     message = `${localStorage.getItem(yourName)} - ${localStorage.getItem(yourSurname)}`;
//   } else {
//     message = "Nessun valore precedentemente inviato";
//   }
//   document.querySelector("p-cont").innerHTML = message;
// };
//
const reset = () => {
  const confirmed = confirm("Are you sure?");
  if (confirmed) {
    form.value = "";
    localStorage.removeItem(storageKey);
  }
};

window.onload = () => {
  form.addEventListener("submit", save);
  resetBtn.addEventListener("click", reset);
  generateP();
};
