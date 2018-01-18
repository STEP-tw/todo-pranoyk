class Todo {
  constructor(title,description) {
    this.title = title;
    this.description = description;
    this.toDoItems =  {};
    this.todoItemCount = 1;
  }
  addNewItem(todoItem){
    for(let i=0; i<todoItem.length; i++){
      let newItem = {content:todoItem[i],isDone:false};
      this.toDoItems[this.todoItemCount] = newItem;
      this.todoItemCount++;
    }
    return;
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
  getTodo(){
    return {
      title:this.title,
      description:this.description,
      toDoItems:this.toDoItems
    };
  }
  getEditedTodo(){
    return this.getTodo();
  }
}

module.exports = Todo;
