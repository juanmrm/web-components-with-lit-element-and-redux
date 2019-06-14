import {LitElement, html} from 'lit-element';
import '../timer-item/timer-item.js'

export default class TimerList extends LitElement {

    static get properties() {
        return {
            timers: {
                type: Array,
            },
        };
    }

    constructor() {
      super();
      this.timers = [];
    }

    render() {

        const timersTemplate = this.timers.map(t => html`
          <timer-item id=${t.id} name=${t.name} time=${t.time} state=${t.state}></timer-item>`);

        return html`<style>
            .list {
                width: 50%;
                display: flex;                                
            }
            .list timer-item {
                margin: 1rem;
            }
        </style>
        <div class="list">${timersTemplate}</div>`
    }
}