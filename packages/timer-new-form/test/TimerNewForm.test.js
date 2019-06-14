import '../timer-new-form.js';
import { dispatchCustomEvent } from '../../util/dataHelper.js';
import sinon from 'sinon';
import { expect, html, fixture, aTimeout, oneEvent } from '@open-wc/testing';

describe('timer-new-form', () => {
    let element;
    let timernameInput;
    let timertimeInput;
    let createButton;

    beforeEach(async() => {
        element = await fixture(html`<timer-new-form></timer-new-form>`);
        timernameInput = element.shadowRoot.getElementById('timername');
        timertimeInput = element.shadowRoot.getElementById('timertime');
        createButton = element.shadowRoot.getElementById('createBtn');    
    });

    describe('when timername and timertime inputs does not have value', () =>  {
        it('should display Create Timer button disabled', () =>  {
            // let timernameInput = element.shadowRoot.getElementById('timername');
            // let timertimeInput = element.shadowRoot.getElementById('timertime');
            // let createButton = element.shadowRoot.getElementById('createBtn');
            expect(timernameInput.value).to.be.empty;
            expect(timertimeInput.value).to.be.empty;
            expect(createButton.disabled).to.be.true;
        });
    });

    describe('when timername and timertime inputs change to a valid value', () =>  {
        it('should display Create Timer button enabled', async () =>  {
            // let timernameInput = element.shadowRoot.getElementById('timername');
            // let timertimeInput = element.shadowRoot.getElementById('timertime');
            // let createButton = element.shadowRoot.getElementById('createBtn');
            let spy = sinon.spy(element, '_updateCreateBtnState');
            timernameInput.value = 'Test';
            timertimeInput.value = 60;
            dispatchCustomEvent(timernameInput, 'change');
            dispatchCustomEvent(timertimeInput, 'change');
            await aTimeout(50);
            expect(createButton.disabled).to.be.false;
            expect(spy.calledTwice).to.be.true;
            spy.restore();       
        });
    });

    describe('when click on Create timer button', () =>  {
        it('should fire a newtimer event', async () =>  {
            // let timernameInput = element.shadowRoot.getElementById('timername');
            // let timertimeInput = element.shadowRoot.getElementById('timertime');
            // let createButton = element.shadowRoot.getElementById('createBtn');
            let spy = sinon.spy(element, '_createNewTimer');
            timernameInput.value = 'Test';
            timertimeInput.value = 60;
            dispatchCustomEvent(timernameInput, 'change');
            dispatchCustomEvent(timertimeInput, 'change');
            const evt = await oneEvent(element, 'newtimer');
            expect(evt.detail.id).to.be.equal(element.timerId);
            expect(evt.detail.name).to.be.equal(element._timername.value);
            expect(evt.detail.time).to.be.equal(element._timertime.value);
            expect(evt.detail.state).to.be.equal('ACTIVE');
            expect(spy.calledOnce).to.be.true;
            element.shadowRoot.getElementById('createBtn').click();
            spy.restore();
        });
    });
});
