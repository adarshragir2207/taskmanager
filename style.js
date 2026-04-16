let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("taskInput").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  if (text === "") return alert("Enter a task");

  const task = {
    id: Date.now(),
    text,
    dueDate,
    priority,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  displayTasks();
}

function displayTasks(filter = "all") {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.classList.add(task.priority.toLowerCase());

    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">
        ${task.text} (${task.priority}) - ${task.dueDate}
      </span>
      <div>
        <button onclick="toggleTask(${task.id})">✔</button>
        <button onclick="deleteTask(${task.id})">❌</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  displayTasks();
}

function filterTasks(type) {
  displayTasks(type);
}

// Initial load
displayTasks();