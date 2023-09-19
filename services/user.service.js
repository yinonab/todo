import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
_createUser()


export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    _createUser
}

window.us = userService

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if ( user.password !== password) return
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function updateScore(diff) {
    return userService.getById(getLoggedinUser()._id)
        .then(user => {
            if (user.score + diff < 0) return Promise.reject('No credit')
            user.score += diff
            return storageService.put(STORAGE_KEY, user)

        })
        .then(user => {
            _setLoggedinUser(user)
            return user.score
        })
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function _createUser() {
    let users = storageService.loadFromStorage(STORAGE_KEY)
    if (!users || !users.length) {
        users = [
            {
                _id: "CPfgH",
                username: 'oz',
                password: '1234',
                fullname: 'oz Ho',
                balance: 10000,
                activities: [{ txt: 'Added a Todo', at: 1523873242735 }],
                todos: []
            },
            {
                _id: "OMh2w",
                username: 'yinon',
                password: '1234',
                fullname: 'Yinon Ab',
                balance: 10000,
                activities: [{ txt: 'Added a Todo', at: 1523873242735 }],
                todos: []
            }
        ]
    }
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



