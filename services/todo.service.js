
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todoDB'
const PAGE_SIZE = 3
_createTodos()

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyToDo,
    getDefaultFilter
}

function query() {
    return new Promise((resolve, reject) => {
        try {
            const user = userService.getLoggedinUser()
            if (!user || !user._id) {
                // Handle the case where the user is not logged in or doesn't have an _id
                console.log('User not logged in or missing _id')
                resolve([]) // Resolve with an empty array or handle it as needed
                return
            }
            console.log('Logged-in user:', user)
            const ownerId = user._id
            console.log('ownerId:', ownerId)
            let todos = storageService.loadFromStorage(STORAGE_KEY)
            if (!todos||todos.length === 0) {
                // Handle the case where todos are not an array
                console.log('No todos found in storage')
                resolve([]) // Resolve with an empty array or handle it as needed
                return
            }
            console.log('todos:', todos)
            
            // Filter todos by owner
            const filteredTodos = todos.filter(todo => todo.owner._id === ownerId)
            console.log('Filtered todos:', filteredTodos);
            
            // Resolve the promise with the filtered todos
            resolve(filteredTodos);
        } catch (error) {
            console.error('Error querying todos:', error)
            reject(error)
        }
    });
}


function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
    } else {
        
        const loggedInUser = userService.getLoggedinUser();
        todo.owner = { _id: loggedInUser._id, fullname: loggedInUser.fullname };

        return storageService.post(STORAGE_KEY, todo);
    }
}


function getEmptyToDo() {
    const loggedinUser = userService.getLoggedinUser();
    return {
        createdAt: utilService.getTimeFromStamp(Date.now()),
        isDone: false,
        txt: utilService.makeLorem(),
        owner: { _id: loggedinUser._id, fullname: loggedinUser.fullname }
    }
}

function getDefaultFilter() {
    return { txt: '', isDone: false }
}
function _createTodos() {
    let todos = storageService.loadFromStorage(STORAGE_KEY)
    if (!todos || !todos.length) {
        todos = [
            {
                _id: 'n101',
                createdAt: utilService.getTimeFromStamp(Date.now()),
                type: 'NoteTxt',
                isDone: true,
                txt: "Academy Keep lets you quickly capture what’s on your mind.",
                style: {
                    backgroundColor: '#f0f4c3'
                },
                owner: {
                    _id: "CPfgH",
                    username: 'oz',
                }

            },
            {
                _id: 'n102',
                createdAt: utilService.getTimeFromStamp(Date.now()),
                type: 'NoteTxt',
                isDone: false,
                txt: "A second Todo isDone === false .",
                style: {
                    backgroundColor: '#f0f4c3'
                },
                owner: {
                    _id: "OMh2w",
                    username: 'yinon',
                }

            }
        ]
        storageService.saveToStorage(STORAGE_KEY, todos)
    }
}

