import ScalarSignalMock from "./Reactive/ScalarSignal.mock"
import SubscriptionMock from "./Reactive/Subscription.mock";

const ms = new ScalarSignalMock(0);
const deltaTimeMS = new ScalarSignalMock(0);

ms.monitor().subscribe(async (/** @type {{ newValue: number; oldValue: number; }} */ v) => {
    await deltaTimeMS.mockUpdate(v.newValue - v.oldValue);
});

/** @type {SubscriptionMock[]} */
let subscriptions = [];

export class TimeMock {
    static get deltaTimeMS() {
        return deltaTimeMS;
    }

    static get ms() {
        return ms;
    }

    /**
     * @static
     * @param {SubscriptionMock} subcription
     * @memberof TimeMock
     */
    static clearInterval(subcription) {
        subcription.unsubscribe();
    }

    /**
     * @static
     * @param {SubscriptionMock} subcription
     * @memberof TimeMock
     */
    static clearTimeout(subcription) {
        subcription.unsubscribe();
    }

    /**
     * @static
     * @param {Function} callback
     * @param {number} delay
     * @memberof TimeMock
     */
    static setInterval(callback, delay) {
        return TimeMock.setIntervalWithSnapshot(undefined, callback, delay)
    }

    /**
     *
     *
     * @static
     * @param {*} snapshot
     * @param {Function} callback
     * @param {number} delay
     * @return {*} 
     * @memberof TimeMock
     */
    static setIntervalWithSnapshot(snapshot, callback, delay) {
        let deltatime = 0;

        let sub = ms.monitor().subscribeWithSnapshot(snapshot, (/** @type {{ newValue: number; oldValue: number; }} */ v) => {
            deltatime += v.newValue - v.oldValue;
            let times = Math.floor(deltatime / delay);

            if (times >= 1) {
                deltatime -= delay * times;

                for (let i = 0; i < times; i++) callback();
            }
        })

        subscriptions.push(sub);

        return sub;
    }

    /**
     * @static
     * @param {Function} callback
     * @param {number} delay
     * @memberof TimeMock
     */
    static setTimeout(callback, delay) {
        return TimeMock.setTimeoutWithSnapshot(undefined, callback, delay);
    }

    /**
     * @static
     * @param {*} snapshot
     * @param {Function} callback
     * @param {number} delay
     * @memberof TimeMock
     */
    static setTimeoutWithSnapshot(snapshot, callback, delay) {
        let deltatime = 0;

        let sub = ms.monitor().subscribeWithSnapshot(snapshot, (/** @type {{ newValue: number; oldValue: number; }} */ v) => {
            deltatime += v.newValue - v.oldValue;

            if (deltatime >= delay) {
                callback();
                sub.unsubscribe();
            }
        })

        subscriptions.push(sub);

        return sub;
    }

    /**
     * @static
     * @param {number} number
     * @memberof TimeMock
     */
    static async mockIncreaseMs(number) {
        await ms.mockUpdate(ms.value + number);
    }

    static async mockReset() {
        await ms.mockUpdate(0);
        await deltaTimeMS.mockUpdate(0);

        subscriptions.forEach(sub => sub.unsubscribe());
        subscriptions = [];
    }
}

export default TimeMock