// Import redux store logic
import { createStore } from 'redux';

// Define the initial state
import initialState from './state.js';

// Import main app reducer
import { timerAppReducer } from './reducer.js';

// Create and export store so it can be imported and shared by app elements
export const store = createStore(timerAppReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
