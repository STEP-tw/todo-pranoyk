const getUserToDos = function (user) {
  let todoList = []
  user.forEach(u=>todoList.push(Object.keys(u.todos)))
  // let toDos = Object.keys(user);
  console.log('id============>',todoList);
  let count = 1;
  let todoTitle ='<h3>';
  toDos.forEach(todoID=>{
    todoTitle += `<a href="todoId-${todoID}">${user.todos[count].title}</a><br>`;
  })
  todoTitle+=`</h3>`
   return todoTitle;
}

const toDos = function () {
  function requestListener(){
    let userTodos = JSON.parse(this.responseText);
    let toDo = document.getElementById('todos');
    toDo.innerHTML = getUserToDos(userTodos);
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load',requestListener);
  oReq.open('GET','/viewTodo');
  oReq.send();
}

window.onload = toDos;
