
import { todoService } from "../../services/todo.service.js"
import { ADD_TODO, FILTER_TODO, REMOVE_TODOS, SET_PAGE_IDX, SET_TODOS, UPDATE_TODO } from "../reducers/todo.reducer.js"
import { store } from "../store.js"

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODOS, todoId }
        ))
        .catch(err => {
            console.log('todo action=>CannotRemove Todo', err)
            throw err
        })
}
export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(todoToSave => {
            store.dispatch({ type, todo: todoToSave })
            return todoToSave
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}
export function query(filterBy) {
    todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
}
export function setFilterBy(ev, filterBy) {
    const newFilter = { ...filterBy }
    console.log('newFilter', newFilter)
    if (ev.target) {
        if (ev.target.name === "isDone") {
            if (ev.target.value === "") {
                newFilter.isDone = undefined
            } else {
                newFilter.isDone = ev.target.value === 'true' ? true : false;
            }
        } else if (ev.target.name === "txt") {
            newFilter.txt = ev.target.value
        }
    }

    store.dispatch({ type: FILTER_TODO, filterBy: newFilter })
store.dispatch({ type: SET_PAGE_IDX, pageIdx: 0 }); // Use a colon : to set the value
}
export function goToPage(pageNumber) {
    const newPageIdx = pageNumber - 1;
    store.dispatch({ type: SET_PAGE_IDX, pageIdx: newPageIdx });
}
