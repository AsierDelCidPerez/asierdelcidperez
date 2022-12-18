import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notification'
import userReducer from './reducers/user'

const reducers = combineReducers({
    notification: notificationReducer,
    user: userReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store