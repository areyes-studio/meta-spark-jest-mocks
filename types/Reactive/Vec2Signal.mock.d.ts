export class Vec2SignalMock extends SignalMock {
    /**
     * @param {Vector2} value
     * @memberof Vec2SignalMock
     */
    constructor(value: Vector2);
    _x: ScalarSignalMock;
    _y: ScalarSignalMock;
    /** @type {SubscriptionMock} */
    _reactiveSubscribeX: SubscriptionMock;
    /** @type {SubscriptionMock} */
    _reactiveSubscribeY: SubscriptionMock;
    /** @type {number | ScalarSignalMock | Vec2SignalMock} */
    _parentSignalX: number | ScalarSignalMock | Vec2SignalMock;
    /** @type {number | ScalarSignalMock | Vec2SignalMock} */
    _parentSignalY: number | ScalarSignalMock | Vec2SignalMock;
    get x(): ScalarSignalMock;
    get y(): ScalarSignalMock;
    abs(): Vec2SignalMock;
    /**
     * @param {Vector2 | Vec2SignalMock | ScalarSignalMock | number} signal
     */
    add(signal: Vector2 | Vec2SignalMock | ScalarSignalMock | number): Vec2SignalMock;
    /**
     * @param {Vector2 | Vec2SignalMock | ScalarSignalMock | number} signal
     */
    sub(signal: Vector2 | Vec2SignalMock | ScalarSignalMock | number): Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} signal
     */
    mul(signal: ScalarSignalMock | number | Vec2SignalMock | Vector2): Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} signal
     */
    div(signal: ScalarSignalMock | number | Vec2SignalMock | Vector2): Vec2SignalMock;
    /**
     * @param {Vec2SignalMock | Vector2} signal
     */
    distance(signal: Vec2SignalMock | Vector2): ScalarSignalMock;
    neg(): Vec2SignalMock;
    height(): ScalarSignalMock;
    width(): ScalarSignalMock;
    /**
     * @param {Vec2SignalMock | Vector2 | ScalarSignalMock | number} signal
     */
    atan2(signal: Vec2SignalMock | Vector2 | ScalarSignalMock | number): Vec2SignalMock;
    ceil(): Vec2SignalMock;
    floor(): Vec2SignalMock;
    /**
     *
     * @param {ScalarSignalMock | number | Vector2 | Vec2SignalMock} min
     * @param {ScalarSignalMock | number | Vector2 | Vec2SignalMock} max
     */
    clamp(min: ScalarSignalMock | number | Vector2 | Vec2SignalMock, max: ScalarSignalMock | number | Vector2 | Vec2SignalMock): Vec2SignalMock;
    /**
     * @param {Vec2SignalMock | Vector2} vector
     */
    dot(vector: Vec2SignalMock | Vector2): ScalarSignalMock;
    magnitude(): ScalarSignalMock;
    magnitudeSquared(): ScalarSignalMock;
    /**
     * @param {Vec2SignalMock | Vector2} vector
     */
    max(vector: Vec2SignalMock | Vector2): Vec2SignalMock;
    /**
     * @param {Vec2SignalMock | Vector2} vector
     */
    min(vector: Vec2SignalMock | Vector2): Vec2SignalMock;
    /**
     * @param {Vec2SignalMock | Vector2} vector
     * @param {ScalarSignalMock | number} factor
     */
    mix(vector: Vec2SignalMock | Vector2, factor: ScalarSignalMock | number): Vec2SignalMock;
    /**
     * @param {Vector2 | Vec2SignalMock} signal
     */
    mod(signal: Vector2 | Vec2SignalMock): Vec2SignalMock;
    normalize(): ScalarSignalMock;
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} signal
     */
    pow(signal: ScalarSignalMock | number | Vec2SignalMock | Vector2): Vec2SignalMock;
    /**
     * @param {Vector2 | Vec2SignalMock} signal
     */
    reflect(signal: Vector2 | Vec2SignalMock): Vec2SignalMock;
    round(): Vec2SignalMock;
    sign(): Vec2SignalMock;
    /**
     * @param {Vector2 | Vec2SignalMock | ScalarSignalMock | number} signal
     */
    sum(signal: Vector2 | Vec2SignalMock | ScalarSignalMock | number): Vec2SignalMock;
    sqrt(): Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} min
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} max
     * @memberof ScalarSignalMock
     */
    toRange(min: ScalarSignalMock | number | Vec2SignalMock | Vector2, max: ScalarSignalMock | number | Vec2SignalMock | Vector2): ScalarSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} min
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} max
     * @memberof ScalarSignalMock
     */
    fromRange(min: ScalarSignalMock | number | Vec2SignalMock | Vector2, max: ScalarSignalMock | number | Vec2SignalMock | Vector2): ScalarSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} val1
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} val2
     */
    smoothStep(val1: ScalarSignalMock | number | Vec2SignalMock | Vector2, val2: ScalarSignalMock | number | Vec2SignalMock | Vector2): Vec2SignalMock;
    pinLastValue(): Vec2SignalMock;
    /**
* @param {number | ScalarSignalMock} value
* @memberof Vec2SignalMock
*/
    mockUpdateX(value: number | ScalarSignalMock): Promise<void>;
    /**
     * @param {number | ScalarSignalMock} value
     * @memberof Vec2SignalMock
     */
    mockUpdateY(value: number | ScalarSignalMock): Promise<void>;
    /**
     * @override
     * @param {Vec2SignalMock | Vector2} value
     * @memberof Vec2SignalMock
     */
    override mockUpdate(value: Vec2SignalMock | Vector2): Promise<void>;
    _update(): Promise<void>;
}
export default Vec2SignalMock;
import SignalMock from "./Signal.mock";
import ScalarSignalMock from "./ScalarSignal.mock";
import SubscriptionMock from "./Subscription.mock";
import { Vector2 } from "@areyes-studio/math-module";
