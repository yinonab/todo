



export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODOS = 'REMOVE_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const FILTER_TODO = 'FILTER_TODO'
export const CLEAR_TODOS = 'CLEAR_TODOS'
export const SET_PAGE_IDX = 'SET_PAGE_IDX';


const initialState = {
    todos: [],
    filterBy: { txt: '', isDone: undefined, pageIdx: 0 }, // Add pageIdx here
}

export function todoReducer(state = initialState, action={}) {
    let todos
    switch (action.type) {
        case SET_TODOS:
    return { ...state, todos: action.todos }

        case REMOVE_TODOS:
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }

        case ADD_TODO:
            todos = [action.todo, ...state.todos]
            return { ...state, todos }

        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }

        case FILTER_TODO:
            return { ...state, filterBy: action.filterBy }

        case CLEAR_TODOS:
            return { ...state, todos: [] };

            case SET_PAGE_IDX:
                return { ...state, filterBy: { ...state.filterBy, pageIdx: action.pageIdx } };
            



        default:
            return state
    }
}