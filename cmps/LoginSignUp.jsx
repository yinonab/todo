import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { todoService } from '../services/todo.service.js' // Import todoService
import { SET_TODOS } from '../store/reducers/todo.reducer.js'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { login,signup } from '../store/actions/user.action.js'
const { useState } = React
const { useSelector, useDispatch } = ReactRedux

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

export function LoginSignUp({ onSetUser }) {
    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    // Use useDispatch to get the dispatch function from Redux
    const dispatch = useDispatch();

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        if (isSignupState) {
            signup(credentials)
                .then((user) => {
                    showSuccessMsg(`Welcome ${user.fullname}`)
                })
                .catch(err => {
                    showErrorMsg('Cannot signup')
                })
        } else {
            login(credentials)
                .then((user) => {
                    console.log('user:', user)
                    showSuccessMsg(`Hi again ${user.fullname}`)
                })
                .catch(err => {
                    showErrorMsg('Cannot login')
                })
        }
    }
    

    function onToggleSignupState() {
        setIsSignupState(isSignupState => !isSignupState)
    }

    const { username, password, fullname } = credentials

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={onSubmit}>
                <input
                    className="login-input"
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleCredentialsChange}
                    required
                    autoFocus
                />

                <input
                    className="login-input"
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleCredentialsChange}
                    required
                />

                {isSignupState && (
                    <input
                        className="login-input"
                        type="text"
                        name="fullname"
                        value={fullname}
                        placeholder="Full name"
                        onChange={handleCredentialsChange}
                        required
                    />
                )}

                <button className="login-button">{isSignupState ? 'Signup' : 'Login'}</button>
            </form>

            <div className="btns">
                <a className="toggle-signup-link" href="#" onClick={onToggleSignupState}>
                    {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
                </a>
            </div>
        </div>
    )
}
