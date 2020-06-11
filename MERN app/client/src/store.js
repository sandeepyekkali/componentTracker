import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


import rootreducer from './reducers/rootreducer'
//import listReducer from './reducers/listReducer'

const middleware = [thunk]

const store = createStore(rootreducer,compose(
    applyMiddleware(...middleware),
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));



export default store;