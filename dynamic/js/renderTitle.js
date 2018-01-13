const getTitle = function() {
  let titles = '';
  data.forEach(todos=>{
    titles+=`${todos.title}<br>`;
  })
  return titles;
}

const retrieve = function () {
  let todo = document.querySelector("#to-do");
  todo.innerHTML = getTitle();
}

window.onload=retrieve;
