export class ScalarSignalMock extends SignalMock {
    /**
     * @param {number} value
     * @memberof ScalarSignalMock
     */
    constructor(value: number);
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3} signal
     * @memberof ScalarSignalMock
     */
    add(signal: ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3} signal
     * @memberof ScalarSignalMock
     */
    sub(signal: ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3} signal
     * @memberof ScalarSignalMock
     */
    mul(signal: ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3} signal
     * @memberof ScalarSignalMock
     */
    div(signal: ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     */
    pow(signal: ScalarSignalMock | number): ScalarSignalMock;
    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     */
    mod(signal: ScalarSignalMock | number): ScalarSignalMock;
    /**
     * @memberof ScalarSignalMock
     */
    abs(): ScalarSignalMock;
    /**
     * @memberof ScalarSignalMock
     */
    round(): ScalarSignalMock;
    /**
     * @memberof ScalarSignalMock
     */
    sign(): ScalarSignalMock;
    /**
     * @memberof ScalarSignalMock
     */
    sqrt(): ScalarSignalMock;
    /**
     * @memberof ScalarSignalMock
     */
    neg(): ScalarSignalMock;
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3} signal
     * @memberof ScalarSignalMock
     */
    atan2(signal: ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @memberof ScalarSignalMock
     */
    ceil(): ScalarSignalMock;
    /**
     * @memberof ScalarSignalMock
     */
    floor(): ScalarSignalMock;
    /**
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3 | Vec2SignalMock | Vector2} min
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3 | Vec2SignalMock | Vector2} max
     * @memberof ScalarSignalMock
     */
    clamp(min: ScalarSignalMock | number | VectorSignalMock | Vector3 | Vec2SignalMock | Vector2, max: ScalarSignalMock | number | VectorSignalMock | Vector3 | Vec2SignalMock | Vector2): ScalarSignalMock;
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3} min
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3} max
     * @memberof ScalarSignalMock
     */
    fromRange(min: ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3, max: ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3} min
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3} max
     * @memberof ScalarSignalMock
     */
    toRange(min: ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3, max: ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     * @returns {BoolSignalMock}
     */
    eq(signal: ScalarSignalMock | number): BoolSignalMock;
    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     * @returns {BoolSignalMock}
     */
    ge(signal: ScalarSignalMock | number): BoolSignalMock;
    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     * @returns {BoolSignalMock}
     */
    gt(signal: ScalarSignalMock | number): BoolSignalMock;
    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     * @returns {BoolSignalMock}
     */
    le(signal: ScalarSignalMock | number): BoolSignalMock;
    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     * @returns {BoolSignalMock}
     */
    lt(signal: ScalarSignalMock | number): BoolSignalMock;
    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     * @returns {BoolSignalMock}
     */
    ne(signal: ScalarSignalMock | number): BoolSignalMock;
    /**
     * @param {{high: number, initialValue?: false | true, low: number}} config
     * @returns {BoolSignalMock}
     */
    schmittTrigger(config: {
        high: number;
        initialValue?: false | true;
        low: number;
    }): BoolSignalMock;
    /**
     * @param {number} threshold
     * @returns
     */
    interval(threshold: number): EventSourceMock;
    /**
     * @memberof ScalarSignalMock
     */
    magnitude(): ScalarSignalMock;
    /**
     * @memberof ScalarSignalMock
     */
    magnitudeSquared(): ScalarSignalMock;
    /**
     * @param {ScalarSignalMock | number} scalar
     * @memberof ScalarSignalMock
     */
    max(scalar: ScalarSignalMock | number): ScalarSignalMock;
    /**
     * @param {ScalarSignalMock | number} scalar
     * @memberof ScalarSignalMock
     */
    min(scalar: ScalarSignalMock | number): ScalarSignalMock;
    /**
     * @param {ScalarSignalMock | number} scalar
     * @param {ScalarSignalMock | number} factor
     * @memberof ScalarSignalMock
     */
    mix(scalar: ScalarSignalMock | number, factor: ScalarSignalMock | number): ScalarSignalMock;
    normalize(): ScalarSignalMock;
    /**
     * @param {ScalarSignalMock | number} max
     * @param {ScalarSignalMock | number} min
     */
    smoothStep(min: ScalarSignalMock | number, max: ScalarSignalMock | number): ScalarSignalMock;
    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     */
    sum(signal: ScalarSignalMock | number): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     *
     * @param {number} threshold
     * @returns
     */
    multiTrigger(threshold: number): EventSourceMock;
    /**
     *
     * @param {number} threshold
     * @returns
     */
    trigger(threshold: number): EventSourceMock;
    pin(): SignalMock;
    pinLastValue(): any;
}
export default ScalarSignalMock;
import SignalMock from "./Signal.mock";
import Vec2SignalMock from "./Vec2Signal.mock";
import VectorSignalMock from "./VectorSignal.mock";
import { Vector2 } from "@areyes-studio/math-module";
import { Vector3 } from "@areyes-studio/math-module";
import BoolSignalMock from "./BoolSignal.mock";
import EventSourceMock from "../Reactive/EventSource.mock";
