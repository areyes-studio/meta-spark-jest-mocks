export class ScalarSignalSourceMock {
    constructor(name: any);
    _name: any;
    _signal: ScalarSignalMock;
    get signal(): ScalarSignalMock;
    /**
     * @param {number} value
     */
    set(value: number): void;
}
export class StringSignalSourceMock {
    constructor(name: any);
    _name: any;
    _signal: StringSignalMock;
    get signal(): StringSignalMock;
    /**
     * @param {string} value
     */
    set(value: string): void;
}
export class BoolSignalSourceMock {
    constructor(name: any);
    _name: any;
    _signal: BoolSignalMock;
    get signal(): BoolSignalMock;
    /**
     * @param {boolean} value
     */
    set(value: boolean): void;
}
import ScalarSignalMock from "./ScalarSignal.mock";
import StringSignalMock from "./StringSignal.mock";
import BoolSignalMock from "./BoolSignal.mock";
