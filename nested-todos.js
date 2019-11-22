//11/21 update
  //added a working delete button for each todo
  //removed the "Add Todo" button from the top and instead allowed for the user to create a new todo upon hitting enter in the top text input field.
  //added "Edit" button to each todo, which displays a text input underneath the todo. 
//Need to figure out how to hide the input field if the user clicks away from the edit input field. 
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
    todoLi.appendChild(createInputField());
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
function createInputField() {
  var inputfield = document.createElement('input');
  inputfield.type = 'text';
  inputfield.className = 'subTodoInput';
  inputfield.style.display = 'none';
  return inputfield;
}
//EVENT LISTENERS
var todoTextInput = document.getElementById("new-todo");
todoTextInput.addEventListener('keyup', function(event){
  //save todo if you press Enter and have more than one input.value
  if(event.code === 'Enter'){
    var trimedInputText = todoTextInput.value.trim();
    if(trimedInputText.length > 0){
      addTodo(trimedInputText);
      todoTextInput.value = '';
    }  
  }
});
function displaySubTodoInput(id){
  var liId= id;
  var li = document.getElementById(liId);
  var input = li.childNodes[4]
  input.style.display='block';
  input.focus();
  if(input.addEventListener('blur', function (event){
    input.style.display = 'none';
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
  //  editEvent(parseInt(elementClicked.parentNode.id));
  displaySubTodoInput(elementClicked.parentNode.id);
 }
 if(elementClicked.className === 'addSubTodoButton'){
  displaySubTodoInput(elementClicked.parentNode.id);
 }
});