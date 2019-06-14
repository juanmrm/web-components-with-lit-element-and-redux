import '../timer-app.js';
import { dispatchCustomEvent } from '../../util/dataHelper.js';
import sinon from 'sinon';
import { expect, html, fixture, aTimeout } from '@open-wc/testing';

// Access shared state by importing the same Redux store as other elements
import { store } from '../store/store';
import { resetState } from '../store/actions';

describe('timer-app', () => {
    let element;
    let timerNewForm;
    let timerList;
    let timersPayload;

    beforeEach(async() => {

        // TODO: Restore Store initial state using RESET action or another way?
        store.dispatch(resetState());

        element = await fixture(html`<timer-app></timer-app>`);
        timerNewForm = element.shadowRoot.querySelector('timer-new-form');
        timerList = element.shadowRoot.querySelector('timer-list');
        timersPayload = [
            { 
                id: 1,
                name: 'Test1',
                time: 1,
                state: 'ACTIVE'
            },
            { 
                id: 2,
                name: 'Test2',
                time: 100,
                state: 'ACTIVE'
            }
        ];
    });

    describe('when there are no timers', () => {
        it('should display the timer-new-form and the timer-list without timers', () => {            
            expect(timerNewForm).not.to.be.undefined;
            expect(timerList).not.to.be.undefined;
            expect(timerList.shadowRoot.querySelectorAll('timer-item')).to.be.empty;
        });
    });

    describe('when a new timer event is fired', () => {
        it('should create and display the timer', async () => {
            let spy = sinon.spy(element, '_addNewTimer');
            dispatchCustomEvent(timerNewForm, 'newtimer', timersPayload[0]);
            await aTimeout(25);
            expect(spy.calledOnce).to.be.true;
            expect(element.timers).to.have.lengthOf(1);
            let timers = timerList.shadowRoot.querySelectorAll('timer-item');
            expect(timers).to.have.lengthOf(1);
            expect(timers[0].id).to.be.equal(timersPayload[0].id);
            expect(timers[0].name).to.be.equal(timersPayload[0].name);
            expect(timers[0].time).to.be.equal(timersPayload[0].time);
            expect(timers[0].state).to.be.equal(timersPayload[0].state);                
            spy.restore();
        });
    });

    describe('when there are timers available', () =>  {
        it('should update their status every second', async () => {
            dispatchCustomEvent(timerNewForm, 'newtimer', timersPayload[0]);
            dispatchCustomEvent(timerNewForm, 'newtimer', timersPayload[1]);
            await aTimeout(1000);
            expect(element.timers).to.have.lengthOf(2);                
            expect(element.timers[0].time).to.be.equal(0);
            expect(element.timers[0].state).to.be.equal('FINISH');
            expect(element.timers[1].time).to.be.above(0);
            expect(element.timers[1].state).to.be.equal('ACTIVE');            
        });
    });

    describe('when a deletetimer event is fired on a timer item', () => {
        it('should delete the corresponding timer', async () => {
            let spyDelete = sinon.spy(element, '_deteleTimer');
            dispatchCustomEvent(timerNewForm, 'newtimer', timersPayload[0]);
            dispatchCustomEvent(timerNewForm, 'newtimer', timersPayload[1]);
            dispatchCustomEvent(timerList, 'deletetimer', { id: timersPayload[0].id})            
            await aTimeout(25);
            expect(spyDelete.calledOnce).to.be.true;
            expect(element.timers).to.have.lengthOf(1);                
            spyDelete.restore();
        });
    });

    describe('when a pauseorresumetimer event is fired on a timer item', () => {
        it('should pause / resume the corresponding timer', async () => {
            let spyPause = sinon.spy(element, '_pauseOrResumeTimer');
            dispatchCustomEvent(timerNewForm, 'newtimer', timersPayload[0]);
            dispatchCustomEvent(timerList, 'pauseorresumetimer', { id: timersPayload[0].id});
            await aTimeout(25);
            expect(spyPause.calledOnce).to.be.true;                
            expect(element.timers).to.have.lengthOf(1);
            expect(element.timers[0].state).to.be.equal('PAUSED');      
            spyPause.restore();
        });
    });
});
