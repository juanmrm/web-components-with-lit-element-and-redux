import { initialState } from './state';

// Import actions
import { 
  ADD_TIMER,
  DELETE_TIMER,
  PAUSE_OR_RESUME_TIMER,
  UPDATE_TIMERS
} from './actions.js';

// Create default action
export const DEFAULT_ACTION = '';

/**
 * Main reducer.
*/
export function timerAppReducer(state = initialState, action = DEFAULT_ACTION) {
  switch (action.type) {
    case ADD_TIMER: {
        state.id += 1;
        return { ...state, timers: [...state.timers, {...action.timer, id: state.id }] };
        //Object.assign({}, { timers: [...state.timers, action.timer]});
    }
    case DELETE_TIMER: {
        const ind = state.timers.findIndex((t) => t.id === action.id);
        state.timers.splice(ind, 1);
        return { ...state, timers: [...state.timers] };
    }
    case PAUSE_OR_RESUME_TIMER: {
        const ind = state.timers.findIndex((t) => t.id === action.id);
        state.timers[ind].state === 'ACTIVE' ? state.timers[ind].state = 'PAUSED' : state.timers[ind].state = 'ACTIVE';
        return { ...state, timers: [...state.timers] };
    }
    case UPDATE_TIMERS: {
        state.timers.forEach(timer => {
            if (timer.state === 'ACTIVE') {
                timer.time -= 1;
            }
            if (timer.time <= 0) {
                timer.state = 'FINISH';
            }
        })
        return { ...state, timers: [...state.timers] };
    }

    // If we don't know what is going on, return the same state
    default: {
      return state;
    }
  }
};
