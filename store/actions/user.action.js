import { todoService } from "../../services/todo.service.js"
import { userService } from "../../services/user.service.js"
import { CLEAR_TODOS, SET_PAGE_IDX, SET_TODOS } from "../reducers/todo.reducer.js"
import { SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"






export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            return todoService.query().then((todos) => {
                store.dispatch({ type: SET_USER, user })
                store.dispatch({ type: SET_TODOS, todos })
                return user
            })
        })
        .catch(err => {
            console.log('user actions -> Cannot login', err)
            throw err
        })
}


export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}


export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: CLEAR_TODOS }); // Use the correct action type here
            store.dispatch({ type: SET_USER, user: null })
            store.dispatch({ type: SET_PAGE_IDX, pageIdx: 0 });
        })
        .catch(err => {
            console.error('user actions -> Cannot logout:', err)
            throw err
        })
}