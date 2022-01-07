export function updateTodoArrayStorage(todoArray) {
    localStorage.setItem("todoArray", JSON.stringify(todoArray));  
}

export function updateCompletedArrayStorage(completedArray) {
    localStorage.setItem("completedArray", JSON.stringify(completedArray));
}

export function updateTrashArrayStorage(trashArray){
    localStorage.setItem("trashArray", JSON.stringify(trashArray));
}

export function getTodoArrayStorage(todoArray){
    let todoArrayJSON = localStorage.getItem("todoArray");
    todoArray = JSON.parse(todoArrayJSON);
    return todoArray;
    
}

export function getCompletedArrayStorage(completedArray){
    let completedArrayJSON = localStorage.getItem("completedArray");
    completedArray = JSON.parse(completedArrayJSON);
    return completedArray;
        
}

export function getTrashArrayStorage(trashArray){
    let trashArrayJSON = localStorage.getItem("trashArray");
    trashArray = JSON.parse(trashArrayJSON);
    return trashArray;   

}