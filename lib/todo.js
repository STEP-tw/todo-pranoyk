class Todo {
  constructor(title,description,toDoItems) {
    this.title = title;
    this.description = description;
    this.toDoItems =  toDoItems;
  }
  editTitle(title){
    this.title = title;
  }
  editDescription(description){
    this.description = description;
  }
  editItems(toDoItems){
    this.toDoItems = toDoItems;
  }
  getEditedTodo(){
    return this;
  }
}

module.exports = Todo;
