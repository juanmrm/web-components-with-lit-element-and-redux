import {LitElement, html} from 'lit-element';
import '../timer-new-form/timer-new-form.js';
import '../timer-list/timer-list.js';

// Access shared state by importing the same Redux store as other elements
import { store } from './store/store';

import { addTimer, deleteTimer, pauseOrResumeTimer, updateTimers } from './store/actions'

export default class TimerApp extends LitElement {

    static get properties() {
        return {
            timers: {
                type: Array,
            },
        };
    }
    
    constructor(){
        super();
        this.timers = store.getState().timers;
        // Subscribe to listen to changes in state
        store.subscribe(() => {            
            this.timers = store.getState().timers;
        });    
        this.intervalID = setInterval(() => store.dispatch(updateTimers()), 1000);
    }

    render() {
        return html`
            <div class="timer-container">
                <timer-new-form @newtimer="${(evt) => this._addNewTimer(evt)}"></timer-new-form>
                <timer-list .timers=${this.timers}               
                            @deletetimer="${(evt) => this._deteleTimer(evt)}"
                            @pauseorresumetimer="${(evt) => this._pauseOrResumeTimer(evt)}">
                </timer-list>
            </div>`
    };

    _addNewTimer(evt) {
        store.dispatch(addTimer(evt.detail));
    }
 
    _deteleTimer(evt) {
        store.dispatch(deleteTimer(evt.detail.id));
    }
    
    _pauseOrResumeTimer(evt) {
        store.dispatch(pauseOrResumeTimer(evt.detail.id));
    }

    /*
        Lifecycle hooks
    */
    disconnectedCallback() {
        super.disconnectedCallback();
        clearInterval(this.intervalID);
    }

}