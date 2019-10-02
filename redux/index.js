import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer'

// Like above, only showing off compose this time. Reminder you might not want this in prod.
// const composeEnhancers = typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined' ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//         serialize: {
//             immutable: Immutable
//         }
//     }) : compose;
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(reducer,
    compose(
        applyMiddleware(thunk)
    )
)


export default store;