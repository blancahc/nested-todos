//WHAT TO DO NEXT:
//add function for adding a subtodo 
var todos = [];
function addTodo(todoText) {
  todos.push({todoText: todoText, completed: false})
  displayTodos();
}

function deleteTodo(position) {
  todos.splice(position, 1);
  displayTodos();
}
function editTodo(position, input) {
  todos[position].todoText = input;
  displayTodos();
}

function displayTodos() {
  var todosUl = document.querySelector('ul');
  todosUl.innerHTML = '';
  todos.forEach(function(todo, position){
    var todoLi = document.createElement('li');
    todoLi.innerText = '' + todo.todoText + ' ';
    if(todo.completed === true){
      todoLi.classList.add('line-through');
    }
    todoLi.id = position;
    todoLi.appendChild(createDeleteButton());
    todoLi.appendChild(createEditButton());
    todoLi.appendChild(createAddSubTodoButton());
    todoLi.appendChild(createEditInputField());
    todoLi.appendChild(createSubTodoInputField());
    todosUl.appendChild(todoLi);
  })
}

//Create buttons and input field for each todo
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
  inputfield.placeholder = 'Type something and hit `Enter`'
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
  var liId= id;
  var li = document.getElementById(liId);
  var input = li.childNodes[4]
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
        editTodo(liId, trimedInputText);
        input.value = '';
      }  
    }
  }));
};
function clickedAddSubTodo(id){
  var liId= id;
  var li = document.getElementById(liId);
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
        console.log('added' + trimedInputText);
        input.value = '';
      }  
    }
  }));
};

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
});