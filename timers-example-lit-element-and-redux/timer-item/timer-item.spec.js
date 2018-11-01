import './timer-item';

describe('timer-item', () => {
    let element;
    let sandbox;

    before(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    beforeEach(() => {
        element = fixture('timer-item');      
    });

    describe('when state is ACTIVE', function() {
        it('should display delete and pause buttons', function(done) {
            element.setAttribute('state', 'ACTIVE');
            flush(function() {
                expect(element.shadowRoot.querySelector('.item').id).to.equal('1');
                expect(element.shadowRoot.querySelector('.name').innerText).to.equal('Test');
                expect(element.shadowRoot.querySelector('.time').innerText).to.equal('1h 30m 50s');
                expect(element.shadowRoot.querySelector('.delete').innerText).to.equal('Delete');
                expect(element.shadowRoot.querySelector('.pauseOrResume').innerText).to.equal('Pause');
                done();
            });
        });
    });

    describe('when state is PAUSED', function() {
        it('should display delete and resume buttons', function(done) {
            element.setAttribute('state', 'PAUSED');
            flush(function() {
                expect(element.shadowRoot.querySelector('.delete').innerText).to.equal('Delete');
                expect(element.shadowRoot.querySelector('.pauseOrResume').innerText).to.equal('Resume');
                done();
            });
        });
    });

    describe('when state is FINISH', function() {
        it('should display only delete button', function(done) {
            element.setAttribute('state', 'FINISH');
            flush(function() {
                expect(element.shadowRoot.querySelector('.time').innerText).to.equal('Finish!');
                expect(element.shadowRoot.querySelector('.delete').innerText).to.equal('Delete');
                expect(element.shadowRoot.querySelector('.pauseOrResume').classList.contains('hide')).to.be.true;
                done();
            });
        });
    });                

    describe('when click on delete button', function() {
        it('should fire a deleteClick event', function(done){
            flush(function() {
                let spy = sandbox.spy(element, '_onDeleteClick');
                element.addEventListener('deletetimer', function(evt) {
                    expect(evt.detail.id).to.be.equal(1);
                    expect(spy.calledOnce).to.be.true;
                    expect(spy.calledWith(1)).to.be.true;
                    done();
                });
                element.shadowRoot.querySelector('.delete').click();                            
            });
        });
    });

    describe('when click on pause or resume button', function() {
        it('should fire a pauseorresumetimer event', function(done){
            flush(function() {
                let spy = sandbox.spy(element, '_onPauseOrResumeClick');
                element.addEventListener('pauseorresumetimer', function(evt) {
                    expect(evt.detail.id).to.be.equal(1);
                    expect(spy.calledOnce).to.be.true;
                    expect(spy.calledWith(1)).to.be.true;
                    done();
                });
                element.shadowRoot.querySelector('.pauseOrResume').click();
            });
        });
    });

});
