import { updateDisplay, saveTodos } from "./domFunctions.js";

const initApp = () => {
  const addTodo = document.getElementById("add_form");
  const errMsg = document.getElementById("error_msg");
  const input = document.getElementById("todo_text");
  addTodo.addEventListener("submit", () => {
    event.preventDefault();
    if (input.value.length > 0) {
      const date = new Date();
      const formatted = date.toLocaleString("sv-SE", {
        weekday: "short", // long, short, narrow
        day: "numeric", // numeric, 2-digit
        year: "numeric", // numeric, 2-digit
        month: "short", // numeric, 2-digit, long, short, narrow
        hour: "numeric", // numeric, 2-digit
        minute: "numeric", // numeric, 2-digit
        second: "numeric"
      });
      errMsg.textContent = "";
      saveTodos(input.value, formatted);
      input.value = "";
    } else {
      errMsg.textContent = "Måste skriva nått";
    }
    updateDisplay();
  });

  updateDisplay();
};

document.addEventListener("DOMContentLoaded", initApp);
