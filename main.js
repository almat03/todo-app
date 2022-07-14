let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg");
let data = [];
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

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
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// function that fetch data in the input and store in the data array of object
let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });
  // pushing data in local storage
  localStorage.setItem("data", JSON.stringify(data));
  createTask();
};

let createTask = () => {
  tasks.innerHTML = "";
  data.map((card, cards) => {
    return (tasks.innerHTML += `
    <div id=${cards}>
      <span class="fw-bold">${card.text}</span>
      <span class="small secondary">${card.date}</span>
        <p>${card.description}</p>
        <span class="options">
          <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
          <i onClick="deleteTask(this);createTask()" class="fa-solid fa-trash-can"></i>
        </span>
    </div>
    `);
  });

  resetForm();
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

let deleteTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  selectedTask.remove();
  data.splice(selectedTask.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editTask = (e) => {
  // select a specific task
  let selectedTask = e.parentElement.parentElement;
  //pick up the input, the date e the textarea ( they are children of the selectedTask)
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.vale = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
  //removed the task so we can update him
  deleteTask(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTask();
  console.log(data);
})();
