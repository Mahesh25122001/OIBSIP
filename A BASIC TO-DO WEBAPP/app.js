// Task object constructor
function Task(id, description) {
  this.id = id;
  this.description = description;
  this.completed = false;
  this.createdAt = new Date();
  this.completedAt = null;
}

// Store tasks
let tasks = [];

// Function to add a task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const description = taskInput.value.trim();

  if (description !== "") {
    const task = new Task(Date.now(), description);
    tasks.push(task);
    displayTasks();
    taskInput.value = "";
  }
}

// Function to display tasks
function displayTasks() {
  const pendingList = document.getElementById("pendingList");
  const completedList = document.getElementById("completedList");
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach(function(task) {
    const listItem = document.createElement("li");
    listItem.textContent = task.description;

    if (task.completed) {
      listItem.classList.add("completed");
      completedList.appendChild(listItem);
    } else {
      const completeButton = document.createElement("button");
      completeButton.textContent = "Complete";
      completeButton.onclick = function() {
        completeTask(task.id);
      };
      listItem.appendChild(completeButton);
      pendingList.appendChild(listItem);
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function() {
      deleteTask(task.id);
    };
    listItem.appendChild(deleteButton);
  });
}

// Function to complete a task
function completeTask(id) {
  const task = tasks.find(function(task) {
    return task.id === id;
  });

  if (task) {
    task.completed = true;
    task.completedAt = new Date();
    displayTasks();
  }
}

// Function to delete a task
function deleteTask(id) {
  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });
  displayTasks();
}

// Initial display of tasks
displayTasks();
