import { userService } from "../../services/user.service.js"

export const SET_USER = 'SET_USER'

const initialState = {
    loggedinUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action={}) {
    let todos
    switch (action.type) {
       
                // User
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        default:
            return state
    }
}
