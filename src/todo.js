export function Todo(todoInput){
  return {
    title: todoInput, 
    status: "Not Completed",
    priority: "Medium",
    dueDate: "",
    completedDate: "",
    deletedDate: "",
    notes: " ",
    deleted: false,
    edit: false    
  }
}
