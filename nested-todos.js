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
    //to "whatTodo" where to add subtodo by running whereToModify
    var whatTodo = '';
    //whereToModify() takes + button clicked and gets path to know what todo/subtodo to modifiy.
    whatTodo = whereToModify(whatTodo, element);
    whatTodo = eval(whatTodo);
    if(!whatTodo.subTodos) {
      whatTodo.subTodos = [];
    }
    whatTodo.subTodos.push({todoText: text, completed: false}); 
    localStorage.setItem("current-todos", JSON.stringify(todos));
    displayTodos();
  }
  function whereToModify(whatTodo, element) {
    //base case, if no className
    var parent = element.parentElement;
    if(parent.classList.contains('top-todo')){
      return whatTodo = `todos[${parent.id}]`+ whatTodo;
    }
    whatTodo = `.subTodos[${parent.id}]` + whatTodo;
    if(parent.classList.contains('sub-todo')) {
      element = parent.parentElement;
      return whatTodo = whereToModify(whatTodo, element);
    }
    if(parent.classList.contains('sub-todoUl')) {
      element = parent.parentElement;
      return whatTodo = whereToModify(whatTodo, element);
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
  var whatTodo = '';
  if (!element.parentElement.className){
    whatTodo = 'todos';
  } else {
    whatTodo = whereToModify(whatTodo, element);
    whatTodo = whatTodo.slice(0, -3)
  }
  whatTodo = eval(whatTodo);
  whatTodo.splice(position, 1);
  localStorage.setItem("current-todos", JSON.stringify(todos));
  displayTodos();
}
function editTodo(whatTodo, input) {
  whatTodo.todoText = input;
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
    todoLi.className = 'top-todo';
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
  deleteButton.textContent = 'x';
  deleteButton.className = 'deleteButton'
  return deleteButton;
}
function createEditButton() {
  var editButton = document.createElement('button');
  editButton.textContent = '...';
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
  li.childNodes[0].style.display= 'none';
  li.childNodes[1].style.display= 'none';
  li.childNodes[2].style.display= 'none';
  li.childNodes[3].style.display= 'none';
  li.childNodes[4].style.display= 'none';
  var input = li.childNodes[5];
  var whatTodo = '';
  whatTodo = whereToModify(whatTodo, element);
  whatTodo = eval(whatTodo);
  var todoText = whatTodo.todoText;
  input.value = todoText;
  input.style.display='block';
  input.style.width = '300px';
  input.focus();
  if(input.addEventListener('blur', function (event){
    input.style.display = 'none';
    li.childNodes[0].style.display= 'inline-block';
    li.childNodes[1].style.display= 'inline-block';
    li.childNodes[2].style.display= 'inline-block';
    li.childNodes[3].style.display= 'inline-block';
    li.childNodes[4].style.display= 'inline-block';
  }));
  if(input.addEventListener('keyup', function (event){
    if(event.code === 'Enter'){
      var trimedInputText = input.value.trim();
      if(trimedInputText.length > 0){
        editTodo(whatTodo, trimedInputText);
        input.value = '';
      }  
    }
  }));
  if(whatTodo.completed === true){
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
function clickedCheckbox(element){
  var li = element.parentElement;
  var checkbox = li.childNodes[0];
  if(checkbox.addEventListener('change', function(event){
    element = event.target;
    var whatTodo = '';
    whatTodo = whereToModify(whatTodo, element);
    whatTodo = eval(whatTodo);
    if(this.checked) {
      whatTodo.completed = true;
      localStorage.setItem("current-todos", JSON.stringify(todos));
      li.classList.add('line-through');
      var lis = li.getElementsByTagName("LI");
      for (var i = 0; i < lis.length; i++){
        var whatTodo = '';
        var element = lis[i].childNodes[0];
        whatTodo = whereToModify(whatTodo, element);
        whatTodo = eval(whatTodo);
        whatTodo.completed = true;
        localStorage.setItem("current-todos", JSON.stringify(todos));
        lis[i].classList.add('line-through');
      }
    } else {
      whatTodo.completed = false;
      localStorage.setItem("current-todos", JSON.stringify(todos));
      li.classList.remove('line-through');
    }
    checkToggleAllIfAllCompleted();
  }));
  
}
// function clickedCheckbox(id){
//   var li = document.getElementById(id);
//   var checkbox = li.childNodes[0];
//   if(checkbox.addEventListener('change', function(){
//     if(this.checked) {
//       todos[id].completed = true;
//       localStorage.setItem("current-todos", JSON.stringify(todos));
//       li.classList.add('line-through');
//     } else {
//       todos[id].completed = false;
//       localStorage.setItem("current-todos", JSON.stringify(todos));
//       li.classList.remove('line-through');
//     }
//     checkToggleAllIfAllCompleted();
//   }));
  
// }
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
  //  clickedCheckbox(elementClicked.parentNode.id);
  clickedCheckbox(elementClicked);
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
