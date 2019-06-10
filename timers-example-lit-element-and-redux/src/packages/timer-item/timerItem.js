import {LitElement, html} from 'lit-element';

export default class TimerItem extends LitElement {

    static get properties() {
        return {
            id: {
                type: Number
            },
            name: {},
            time: {
                type: Number
            },
            state: {}
        };
    }

    render() {
        return html`<style>                
                .item {
                    display: flex;
                    flex-direction: column;
                    width: 8rem;
                    background-color: bisque;
                }
                .item .name,.time,.actions {
                    text-align: center;
                    margin: 1rem 0rem 0rem;
                }
                .item .actions {
                    display: flex;
                    justify-content: space-between;
                }
                .pauseOrResume.hide {
                    display: none;
                }
            </style>
            <div class="item" id="${this.id}">
                <h3 class="name">${this.name}</h3>
                <div class="time">${this._formatTime(this.time, this.state)}</div>
                <div class="actions">
                    <button class="delete" @click="${(e) => this._onDeleteClick(this.id)}">Delete</button>
                    <button class="pauseOrResume ${this.state === 'FINISH' ? 'hide' : 'show'}" 
                            @click="${(e) => this._onPauseOrResumeClick(this.id)}">${this._getLabel(this.state) }</button>                    
                </div>
            </div>`
    }

    _getLabel(state) {
        return state === 'ACTIVE' ? 'Pause' : 'Resume';
    } 

    _formatTime(time, state) {
        let label = 'Finish!';
        if (state != 'FINISH') {
            const hours = parseInt(time / 3600),
            mins = parseInt(time % 3600 / 60),
            secs = parseInt(time % 3600 % 60);
            label = hours + 'h ' + mins + 'm ' + secs + 's';
        }
        return label;
    }    

    _onDeleteClick(id) {
        this.dispatchEvent(new CustomEvent('deletetimer', {
            detail: {
              id: id,
            },
            bubbles: true,
            composed: true
        }));
    }

    _onPauseOrResumeClick(id) {
        this.dispatchEvent(new CustomEvent('pauseorresumetimer', {
            detail: {
              id: id,
            },
            bubbles: true,
            composed: true
        }));   
    }
}