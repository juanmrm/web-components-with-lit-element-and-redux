import './timer-list';

describe('timer-list', () => {
    let element;
    let sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    beforeEach(() => {
        element = fixture('timer-list');
    });

    describe('when there are no timers', function() {
        it('should display an empty list', function(done) {
            element.timers = [];
            flush(function() {
                expect(element.shadowRoot.querySelectorAll('timer-item')).to.be.empty;
                done();
            });
        });
    });

    describe('when there are available timers', function() {
        it('should display a list of timers', function(done) {
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
            flush(function() {
                const nodes = element.shadowRoot.querySelectorAll('timer-item');
                expect(nodes).to.have.lengthOf(2);
                for (let i = 0; i < nodes.length; i++) {
                    const timer = nodes[i];
                    expect(timer.id).to.be.equal(timers[i].id);
                    expect(timer.name).to.be.equal(timers[i].name);
                    expect(timer.time).to.be.equal(timers[i].time);
                    expect(timer.state).to.be.equal(timers[i].state);
                }
                done();
            });
        });
    });

});
