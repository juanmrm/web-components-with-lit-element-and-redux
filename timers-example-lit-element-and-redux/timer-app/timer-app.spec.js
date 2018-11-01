import './timer-app';
import { dispatchCustomEvent } from '../test/dataHelper'

describe('timer-app', () => {
    let sandbox;
    let element;
    let timerNewForm;
    let timerList;
    let timersPayload;

    before(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    beforeEach(async() => {

        // TODO: Restore Store Initial State using another action like RESET ?


        element = await fixture('timer-app');
        // TODO: not the same behaviour as in LionTest, need to to flush here in order to be able to retrieve elements
        flush(function() {
            timerNewForm = element.shadowRoot.querySelector('timer-new-form');
            timerList = element.shadowRoot.querySelector('timer-list');
        });
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

    describe('when there are no timers', function() {
        it('should display the timer-new-form and the timer-list without timers', function() {            
            expect(timerNewForm).not.to.be.undefined;
            expect(timerList).not.to.be.undefined;
            expect(timerList.shadowRoot.querySelectorAll('timer-item')).to.be.empty;
        });
    });

    describe('when a new timer event is fired', function() {
        it('should create and display the timer', function(done) {
            let spy = sandbox.spy(element, '_addNewTimer');
            dispatchCustomEvent(timerNewForm, 'newtimer', timersPayload[0]);
            setTimeout(() => {     
                expect(spy.calledOnce).to.be.true;
                expect(element.timers).to.have.lengthOf(1);
                let timers = timerList.shadowRoot.querySelectorAll('timer-item');
                expect(timers).to.have.lengthOf(1);
                expect(timers[0].id).to.be.equal(timersPayload[0].id);
                expect(timers[0].name).to.be.equal(timersPayload[0].name);
                expect(timers[0].time).to.be.equal(timersPayload[0].time);
                expect(timers[0].state).to.be.equal(timersPayload[0].state);
                done();
            }, 25);
        });
    });

    describe('when there are timers available', function() {
        it('should update their status every second', function(done) {
            dispatchCustomEvent(timerNewForm, 'newtimer', timersPayload[0]);
            dispatchCustomEvent(timerNewForm, 'newtimer', timersPayload[1]);
            setTimeout(() => {     
                expect(element.timers).to.have.lengthOf(2);                
                expect(element.timers[0].time).to.be.equal(0);
                expect(element.timers[0].state).to.be.equal('FINISH');
                expect(element.timers[1].time).to.be.above(0);
                expect(element.timers[1].state).to.be.equal('ACTIVE');
                done();
            }, 1100);            
        });
    });

    describe('when a deletetimer event is fired on a timer item', function() {
        it('should delete the corresponding timer', function(done) {
            let spyDelete = sandbox.spy(element, '_deteleTimer');
            dispatchCustomEvent(timerNewForm, 'newtimer', timersPayload[0]);
            dispatchCustomEvent(timerNewForm, 'newtimer', timersPayload[1]);
            dispatchCustomEvent(timerList, 'deletetimer', { id: timersPayload[0].id})            
            setTimeout(() => {     
                expect(spyDelete.calledOnce).to.be.true;
                expect(element.timers).to.have.lengthOf(1);                
                done();
            }, 50);  
        });
    });

    describe('when a pauseorresumetimer event is fired on a timer item', function() {
        it('should pause / resume the corresponding timer', function(done) {
            let spyPause = sandbox.spy(element, '_pauseOrResumeTimer');
            dispatchCustomEvent(timerNewForm, 'newtimer', timersPayload[0]);
            dispatchCustomEvent(timerList, 'pauseorresumetimer', { id: timersPayload[0].id});
            setTimeout(() => {     
                expect(spyPause.calledOnce).to.be.true;                
                expect(element.timers).to.have.lengthOf(1);
                expect(element.timers[0].state).to.be.equal('PAUSED');      
                done();
            }, 50);  
        });
    });
});
