class NewToDo {
  constructor(body,userName) {
    this.body = body;
    this.userName = userName;
    this.title=undefined;
    this.description=undefined;
    this.toDoItems = [];
  }
  getUserName() {
    return this.userName;
  }
  getTitle() {
    this.processTitle();
    return this.title;
  }
  processTitle() {
    this.title=this.body.title;
  }
  processDescription() {
    this.description=this.body.description;
  }
  processToDoItems() {
    this.toDoItems= this.body.items.split('\r\n');
  }
  processData() {
    this.processTitle();
    this.processDescription();
    this.processToDoItems();
    return {userName : this.userName, title : this.title, description : this.description, toDoItems : this.toDoItems};
  }
}

module.exports=NewToDo;
