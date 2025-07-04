// Select DOM elements
const taskTitleInput = document.getElementById("taskTitle");
const taskPriorityInput = document.getElementById("taskPriority");
const taskCommentInput = document.getElementById("taskComment");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const themeToggleBtn = document.getElementById("themeToggle");

// Load theme from localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Toggle theme
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

// Add task
addTaskBtn.addEventListener("click", () => {
  const title = taskTitleInput.value.trim();
  const priority = taskPriorityInput.value;
  const comment = taskCommentInput.value.trim();

  if (!title) {
    alert("Please enter a task title.");
    return;
  }

  const newTask = { title, priority, comment };
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();

  taskTitleInput.value = "";
  taskPriorityInput.value = "high";
  taskCommentInput.value = "";
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Header section: title + priority + delete
    const header = document.createElement("div");
    header.className = "task-header";

    const titleSpan = document.createElement("span");
    titleSpan.textContent = task.title;

    const prioritySpan = document.createElement("span");
    prioritySpan.textContent = task.priority.toUpperCase();
    prioritySpan.classList.add(`priority-${task.priority}`);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };

    header.appendChild(titleSpan);
    header.appendChild(prioritySpan);
    header.appendChild(deleteBtn);
    li.appendChild(header);

    // Optional comment
    if (task.comment) {
      const comment = document.createElement("p");
      comment.textContent = task.comment;
      li.appendChild(comment);
    }

    taskList.appendChild(li);
  });
}
