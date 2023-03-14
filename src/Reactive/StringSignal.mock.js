import SignalMock from './Signal.mock';
import BoolSignalMock from './BoolSignal.mock';

export class StringSignalMock extends SignalMock {
    /**
     * @param {string} value
     * @memberof ScalarSignalMock
     */
    constructor(value) {
        super(value);
    }

    /**
     * @param {string | StringSignalMock} signal 
     * @memberof StringSignalMock
     * @returns StringSignalMock
     */
    concat(signal) {
        let callback = () => {
            return (typeof signal === 'string') ? this.value.concat(signal) : this.value.concat(signal.value)
        };
        
        let newSignal = new StringSignalMock(callback());

        monitor(this, signal, null, newSignal, callback);

        return newSignal;
    }
    
    /**
     * @param {string | StringSignalMock} signal
     * @memberof StringSignalMock
     * @returns BoolSignal
     */
    contains(signal) {
        let callback = () => {
            return (typeof signal === 'string') ? this.value.includes(signal) : this.value.includes(signal.value)
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, null, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {string | StringSignalMock} signal
     * @memberof StringSignalMock
     * @returns BoolSignal
     */
    eq(signal) {
        let callback = () => {
            return (typeof signal === 'string') ? this.value == signal : this.value == signal.value 
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, null, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {string | StringSignalMock} signal
     * @memberof StringSignalMock
     * @returns BoolSignal
     */
    ne(signal) {
        let callback = () => {
            return (typeof signal === 'string') ? this.value != signal : this.value != signal.value 
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, null, newSignal, callback);

        return newSignal;
    }

    pin() {
        return new StringSignalMock(this._value);
    }

    pinLastValue() {
        return this._value;
    }
}

/**
 * @param {SignalMock} outputSignal
 * @param {SignalMock | boolean | string | number | null} inputFirstSignal
 * @param {SignalMock | boolean | string | number | null} inputSecondSignal
 * @param {SignalMock} newOwnsignal
 * @param {Function} callback
 */
function monitor(outputSignal, inputFirstSignal, inputSecondSignal, newOwnsignal, callback) {
    outputSignal.monitor().subscribe(async () => {
        await newOwnsignal.mockUpdate(callback())
    })

    if (typeof inputFirstSignal !== 'string' && typeof inputFirstSignal !== 'number' && typeof inputFirstSignal !== 'boolean' && inputFirstSignal !== null && inputFirstSignal !== undefined) {
        inputFirstSignal.monitor().subscribe(async () => {
            await newOwnsignal.mockUpdate(callback())
        })
    }

    if (typeof inputSecondSignal !== 'string' && typeof inputSecondSignal !== 'number' && typeof inputSecondSignal !== 'boolean' && inputSecondSignal !== null && inputSecondSignal !== undefined) {
        inputSecondSignal.monitor().subscribe(async () => {
            await newOwnsignal.mockUpdate(callback())
        })
    }
}

export default StringSignalMock