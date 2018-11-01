import './timer-new-form';
import { dispatchCustomEvent } from '../test/dataHelper'

describe('timer-new-form', () => {
    let element;
    let timernameInput;
    let timertimeInput;
    let createButton;
    let sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    beforeEach(async() => {
        element = await fixture('timer-new-form');
        // TODO: not the same behaviour as in LionTest, need to to flush
        flush(function() {
            timernameInput = element.shadowRoot.getElementById('timername');
            timertimeInput = element.shadowRoot.getElementById('timertime');
            createButton = element.shadowRoot.getElementById('createBtn');    
        });        
    });

    describe('when timername and timertime inputs does not have value', function() {
        it('should display Create Timer button disabled', function() {
            // let timernameInput = element.shadowRoot.getElementById('timername');
            // let timertimeInput = element.shadowRoot.getElementById('timertime');
            // let createButton = element.shadowRoot.getElementById('createBtn');
            expect(timernameInput.value).to.be.empty;
            expect(timertimeInput.value).to.be.empty;
            expect(createButton.disabled).to.be.true;
        });
    });

    describe('when timername and timertime inputs change to a valid value', function() {
        it('should display Create Timer button enabled', function(done) {
            // let timernameInput = element.shadowRoot.getElementById('timername');
            // let timertimeInput = element.shadowRoot.getElementById('timertime');
            // let createButton = element.shadowRoot.getElementById('createBtn');
            let spy = sandbox.spy(element, '_updateCreateBtnState');
            timernameInput.value = 'Test';
            dispatchCustomEvent(timernameInput, 'change');
            timertimeInput.value = 60;
            dispatchCustomEvent(timertimeInput, 'change');
            setTimeout(() => {
                expect(createButton.disabled).to.be.false;
                expect(spy.calledTwice).to.be.true;
                done();
            }, 30);            
        });
    });

    describe('when click on Create timer button', function() {
        it('should fire a newtimer event',  function(done) {
            // let timernameInput = element.shadowRoot.getElementById('timername');
            // let timertimeInput = element.shadowRoot.getElementById('timertime');
            // let createButton = element.shadowRoot.getElementById('createBtn');
            let spy = sandbox.spy(element, '_createNewTimer');
            timernameInput.value = 'Test';
            timertimeInput.value = 60;
            dispatchCustomEvent(timernameInput, 'change');
            dispatchCustomEvent(timertimeInput, 'change');
            element.addEventListener('newtimer', function(evt) {
                expect(evt.detail.id).to.be.equal(element.timerId);
                expect(evt.detail.name).to.be.equal(element._timername.value);
                expect(evt.detail.time).to.be.equal(element._timertime.value);
                expect(evt.detail.state).to.be.equal('ACTIVE');
                expect(spy.calledOnce).to.be.true;
                done();
            });
            element.shadowRoot.getElementById('createBtn').click();
        });
    });
});
