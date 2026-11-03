"use strict";

console.log("ПЗ 27: стартовый проект подключён");

document.addEventListener('DOMContentLoaded', () => {

  const title = document.getElementById("page-title");
  const form = document.querySelector("#task-form");       
  const input = document.querySelector("#task-input");     
  const list = document.querySelector("#task-list");       
  const statsContainer = document.querySelector("#stats"); 

  if (list) {
    const parentOfList = list.parentElement;
    const initialCards = list.querySelectorAll(".task");
    console.log(`Число исходных карточек: ${initialCards.length}`);
    
    if (title) title.textContent = "Мой список задач";

    initialCards.forEach((card, index) => {
      card.setAttribute("data-id", `initial-${index}`);
      card.setAttribute("data-state", "ready");
    });
  }

  function updateStats() {
    if (!list || !statsContainer) return;
    
    const allTasks = list.querySelectorAll(".task");
    const total = allTasks.length;
    const completed = Array.from(allTasks).filter(task => task.classList.contains("done")).length;
    const active = total - completed;
    statsContainer.textContent = `Всего: ${total} | Выполнено: ${completed} | Активно: ${active}`;
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      
      const text = input.value.trim();
      if (!text) {
        alert("Ошибка: Поле ввода не может быть пустым!"); 
        return;
      }

      const item = document.createElement("li");
      item.className = "task";
      item.setAttribute("data-id", Date.now().toString());
      const span = document.createElement("span");
      span.textContent = text; 
      const upBtn = document.createElement("button");
      upBtn.textContent = "Наверх";
      upBtn.setAttribute("data-action", "up");
      const doneBtn = document.createElement("button");
      doneBtn.textContent = "Готово";
      doneBtn.setAttribute("data-action", "done");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Удалить";
      deleteBtn.setAttribute("data-action", "delete");
      item.append(span, upBtn, doneBtn, deleteBtn);
      list.append(item);
      input.value = "";
      updateStats();
    });
  }

  if (list) {
    list.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;
      const task = button.closest(".task");
      if (!task) return;
      const action = button.getAttribute("data-action");
      if (action === "delete") {
        task.remove();
      } else if (action === "up") {
        list.prepend(task);
      } else if (action === "done") {
        task.classList.toggle("done");
      }

      updateStats();
    });
  }

  updateStats();
});
