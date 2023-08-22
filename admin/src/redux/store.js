import {createStore, combineReducers, applyMiddleware} from 'redux'
import adminReducer from './reducers/admin'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducers = combineReducers({
    admin: adminReducer,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store

