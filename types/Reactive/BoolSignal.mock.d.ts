export class BoolSignalMock extends SignalMock {
    /**
     * @param {boolean} value
     * @memberof ScalarSignalMock
     */
    constructor(value: boolean);
    /**
     * @param {{ fireOnInitialValue: boolean; }} [config]
     */
    onOn(config?: {
        fireOnInitialValue: boolean;
    }): EventSourceMock;
    /**
     * @param {{ fireOnInitialValue: boolean; }} [config]
     */
    onOff(config?: {
        fireOnInitialValue: boolean;
    }): EventSourceMock;
    /**
     * @param {boolean | BoolSignalMock} signal
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    or(signal: boolean | BoolSignalMock): BoolSignalMock;
    /**
     * @param {boolean | BoolSignalMock} signal
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    and(signal: boolean | BoolSignalMock): BoolSignalMock;
    /**
     * @param {boolean | BoolSignalMock} signal
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    eq(signal: boolean | BoolSignalMock): BoolSignalMock;
    /**
     * @param {boolean | BoolSignalMock} signal
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    ne(signal: boolean | BoolSignalMock): BoolSignalMock;
    /**
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    not(): BoolSignalMock;
    /**
     * @param {boolean | BoolSignalMock} signal
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    xor(signal: boolean | BoolSignalMock): BoolSignalMock;
    /**
     * @param {boolean | BoolSignalMock | string | StringSignalMock | number | ScalarSignalMock} thenSignal
     * @param {boolean | BoolSignalMock | string | StringSignalMock | number | ScalarSignalMock} elseSignal
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    ifThenElse(thenSignal: boolean | BoolSignalMock | string | StringSignalMock | number | ScalarSignalMock, elseSignal: boolean | BoolSignalMock | string | StringSignalMock | number | ScalarSignalMock): ScalarSignalMock | BoolSignalMock | StringSignalMock;
    /**
     * @returns BoolSignalMock
     */
    pin(): BoolSignalMock;
    /**
     * @returns boolean
     */
    pinLastValue(): any;
}
export default BoolSignalMock;
import SignalMock from "./Signal.mock";
import EventSourceMock from "./EventSource.mock";
import StringSignalMock from "./StringSignal.mock";
import ScalarSignalMock from "./ScalarSignal.mock";
