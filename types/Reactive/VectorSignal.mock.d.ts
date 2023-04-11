export class VectorSignalMock extends SignalMock {
    /**
     * @param {Vector3} value
     * @memberof VectorSignalMock
     */
    constructor(value: Vector3);
    _x: ScalarSignalMock;
    _y: ScalarSignalMock;
    _z: ScalarSignalMock;
    /** @type {SubscriptionMock} */
    _reactiveSubscribeX: SubscriptionMock;
    /** @type {SubscriptionMock} */
    _reactiveSubscribeY: SubscriptionMock;
    /** @type {SubscriptionMock} */
    _reactiveSubscribeZ: SubscriptionMock;
    /** @type {number | ScalarSignalMock | VectorSignalMock} */
    _parentSignalX: number | ScalarSignalMock | VectorSignalMock;
    /** @type {number | ScalarSignalMock | VectorSignalMock} */
    _parentSignalY: number | ScalarSignalMock | VectorSignalMock;
    /** @type {number | ScalarSignalMock | VectorSignalMock} */
    _parentSignalZ: number | ScalarSignalMock | VectorSignalMock;
    get x(): ScalarSignalMock;
    get y(): ScalarSignalMock;
    get z(): ScalarSignalMock;
    /**
     * Gets absolute value of each vector coordinate and returns new VectorSignalMock
     */
    abs(): VectorSignalMock;
    /**
     * @param {Vector3 | VectorSignalMock | ScalarSignalMock | number} signal
     */
    add(signal: Vector3 | VectorSignalMock | ScalarSignalMock | number): VectorSignalMock;
    /**
     * @param {Vector3 | VectorSignalMock | ScalarSignalMock | number} signal
     */
    sub(signal: Vector3 | VectorSignalMock | ScalarSignalMock | number): VectorSignalMock;
    /**
     * Multiplies the vector by the number or ScalarSignalMock and returns the vector
     * @param {number | ScalarSignalMock | VectorSignalMock | Vector3} signal
     */
    mul(signal: number | ScalarSignalMock | VectorSignalMock | Vector3): VectorSignalMock;
    /**
     * @param {number | ScalarSignalMock | VectorSignalMock | Vector3} signal
     */
    div(signal: number | ScalarSignalMock | VectorSignalMock | Vector3): VectorSignalMock;
    /**
     * @param {ScalarSignalMock | number | Vector3 | VectorSignalMock} signal
     */
    pow(signal: ScalarSignalMock | number | Vector3 | VectorSignalMock): VectorSignalMock;
    sqrt(): VectorSignalMock;
    neg(): VectorSignalMock;
    round(): VectorSignalMock;
    sign(): VectorSignalMock;
    normalize(): VectorSignalMock;
    /**
     * @param {Vector3 | VectorSignalMock} signal
     */
    cross(signal: Vector3 | VectorSignalMock): VectorSignalMock;
    /**
     * @param {Vector3 | VectorSignalMock} signal
     * @returns {ScalarSignalMock}
     */
    dot(signal: Vector3 | VectorSignalMock): ScalarSignalMock;
    /**
     * @returns {ScalarSignalMock}
     */
    magnitude(): ScalarSignalMock;
    /**
     * @returns {ScalarSignalMock}
     */
    magnitudeSquared(): ScalarSignalMock;
    /**
     *
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3} signal
     */
    atan2(signal: ScalarSignalMock | number | VectorSignalMock | Vector3): VectorSignalMock;
    /**
     * @returns {VectorSignalMock}
     */
    ceil(): VectorSignalMock;
    /**
     * @returns {VectorSignalMock}
     */
    floor(): VectorSignalMock;
    /**
     *
     * @param {ScalarSignalMock | number | Vector3 | VectorSignalMock} min
     * @param {ScalarSignalMock | number | Vector3 | VectorSignalMock} max
     */
    clamp(min: ScalarSignalMock | number | Vector3 | VectorSignalMock, max: ScalarSignalMock | number | Vector3 | VectorSignalMock): VectorSignalMock;
    /**
     *
     * @param {VectorSignalMock | Vector3} vec
     */
    distance(vec: VectorSignalMock | Vector3): ScalarSignalMock;
    /**
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3} min
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3} max
     * @memberof ScalarSignalMock
     */
    toRange(min: ScalarSignalMock | number | VectorSignalMock | Vector3, max: ScalarSignalMock | number | VectorSignalMock | Vector3): ScalarSignalMock | VectorSignalMock;
    /**
     * @param {ScalarSignalMock | number | Vector3 | VectorSignalMock} min
     * @param {ScalarSignalMock | number | Vector3 | VectorSignalMock} max
     * @memberof ScalarSignalMock
     */
    fromRange(min: ScalarSignalMock | number | Vector3 | VectorSignalMock, max: ScalarSignalMock | number | Vector3 | VectorSignalMock): ScalarSignalMock | VectorSignalMock;
    /**
     *
     * @param {VectorSignalMock | Vector3} vec
     */
    min(vec: VectorSignalMock | Vector3): VectorSignalMock;
    /**
     *
     * @param {VectorSignalMock | Vector3} vec
     */
    max(vec: VectorSignalMock | Vector3): VectorSignalMock;
    /**
     *
     * @param {VectorSignalMock | Vector3} vec
     * @param {ScalarSignalMock | number} factor
     */
    mix(vec: VectorSignalMock | Vector3, factor: ScalarSignalMock | number): VectorSignalMock;
    /**
     *
     * @param {VectorSignalMock | Vector3} vec
     */
    mod(vec: VectorSignalMock | Vector3): VectorSignalMock;
    /**
     * @param {Vector3 | VectorSignalMock | ScalarSignalMock | number} signal
     */
    sum(signal: Vector3 | VectorSignalMock | ScalarSignalMock | number): VectorSignalMock;
    /**
     * @param {Vector3 | VectorSignalMock} signal
     */
    reflect(signal: Vector3 | VectorSignalMock): VectorSignalMock;
    /**
     *
     * @param {QuaternionSignalMock} signal
     */
    rotate(signal: QuaternionSignalMock): VectorSignalMock;
    /**
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3} val1
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3} val2
     */
    smoothStep(val1: ScalarSignalMock | number | VectorSignalMock | Vector3, val2: ScalarSignalMock | number | VectorSignalMock | Vector3): VectorSignalMock;
    pinLastValue(): VectorSignalMock;
    /**
 * @param {number | ScalarSignalMock} value
 * @memberof VectorSignalMock
 */
    mockUpdateX(value: number | ScalarSignalMock): Promise<void>;
    /**
     * @param {number | ScalarSignalMock} value
     * @memberof VectorSignalMock
     */
    mockUpdateY(value: number | ScalarSignalMock): Promise<void>;
    /**
     * @param {number | ScalarSignalMock} value
     * @memberof VectorSignalMock
     */
    mockUpdateZ(value: number | ScalarSignalMock): Promise<void>;
    /**
     * @override
     * @param {VectorSignalMock | Vector3} value
     * @memberof VectorSignalMock
     */
    override mockUpdate(value: VectorSignalMock | Vector3): Promise<void>;
    _update(): Promise<void>;
}
export default VectorSignalMock;
import SignalMock from "./Signal.mock";
import ScalarSignalMock from "./ScalarSignal.mock";
import SubscriptionMock from "./Subscription.mock";
import { Vector3 } from "@areyes-studio/math-module";
import QuaternionSignalMock from "./QuaternionSignal.mock";
