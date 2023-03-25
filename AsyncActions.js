const redux = require('redux');
const createStore = redux.createStore;
// const combineReducers = redux.combineReducers;
// const reduxLogger = require('redux-logger');
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
// const logger = reduxLogger.createLogger();

const initState = {
  loading: false,
  users: [],
  error: '',
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  }
}

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  }
}

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  }
}

const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest)
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        const users = res.data
        dispatch(fetchUsersSuccess(users))
      })
      .catch((err) => {
        const errorMsg = err.message
        dispatch(fetchUsersFailure(errorMsg))
      })
  }
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: '',
      }
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      }
    default:
      return state
  }
}

const store = createStore(userReducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log('Updated state', store.getState()));
store.dispatch(fetchUsers())
