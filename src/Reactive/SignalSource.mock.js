import ScalarSignalMock from './ScalarSignal.mock';
import StringSignalMock from './StringSignalMock';
import BoolSignalMock from './BoolSignal.mock';

export class ScalarSignalSourceMock {
    constructor(name) {
        this._name = name;
        this._signal = new ScalarSignalMock(0);
    }

    get signal() {
        return this._signal;
    }

    /**
     * @param {number} value 
     */
    set(value) {
        this._signal.mockUpdate(value);
    }
}

export class StringSignalSourceMock {
    constructor(name) {
        this._name = name;
        this._signal = new StringSignalMock('');
    }

    get signal() {
        return this._signal;
    }

    /**
     * @param {string} value 
     */
    set(value) {
        this._signal.mockUpdate(value);
    }
}

export class BoolSignalSourceMock {
    constructor(name) {
        this._name = name;
        this._signal = new BoolSignalMock(true);
    }

    get signal() {
        return this._signal;
    }
    
    /**
     * @param {boolean} value 
     */
    set(value) {
        this._signal.mockUpdate(value);
    }
}
