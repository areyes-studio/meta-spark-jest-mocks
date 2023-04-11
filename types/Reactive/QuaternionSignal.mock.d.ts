export class QuaternionSignalMock extends SignalMock {
    /**
     * @param {Quaternion} value
     * @memberof ScalarSignalMock
     */
    constructor(value: Quaternion);
    _w: ScalarSignalMock;
    _x: ScalarSignalMock;
    _y: ScalarSignalMock;
    _z: ScalarSignalMock;
    /** @type {SubscriptionMock} */
    _reactiveSubscribeW: SubscriptionMock;
    /** @type {SubscriptionMock} */
    _reactiveSubscribeX: SubscriptionMock;
    /** @type {SubscriptionMock} */
    _reactiveSubscribeY: SubscriptionMock;
    /** @type {SubscriptionMock} */
    _reactiveSubscribeZ: SubscriptionMock;
    /** @type {number | ScalarSignalMock | QuaternionSignalMock} */
    _parentSignalW: number | ScalarSignalMock | QuaternionSignalMock;
    /** @type {number | ScalarSignalMock | QuaternionSignalMock} */
    _parentSignalX: number | ScalarSignalMock | QuaternionSignalMock;
    /** @type {number | ScalarSignalMock | QuaternionSignalMock} */
    _parentSignalY: number | ScalarSignalMock | QuaternionSignalMock;
    /** @type {number | ScalarSignalMock | QuaternionSignalMock} */
    _parentSignalZ: number | ScalarSignalMock | QuaternionSignalMock;
    get w(): ScalarSignalMock;
    get x(): ScalarSignalMock;
    get y(): ScalarSignalMock;
    get z(): ScalarSignalMock;
    /**
     * Returns a signal with the value that is the angular distance between this quaternion and the provided quaternion, in radians.
     * signal - the other signal to calculate the angular distance between, as a QuaternionSignal.
     * @param {QuaternionSignalMock} signal
     * @returns ScalarSignalMock
     */
    angleTo(signal: QuaternionSignalMock): ScalarSignalMock;
    /**
     * Returns the rotational conjugate of this quaternion. The conjugate of a quaternion represents the same rotation in the opposite direction about the rotational axis.
     * @returns QuaternionSignalMock
     */
    conjugate(): QuaternionSignalMock;
    /**
     * Returns a scalar signal with the value that is the dot product of the given signals.
     * signal - the other to use in the dot product operation, as a QuaternionSignal.
     * @param {QuaternionSignalMock} signal
     * @returns ScalarSignalMock
     */
    dot(signal: QuaternionSignalMock): ScalarSignalMock;
    /**
     * Returns the rotational conjugate of this quaternion. The conjugate of a quaternion represents the same rotation in the opposite direction about the rotational axis.
     * @returns QuaternionSignalMock
     */
    invert(): QuaternionSignalMock;
    /**
     * Returns a signal with the value that is the product of the values of the given signals.
     * signal - the other signal to use in the multiplication operation, as a QuaternionSignal.
     * @param {QuaternionSignalMock} signal
     * @returns QuaternionSignalMock
     */
    mul(signal: QuaternionSignalMock): QuaternionSignalMock;
    /**
     * pin the signal
     * @returns QuaternionSignalMock
     */
    pinLastValue(): QuaternionSignalMock;
    /**
     * @param {number | ScalarSignalMock} value
     * @memberof QuaternionMocksignal
     */
    mockUpdateW(value: number | ScalarSignalMock): Promise<void>;
    /**
     * @param {number | ScalarSignalMock} value
     * @memberof QuaternionMocksignal
     */
    mockUpdateX(value: number | ScalarSignalMock): Promise<void>;
    /**
     * @param {number | ScalarSignalMock} value
     * @memberof QuaternionMocksignal
     */
    mockUpdateY(value: number | ScalarSignalMock): Promise<void>;
    /**
     * @param {number | ScalarSignalMock} value
     * @memberof QuaternionMocksignal
     */
    mockUpdateZ(value: number | ScalarSignalMock): Promise<void>;
    /**
     * @override
     * @param {QuaternionSignalMock | Quaternion} value
     * @memberof VectorSignalMock
     */
    override mockUpdate(value: QuaternionSignalMock | Quaternion): Promise<void>;
    _update(): Promise<void>;
}
export default QuaternionSignalMock;
import SignalMock from "./Signal.mock";
import ScalarSignalMock from "./ScalarSignal.mock";
import SubscriptionMock from "./Subscription.mock";
import Quaternion from "quaternion";
