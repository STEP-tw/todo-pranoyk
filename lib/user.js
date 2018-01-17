const Todo = require('./todo.js');

class User {
  constructor(userName) {
    this.name = userName;
    this.todos = {};
    this.count = 1;
  }
  convertItemsToArray(toDoItems){
    return toDoItems?toDoItems.split('\r\n'):[];
  }
  isTitlePresent(title) {
    return title?true:false;
  }
  isDescriptionPresent(description){
    return description?true:false;
  }
  addNewTodo(title,description,todoItems){
    if(this.isTitlePresent(title)&&this.isDescriptionPresent(description)){
      let items = this.convertItemsToArray(todoItems);
      let newTodo = new Todo(title,description,items);
      this.todos[this.count]=newTodo;
      this.count++;
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
    let items = this.convertItemsToArray(toDoItems);
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
