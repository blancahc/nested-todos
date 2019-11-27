//WHAT TO DO NEXT:
//fix toggleAll event Listener
var todos = [];
var storage = JSON.parse(localStorage.getItem("current-todos"));
if(storage.length > 0){
  todos = storage;
};
function addTodo(todoText) {
  todos.push({todoText: todoText, completed: false})
  localStorage.setItem("current-todos", JSON.stringify(todos));
  displayTodos();
}
function checkIfAllComplete() {
  countCompleted = 0;
 for (var i = 0; i < todos.length; i++){
  if(todos[i].completed === true) {
    countCompleted++;
  }
 }
 return countCompleted;
}
function checkToggleAllIfAllCompleted() {
  if (todos.length > 0 && checkIfAllComplete() === todos.length) {
    toggleAllCheckbox.checked = true;
  } else {
    toggleAllCheckbox.checked = false;
  }
  }

function deleteTodo(position) {
  todos.splice(position, 1);
  localStorage.setItem("current-todos", JSON.stringify(todos));
  displayTodos();
}
function editTodo(position, input) {
  todos[position].todoText = input;
  localStorage.setItem("current-todos", JSON.stringify(todos));
  displayTodos();
}

function displayTodos() {
  var todosUl = document.querySelector('ul');
  todosUl.innerHTML = '';
  todos.forEach(function(todo, position){
    var todoLi = document.createElement('li');
    var todoLabel = document.createElement('label');
    todoLabel.innerText = todo.todoText + ' ';
    todoLi.id = position;
    todoLi.appendChild(createCheckbox());
    todoLi.appendChild(todoLabel);
    todoLi.appendChild(createDeleteButton());
    todoLi.appendChild(createEditButton());
    todoLi.appendChild(createAddSubTodoButton());
    todoLi.appendChild(createEditInputField());
    todoLi.appendChild(createSubTodoInputField());
    todosUl.appendChild(todoLi);
    if(todo.completed === true){
      todoLi.classList.add('line-through');
      checkbox = todoLi.childNodes[0];
      checkbox.checked = true;
    }
  })
}

//Create buttons and input field for each todo
function createCheckbox() {
  var todoCheckbox = document.createElement('input');
  todoCheckbox.type = 'checkbox';
  todoCheckbox.className = 'checkbox';
  return todoCheckbox;
}
function createDeleteButton() {
  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'deleteButton'
  return deleteButton;
}
function createEditButton() {
  var editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'editButton'
  return editButton;
}
function createAddSubTodoButton() {
  var addSubTodoButton = document.createElement('button');
  addSubTodoButton.textContent = 'Add sub todo';
  addSubTodoButton.className = 'addSubTodoButton';
  return addSubTodoButton;
}
function createEditInputField() {
  var inputfield = document.createElement('input');
  inputfield.type = 'text';
  inputfield.className = 'editTodoInput';
  inputfield.style.display = 'none';
  return inputfield;
}
function createSubTodoInputField() {
  var inputfield = document.createElement('input');
  inputfield.type = 'text';
  inputfield.className = 'subTodoInput';
  inputfield.placeholder = 'Type something and hit `Enter`'
  inputfield.style.display = 'none';
  return inputfield;
}
//EVENT LISTENERS
var editTextInput = document.getElementById("new-todo");
editTextInput.addEventListener('keyup', function(event){
  //save todo if you press Enter and have more than one input.value
  if(event.code === 'Enter'){
    var trimedInputText = editTextInput.value.trim();
    if(trimedInputText.length > 0){
      addTodo(trimedInputText);
      editTextInput.value = '';
    }  
  }
});
function clickedEditTodo(id){
  var li = document.getElementById(id);
  var input = li.childNodes[5];
  var todoText = todos[id].todoText;
  input.value = todoText;
  input.style.display='block';
  input.style.width = '300px';
  input.focus();
  if(input.addEventListener('blur', function (event){
    input.style.display = 'none';
  }));
  if(input.addEventListener('keyup', function (event){
    if(event.code === 'Enter'){
      var trimedInputText = input.value.trim();
      if(trimedInputText.length > 0){
        editTodo(id, trimedInputText);
        input.value = '';
      }  
    }
  }));
  if(todos[id].completed === true){
    checkbox = li.childNodes[0];
    checkbox.checked = true;
  }
};
function clickedAddSubTodo(id){
  var li = document.getElementById(id);
  var input = li.childNodes[5]
  input.style.display='block';
  input.style.width = '300px';
  input.focus();
  if(input.addEventListener('blur', function (event){
    input.style.display = 'none';
  }));
  if(input.addEventListener('keyup', function (event){
    if(event.code === 'Enter'){
      var trimedInputText = input.value.trim();
      if(trimedInputText.length > 0){
        //add function here
        console.log('added ' + trimedInputText);
        input.value = '';
      }  
    }
  }));
};
function clickedCheckbox(id){
  var li = document.getElementById(id);
  var checkbox = li.childNodes[0];
  if(checkbox.addEventListener('change', function(){
    if(this.checked) {
      todos[id].completed = true;
      localStorage.setItem("current-todos", JSON.stringify(todos));
      li.classList.add('line-through');
    } else {
      todos[id].completed = false;
      localStorage.setItem("current-todos", JSON.stringify(todos));
      li.classList.remove('line-through');
    }
    checkToggleAllIfAllCompleted();
  }));
  
}

var todosUl = document.getElementById('display-todos');
todosUl.addEventListener('click', function(event) {
 //get element that was clicked
 var elementClicked= event.target
 //check if elementClicked is a delete button
 if(elementClicked.className === 'deleteButton'){
   //run deleteTodo()
  deleteTodo(parseInt(elementClicked.parentNode.id));
 }
 //check if elementClicked is an edit button
 if(elementClicked.className === 'editButton') {
  clickedEditTodo(elementClicked.parentNode.id);
 }
 if(elementClicked.className === 'addSubTodoButton'){
  clickedAddSubTodo(elementClicked.parentNode.id);
 } 
 if(elementClicked.className === 'checkbox') {
   clickedCheckbox(elementClicked.parentNode.id)
 }
});
var toggleAllCheckbox = document.getElementById('toggle-all');
toggleAllCheckbox.addEventListener('change', function() {
  //first check if the box is checked
  if(this.checked){
    var check = checkIfAllComplete();
    if(check === todos.length){
      todos.forEach(function(todo){
        todo.completed = false;
        localStorage.setItem("current-todos", JSON.stringify(todos));
      });
    } 
    if (check !== todos.length){
      todos.forEach(function(todo){
        todo.completed = true;
        localStorage.setItem("current-todos", JSON.stringify(todos));
      })
    }
  displayTodos();
  }
  if(!this.checked){

  }
  
});
function init() {
  displayTodos();
  checkToggleAllIfAllCompleted()
}
init();