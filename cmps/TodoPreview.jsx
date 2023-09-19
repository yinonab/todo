export function TodoPreview({ todo, todos, onRemoveTodo, onEditTodo, onToggleIsDone }) {
    if (!todo) return <div>Loading...</div>

    return (
        <article className={` todo-card todo-preview ${todo.isDone ? 'completed' : ''}`}>
            <h1>To-Do Item 📒</h1>
            <p><strong>Task:</strong> <span className={`insideP ${todo.isDone ? 'completed-text' : ''}`}>{todo.txt}</span></p>
            <p><strong>Created At:</strong> <span className="insideP">{todo.createdAt}</span></p>
            <p><strong>Status:</strong> {todo.isDone ? <span className="completed">Completed</span> : <span className="incomplete">Incomplete</span>}</p>
            <div className="todo-buttons">
                <button className="remove-button" onClick={() => onRemoveTodo(todo._id)}>
                    <i className="fa-regular fa-trash-can"></i>
                </button>
                <button className="edit-button" onClick={() => onEditTodo(todo)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button className="toggle-isDone-button" onClick={() => onToggleIsDone(todo._id)}>
                    {todo.isDone ? <i className="fa-solid fa-file-lines"></i> : <i className="fa-solid fa-check"></i>}
                </button>
            </div>
        </article>
    );
}