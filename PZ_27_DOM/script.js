"use strict";

const pageTitle = document.querySelector("#page-title");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const stats = document.querySelector("#stats");
const errorText = document.querySelector("#error");
const filtersBox = document.querySelector(".filters");

let currentFilter = "all";
let nextTaskId = 1;

if (pageTitle) {
  pageTitle.textContent = "Интерактивный планировщик задач";
}

const initialTasks = document.querySelectorAll("#task-list .task");
console.log("Количество исходных карточек:", initialTasks.length);

initialTasks.forEach((task) => {
  task.setAttribute("data-id", String(nextTaskId++));
});

function applyFilter() {
  const tasks = document.querySelectorAll("#task-list .task");
  tasks.forEach((task) => {
    const isDone = task.classList.contains("done");
    if (currentFilter === "active") {
      task.classList.toggle("hidden", isDone);
    } else if (currentFilter === "done") {
      task.classList.toggle("hidden", !isDone);
    } else {
      task.classList.remove("hidden");
    }
  });
}

function updateStats() {
  const allTasks = Array.from(document.querySelectorAll("#task-list .task"));
  const total = allTasks.length;
  const completed = allTasks.filter((task) =>
    task.classList.contains("done"),
  ).length;
  const remaining = total - completed;

  stats.textContent = `Всего: ${total} · Выполнено: ${completed} · Осталось: ${remaining}`;
}

function createTask(text) {
  const li = document.createElement("li");
  li.className = "task";
  li.setAttribute("data-id", String(nextTaskId++));

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const actions = document.createElement("div");
  actions.className = "actions";

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.setAttribute("data-action", "toggle");
  toggleBtn.textContent = "Готово";

  const upBtn = document.createElement("button");
  upBtn.type = "button";
  upBtn.setAttribute("data-action", "up");
  upBtn.textContent = "Наверх";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.setAttribute("data-action", "remove");
  removeBtn.textContent = "Удалить";

  actions.append(toggleBtn, upBtn, removeBtn);
  li.append(span, actions);
  taskList.append(li);
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const cleanText = taskInput.value.trim();

  if (!cleanText) {
    errorText.textContent = "Введите текст задачи — пустую строку добавить нельзя.";
    taskInput.focus();
    return;
  }

  errorText.textContent = "";
  createTask(cleanText);
  taskInput.value = "";
  applyFilter();
  updateStats();
});

taskInput.addEventListener("input", () => {
  if (errorText.textContent) {
    errorText.textContent = "";
  }
});

taskList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const task = button.closest(".task");
  if (!task) return;

  const action = button.getAttribute("data-action");

  if (action === "toggle") {
    task.classList.toggle("done");
  } else if (action === "up") {
    taskList.prepend(task);
  } else if (action === "remove") {
    task.remove();
  }

  applyFilter();
  updateStats();
});

if (filtersBox) {
  filtersBox.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-filter]");
    if (!btn) return;

    currentFilter = btn.getAttribute("data-filter");
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    applyFilter();
  });
}

updateStats();
