// My Tasks - a very simple task list

// Show the tasks as soon as the script loads

// The list of tasks. Each task has a text and a "done" flag.
const tasks = [
  { text: "Buy milk", done: false },
  { text: "Finish homework", done: true },
  { text: "Call grandma", done: false },
  { text: "Water the plants", done: true },
  { text: "Read a book", done: false },
];

// Which tasks to show: "all", "active" or "completed"
let currentFilter = "all";

// Elements from the page
const taskList = document.getElementById("task-list");
renderTasks();
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const filterButtons = document.querySelectorAll(".filter-button");

// Return only the tasks that match the current filter
function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter(function (task) {
      return !task.done;
    });
  }

  if (currentFilter === "completed") {
    return tasks.filter(function (task) {
      return task.done;
    });
  }

  return tasks;
}

// Change the filter when a filter button is clicked
for (const button of filterButtons) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    for (const other of filterButtons) {
      other.classList.toggle("selected", other === button);
    }

    renderTasks();
  });
}

// Draw all the tasks on the page
function renderTasks() {
  taskList.innerHTML = "";
  const visibleTasks = getVisibleTasks();

  if (tasks.length === 0) {
    const message = document.createElement("li");
    message.className = "empty-message";
    message.textContent = "No tasks to show.";
    taskList.appendChild(message);
    return;
  }

  for (const task of visibleTasks) {
    const item = document.createElement("li");
    if (task.done) {
      item.className = "done";
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", function () {
      task.done = checkbox.checked;
      renderTasks();
    });

    const text = document.createElement("span");
    text.textContent = task.text;

    item.appendChild(checkbox);
    item.appendChild(text);
    taskList.appendChild(item);
  }
}

// Add a new task from the text box
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    return;
  }

  tasks.push({ text: text, done: false });
  taskInput.value = "";
  renderTasks();
}

addButton.addEventListener("click", addTask);
