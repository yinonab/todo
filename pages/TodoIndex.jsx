import { todoService } from "../services/todo.service.js"
import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { UserMsg } from "../cmps/UserMsg.jsx"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { SET_TODOS, ADD_TODO, UPDATE_TODO, FILTER_TODO, SET_PAGE_IDX } from "../store/reducers/todo.reducer.js"
import { query, removeTodo, saveTodo, setFilterBy, goToPage } from "../store/actions/todo.action.js"

// import { SET_TODOS, REMOVE_TODOS, ADD_TODO, UPDATE_TODO, FILTER_TODO } 

const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const PAGE_SIZE = 3




export function TodoIndex() {
    const dispatch = useDispatch()
    const { todos } = useSelector(storeState => storeState.todoModule)
    const { filterBy } = useSelector(storeState => storeState.todoModule)
    console.log('todos', todos);




    useEffect(() => {
        query(filterBy)
    }, [filterBy])
    const totalPages = Math.ceil(todos.length / PAGE_SIZE)
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)


    function todosToShow(filterBy, todos) {
        let filteredTodos = [...todos]

        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            filteredTodos = filteredTodos.filter(todo => regex.test(todo.txt));
        }

        if (filterBy.isDone !== undefined) {
            // Filter based on isDone only if it's defined (true or false)
            filteredTodos = filteredTodos.filter(todo => todo.isDone === filterBy.isDone);
        }

        // Calculate the start and end index for pagination
        const startIdx = filterBy.pageIdx * PAGE_SIZE;
        const endIdx = startIdx + PAGE_SIZE;

        // Slice the filtered todos based on pagination
        return filteredTodos.slice(startIdx, endIdx);
    }


    function onGoToPage(pageNumber) {
        goToPage(pageNumber)
    }


    function onSetFilterBy(ev) {
        setFilterBy(ev, filterBy)
    }
    function onChangePageIdx(diff) {
        const newPageIdx = filterBy.pageIdx + diff;
        console.log('newPageIdx:', newPageIdx)

        if (newPageIdx >= 0 && newPageIdx <= Math.ceil(todos.length / PAGE_SIZE) - 1) {
            // Dispatch an action to update the page index in the store
            dispatch({ type: SET_PAGE_IDX, pageIdx: newPageIdx });

        }
    }



    function onRemoveTodo(todoId) {
        // TODO: move to a function and use dispatch
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
            })
            .catch(err => {
                console.log('Cannot remove todo', err)
                showErrorMsg('Cannot remove todo')
            })
    }


    function onAddTodo() {
        const todoToSave = todoService.getEmptyToDo()

        // TODO: move to a function and use dispatch
        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)

            })
            .catch(err => {
                console.log('Cannot add todo', err)
                showErrorMsg('Cannot add todo')
            })
    }

    function onEditTodo(todo) {
        const txt = prompt('New txt?')
        const todoToSave = { ...todo, txt }

        // TODO: move to a function and use dispatch
        saveTodo(todoToSave)
            .then((savedTodo) => {
                // TODO: use dispatch
                showSuccessMsg(`Todo updated txt to: $${savedTodo.txt}`)
            })
            .catch(err => {
                console.log('Cannot update todo', err)
                showErrorMsg('Cannot update todo')
            })
    }

    function onToggleIsDone(todoId) {
        const todoToToggle = todos.find(todo => todo._id === todoId);
        if (!todoToToggle) return;
        const updatedTodo = { ...todoToToggle, isDone: !todoToToggle.isDone };

        saveTodo(updatedTodo)
            .then((savedTodo) => {
                showSuccessMsg(`Todo ${savedTodo.isDone ? 'completed' : 'marked as incomplete'}`);
            })
            .catch(err => {
                console.log('Cannot toggle todo', err);
                showErrorMsg('Cannot toggle todo');
            });
    }

    //     return (
    //         <div className="app-header">
    //             <UserMsg />
    //             <main>
    //                 <TodoFilter onSetFilterBy={onSetFilterBy} />
    //                 <button className="add-todo-button" onClick={onAddTodo}>Add Todo 📝</button>
    //                 <button className="pagination-button" onClick={() => { onChangePageIdx(1) }}>+</button>
    //                 {filterBy.pageIdx + 1}
    //                 <button className="pagination-button" onClick={() => { onChangePageIdx(-1) }}>-</button>
    //                 <TodoList todos={todos}
    //                     onSetFilterBy={onSetFilterBy}
    //                     onRemoveTodo={onRemoveTodo}
    //                     onEditTodo={onEditTodo}
    //                     todosToShow={todosToShow}
    //                     filterBy={filterBy}
    //                     onToggleIsDone={onToggleIsDone} />
    //             </main>
    //         </div>
    //     )
    // }
    // Inside your component
const MAX_PAGES = 5; // Maximum number of pages to display

return (
  <div className="app-header">
    <UserMsg />
    <main>
      <TodoFilter onSetFilterBy={onSetFilterBy} />
      <button className="add-todo-button" onClick={onAddTodo}>
        Add Todo 📝
      </button>
      <div className="pagination-container">
        <button
          className="page-button"
          onClick={() => onGoToPage(filterBy.pageIdx)}
        >
           ⏪
        </button>
        {pageNumbers.map((pageNumber) => {
          if (
            pageNumber >= filterBy.pageIdx + 1 - Math.floor(MAX_PAGES / 2) &&
            pageNumber <= filterBy.pageIdx + 1 + Math.floor(MAX_PAGES / 2)
          ) {
            return (
              <button
                key={pageNumber}
                className={`page-button ${
                  pageNumber === filterBy.pageIdx + 1 ? 'active' : ''
                }`}
                onClick={() => onGoToPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          }
          return null;
        })}
        <button
          className="page-button"
          onClick={() => onGoToPage(filterBy.pageIdx + 2)}
        >
          ⏩
        </button>
      </div>
      <TodoList
        todos={todos}
        onSetFilterBy={onSetFilterBy}
        onRemoveTodo={onRemoveTodo}
        onEditTodo={onEditTodo}
        todosToShow={todosToShow}
        filterBy={filterBy}
        onToggleIsDone={onToggleIsDone}
      />
    </main>
  </div>
);
    }