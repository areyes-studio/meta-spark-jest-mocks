export class PatchesOuputsMock {
    /**
     * @param {string} name
     */
    static get(name: string): Promise<EventSourceMock | SignalMock>;
    /**
     * @param {string} name
     * @returns {Promise<BoolSignalMock>}
     */
    static getBoolean(name: string): Promise<BoolSignalMock>;
    /**
     * @param {string} name
     * @param {BoolSignalMock | boolean} fallback
     * @returns {Promise<BoolSignalMock>}
     */
    static getBooleanOrFallback(name: string, fallback: BoolSignalMock | boolean): Promise<BoolSignalMock>;
    /**
     * @param {string} name
     * @param {SignalMock | boolean | number | string} fallback
     * @returns {Promise<SignalMock>}
     */
    static getOrFallback(name: string, fallback: SignalMock | boolean | number | string): Promise<SignalMock>;
    /**
    * @param {string} name
    * @returns {Promise<VectorSignalMock>}
    */
    static getPoint(name: string): Promise<VectorSignalMock>;
    /**
    * @param {string} name
    * @param {VectorSignalMock} fallback
    * @returns {Promise<VectorSignalMock>}
    */
    static getPointOrFallback(name: string, fallback: VectorSignalMock): Promise<VectorSignalMock>;
    /**
    * @param {string} name
    * @returns {Promise<Vec2SignalMock>}
    */
    static getPoint2D(name: string): Promise<Vec2SignalMock>;
    /**
     * @param {string} name
     * @param {Vec2SignalMock} fallback
     * @returns {Promise<Vec2SignalMock>}
     */
    static getPoint2DOrFallback(name: string, fallback: Vec2SignalMock): Promise<Vec2SignalMock>;
    /**
    * @param {string} name
    * @returns {Promise<EventSourceMock>}
    */
    static getPulse(name: string): Promise<EventSourceMock>;
    /**
     * @param {string} name
     * @param {EventSourceMock} fallback
     * @returns {Promise<EventSourceMock>}
     */
    static getPulseOrFallback(name: string, fallback: EventSourceMock): Promise<EventSourceMock>;
    /**
    * @param {string} name
    * @returns {Promise<ScalarSignalMock>}
    */
    static getScalar(name: string): Promise<ScalarSignalMock>;
    /**
     * @param {string} name
     * @param {ScalarSignalMock | number} fallback
     * @returns {Promise<ScalarSignalMock>}
     */
    static getScalarOrFallback(name: string, fallback: ScalarSignalMock | number): Promise<ScalarSignalMock>;
    /**
    * @param {string} name
    * @returns {Promise<StringSignalMock>}
    */
    static getString(name: string): Promise<StringSignalMock>;
    /**
     * @param {string} name
     * @param {StringSignalMock | string} fallback
     * @returns {Promise<StringSignalMock>}
     */
    static getStringOrFallback(name: string, fallback: StringSignalMock | string): Promise<StringSignalMock>;
    /**
    * @param {string} name
    * @returns {Promise<VectorSignalMock>}
    */
    static getVector(name: string): Promise<VectorSignalMock>;
    /**
     * @param {string} name
     * @param {VectorSignalMock} fallback
     * @returns {Promise<VectorSignalMock>}
     */
    static getVectorOrFallback(name: string, fallback: VectorSignalMock): Promise<VectorSignalMock>;
    /**
     * @param {Object<string, SignalMock|EventSourceMock>} value
     */
    static mockReset(value?: {
        [x: string]: SignalMock | EventSourceMock;
    }): void;
}
export default PatchesOuputsMock;
import EventSourceMock from "../Reactive/EventSource.mock";
import SignalMock from "../Reactive/Signal.mock";
import BoolSignalMock from "../Reactive/BoolSignal.mock";
import VectorSignalMock from "../Reactive/VectorSignal.mock";
import Vec2SignalMock from "../Reactive/Vec2Signal.mock";
import ScalarSignalMock from "../Reactive/ScalarSignal.mock";
import StringSignalMock from "../Reactive/StringSignal.mock";
