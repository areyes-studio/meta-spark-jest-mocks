import SignalMock from "../Reactive/Signal.mock";
import StringSignalMock from "../Reactive/StringSignal.mock";
import BoolSignalMock from "../Reactive/BoolSignal.mock";
import ScalarSignalMock from "../Reactive/ScalarSignal.mock";
import Vec2SignalMock from "../Reactive/Vec2Signal.mock";
import EventSourceMock from "../Reactive/EventSource.mock";
import VectorSignalMock from "../Reactive/VectorSignal.mock";

/** @type {Object<string, SignalMock|EventSourceMock>} */
let PatchesStructureOutputs = {};

//Skipped getColor, getColorOrFallback methods
export class PatchesOuputsMock {
    /**
     * @param {string} name 
     */
   static async get(name) {
        return PatchesStructureOutputs[name]
   }

    /**
     * @param {string} name 
     * @returns {Promise<BoolSignalMock>}
     */
    static async getBoolean(name) {
        if (!(PatchesStructureOutputs[name] instanceof BoolSignalMock)) 
            throw new TypeError(`Expected BoolSignalMock but got: ${typeof PatchesStructureOutputs[name]}`);
        return /**@type {BoolSignalMock}*/ (PatchesStructureOutputs[name])
   } 
   
    /**
     * @param {string} name 
     * @param {BoolSignalMock | boolean} fallback 
     * @returns {Promise<BoolSignalMock>}
     */
    static async getBooleanOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof BoolSignalMock)) {
            if (typeof fallback == 'boolean') value = new BoolSignalMock(fallback)
            else value = fallback 
        }
        else 
            value = PatchesStructureOutputs[name]
        return /**@type {BoolSignalMock}*/ (value)
   }
   
   /**
    * @param {string} name 
    * @param {SignalMock | boolean | number | string} fallback 
    * @returns {Promise<SignalMock>}
    */
   static async getOrFallback(name, fallback) {
    let value;
    if (!(PatchesStructureOutputs[name] instanceof SignalMock)) {
        switch (typeof fallback) {
            case 'boolean':
                value = new BoolSignalMock(fallback)
                break;

            case 'number':
                value = new ScalarSignalMock(fallback)
                break;
            
            case 'string':
                value = new StringSignalMock(fallback)
                break;

            default:
                value = fallback
        }
    }
    else 
        value = PatchesStructureOutputs[name]
    return /**@type {SignalMock}*/ (value)
   }

    /**
    * @param {string} name 
    * @returns {Promise<VectorSignalMock>}
    */
    static async getPoint(name) {
        if (!(PatchesStructureOutputs[name] instanceof VectorSignalMock)) 
            throw new TypeError(`Expected VectorSignalMock`);
        return /**@type {VectorSignalMock}*/ (PatchesStructureOutputs[name])
    }

    /**
    * @param {string} name 
    * @param {VectorSignalMock} fallback 
    * @returns {Promise<VectorSignalMock>}
    */
    static async getPointOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof VectorSignalMock)) value = fallback
        else value = PatchesStructureOutputs[name]
        return /**@type {VectorSignalMock}*/ (value)
    }

    /**
    * @param {string} name 
    * @returns {Promise<Vec2SignalMock>}
    */
    static async getPoint2D(name) {
        if (!(PatchesStructureOutputs[name] instanceof Vec2SignalMock)) 
            throw new TypeError(`Expected Vec2SignalMock`);
        return /**@type {Vec2SignalMock}*/ (PatchesStructureOutputs[name])
    }

   /**
    * @param {string} name 
    * @param {Vec2SignalMock} fallback 
    * @returns {Promise<Vec2SignalMock>}
    */
    static async getPoint2DOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof Vec2SignalMock)) value = fallback
        else value = PatchesStructureOutputs[name]
        return /**@type {Vec2SignalMock}*/ (value)
    }

    /**
    * @param {string} name 
    * @returns {Promise<EventSourceMock>}
    */
    static async getPulse(name) {
        if (!(PatchesStructureOutputs[name] instanceof EventSourceMock)) 
            throw new TypeError(`Expected EventSourceMock`);
        return /**@type {EventSourceMock}*/ (PatchesStructureOutputs[name])
    }

   /**
    * @param {string} name 
    * @param {EventSourceMock} fallback 
    * @returns {Promise<EventSourceMock>}
    */
    static async getPulseOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof EventSourceMock)) value = fallback    
        else value = PatchesStructureOutputs[name]
        return /**@type {EventSourceMock}*/ (value)
    }

    /**
    * @param {string} name 
    * @returns {Promise<ScalarSignalMock>}
    */
    static async getScalar(name) {
        if (!(PatchesStructureOutputs[name] instanceof ScalarSignalMock)) 
            throw new TypeError(`Expected ScalarSiganlMcok`);
        return /**@type {ScalarSignalMock}*/ (PatchesStructureOutputs[name])
    }
    
    /**
     * @param {string} name 
     * @param {ScalarSignalMock | number} fallback 
     * @returns {Promise<ScalarSignalMock>}
     */
    static async getScalarOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof ScalarSignalMock)) {
            if (typeof fallback == 'number') value = new ScalarSignalMock(fallback)
            else value = fallback 
        }
        else 
            value = PatchesStructureOutputs[name]
        return /**@type {ScalarSignalMock}*/ (value)
    }

    /**
    * @param {string} name 
    * @returns {Promise<StringSignalMock>}
    */
    static async getString(name) {
        if (!(PatchesStructureOutputs[name] instanceof StringSignalMock)) 
            throw new TypeError(`Expected StringSignalMock`);
        return /**@type {StringSignalMock}*/ (PatchesStructureOutputs[name])
    }
    
    /**
     * @param {string} name 
     * @param {StringSignalMock | string} fallback 
     * @returns {Promise<StringSignalMock>}
     */
    static async getStringOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof StringSignalMock)) {
            if (typeof fallback == 'string') value = new StringSignalMock(fallback)
            else value = fallback 
        }
        else 
            value = PatchesStructureOutputs[name]
        return /**@type {StringSignalMock}*/ (value)
    }

    /**
    * @param {string} name 
    * @returns {Promise<VectorSignalMock>}
    */
    static async getVector(name) {
        if (!(PatchesStructureOutputs[name] instanceof VectorSignalMock)) 
            throw new TypeError(`Expected VectorSignalMock`);
        return /**@type {VectorSignalMock}*/ (PatchesStructureOutputs[name])
    }
    
    /**
     * @param {string} name 
     * @param {VectorSignalMock} fallback 
     * @returns {Promise<VectorSignalMock>}
     */
    static async getVectorOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof VectorSignalMock)) value = fallback
        else value = PatchesStructureOutputs[name]
        return /**@type {VectorSignalMock}*/ (value)
    }

    /**
     * @param {Object<string, SignalMock|EventSourceMock>} value 
     */
    static mockReset(value = {}) {
        PatchesStructureOutputs = value
    }
}

export default PatchesOuputsMock