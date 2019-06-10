import {LitElement, html} from 'lit-element';

export default class TimerNewForm extends LitElement {

    render() {
        return html`
            <style>
                .new-timer-form {
                    width: 32rem;
                    display: flex;
                    justify-content: space-between;                    
                }
                .new-timer-form #createBtn {
                    background-color: lightblue;
                }
            </style>
            <div class="new-timer-form">
                <input id="timername" placeholder="Enter name" @change="${(e) => this._updateCreateBtnState()}">
                <input id="timertime" type="number" placeholder="Enter time" @change="${(e) => this._updateCreateBtnState()}">
                <button id="createBtn" disabled @click="${(e) => this._createNewTimer()}"">Create Timer</button>
            </div>`
    }

    _updateCreateBtnState() {
        const enabled = !!this._timername.value && !!this._timertime.value;
        this._createBtn.disabled = !enabled;
    }

    _createNewTimer() {
        // Dispatch an event with the details about the new timer
        this.dispatchEvent(new CustomEvent('newtimer', {
            detail: {
              name: this._timername.value,
              time: this._timertime.value,
              state: 'ACTIVE'
            },
            bubbles: true,
            composed: true
        }));
    }

/* * * * * * * *
  Lifecycle  */
/*
  connectedCallback() {
      super.connectedCallback();
      this._timername = this.shadowRoot.querySelector('.new-timer-form #timername');
      this._timertime = this.shadowRoot.querySelector('.new-timer-form #timertime');
      this._createBtn = this.shadowRoot.querySelector('.new-timer-form #createBtn');
  }
*/    

  firstUpdated(changedProperties) {
    this._timername = this.shadowRoot.getElementById('timername');
    this._timertime = this.shadowRoot.getElementById('timertime');
    this._createBtn = this.shadowRoot.getElementById('createBtn');
  }

}
