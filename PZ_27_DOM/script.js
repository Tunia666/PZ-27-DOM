"use strict";

const pageTitle = document.querySelector("#page-title");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const stats = document.querySelector("#stats");

const initialTasks = taskList.querySelectorAll(".task");
console.log(`Число исходных задач: ${initialTasks.length}`);

pageTitle.textContent = "Мой обновленный список задач";

initialTasks.forEach((task, index) => {
  task.dataset.id = `task-${Date.now()}-${index}`;
});

function updateStats() {
  const allTasks = taskList.querySelectorAll(".task");
  const doneTasks = taskList.querySelectorAll(".task.done");
  const total = allTasks.length;
  const done = doneTasks.length;
  const left = total - done;

  stats.textContent = `Всего: ${total} · Выполнено: ${done} · Осталось: ${left}`;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const text = taskInput.value.trim();
  if (!text) return; 

  const li = document.createElement("li");
  li.classList.add("task");
  li.dataset.id = `task-${Date.now()}`;

  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = text;

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("actions");

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.textContent = "Готово";
  toggleBtn.dataset.action = "toggle";

  const upBtn = document.createElement("button");
  upBtn.type = "button";
  upBtn.textContent = "Наверх";
  upBtn.dataset.action = "up";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Удалить";
  removeBtn.dataset.action = "remove";

  actionsDiv.append(toggleBtn, upBtn, removeBtn);
  li.append(span, actionsDiv);
  
  taskList.append(li);
  taskInput.value = "";
  updateStats();
});

taskList.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (!btn) return; 

  const taskItem = btn.closest(".task");
  const action = btn.dataset.action;

  if (action === "toggle") {
    taskItem.classList.toggle("done");
  } else if (action === "up") {
    taskList.prepend(taskItem);
  } else if (action === "remove") {
    taskItem.remove();
  }

  updateStats();
});

updateStats();
