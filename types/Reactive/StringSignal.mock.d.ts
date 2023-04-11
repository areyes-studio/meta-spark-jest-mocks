export class StringSignalMock extends SignalMock {
    /**
     * @param {string} value
     * @memberof ScalarSignalMock
     */
    constructor(value: string);
    /**
     * @param {string | StringSignalMock} signal
     * @memberof StringSignalMock
     * @returns StringSignalMock
     */
    concat(signal: string | StringSignalMock): StringSignalMock;
    /**
     * @param {string | StringSignalMock} signal
     * @memberof StringSignalMock
     * @returns BoolSignal
     */
    contains(signal: string | StringSignalMock): BoolSignalMock;
    /**
     * @param {string | StringSignalMock} signal
     * @memberof StringSignalMock
     * @returns BoolSignal
     */
    eq(signal: string | StringSignalMock): BoolSignalMock;
    /**
     * @param {string | StringSignalMock} signal
     * @memberof StringSignalMock
     * @returns BoolSignal
     */
    ne(signal: string | StringSignalMock): BoolSignalMock;
    pin(): StringSignalMock;
    pinLastValue(): any;
}
export default StringSignalMock;
import SignalMock from "./Signal.mock";
import BoolSignalMock from "./BoolSignal.mock";
