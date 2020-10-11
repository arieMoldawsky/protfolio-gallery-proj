'use strict'

console.log('Hi');


function onInit() {
    renderTodos();
}


function renderTodos() {
    var strHTML = ''
    var todos = getTodosForDisplay();
    todos.forEach(function (todo) {
        strHTML +=
            `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
        ${todo.txt + ' - ' + todo.createdAt} 
        <button onclick="onRemoveTodo(event,'${todo.id}')">x</button>
        </li>`
    })
    document.querySelector('.todo-list').innerHTML = strHTML;
    if (!strHTML) {
        document.querySelector('.empty-list').style.display = "block";
    } else document.querySelector('.empty-list').style.display = "none";

    document.querySelector('.total').innerText = getTodosCount()
    document.querySelector('.active').innerText = getActiveTodosCount()
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('.new-todo-txt');
    var elNewTodoImportance = document.querySelector('.new-todo-importance')
    var txt = elNewTodoTxt.value;
    var imp = elNewTodoImportance.value;
    if (!txt) {
        alert('Please insert text.');
        return
    }
    if (!imp || imp < 1 || imp > 3) {
        alert('Please insert a number between 1-3.');
        elNewTodoImportance.value = '';
        return
    }
    addTodo(txt, imp);
    renderTodos();
    elNewTodoTxt.value = '';
    elNewTodoImportance.value = '';
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    removeTodo(todoId);
    renderTodos();
}
function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos();
}

function onSetSort(sortBy) {
    setSort(sortBy);
    renderTodos();
}