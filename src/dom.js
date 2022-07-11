import { todoArray, completedArray, trashArray, displayTodoList } from "./index"
import { setToday } from "./date"
import * as Storage from "./storage"

export var todoRow;
export const todoButton = document.querySelector('.todo-button');
export const todoList = document.getElementById('todo-list');
export const tableHead = document.getElementById('header');
export const todoInput = document.getElementById('input-field');
const editScreen = document.getElementById('edit-screen');
const editScreenDescription = document.getElementById('todo-description');
export const editScreenButton = document.getElementById('edit-screen-btn');
const taskName = document.getElementById('todo-name');
export const editScreenX = document.getElementById('edit-screen-x');
const editScreenDate = document.getElementById('edit-date-field');
const editScreenPriority = document.getElementById('edit-priority-field');
const editScreenTitle = document.getElementById('edit-title');

export function editScreenSubmit(){
    editScreen.style.visibility = "hidden";
    for (let j = 0; j < todoArray.length; j++) {
        if (todoArray[j].edit === true){   
            todoArray[j].notes = editScreenDescription.value;
            todoArray[j].title = editScreenTitle.value;
            todoArray[j].dueDate = editScreenDate.value;
            todoArray[j].priority = editScreenPriority.value;
            editScreenDescription.value = "";
            todoArray[j].edit = false;
            Storage.updateTodoArrayStorage(todoArray);

        } else if (completedArray[j].edit === true) {
            completedArray[j].notes = editScreenDescription.value;
            completedArray[j].title = editScreenTitle.value;
            completedArray[j].completedDate = editScreenDate.value;
            completedArray[j].priority = editScreenPriority.value;
            editScreenDescription.value = "";
            completedArray[j].edit = false;
            Storage.updateCompletedArrayStorage(completedArray);

        }else if (trashArray[j].edit === true) {
            trashArray[j].notes = editScreenDescription.value;
            trashArray[j].title = editScreenTitle.value;
            trashArray[j].deletedDate = editScreenDate.value;
            trashArray[j].priority = editScreenPriority.value;
            editScreenDescription.value = "";
            trashArray[j].edit = false;
            Storage.updateTrashArrayStorage(trashArray); 
        }
    }

    displayTodoList();
}

export function editScreenClose(){
    editScreen.style.visibility = "hidden";
}


export function createRow(i, todoList) {
    todoRow = document.createElement('tr');
    todoRow.classList.add('todo-item', 'data', i);

    todoList.appendChild(todoRow);
}

export function createCompleteButton(i, todoArray) {
    const completedCell = document.createElement('td');
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-button', i);
    completedButton.addEventListener('click', function (e){
      e.stopPropagation();
      todoArray[i].status = "Completed";
      var today = setToday();
      todoArray[i].completedDate = today;
      
        if (todoArray[i].status === "Completed" && todoArray[i].deleted === false) {
            completedArray.push(todoArray[i]);
            todoArray.splice(i, 1);
            Storage.updateCompletedArrayStorage(completedArray);
            Storage.updateTodoArrayStorage(todoArray)
        }
      
    displayTodoList();
    });

    completedCell.appendChild(completedButton);
    todoRow.appendChild(completedCell);
}

export function createTaskTitle(i, todoArray) {
    const todoTitle = document.createElement('td');
    todoTitle.classList.add('todo-data', i);
    todoTitle.textContent = todoArray[i].title;
    todoRow.appendChild(todoTitle);
}

export function createNotesButton(i, arr) {
    const notesCell = document.createElement('td');
    
    const notesButton = document.createElement('button');
    notesButton.innerHTML = '<i class="fas fa-edit"></i>';
    notesButton.classList.add('notes-button', 'todo-data', i);
        notesButton.addEventListener('click', function (){
        arr.forEach(() => {

            editScreenTitle.value = arr[i].title;
            editScreenDescription.value = arr[i].notes;
            editScreenPriority.value = arr[i].priority;

            if (arr === todoArray) {
                editScreenDate.value = arr[i].dueDate;
            } else if (arr === completedArray){
                editScreenDate.value = arr[i].completedDate;
            } else if (arr === trashArray){
                editScreenDate.value = arr[i].deletedDate;
            }

        }) 
        
        editScreen.style.visibility= "visible"; 
        arr[i].edit = true;  
        //Storage.updateTodoArrayStorage(todoArray);
    })
    notesCell.appendChild(notesButton);
    todoRow.appendChild(notesCell);
}

