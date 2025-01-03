let todoArray = [];
const text = document.getElementById("text");
const editText = document.getElementById("editText");
const addTaskButton = document.getElementById("add-task-btn");
const saveEditTaskButton = document.getElementById("save-todo-btn");
const cancelEditTaskButton = document.getElementById("cancel-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

// Challenge: Try and using your addTaskButton with a "keydown" eventlistener
// and create a way to use the enter key to submit a new list item.

/* Add Task Event Listeners */

// On button click
addTaskButton.addEventListener("click", (e) => {
  addTask();
});

// On input keydown
text.addEventListener("keydown", (e) => {
  if (e.key == 'Enter') {
    addTask();
  }
});

// Cancel edit button
cancelEditTaskButton.addEventListener("click", (e) => {
  cancelEdit();
});

/* Edit Task Event Listeners */

// On edit button click
saveEditTaskButton.addEventListener("click", (e) => {
  saveEdit();
});

// On edit input keydown
editText.addEventListener("keydown", (e) => {
  if (e.key == 'Enter') {
    saveEdit();
  }
});

// Adds a task to the task list in the browsers local storage
function addTask() {

  // if the text input is empty then alert the user and quit
  let textInput = document.getElementById("text");
  if (!textInput.value) {
    alert("Hey you need to add a value first!");
    return;
  }

  // get the current todo list
  let todoList = getTodoListFromStorage();

  // Add the new todo item to the todo list
  todoList[todoList.length] = textInput.value;

  // Clear out the inputs
  clearTextInputs();

  // save the todo list to local storage
  saveTodoListToStorage(todoList);

  // redisplay the updated todo list
  displayTodo();

};

// Gets the current todo list from local storage and returns it as JSON
// if there is no todo list in storage it returns []
function getTodoListFromStorage() {
  let todoList = localStorage.getItem("todo");
  return todoList ? JSON.parse(todoList) : [];
}

// Saves the provided todoList to the browser's local storage
function saveTodoListToStorage(todoList) {
  localStorage.setItem("todo", JSON.stringify(todoList));
}

// This method is already in place for you.
function displayTodo() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = "";
  todoArray.forEach((list, ind) => {
    htmlCode += `<div class='flex mb-4 items-center'>
          <p class='w-full text-white font-bold'>${list}</p>
          <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 rounded text-white text-grey bg-green-600'>Edit</button>
          <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 rounded text-white bg-red-500'>Delete</button>
       </div>`;
  });
  listBox.innerHTML = htmlCode;
}

// this function deletes a todo item from the todo list 
// in the browser's local storage
function deleteTodo(itemIndex) {
  // assign the todoArray equal to JSON.parse(todo)
  todoArray = getTodoListFromStorage();
  // remove the todo item at the specified itemIndex
  todoArray.splice(itemIndex, 1);
  // save the todo list to local storage
  saveTodoListToStorage(todoArray);
  // call the display todo method
  displayTodo();
}

// This function updates the todo list in local storage 
// with the new todo item name
function saveEdit() {
  // get the current todo list from local storage
  let todoList = getTodoListFromStorage();
  // Update the specified todo list item with the new value
  todoList[saveInd.value] = editText.value;
  // save the updated todo list back to storage
  saveTodoListToStorage(todoList);
  // clear the text from the inputs
  clearTextInputs();
  // set the display back to add mode
  setAddDisplayMode();
  // display the updated todo list items
  displayTodo();
}

// This function clears the text from the inputs
function clearTextInputs() {
  text.value = "";
  editText.value = "";
}

// This function sets the display to edit mode
function setEditDisplayMode() {
  // hide add stuff
  text.style.display = "none";
  addTaskButton.style.display = "none";
  // show edit stuff
  editText.style.display = "block";
  saveEditTaskButton.style.display = "block";
  cancelEditTaskButton.style.display = "block";
}

// Sets the display to add mode
function setAddDisplayMode() {
  // hide edit stuff
  editText.style.display = "none";
  saveEditTaskButton.style.display = "none";
  cancelEditTaskButton.style.display = "none";
  // show add stuff
  text.style.display = "block";
  addTaskButton.style.display = "block";
}

// This function sets up the edit 
function edit(itemIndex) {
  // save itemIndex to saveInd.value
  saveInd.value = itemIndex;
  // assign the text.value to the array and get the index [itemIndex].
  editText.value = getTodoListFromStorage()[itemIndex];
  // set up the display to be in edit mode
  setEditDisplayMode();
}

// Cancels the edit and returns to add mode
function cancelEdit() {
  saveInd.value = "";
  clearTextInputs();
  setAddDisplayMode();
}

displayTodo();