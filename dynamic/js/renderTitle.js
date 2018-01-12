const getToDo = function() {
  let todo = '';
  data.forEach(todolist=>{
    todo+=`<b>Title</b> : ${todolist.title}<br> <b>Description</b> : ${todolist.description}<br> <b>to-do's</b> : `;
    todolist.toDoItems.forEach(element=>{
      todo+=`${element}<br>`;
    })
    todo+=`<hr>`;
  })
  return todo;
}

const retrieve = function () {
  let todo = document.querySelector("#to-do");
  todo.innerHTML = getToDo();
}

window.onload=retrieve;
