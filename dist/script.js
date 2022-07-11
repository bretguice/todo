
const todoButton = document.querySelector('.todo-button');
const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('input-field');
const todoHeader = document.getElementById('todo-header');


let todoArray = [];
let completedArray = [];
let trashArray = [];
todoButton.addEventListener('click', addTodo);

function Todo(todoInput){
  return {
    title: todoInput, 
    status: "Not Completed",
    priority: "Medium",
    dueDate: " ",
    notes: " ",
    deleted: false    
   }
}


function createRow(i) {
    // create row to store task
    
    console.log("row built");
}

function createCompleteButton(i, todoArray, todoRow) {
    // add task completed button with an event listener to change the status of the task
    const completedCell = document.createElement('td');
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-button', i);
    completedButton.addEventListener('click', function (e){
      e.stopPropagation();
      todoArray[i].status = "Completed";
      displayTodoList();
    });

    completedCell.appendChild(completedButton);
    todoRow.appendChild(completedCell);
    console.log("complete button");
}

function createTaskTitle(i, todoArray, todoRow) {
    const todoTitle = document.createElement('td');
    todoTitle.classList.add('todo-data', i);
    todoTitle.textContent = todoArray[i].title;
    todoRow.appendChild(todoTitle);
}

function createNotesButton(i, todoRow) {
    // create notes button to redirect to a notes screen
    const notesCell = document.createElement('td');
    const notesButton = document.createElement('button');
    notesButton.innerHTML = '<i class="fas fa-edit"></i>';
    notesButton.classList.add('notes-button', 'todo-data', i);
    notesCell.appendChild(notesButton);
    todoRow.appendChild(notesCell);
}

function createDueDate(i, todoRow){
    // create due date input
    const dueDateCell = document.createElement('td');
    const dueDate = document.createElement('input');
    dueDate.type = "date";
    dueDate.classList.add('due-date', 'todo-data', i)
    dueDateCell.appendChild(dueDate);
    todoRow.appendChild(dueDateCell);
}

function createPriorityField(i, todoArray, todoRow) {
    // create priority drop down
    const priorityCell = document.createElement('td');
    const todoPriority = document.createElement('select');
    const todoCritical = document.createElement('option');
    const todoHigh = document.createElement('option');
    const todoMedium = document.createElement('option');
    const todoLow = document.createElement('option');
    todoPriority.appendChild(todoCritical);
    todoPriority.appendChild(todoHigh);
    todoPriority.appendChild(todoMedium);
    todoPriority.appendChild(todoLow);
    todoCritical.value = "Critical";
    todoHigh.value = "High";
    todoMedium.value = "Medium";
    todoLow.value = "Low";
    todoCritical.innerText = "Critical";
    todoHigh.innerText = "High";
    todoMedium.innerText = "Medium";
    todoLow.innerText = "Low";
    priorityCell.appendChild(todoPriority);
    todoRow.appendChild(priorityCell);

   // set priority label
    if (todoArray[i].priority === "Medium"){
    todoPriority.value = "Medium";
    } else if (todoArray[i].priority === "Low") {
    todoPriority.value = "Low";
    } else if (todoArray[i].priority === "High") {
    todoPriority.value = "High";
    } else if (todoArray[i].priority === "Critical"){
    todoPriority.value = "Critical";
    }
}

function createTrashButton(i,  todoArray, todoRow) {
    // create delete button button with an event listener to change the deleted property of the task
    const trashCell = document.createElement('td');
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button', i);
    trashButton.addEventListener('click', function (e) {
        e.stopPropagation();
        todoArray[i].deleted = true;
    });
    trashCell.appendChild(trashButton);
    todoRow.appendChild(trashCell);

}

function clearTable(){
  let tableData = document.querySelectorAll(".data").forEach(e => e.remove());   
}

function addTodo(e){
  e.preventDefault();
  const inputValue = todoInput.value;
  
  const todo = Todo(inputValue);
  todoArray.push(todo);
  //updateLocalStorage();
  
  
  displayTodoList();
  
  
  todoInput.value = "";
  console.log(todoArray);
  return todoArray;
}
var todoRow;

function displayTodoList(){
  clearTable();
    for (let i = 0; i < todoArray.length; i++ ) {
        if (todoArray[i].status === "Not Completed" && todoArray[i].deleted === false) {
            todoRow = document.createElement('tr');
            todoRow.classList.add('todo-item', 'data', i);
        
            // add task completed button with an event listener to change the status of the task
            const completedCell = document.createElement('td');
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>';
            completedButton.classList.add('complete-button', i);
            completedButton.addEventListener('click', function (e){
              e.stopPropagation();
              todoArray[i].status = "Completed";
              displayTodoList();
            });
        
            completedCell.appendChild(completedButton);
            
            console.log("complete button");
      
            const todoTitle = document.createElement('td');
            todoTitle.classList.add('todo-data', i);
            todoTitle.textContent = todoArray[i].title;
            
    
            // create notes button to redirect to a notes screen
            const notesCell = document.createElement('td');
            const notesButton = document.createElement('button');
            notesButton.innerHTML = '<i class="fas fa-edit"></i>';
            notesButton.classList.add('notes-button', 'todo-data', i);
            notesCell.appendChild(notesButton);
          
        
               // create due date input
            const dueDateCell = document.createElement('td');
            const dueDate = document.createElement('input');
            dueDate.type = "date";
            dueDate.classList.add('due-date', 'todo-data', i)
            dueDateCell.appendChild(dueDate);
            
        
            // create priority drop down
            const priorityCell = document.createElement('td');
            const todoPriority = document.createElement('select');
            const todoCritical = document.createElement('option');
            const todoHigh = document.createElement('option');
            const todoMedium = document.createElement('option');
            const todoLow = document.createElement('option');
            todoPriority.appendChild(todoCritical);
            todoPriority.appendChild(todoHigh);
            todoPriority.appendChild(todoMedium);
            todoPriority.appendChild(todoLow);
            todoCritical.value = "Critical";
            todoHigh.value = "High";
            todoMedium.value = "Medium";
            todoLow.value = "Low";
            todoCritical.innerText = "Critical";
            todoHigh.innerText = "High";
            todoMedium.innerText = "Medium";
            todoLow.innerText = "Low";
            priorityCell.appendChild(todoPriority);
            
        
           // set priority label
            if (todoArray[i].priority === "Medium"){
            todoPriority.value = "Medium";
            } else if (todoArray[i].priority === "Low") {
            todoPriority.value = "Low";
            } else if (todoArray[i].priority === "High") {
            todoPriority.value = "High";
            } else if (todoArray[i].priority === "Critical"){
            todoPriority.value = "Critical";
            }
        
            // create delete button button with an event listener to change the deleted property of the task
            const trashCell = document.createElement('td');
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add('trash-button', i);
            trashButton.addEventListener('click', function (e) {
                e.stopPropagation();
                todoArray[i].deleted = true;
            });
            trashCell.appendChild(trashButton);

            todoRow.appendChild(completedCell);
            todoRow.appendChild(todoTitle);
            todoRow.appendChild(notesCell);
            todoRow.appendChild(dueDateCell);
            todoRow.appendChild(priorityCell);
            todoRow.appendChild(trashCell);
            todoList.appendChild(todoRow);


        } else if (todoArray[i].status === "Completed" && todoArray[i].deleted === false) {
            completedArray.push(todoArray[i]);
            todoArray.splice(i, 1);
        }else if (todoArray[i].deleted === true) {
            trashArray.push(todoArray[i]);
            todoArray.splice(i, 1);
        }
    }
}
