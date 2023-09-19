import { TodoPreview } from "./TodoPreview.jsx"
const { useEffect, useState } = React


export function TodoList({ todos, onRemoveTodo, onEditTodo, todosToShow, filterBy, onToggleIsDone }) {
    const [doneCount, setDoneCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);

    useEffect(() => {
        const doneTodos = todos.filter(todo => todo.isDone);
        setDoneCount(doneTodos.length);
        setActiveCount(todos.length - doneTodos.length);
    }, [todos]);


    return (
        <div className="todo-list-container">
            <div className="todo-counts">
                <span className="count-label">Done:</span> {' ' + doneCount + ' / '}
                <span className="count-label">Active:</span> {' ' + activeCount + ' / '}
                <span className="count-label">Total:</span> {' ' + todos.length + '  '}
            </div>
            {todos.length === 0 ? (
                <h1>No Todos To Show...</h1>
            ) : (
                <ul className="todo-list">
                    {todosToShow(filterBy, todos).map(todo => (
                        <li className="todo-item" key={todo._id}>
                            <TodoPreview
                                todo={todo}
                                todos={todos}
                                // onSetFilterBy={onSetFilterBy}
                                onRemoveTodo={onRemoveTodo}
                                onEditTodo={onEditTodo}
                                todosToShow={todosToShow}
                                filterBy={filterBy}
                                onToggleIsDone={onToggleIsDone}
                            />
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

