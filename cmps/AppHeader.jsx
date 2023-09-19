import { userService } from "../services/user.service.js"
import { LoginSignUp } from "./LoginSignUp.jsx"
import { SET_USER} from "../store/reducers/user.reducer.js"
import { CLEAR_TODOS } from "../store/reducers/todo.reducer.js"
import { UserMsg } from "./UserMsg.jsx"
import { logout } from "../store/actions/user.action.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useSelector, useDispatch, } = ReactRedux


export function AppHeader() {
    const dispatch = useDispatch()
    // TODO: get from storeState
    // const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
    }
    

    function onLogout() {
        // Check if there is a logged-in user before accessing their _id
        const loggedInUser = userService.getLoggedinUser();
        if (loggedInUser && loggedInUser._id) {
           logout()
           .then((user) => {
            showSuccessMsg(`LogOut Successfully`)
        })
        .catch(err => {
            showErrorMsg('Cannot LogOut')
        })
        } else {
            // Handle the case where there is no logged-in user or _id doesn't exist (optional)
            console.log('No logged-in user to log out');
        }
    }
    
    
    
    
    return (
        <header className="app-header">
            
            <nav>
                {/* <NavLink to="/car">Cars</NavLink> | */}
                {/* <NavLink to="/about">About</NavLink> | */}
            </nav>
            <h3 className="app-title">Todo App</h3>
            {user && <section className="user-info">
                <p>Hello  {user.fullname} </p>
                <button className="logout-button" onClick={onLogout}>Logout</button>
            </section>}
            {!user && <section className="user-info">
                <LoginSignUp onSetUser={onSetUser} />
            </section>}
        </header>
    )
}
