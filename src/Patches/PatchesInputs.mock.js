import SignalMock from "../Reactive/Signal.mock";
import StringSignalMock from "../Reactive/StringSignal.mock";
import BoolSignalMock from "../Reactive/BoolSignal.mock";
import ScalarSignalMock from "../Reactive/ScalarSignal.mock";
import Vec2SignalMock from "../Reactive/Vec2Signal.mock";
import EventSourceMock from "../Reactive/EventSource.mock";
import VectorSignalMock from "../Reactive/VectorSignal.mock";

/** @type {Object<string, SignalMock|EventSourceMock>} */
let  PatchesStructureInputs = {}

export class PatchesInputsMock {
    /**
     * @param {string} name 
     * @param {SignalMock | boolean | number | string} signal 
     */
    static async set(name, signal) {
        let value;
        switch (typeof signal) {
            case 'string':
                value = new StringSignalMock(signal)
                break;

            case 'boolean':
                value = new BoolSignalMock(signal)
                break;

            case 'number':
                value = new ScalarSignalMock(signal)
                break;

            default:
                value = signal;
        }
        PatchesStructureInputs[name] = value
    }

    /** 
     * @param {string} name 
     * @param {BoolSignalMock | boolean} signal 
     */
    static async setBoolean(name, signal) {
        let value;
        switch (typeof signal) {
            case 'boolean':
                value = new BoolSignalMock(signal)
                break;
            default:
                value = signal;
        }
        PatchesStructureInputs[name] = value
    }

    /**
     * @param {string} name 
     * @param {SignalMock} signal 
     */
    static async setColor(name, signal) {
        PatchesStructureInputs[name] = signal
    }

    /** 
     * @param {string} name 
     * @param {ScalarSignalMock | number} signal 
     */
    static async setScalar(name, signal) {
        let value;
        switch (typeof signal) {
            case 'number':
                value = new ScalarSignalMock(signal)
                break;

            default:
                value = signal;
        }
        PatchesStructureInputs[name] = value
    }

    /** 
     * @param {string} name 
     * @param {StringSignalMock | string} signal 
     */
    static async setString(name, signal) {
        let value;
        switch (typeof signal) {
            case 'string':
                value = new StringSignalMock(signal)
                break;

            default:
                value = signal;
        }
        PatchesStructureInputs[name] = value
    }

    /** 
     * @param {string} name 
     * @param {VectorSignalMock} signal 
     */
    static async setPoint(name, signal) {
        PatchesStructureInputs[name] = signal
    }

    /** 
     * @param {string} name 
     * @param {Vec2SignalMock} signal 
     */
    static async setPoint2D(name, signal) {
        PatchesStructureInputs[name] = signal
    }

    /** 
     * @param {string} name 
     * @param {VectorSignalMock} signal 
     */
    static async setVector(name, signal) {
        PatchesStructureInputs[name] = signal
    }

    /** 
     * @param {string} name 
     * @param {EventSourceMock} signal 
     */
    static async setPulse(name, signal) {
        PatchesStructureInputs[name] = signal
    }

    static mockReset() {
        PatchesStructureInputs = {};
    }

    static mockGetPatchesStructureInputs() {
        return PatchesStructureInputs
    }
}

export default PatchesInputsMock