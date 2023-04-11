export class SignalMock {
    /**
     * @param {any} value
     * @memberof SignalMock
     */
    constructor(value: any);
    /** @type {EventSourceMock[]} */
    _eventSources: EventSourceMock[];
    _value: any;
    /** @type {SubscriptionMock} */
    _reactiveSubscribe: SubscriptionMock;
    get value(): any;
    /**
     * @param {{ fireOnInitialValue: boolean; }} [config]
     */
    monitor(config?: {
        fireOnInitialValue: boolean;
    }): EventSourceMock;
    getInitialValueEvent(): {
        oldValue: any;
        newValue: any;
    };
    /**
     * @param {any} newValue
     * @memberof SignalMock
     */
    mockUpdate(newValue: any): Promise<void>;
}
export default SignalMock;
import EventSourceMock from "./EventSource.mock.js";
import SubscriptionMock from "./Subscription.mock.js";
