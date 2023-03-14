import SignalMock from './Signal.mock';
import ScalarSignalMock from './ScalarSignal.mock';
import StringSignalMock from './StringSignalMock';
import EventSourceMock from './EventSource.mock';

export default class BoolSignalMock extends SignalMock {
    /**
     * @param {boolean} value
     * @memberof ScalarSignalMock
     */
    constructor(value) {
        super(value);
    }

    /**
     * @param {{ fireOnInitialValue: boolean; }} [config]
     */
    onOn(config) {
        let eventSource = new EventSourceMock(config, this);

        this.monitor().subscribe(async () => {
            if (this.value === true)         
                await eventSource.mockCallback();
        })

        return eventSource;
    }

    /**
     * @param {{ fireOnInitialValue: boolean; }} [config]
     */
    onOff(config) {
        let eventSource = new EventSourceMock(config, this);

        this.monitor().subscribe(async () => {
            if (this.value === false)         
                await eventSource.mockCallback();
        })

        return eventSource;
    }

    /** 
     * @param {boolean | BoolSignalMock} signal 
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    or(signal) {
        let callback = () => {
            return (typeof signal === 'boolean') ? this.value || signal : this.value || signal.value
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, null, newSignal, callback);

        return newSignal;
    }

    /** 
     * @param {boolean | BoolSignalMock} signal 
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    and(signal) {
        let callback = () => {
            return (typeof signal === 'boolean') ? this.value && signal : this.value && signal.value
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal,null, newSignal, callback);

        return newSignal;
    }

    /** 
     * @param {boolean | BoolSignalMock} signal 
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    eq(signal) {
        let callback = () => {
            return (typeof signal === 'boolean') ? this.value == signal : this.value == signal.value
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, null, newSignal, callback);

        return newSignal;
    }

    /** 
     * @param {boolean | BoolSignalMock} signal 
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    ne(signal) {
        let callback = () => {
            return (typeof signal === 'boolean') ? this.value != signal : this.value != signal.value
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, null, newSignal, callback);

        return newSignal;
    }

    /** 
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    not() {
        let callback = () => {
            // @ts-ignore
            return  !this.value
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, null, null, newSignal, callback);

        return newSignal;
    }

    /** 
     * @param {boolean | BoolSignalMock} signal 
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    xor(signal) {
        let callback = () => {
            return (typeof signal === 'boolean') ? (this.value || signal) && !(this.value && signal) : (this.value || signal.value) && !(this.value && signal.value)
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, null, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {boolean | BoolSignalMock | string | StringSignalMock | number | ScalarSignalMock} thenSignal 
     * @param {boolean | BoolSignalMock | string | StringSignalMock | number | ScalarSignalMock} elseSignal
     * @memberof BoolSignalMock
     * @returns BoolSignalMock  
     */
    ifThenElse(thenSignal, elseSignal) {
        /**@type {boolean | string | number}*/
        let thenSignalValue,
        /**@type {boolean | string | number}*/
        elseSignalValue;

        let callback = () => {
            switch (typeof thenSignal) {
                case 'boolean':     
                case 'string':
                case 'number':
                    thenSignalValue = thenSignal
                    break;
    
                default:
                    thenSignalValue = thenSignal.value 
                    break;
    
            }
    
            switch (typeof elseSignal) {
                case 'boolean': 
                case 'string':
                case 'number':
                    elseSignalValue = elseSignal
                    break;
    
                default:
                    elseSignalValue = elseSignal.value 
                    break;
            }
            return this.value ? thenSignalValue : elseSignalValue
        };

        let newSignal

        switch (typeof callback()) {
            case 'string':
                newSignal = new StringSignalMock(/** @type {string} */ (callback()));
                break;

            case 'number':
                newSignal = new ScalarSignalMock(/** @type {number} */ (callback()))
                break;
            
            case 'boolean':
                newSignal = new BoolSignalMock(/** @type {boolean} */ (callback()))
                break;
        }

        monitor(this, thenSignal, elseSignal, newSignal, callback);

        return newSignal;
    }

    /**
     * @returns BoolSignalMock
     */
    pin() {
        return new BoolSignalMock(this._value);
    }

    /**
     * @returns boolean
     */
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