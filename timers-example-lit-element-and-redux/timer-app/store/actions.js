/* Define action types */
export const ADD_TIMER = 'ADD_TIMER';
export const DELETE_TIMER = 'DELETE_TIMER';
export const PAUSE_OR_RESUME_TIMER = 'PAUSE_OR_RESUME_TIMER';
export const UPDATE_TIMERS = 'UPDATE_TIMERS';

/* Define action creators */
export function addTimer(timer){
  return { type: ADD_TIMER, timer };
};

export function deleteTimer(id){
    return { type: DELETE_TIMER, id };
};

export function pauseOrResumeTimer(id){
    return { type: PAUSE_OR_RESUME_TIMER, id };
};

export function updateTimers(){
    return { type: UPDATE_TIMERS};
};
