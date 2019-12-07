//12-6 (Friday) - Successfully modified my addSubTodos() function so that it adds any level of subtodos under the right todo.
  //Also, successfully modified my deleteTodos() function so that it deletes the correct todo(s).
  //successfully modified functions related to edit todos.
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
function addSubTodo(element, text){
    //to "trace" where to add subtodo by running whereToModify
    var trace = '';
    //whereToModify() takes + button clicked and gets path to know what todo/subtodo to modifiy.
    trace = whereToModify(trace, element);
    trace = eval(trace);
    if(!trace.subTodos) {
      trace.subTodos = [];
    }
    trace.subTodos.push({todoText: text, completed: false}); 
    localStorage.setItem("current-todos", JSON.stringify(todos));
    displayTodos();
  }
  function whereToModify(trace, element) {
    //base case, if no className
    var parent = element.parentElement;
    if(!parent.className){
      return trace = `todos[${parent.id}]`+ trace;
    }
    trace = `.subTodos[${parent.id}]` + trace;
    if(parent.className === 'sub-todo') {
      element = parent.parentElement;
      return trace = whereToModify(trace, element);
    }
    if(parent.className ==='sub-todoUl') {
      element = parent.parentElement;
      return trace = whereToModify(trace, element);
    }
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

function deleteTodo(element, position) {
  var trace = '';
  if (!element.parentElement.className){
    trace = 'todos';
  } else {
    trace = whereToModify(trace, element);
    trace = trace.slice(0, -3)
  }
  trace = eval(trace);
  trace.splice(position, 1);
  localStorage.setItem("current-todos", JSON.stringify(todos));
  displayTodos();
}
function editTodo(trace, input) {
  trace.todoText = input;
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
    if(todo.subTodos && todo.subTodos.length > 0){
      var subTodos = todo.subTodos
      displaySubTodos(subTodos, todoLi);
    }
  });
}
 function displaySubTodos(subTodos, todoLi) {
   var subTodosUl = document.createElement('ul');
   subTodosUl.className = 'sub-todoUl';
   todoLi.appendChild(subTodosUl);
   subTodos.forEach(function(todo, position){
    var subTodoLi = document.createElement('li');
    subTodoLi .className= 'sub-todo';
    var todoLabel = document.createElement('label');
    todoLabel.innerText = todo.todoText + ' ';
    subTodoLi.id = position;
    subTodoLi.appendChild(createCheckbox());
    subTodoLi.appendChild(todoLabel);
    subTodoLi.appendChild(createDeleteButton());
    subTodoLi.appendChild(createEditButton());
    subTodoLi.appendChild(createAddSubTodoButton());
    subTodoLi.appendChild(createEditInputField());
    subTodoLi.appendChild(createSubTodoInputField());
    subTodosUl.appendChild(subTodoLi);
    if(todo.completed === true){
      subTodoLi.classList.add('line-through');
      checkbox = subTodoLi.childNodes[0];
      checkbox.checked = true;
    }
    if(todo.subTodos && todo.subTodos.length > 0){
      subTodos = todo.subTodos;
      todoLi = subTodoLi;
      return displaySubTodos(subTodos, todoLi);
    } else {
      return;
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
  deleteButton.textContent = 'X';
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
  addSubTodoButton.textContent = '+';
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
  inputfield.placeholder = 'Type something and hit `Enter` to save'
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
function clickedEditTodo(element){
  var li = element.parentElement;
  var input = li.childNodes[5];
  var trace = '';
  trace = whereToModify(trace, element);
  trace = eval(trace);
  var todoText = trace.todoText;
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
        editTodo(trace, trimedInputText);
        input.value = '';
      }  
    }
  }));
  if(trace.completed === true){
    checkbox = li.childNodes[0];
    checkbox.checked = true;
  }
};
function clickedAddSubTodo(element){
  // var li = document.getElementById(id);
  var input = element.parentElement.childNodes[6]
  input.style.display='block';
  input.style.width = '300px';
  input.focus();
  if(input.addEventListener('blur', function (event){
    input.value = '';
    input.style.display = 'none';
  }));
  if(input.addEventListener('keyup', function (event){
    if(event.code === 'Enter'){
      var trimedInputText = input.value.trim();
      if(trimedInputText.length > 0){
        addSubTodo(element, trimedInputText);
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
 var elementClicked= event.target
 if(elementClicked.className === 'deleteButton'){
  deleteTodo(elementClicked, (parseInt(elementClicked.parentNode.id)));
 }
 if(elementClicked.className === 'editButton') {
  clickedEditTodo(elementClicked);
 }
 if(elementClicked.className === 'addSubTodoButton'){
  clickedAddSubTodo(elementClicked);
 } 
 if(elementClicked.className === 'checkbox') {
   clickedCheckbox(elementClicked.parentNode.id)
 }
});
var toggleAllCheckbox = document.getElementById('toggle-all');
toggleAllCheckbox.addEventListener('click', function() {
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
  }
  if(!this.checked){
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
  }
  displayTodos();
});
function init() {
  displayTodos();
  checkToggleAllIfAllCompleted()
}
init();
