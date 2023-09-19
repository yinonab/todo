
const { useSelector } = ReactRedux


import { store } from "../store/store.js"

export function TodoFilter({ onSetFilterBy }) {
    const { filterBy } = useSelector(storeState => storeState.todoModule)

    var currStore = store.getState()
    var currFilterBy = currStore.filterBy
    console.log('filter from store', currFilterBy)

    if (!filterBy) return <div>loading</div>
    const { txt, isDone, } = filterBy
    return (
        <section className="todo-filter">
            <h2>Filter Our Todos</h2>
            <form >

                <div className="filter-group">
                    <label htmlFor="txt">Title: </label>
                    <input value={txt} onChange={onSetFilterBy} type="text" placeholder="By txt" id="txt" name="txt" />
                </div>
                <div className="filter-group">
                    <label htmlFor="todos">FIlter By:</label>
                    <select value={isDone} name="isDone" id="isDone" onChange={onSetFilterBy}>
                        <option value="">All</option>
                        <option value="true">Done</option>
                        <option value="false">Active</option>
                    </select>
                </div>
            </form>
        </section>
    )
}
