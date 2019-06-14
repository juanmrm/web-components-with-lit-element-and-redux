import '../timer-item.js';
import sinon from 'sinon';
import { expect, html, nextFrame, fixture, oneEvent } from '@open-wc/testing';

describe('timer-item', () => {
    let element;

    beforeEach(async () => {
        element = await fixture(html`<timer-item id='1' name='Test' time='5450' state='ACTIVE'></timer-item>`);
    });

    describe('when state is ACTIVE', () => {
        it('should display delete and pause buttons', async () => {
            element.setAttribute('state', 'ACTIVE');
            await nextFrame();
            expect(element.shadowRoot.querySelector('.item').id).to.equal('1');
            expect(element.shadowRoot.querySelector('.name').innerText).to.equal('Test');
            expect(element.shadowRoot.querySelector('.time').innerText).to.equal('1h 30m 50s');
            expect(element.shadowRoot.querySelector('.delete').innerText).to.equal('Delete');
            expect(element.shadowRoot.querySelector('.pauseOrResume').innerText).to.equal('Pause');                   
        });
    });

    describe('when state is PAUSED', () => {
        it('should display delete and resume buttons', async () => {
            element.setAttribute('state', 'PAUSED');
            await nextFrame();
            expect(element.shadowRoot.querySelector('.delete').innerText).to.equal('Delete');
            expect(element.shadowRoot.querySelector('.pauseOrResume').innerText).to.equal('Resume');            
        });
    });

    describe('when state is FINISH', () => {
        it('should display only delete button', async () => {
            element.setAttribute('state', 'FINISH');
            await nextFrame();
            expect(element.shadowRoot.querySelector('.time').innerText).to.equal('Finish!');
            expect(element.shadowRoot.querySelector('.delete').innerText).to.equal('Delete');
            expect(element.shadowRoot.querySelector('.pauseOrResume').classList.contains('hide')).to.be.true;
        });
    });                

    describe('when click on delete button', () => {
        it('should fire a deleteClick event', async () => {
            let spy = sinon.spy(element, '_onDeleteClick');
            setTimeout(() => {
              element.shadowRoot.querySelector('.delete').click();
            });
            const evt = await oneEvent(element, 'deletetimer');
            expect(evt.detail.id).to.be.equal(1);
            expect(spy.calledOnce).to.be.true;
            expect(spy.calledWith(1)).to.be.true;
            spy.restore();
        });
    });

    describe('when click on pause or resume button', () => {
        it('should fire a pauseorresumetimer event', async () => {
            let spy = sinon.spy(element, '_onPauseOrResumeClick');
            setTimeout(() => {
              element.shadowRoot.querySelector('.pauseOrResume').click();
            });
            const evt = await oneEvent(element, 'pauseorresumetimer');
            expect(evt.detail.id).to.be.equal(1);
            expect(spy.calledOnce).to.be.true;
            expect(spy.calledWith(1)).to.be.true;
            spy.restore();
        });
    });

});
