import React, { useReducer } from 'react';
import { login } from './Login';
const loginReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case 'success':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };
    case 'error':
      return {
        ...state,
        isLoading: false,
        isLoggingIn: false,
        username: '',
        password: '',
        error: 'Something went wrongs please!!',
      };
    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        password: '',
        error: '',
      };
    case 'field':
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    default:
      return state;
  }
};
const initialState = {
  username: '',
  password: '',
  error: '',
  isLoading: false,
  isLoggedIn: false,
};

const App = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, error, isLoading, isLoggedIn } = state;

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'login' });

    try {
      await login({ username, password });
      dispatch({ type: 'success' });
    } catch {
      dispatch({ type: 'error' });
    }
  };

  return (
    <div>
      <div>
        {isLoggedIn ? (
          <>
            <h1>Welcome, Muhoza</h1>
            <button onClick={() => dispatch({ type: 'logout' })}>Logout</button>
          </>
        ) : (
          <form onSubmit={onSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isLoggedIn && <span>Logged in</span>}
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  fieldName: e.target.name,
                  payload: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  fieldName: e.target.name,
                  payload: e.target.value,
                })
              }
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Loging in...' : 'Log in'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default App;
