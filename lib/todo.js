class Todo {
  constructor(title,description,toDoItems) {
    this.title = title;
    this.description = description;
    this.toDoItems =  toDoItems;
  }
  editTitle(title){
    this.title = title;
  }
  editTitle(description){
    this.description = description;
  }
  editTitle(toDoItems){
    this.toDoItems = toDoItems;
  }
}

module.exports = Todo;
