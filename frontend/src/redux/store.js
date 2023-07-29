import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notification'
import userReducer from './reducers/user'
import adminReducer from './reducers/admin'

const reducers = combineReducers({
    notification: notificationReducer,
    user: userReducer,
    admin: adminReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store