export function createDueDate(i, obj){
    const dueDateCell = document.createElement('td');
    const dueDateBtn = document.createElement('input');
    dueDateBtn.type = "date";
    dueDateBtn.classList.add('due-date', 'todo-data', i)
    dueDateCell.appendChild(dueDateBtn);
    todoRow.appendChild(dueDateCell);

    dueDateBtn.value = (obj.dueDate === "") ? "" : obj.dueDate;

    dueDateBtn.addEventListener('input', function (e){
        e.stopPropagation();
        obj.dueDate = dueDateBtn.value;
        Storage.updateTodoArrayStorage(todoArray);
    })
}
export function createCompletedDate(i, obj){
    const completedDateCell = document.createElement('td');
    const completedDateBtn = document.createElement('input');
    completedDateBtn.type = "date";
    completedDateBtn.classList.add('completed-date', 'todo-data', i)
    completedDateCell.appendChild(completedDateBtn);
    todoRow.appendChild(completedDateCell);

    completedDateBtn.value = (obj.completedDate === "") ? "" : obj.completedDate;

    completedDateBtn.addEventListener('input', function (e){
        e.stopPropagation();
        obj.completedDate = completedDateBtn.value;
        Storage.updateCompletedArrayStorage(completedArray);
    })
}

export function createDeletedDate(i, obj){
    const deletedDateCell = document.createElement('td');
    const deletedDateBtn = document.createElement('input');
    deletedDateBtn.type = "date";
    deletedDateBtn.classList.add('deleted-date', 'todo-data', i)
    deletedDateCell.appendChild(deletedDateBtn);
    todoRow.appendChild(deletedDateCell);

    deletedDateBtn.value = (obj.deletedDate === "") ? "" : obj.deletedDate;

    deletedDateBtn.addEventListener('input', function (e){
        e.stopPropagation();
        obj.deletedDate = deletedDateBtn.value;
        Storage.updateTrashArrayStorage(trashArray);
    })
}


export function createPriorityField(i, todoArray) {
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

    if (todoArray[i].priority === "Medium"){
    todoPriority.value = "Medium";
    } else if (todoArray[i].priority === "Low") {
    todoPriority.value = "Low";
    } else if (todoArray[i].priority === "High") {
    todoPriority.value = "High";
    } else if (todoArray[i].priority === "Critical"){
    todoPriority.value = "Critical";
    }

    todoPriority.addEventListener('change', function (){
        todoArray[i].priority = todoPriority.value;
        Storage.updateTodoArrayStorage(todoArray);
    })
}

export function createTrashButton(i,  todoArray) {
    const trashCell = document.createElement('td');
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button', i);
    trashButton.addEventListener('click', function (e) {
        e.stopPropagation();
        todoArray[i].deleted = true;
        var today = setToday();    
        todoArray[i].deletedDate = today;
        trashArray.push(todoArray[i]);
        todoArray.splice(i, 1);
        Storage.updateTrashArrayStorage(trashArray);
        Storage.updateTodoArrayStorage(todoArray);
        displayTodoList();
    });
    trashCell.appendChild(trashButton);
    todoRow.appendChild(trashCell);

}

export function createHeader(){
    const headerRow = document.createElement('tr');
    tableHead.appendChild(headerRow);
    const completeHeader = document.createElement('th');
    const labelHeader = document.createElement('th');
    const notesHeader = document.createElement('th');
    const dueDateHeader = document.createElement('th');
    const priorityHeader = document.createElement('th');
    const deleteHeader = document.createElement('th');
    headerRow.append
    (completeHeader, labelHeader, notesHeader, 
    dueDateHeader, priorityHeader, deleteHeader);
    completeHeader.textContent = "Complete";
    labelHeader.textContent = "To Do";
    notesHeader.textContent = "Notes";
    dueDateHeader.textContent = "Due Date";
    priorityHeader.textContent = "Priority";
    deleteHeader.textContent = "Delete";
    headerRow.classList.add('data', 'header-row');
}

export function createOtherHeader() {
    const headerRow = document.createElement('tr');
    tableHead.appendChild(headerRow);
    const labelHeader = document.createElement('th');
    const notesHeader = document.createElement('th');
    const completedDate = document.createElement('th');
    const priorityHeader = document.createElement('th');
    headerRow.append
    (labelHeader, notesHeader, 
    completedDate, priorityHeader);
    labelHeader.textContent = "To Do";
    notesHeader.textContent = "Notes";
    completedDate.textContent = "Completed Date";
    priorityHeader.textContent = "Priority";
    
    headerRow.classList.add('data', 'header-row');
}

