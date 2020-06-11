import {combineReducers} from 'redux'
import listReducer from './listReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'

const rootreducer = combineReducers({
    list: listReducer,
    error: errorReducer,
    auth: authReducer
})

export default rootreducer;