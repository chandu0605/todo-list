const inputElement = document.getElementById("inputId");
const buttonElement = document.getElementById("buttonId");
const unorderListElement = document.getElementById("unorderListId");
const showElement = document.getElementById("showId");
const container = document.getElementById("container");

let DataArray = [];

window.onload = function () {
  const storedData = JSON.parse(localStorage.getItem("DataArray"));
  if (storedData) {
    DataArray = storedData;
    DataArray.forEach(task => addTaskToDOM(task));
  }
};

function addTaskToDOM(task) {
  const liElement = document.createElement("li");
  liElement.textContent = task;
  unorderListElement.appendChild(liElement);

  const doneButton = document.createElement("button");
  doneButton.textContent = "Done";
  liElement.appendChild(doneButton);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  liElement.appendChild(editButton);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  liElement.appendChild(removeButton);

  doneButton.addEventListener("click", () => {
    if (doneButton.textContent === "Done") {
      liElement.style.textDecoration = "line-through";
      liElement.style.color = "gray";
      doneButton.textContent = "Undone";
    } else {
      liElement.style.textDecoration = "none";
      liElement.style.color = "black";
      doneButton.textContent = "Done";
    }
  });

  removeButton.addEventListener("click", () => {
    DataArray = DataArray.filter(t => t !== task);
    localStorage.setItem("DataArray", JSON.stringify(DataArray));
    liElement.remove();
  });

  editButton.addEventListener("click", () => {
    const newTask = prompt("Edit the Task", task);
    if (newTask && newTask.trim() !== "") {
      const index = DataArray.indexOf(task);
      DataArray[index] = newTask;
      localStorage.setItem("DataArray", JSON.stringify(DataArray));
      liElement.childNodes[0].textContent = newTask;
    }
  });

  // Grow container height dynamically
  container.style.height = "auto";
}

buttonElement.addEventListener("click", () => {
  const task = inputElement.value.trim();
  if (task !== "") {
    DataArray.push(task);
    localStorage.setItem("DataArray", JSON.stringify(DataArray));
    addTaskToDOM(task);
    inputElement.value = "";
  } else {
    alert("Please enter a valid task.");
  }
});

showElement.addEventListener("click", () => {
  console.log("Current tasks:", DataArray);
});