const STORAGE_KEY = 'todoDB';

var gFilterBy = 'ALL';
var gSortBy = 'CREATED';
var gTodos = _createTodos();


function getTodosForDisplay() {
    // if (gSortBy === 'TEXT') {
    //     var sortedRes = gTodos.sort(function (a, b) {
    //         var txtA = a.txt.toUpperCase();
    //         var txtB = b.txt.toUpperCase();
    //         if (txtA < txtB) {
    //             return -1;
    //         }
    //         if (txtA > txtB) {
    //             return 1;
    //         }
    //         return 0;
    //     });
    // }
    var sortedRes = sortByFun();
    if (gFilterBy === 'ALL') return sortedRes;
    var res = sortedRes.filter(function (todo) {
        return (
            gFilterBy === 'DONE' && todo.isDone ||
            gFilterBy === 'ACTIVE' && !todo.isDone
        )
    })
    console.log(res);
    return res;
}


function addTodo(txt, imp) {
    gTodos.unshift(_createTodo(txt, imp))
    saveToStorage(STORAGE_KEY, gTodos);

}

function removeTodo(id) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === id
    })
    if (window.confirm('Are you sure?')) {
        gTodos.splice(idx, 1);
        saveToStorage(STORAGE_KEY, gTodos);
    }
}

function toggleTodo(id) {
    var todo = gTodos.find(function (todo) {
        return todo.id === id
    })
    todo.isDone = !todo.isDone;
    saveToStorage(STORAGE_KEY, gTodos);
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function sortByFun() {
    if (gSortBy === 'TEXT') {
        var sortedRes = gTodos.sort(function (a, b) {
            var txtA = a.txt.toUpperCase();
            var txtB = b.txt.toUpperCase();
            if (txtA < txtB) {
                return -1;
            }
            if (txtA > txtB) {
                return 1;
            }
            return 0;
        });
    } else if (gSortBy === 'CREATED') {
        var sortedRes = gTodos.sort(function (a, b) {
            if (a.createdAt < b.createdAt) {
                return -1;
            }
            if (a.createdAt > b.createdAt) {
                return 1;
            }
            return 0;
        });
    } else if (gSortBy === 'IMPORTANCE') {
        var sortedRes = gTodos.sort(function (a, b) {
            return a.importance - b.importance;
        });
    }
    return sortedRes
}

function getTodosCount() {
    return gTodos.length
}
function getActiveTodosCount() {
    var count = gTodos.reduce(function (count, todo) {
        if (!todo.isDone) count += 1
        return count;
    }, 0)
    return count;
}
function getActiveTodosCount1() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}




// Those functions are PRIVATE - not to be used outside this file!
function _createTodo(txt, imp) {
    return {
        id: makeId(),
        txt: txt,
        importance: +imp,
        createdAt: new Date(Date.now()).toLocaleDateString("en-US"),
        isDone: false
    };
}
function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    if (!todos) {
        todos = []
        todos.push(_createTodo('Learn HTML'))
        todos.push(_createTodo('Master CSS'))
        todos.push(_createTodo('Become JS Ninja'))
    }
    return todos;
}



