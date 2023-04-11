export class TimeMock {
    static get deltaTimeMS(): ScalarSignalMock;
    static get ms(): ScalarSignalMock;
    /**
     * @static
     * @param {SubscriptionMock} subcription
     * @memberof TimeMock
     */
    static clearInterval(subcription: SubscriptionMock): void;
    /**
     * @static
     * @param {SubscriptionMock} subcription
     * @memberof TimeMock
     */
    static clearTimeout(subcription: SubscriptionMock): void;
    /**
     * @static
     * @param {Function} callback
     * @param {number} delay
     * @memberof TimeMock
     */
    static setInterval(callback: Function, delay: number): any;
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
    static setIntervalWithSnapshot(snapshot: any, callback: Function, delay: number): any;
    /**
     * @static
     * @param {Function} callback
     * @param {number} delay
     * @memberof TimeMock
     */
    static setTimeout(callback: Function, delay: number): SubscriptionMock;
    /**
     * @static
     * @param {*} snapshot
     * @param {Function} callback
     * @param {number} delay
     * @memberof TimeMock
     */
    static setTimeoutWithSnapshot(snapshot: any, callback: Function, delay: number): SubscriptionMock;
    /**
     * @static
     * @param {number} number
     * @memberof TimeMock
     */
    static mockIncreaseMs(number: number): Promise<void>;
    static mockReset(): Promise<void>;
}
export default TimeMock;
import ScalarSignalMock from "./Reactive/ScalarSignal.mock";
import SubscriptionMock from "./Reactive/Subscription.mock";
