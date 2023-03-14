import EventSourceMock from './EventSource.mock.js';
import SubscriptionMock from './Subscription.mock.js';

export class SignalMock {
    /**
     * @param {any} value
     * @memberof SignalMock
     */
    constructor(value) {
        /** @type {EventSourceMock[]} */
        this._eventSources = [];
        this._value = value;
        /** @type {SubscriptionMock} */
        this._reactiveSubscribe = null;
    }

    get value() {
        return this._value;
    }

    /**
     * @param {{ fireOnInitialValue: boolean; }} [config]
     */
    monitor(config) {
        const eventSource = new EventSourceMock(config, this);
        this._eventSources.push(eventSource);
        return eventSource;
    }

    getInitialValueEvent() {
        return {
            oldValue: this._value,
            newValue: this._value,
        };
    }

    /**
     * @param {any} newValue
     * @memberof SignalMock
     */
    async mockUpdate(newValue) {
        if (this._reactiveSubscribe) {
            this._reactiveSubscribe.unsubscribe();
            this._reactiveSubscribe = null;
        }

        if (newValue instanceof SignalMock) {
            this._reactiveSubscribe = newValue.monitor().subscribe(async (/** @type {{ newValue: any; }} */ v) => {
                newValue = v.newValue;

                await update();
            })

            newValue = newValue.value;
        }

        let update = async () => {
            if (this._value !== newValue) {
                const event = {
                    oldValue: this._value,
                    newValue: newValue,
                };
                this._value = newValue;
                for (const eventSource of this._eventSources) {
                    await eventSource.mockCallback(event);
                }
            }
        }

        await update();
    }
}

export default SignalMock