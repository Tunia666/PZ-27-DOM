"use strict";

const list = document.querySelector("#task-list&quot");
const cards = document.querySelectorAll(".task&quot");
const title = document.getElementById("page-title&quot");
const card = document.querySelector(".task&quot");
const parent = card.parentElement;
const firstChild = parent?.firstElementChild;
title.textContent = "Мой список задач";
card.classList.toggle("done");
card.setAttribute("data-state", "ready");
const item = document.createElement("li");
item.className = "task";
item.textContent = "Проверить интерфейс";
list.append(item);
// item.remove();
list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const task = button.closest(".task");
  if (!task) return;
  // Обрабатываем action и task.
});

console.log("ПЗ 27: стартовый проект подключён");
