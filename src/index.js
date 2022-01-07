import * as Dom from "./dom"
import * as Todo from "./todo"
import * as Storage from "./storage"
import { clearTable } from "./clear";

export var todoArray = [];
export var completedArray = [];
export var trashArray = [];
var todo;
Dom.todoButton.addEventListener('click', addTodo);
Dom.editScreenButton.addEventListener('click', Dom.editScreenSubmit);
Dom.editScreenX.addEventListener('click', Dom.editScreenClose);
export const currentViewBtn = document.getElementById('current');
export const completedViewBtn = document.getElementById('completed');
export const deletedViewBtn = document.getElementById('deleted');
export const viewButtons = document.querySelectorAll('.view-button');

currentViewBtn.addEventListener('click', displayTodoList )
deletedViewBtn.addEventListener('click', deletedViewHandler);
completedViewBtn.addEventListener('click', completedViewHandler);

function addTodo(e){
    e.preventDefault();
    const inputValue = Dom.todoInput.value;
    
    todo = Todo.Todo(inputValue);
    todoArray.push(todo);
    Storage.updateTodoArrayStorage(todoArray);
    displayTodoList();
        
    Dom.todoInput.value = "";
    return todoArray;
}

export function displayTodoList(){
    clearTable();
    todoArray = (Storage.getTodoArrayStorage(todoArray) === null) ? [] : Storage.getTodoArrayStorage(todoArray);

    completedViewBtn.classList.remove('active');
    deletedViewBtn.classList.remove('active');
    currentViewBtn.classList.add('active');
    Dom.createHeader();
    
    for (let i = 0; i < todoArray.length; i++ ) {
        Dom.createRow(i, Dom.todoList);
        Dom.createCompleteButton(i, todoArray);
        Dom.createTaskTitle(i, todoArray);
        Dom.createNotesButton(i, todoArray);
        Dom.createDueDate(i, todoArray[i]);
        Dom.createPriorityField(i, todoArray);
        Dom.createTrashButton(i, todoArray);
    }
    
}

export function deletedViewHandler(){
    clearTable();
    //convert trashArrayJSON to trashArray
    trashArray = (Storage.getTrashArrayStorage(trashArray) === null )? [] : Storage.getTrashArrayStorage(trashArray);
    currentViewBtn.classList.remove('active');
    completedViewBtn.classList.remove('active');
    deletedViewBtn.classList.add('active');
    Dom.createOtherHeader();
    for (let i = 0; i < trashArray.length; i++ ) {

        Dom.createRow(i, Dom.todoList);
        Dom.createTaskTitle(i, trashArray);
        Dom.createNotesButton(i, trashArray);
        Dom.createDeletedDate(i, trashArray[i]);
        Dom.createPriorityField(i, trashArray);  
    }

}

export function completedViewHandler() {
    clearTable();
    // convert completedArrayJSON to completedArray 
    completedArray = (Storage.getCompletedArrayStorage(completedArray) === null) ? [] : Storage.getCompletedArrayStorage(completedArray);
    deletedViewBtn.classList.remove('active');
    currentViewBtn.classList.remove('active');
    completedViewBtn.classList.add('active');
    Dom.createOtherHeader();
    for (let i = 0; i < completedArray.length; i++ ) {
        
        Dom.createRow(i, Dom.todoList);
        Dom.createTaskTitle(i, completedArray);
        Dom.createNotesButton(i, completedArray);
        Dom.createCompletedDate(i, completedArray[i]);
        Dom.createPriorityField(i, completedArray);
    }
}
