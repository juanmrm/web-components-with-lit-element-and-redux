import '../timer-list.js';
import { fixture, nextFrame } from '@open-wc/testing-helpers';

describe('timer-list', () => {
    let element;

    beforeEach(async () => {
        element = await fixture('<timer-list></timer-list>');
    });

    describe('when there are no timers', () =>  {
        it('should display an empty list', async () => {
            element.timers = [];
            await nextFrame();
            expect(element.shadowRoot.querySelectorAll('timer-item')).to.be.empty;
        });
    });

    describe('when there are available timers', () =>  {
        it('should display a list of timers', async () => {
            const timers = [{
                id: 1,
                name: 'Test1',
                time: 60,
                state: 'ACTIVE'
            }, {
                id: 2,
                name: 'Test2',
                time: 60,
                state: 'ACTIVE'
            }];
            element.timers = timers;
            await nextFrame();
            const nodes = element.shadowRoot.querySelectorAll('timer-item');
            expect(nodes).to.have.lengthOf(2);
            for (let i = 0; i < nodes.length; i++) {
                const timer = nodes[i];
                expect(timer.id).to.be.equal(timers[i].id);
                expect(timer.name).to.be.equal(timers[i].name);
                expect(timer.time).to.be.equal(timers[i].time);
                expect(timer.state).to.be.equal(timers[i].state);
            }            
        });
    });

});
