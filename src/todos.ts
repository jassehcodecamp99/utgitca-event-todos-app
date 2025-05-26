const todoLists = document.querySelector(
  ".todos-item-wrapper"
) as HTMLDivElement;
const input = document.querySelector("#input") as HTMLInputElement;
const allTodos = document.querySelector(".all-todos") as HTMLButtonElement;
const activeTodo = document.querySelector(".active-todos") as HTMLButtonElement;
const completedTodos = document.querySelector(
  ".completed-todos"
) as HTMLButtonElement;
const todosLeftCount = document.querySelector(
  ".todos-left-count"
) as HTMLParagraphElement;
const todoForm = document.querySelector(".todo-form") as HTMLFormElement;
const clearButton = document.querySelector(
  ".clear-button"
) as HTMLButtonElement;

let todos: any[] = [];

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const inputValue = input.value;
  todos.unshift({
    id: todos.length + 1,
    title: inputValue,
    completed: false,
  });
  input.value = "";
  renderTodo();
});

todoLists.addEventListener("click", (event) => {
  const target = event.target as Element;
  const clickedItem = target.closest(".checkbox-wrapper");

  if (clickedItem) {
    const todoId = clickedItem.id;
    const foundedTodo = todos.find((todo) => todo.id == todoId);

    if (foundedTodo) {
      foundedTodo.completed = !foundedTodo.completed;
      renderTodo();
    }
  }
});

allTodos.addEventListener("click", () => {
  allTodos.classList.toggle("active");
  activeTodo.classList.remove("active");
  completedTodos.classList.remove("active");
  renderTodo();
});

activeTodo.addEventListener("click", () => {
  activeTodo.classList.toggle("active");
  allTodos.classList.remove("active");
  completedTodos.classList.remove("active");
  renderTodo("incompleted");
});

completedTodos.addEventListener("click", () => {
  const originalTodo = todos;
  todos = todos.filter((todo) => todo.completed);
  activeTodo.classList.remove("active");
  allTodos.classList.remove("active");
  completedTodos.classList.toggle("active");
  renderTodo();
  todos = originalTodo;
});

clearButton.addEventListener("click", () => {
  todos = todos.filter(function (todo) {
    return !todo.completed;
    // if (todo.completed == false) {
    //   return true
    // } else {
    //   return false
    // }
  });
  renderTodo();
});

function renderTodo(status?: string) {
  let todosUI = "";
  let todosToRender = [...todos];
  console.log({ status });
  if (status == "completed") {
    todosToRender = todos.filter(function (todo) {
      return todo.completed;
      // if(todo.completed == true) {
      //   return true;
      // } else {
      //   return false;
      // }
    });
  }

  if (status == "incompleted") {
    todosToRender = todos.filter(function (todo) {
      return !todo.completed;
      // if(todo.completed == false) {
      //   return true;
      // } else {
      //   return false;
      // }
    });
  }
  console.log({ todosToRender });
  for (let todo of todosToRender) {
    todosUI =
      todosUI +
      `<div class="todo-list-item ${todo.completed ? "completed" : ""}">
              <div id=${todo.id} class="checkbox-wrapper cursor-pointer ${
        todo.completed ? "checked" : ""
      }">
              ${
                todo.completed
                  ? `<img
                  src="/images/icon-check.svg"
                  alt="Checkbox Icon"
                  class="checkbox"
                />`
                  : ""
              }
                <input type="checkbox" class="custom-checkbox" />
              </div>
              <p>${todo.title}</p>
            </div>`;
  }
  if (todosToRender.length == 0) {
    todosUI = `<div class="p-5 flex items-center justify-center text-secondary-color h-38">This area is empty!</div>`;
  }
  todoLists.innerHTML = todosUI;
  // console.log(todos.complated)
  console.log({ todos });
  // todosLeftCount.textContent = todos.filter((todo) => !todo.completed).length
  let activeTodosCount = 0;
  for (let todo of todos) {
    if (todo.completed == false) {
      activeTodosCount++;
    }
  }
  todosLeftCount.textContent = String(activeTodosCount);
}

renderTodo();
