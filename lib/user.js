const Todo = require('./todo.js');

class User {
  constructor(userName) {
    this.userName = userName;
    this.todos = {};
  }
  isTitlePresent(title) {
    return title?true:false;
  }
  isDescriptionPresent(description){
    return description?true:false;
  }
  addNewTodo(id,title,description,todoItems){
    if(this.isTitlePresent(title)&&this.isDescriptionPresent(description)){
      let newTodo = new Todo(title,description);
      if(todoItems)
       newTodo.addNewItem(todoItems);
      this.todos[id]=newTodo;
    }
  }
  getExistingTodo(id){
    if(this.todos[id]) {
      return this.todos[id];
    }
  }
  getEditedTodo(toEditTodo,title,description,items){
    toEditTodo.editTitle(title);
    toEditTodo.editDescription(description);
    toEditTodo.editItems(items);
    return toEditTodo.getEditedTodo();
  }
  editExistingTodo(id,title,description,toDoItems){
    let todo = this.getExistingTodo(id);
    let toEditTodo = new Todo(todo.title,todo.description,todo.toDoItems);
    let editedTodo = this.getEditedTodo(toEditTodo,title,description,items);
    this.todos[id] = editedTodo;
  }
  deleteExistingTodo(id){
    if(this.todos[id])
      delete this.todos[id];
  }
}

module.exports = User;
