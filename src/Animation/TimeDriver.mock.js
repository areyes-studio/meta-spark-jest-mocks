import BoolSignalMock from "../Reactive/BoolSignal.mock";
import EventSourceMock from "../Reactive/EventSource.mock";
import ScalarSignalMock from "../Reactive/ScalarSignal.mock";
import TimeMock from "../Time.mock";

export class TimeDriverMock {
    /**
     * @param {number} durationMilliseconds
     * @param {number} loopCount
     * @param {boolean} mirror
     * @memberof TimeDriverMock
     */
    constructor(durationMilliseconds, loopCount, mirror) {
        this.durationMilliseconds = durationMilliseconds;
        this.loopCount = loopCount;
        this.mirror = mirror;

        this._isRunning = new BoolSignalMock(false);

        this.progress = new ScalarSignalMock(0);
        this._reverse = false;
        this._loop = 0;
        this._updateSubscription = null;

        this._onCompleted = new EventSourceMock();
        this._onAfterIteration = new EventSourceMock();
    }

    start() {
        if (this._isRunning.value) return;

        this._updateSubscription = TimeMock.ms.monitor().subscribe(async (/** @type {{ newValue: number; oldValue: number; }} */ v) => {
            await this._update(v.newValue - v.oldValue);
        })

        this._isRunning.mockUpdate(true);
    }

    stop() {
        if (this._updateSubscription) this._updateSubscription.unsubscribe();

        this._isRunning.mockUpdate(false);
    }

    reset() {
        this.progress.mockUpdate(0)
        this._reverse = false;
        this._loop = 0;
    }

    reverse() {
        this._reverse = !this._reverse;
        this._loop = this.loopCount - this._loop - 1;
    }

    isRunning() {
        return this._isRunning;
    }

    onCompleted() {
        return this._onCompleted;
    }

    onAfterIteration() {
        return this._onAfterIteration;
    }

    /**
     * @param {number} deltatime
     * @memberof TimeDriverMock
     */
    async _update(deltatime) {
        if (!this._isRunning.value) return;

        let progress = this.progress.value;
        
        if (this._reverse)
            progress = progress - (deltatime / this.durationMilliseconds);
        else
            progress = progress + (deltatime / this.durationMilliseconds);

        while (!(progress < 1 && progress >= 0)) {
            this._loop += 1;

            if (this.loopCount <= this._loop) {
                await this._isRunning.mockUpdate(false);
                await this._onCompleted.mockCallback();

                await this._onAfterIteration.mockCallback();
                break;
            } else {
                if (this.mirror) {
                    this._reverse = !this._reverse;

                    if (progress < 0) progress = Math.abs(progress);
                    else progress = 1 - (progress - 1);

                } else {
                    if (progress < 0) progress = Math.abs(progress);
                
                    progress -= 1;
                }
            }
            await this._onAfterIteration.mockCallback();
        }

        await this.progress.mockUpdate(progress);
    }
}

export default TimeDriverMock;