let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg");
let data = {};
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Task cannot be blank";
  } else {
    msg.innerHTML = "";
    acceptData();
  }
};

// function that fetch data in the input and store in data object
let acceptData = () => {
  data["text"] = textInput.value;
  data["date"] = dateInput.value;
  data["descrption"] = textarea.value;
  createTask();
};

let createTask = () => {
  tasks.innerHTML += `
<div>
  <span class="fw-bold">${data.text}</span>
  <span class="small secondary">${data.date}</span>
    <p>${data.descrption}</p>
    <span class="options">
      <i class="fa-solid fa-pen-to-square"></i>
      <i class="fa-solid fa-trash-can"></i>
    </span>
</div>
`;
  resetForm();
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};
