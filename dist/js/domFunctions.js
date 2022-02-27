const createElem = (elemType, elemClassName, elemText) => {
  const elem = document.createElement(elemType);
  elem.className = elemClassName;
  if (elemText) {
    elem.textContent = elemText;
  }
  return elem;
};

const clearDisplay = () => {
  const todos = document.querySelector("main");
  deleteContents(todos);
};

const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

export const updateDisplay = () => {
  //console.log("Display updated");
  clearDisplay();
  const todoArr = createTodos();
  displayTodos(todoArr);
};

export const saveTodos = (todo, date, checked = false) => {
  const todoObj = [toProperCase(todo), toProperCase(date), checked];
  const todosArray = JSON.parse(localStorage.getItem("todos")) || [];

  if (todosArray.length === 0) {
    todosArray.push(todoObj);
    localStorage.setItem("todos", JSON.stringify(todosArray));
  } else {
    todosArray.push(todoObj);
    localStorage.setItem("todos", JSON.stringify(todosArray));
  }
};

const getSavedTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  return todos;
};

const toProperCase = (text) => {
  const senteces = text.split(".");
  let properText = "";
  if (senteces.length > 1) {
    properText = senteces.map((sentece) => {
      return sentece.trim().charAt(0).toUpperCase() + sentece.trim().slice(1);
    });
    return properText.join(". ").trim();
  } else {
    properText = text.charAt(0).toUpperCase() + text.slice(1);
    return properText.trim();
  }
};

const createTodos = () => {
  const popSaveTodos = getSavedTodos() || [];
  const todoList = [];
  if (popSaveTodos.length !== 0) {
    popSaveTodos.forEach((item) => {
      const idNumber =
        item[1].length < 29
          ? item[1].trim().slice(item[1].length - 6)
          : item[1].trim().slice(item[1].length - 7);
      //console.log(idNumber);
      const todo = createElem("div", item[2] ? "todo checked" : "todo");
      const todoContainer = createElem("div", "todo-container");
      const todoTitle = createElem("div", "title-text", item[0]);
      const date = createElem(
        "div",
        "todo-date",
        toProperCase(
          item[1].length < 29
            ? item[1].slice(0, item[1].length - 6)
            : item[1].slice(0, item[1].length - 7)
        )
      );
      const id = createElem("span", "idNum", idNumber);
      const todoInteract = createElem("div", "todo-buttons");
      const todoDel = createElem("div", "todo-delete");
      const todoCheck = createElem("div", "todo-check");
      const checkIcon = createElem("i", "fa-solid fa-check");
      const delIcon = createElem("i", "fa-solid fa-trash-can");
      todoCheck.appendChild(checkIcon);
      todoDel.appendChild(delIcon);
      todoInteract.appendChild(todoCheck);
      todoInteract.appendChild(todoDel);
      todoContainer.appendChild(todoTitle);
      date.appendChild(id);
      todoContainer.appendChild(date);
      todo.appendChild(todoContainer);
      todo.appendChild(todoInteract);
      todoList.push(todo);
    });
  }

  return todoList;
};

const displayTodos = (todoArray) => {
  const ccContainer = document.getElementById("main");
  todoArray.forEach((cc) => {
    ccContainer.appendChild(cc);
  });

  const list = document.querySelectorAll("main .todo");

  function clickedElem(event) {
    if (
      event.target.className === "title-text larger show-pointer" &&
      event.target.textContent.length > 27
    ) {
      this.classList.toggle("tooltip");
    }
    //toggle if the todo is checked

    if (
      event.target.className === "todo-check" ||
      event.target.parentElement.className === "todo-check"
    ) {
      this.classList.toggle("checked");
      const todos = JSON.parse(localStorage.getItem("todos"));
      for (let i = 0; todos.length > i; i++) {
        if (
          todos[i][1] === this.firstElementChild.lastElementChild.textContent &&
          this.className === "todo checked"
        ) {
          //console.log(this.className);
          todos[i][2] = true;

          localStorage.setItem("todos", JSON.stringify(todos));
        } else if (
          todos[i][1] === this.firstElementChild.lastElementChild.textContent &&
          this.className === "todo"
        ) {
          todos[i][2] = false;

          localStorage.setItem("todos", JSON.stringify(todos));
        }
      }
    }
    //delete the clicked Todo item
    if (
      event.target.className === "todo-delete" ||
      event.target.parentElement.className === "todo-delete"
    ) {
      const todos = JSON.parse(localStorage.getItem("todos"));

      //if (todos.contains(this.firstElementChild.lastElementChild.textContent))
      for (let i = 0; todos.length > i; i++) {
        if (
          todos[i][1] === this.firstElementChild.lastElementChild.textContent
        ) {
          todos.splice(i, 1);
          localStorage.setItem("todos", JSON.stringify(todos));
        }
      }
      ccContainer.removeChild(this);
    }
  }

  function todoEvent() {
    list.forEach((item) => {
      if (
        (item.firstElementChild.firstElementChild.textContent.length > 21 &&
          window.innerWidth <= 320) ||
        (item.firstElementChild.firstElementChild.textContent.length > 43 &&
          window.innerWidth >= 390)
      ) {
        item.firstElementChild.firstElementChild.classList.add("larger");
      }
      if (
        (item.firstElementChild.firstElementChild.textContent.length > 27 &&
          window.innerWidth <= 320) ||
        (item.firstElementChild.firstElementChild.textContent.length > 54 &&
          window.innerWidth >= 390)
      ) {
        item.firstElementChild.firstElementChild.classList.add("show-pointer");
      }

      item.addEventListener("click", clickedElem);
    });
  }

  todoEvent();
  document.getElementById("todo_text").focus();
};
