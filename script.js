
 // My Tasks - a very simple task list

// The list of tasks. Each task has a text and a "done" flag.
const tasks = [
  { text: "Buy milk", done: false },
  { text: "Finish homework", done: true },
  { text: "Call grandma", done: false },
  { text: "Water the plants", done: true },
  { text: "Read a book", done: false },
];

// Get the elements from the page
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");

// Draw all the tasks on the page
function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const message = document.createElement("li");
    message.className = "empty-message";
    message.textContent = "No tasks to show.";
    taskList.appendChild(message);
    updateCounter();
    return;
  }

  for (const task of tasks) {
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

  updateCounter();
}

// Show how many tasks are not done yet
function updateCounter() {
  const left = tasks.filter(function (task) {
    return !task.done;
  }).length;

  taskCounter.textContent = left + " tasks left";
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

// Show the tasks as soon as the script loads
renderTasks();
