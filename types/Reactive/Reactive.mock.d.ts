export class ReactiveMock {
    /**
     * @param {string} name
     * @return {ScalarSignalSourceMock}
     * @memberof ReactiveMock
     */
    static scalarSignalSource(name: string): ScalarSignalSourceMock;
    /**
     * @param {string} name
     * @return {StringSignalSourceMock}
     * @memberof ReactiveMock
     */
    static stringSignalSource(name: string): StringSignalSourceMock;
    /**
     * @param {string} name
     * @return {BoolSignalSourceMock}
     * @memberof ReactiveMock
     */
    static boolSignalSource(name: string): BoolSignalSourceMock;
    /**
     *
     * @param {string | number | boolean} signal
     */
    static val(signal: string | number | boolean): ScalarSignalMock | BoolSignalMock | StringSignalMock;
    /**
     * @param {ScalarSignalMock | number} x
     * @param {ScalarSignalMock | number} y
     * @param {ScalarSignalMock | number} z
     * @return {VectorSignalMock}
     * @memberof ReactiveMock
     */
    static vector(x: ScalarSignalMock | number, y: ScalarSignalMock | number, z: ScalarSignalMock | number): VectorSignalMock;
    /**
     * @param {ScalarSignalMock | number} x
     * @param {ScalarSignalMock | number} y
     * @param {ScalarSignalMock | number} z
     * @return {VectorSignalMock}
     * @memberof ReactiveMock
     */
    static point(x: ScalarSignalMock | number, y: ScalarSignalMock | number, z: ScalarSignalMock | number): VectorSignalMock;
    /**
     * @param {ScalarSignalMock | number} x
     * @param {ScalarSignalMock | number} y
     * @return {Vec2SignalMock}
     * @memberof ReactiveMock
     */
    static point2d(x: ScalarSignalMock | number, y: ScalarSignalMock | number): Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | number} w
     * @param {ScalarSignalMock | number} x
     * @param {ScalarSignalMock | number} y
     * @param {ScalarSignalMock | number} z
     * @return {QuaternionSignalMock}
     * @memberof ReactiveMock
     */
    static quaternion(w: ScalarSignalMock | number, x: ScalarSignalMock | number, y: ScalarSignalMock | number, z: ScalarSignalMock | number): QuaternionSignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} value
     */
    static abs(value: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2
     */
    static add(val1: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, val2: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2
     */
    static sub(val1: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, val2: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2
     */
    static mul(val1: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, val2: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2
     */
    static div(val1: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, val2: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2
     */
    static mod(val1: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, val2: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2
     */
    static pow(val1: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, val2: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     *
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static sqrt(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     *
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static neg(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     *
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static normalize(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2
     */
    static sum(val1: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, val2: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static exp(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static acos(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static asin(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static atan(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static cos(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static tan(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static sin(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static log(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     *
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1
     */
    static atan2(val1: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, val2: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     *
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} min
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} max
     */
    static clamp(val: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, min: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, max: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} edge
     */
    static step(val: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, edge: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} min
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} max
     */
    static smoothStep(val: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, min: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, max: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} min
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} max
     */
    static fromRange(val: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, min: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, max: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     *
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} min
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} max
     */
    static toRange(val: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, min: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, max: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {VectorSignalMock} bool0
     * @param {VectorSignalMock} bool1
     */
    static cross(bool0: VectorSignalMock, bool1: VectorSignalMock): VectorSignalMock;
    /**
     * @param {Vec2SignalMock | VectorSignalMock} vec0
     * @param {Vec2SignalMock | VectorSignalMock} vec1
     */
    static distance(vec0: Vec2SignalMock | VectorSignalMock, vec1: Vec2SignalMock | VectorSignalMock): ScalarSignalMock;
    /**
     * @param {Vec2SignalMock | VectorSignalMock} vec0
     * @param {Vec2SignalMock | VectorSignalMock} vec1
     */
    static dot(vec0: Vec2SignalMock | VectorSignalMock, vec1: Vec2SignalMock | VectorSignalMock): ScalarSignalMock;
    /**
     * @param {Vec2SignalMock | VectorSignalMock} vec0
     * @param {Vec2SignalMock | VectorSignalMock} vec1
     */
    static reflect(vec0: Vec2SignalMock | VectorSignalMock, vec1: Vec2SignalMock | VectorSignalMock): VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static magnitude(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock;
    /**
     *
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static magnitudeSquared(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2
     */
    static max(val1: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, val2: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2
     */
    static min(val1: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, val2: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal0
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal1
     * @param {ScalarSignalMock | number} factor
     */
    static mix(signal0: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, signal1: ScalarSignalMock | Vec2SignalMock | VectorSignalMock, factor: ScalarSignalMock | number): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {BoolSignalMock} bool0
     * @param {BoolSignalMock} bool1
     */
    static and(bool0: BoolSignalMock, bool1: BoolSignalMock): BoolSignalMock;
    /**
     * @param {BoolSignalMock []} boolArray
     */
    static andList(boolArray: BoolSignalMock[]): BoolSignalMock;
    /**
     * @param {BoolSignalMock} bool0
     * @param {BoolSignalMock} bool1
     */
    static or(bool0: BoolSignalMock, bool1: BoolSignalMock): BoolSignalMock;
    /**
     * @param {BoolSignalMock []} boolArray
     */
    static orList(boolArray: BoolSignalMock[]): BoolSignalMock;
    /**
     * @param {BoolSignalMock} bool0
     * @param {BoolSignalMock} bool1
     */
    static xor(bool0: BoolSignalMock, bool1: BoolSignalMock): BoolSignalMock;
    /**
     * @param {BoolSignalMock []} boolArray
     */
    static xorList(boolArray: BoolSignalMock[]): BoolSignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static ceil(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static floor(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static round(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static sign(signal: ScalarSignalMock | Vec2SignalMock | VectorSignalMock): ScalarSignalMock | VectorSignalMock | Vec2SignalMock;
    /**
     * @param {StringSignalMock} str1
     * @param {StringSignalMock} str2
     */
    static concat(str1: StringSignalMock, str2: StringSignalMock): StringSignalMock;
    /**
     * @param {ScalarSignalMock | StringSignalMock | BoolSignalMock} val0
     * @param {ScalarSignalMock | StringSignalMock | BoolSignalMock} val1
     */
    static eq(val0: ScalarSignalMock | StringSignalMock | BoolSignalMock, val1: ScalarSignalMock | StringSignalMock | BoolSignalMock): BoolSignalMock;
    /**
     * @param {ScalarSignalMock | StringSignalMock | BoolSignalMock} val0
     * @param {ScalarSignalMock | StringSignalMock | BoolSignalMock} val1
     */
    static ne(val0: ScalarSignalMock | StringSignalMock | BoolSignalMock, val1: ScalarSignalMock | StringSignalMock | BoolSignalMock): BoolSignalMock;
    /**
     * @param {ScalarSignalMock} val0
     * @param {ScalarSignalMock} val1
     */
    static ge(val0: ScalarSignalMock, val1: ScalarSignalMock): BoolSignalMock;
    /**
     * @param {ScalarSignalMock} val0
     * @param {ScalarSignalMock} val1
     */
    static gt(val0: ScalarSignalMock, val1: ScalarSignalMock): BoolSignalMock;
    /**
     * @param {ScalarSignalMock} val0
     * @param {ScalarSignalMock} val1
     */
    static le(val0: ScalarSignalMock, val1: ScalarSignalMock): BoolSignalMock;
    /**
     * @param {ScalarSignalMock} val0
     * @param {ScalarSignalMock} val1
     */
    static lt(val0: ScalarSignalMock, val1: ScalarSignalMock): BoolSignalMock;
    /**
     * @param {BoolSignalMock} signal
     */
    static not(signal: BoolSignalMock): BoolSignalMock;
    /**
     * @param {BoolSignalMock | StringSignalMock | ScalarSignalMock} bool0
     * @param {BoolSignalMock | StringSignalMock | ScalarSignalMock} bool1
     * @param {BoolSignalMock | StringSignalMock | ScalarSignalMock} elseSignal
     */
    static ifThenElse(bool0: BoolSignalMock | StringSignalMock | ScalarSignalMock, bool1: BoolSignalMock | StringSignalMock | ScalarSignalMock, elseSignal: BoolSignalMock | StringSignalMock | ScalarSignalMock): ScalarSignalMock | BoolSignalMock | StringSignalMock;
    /**
     *
     * @param {ScalarSignalMock} signal
     * @param {{high: number, initialValue?: false | true, low: number}} config
     */
    static schmittTrigger(signal: ScalarSignalMock, config: {
        high: number;
        initialValue?: false | true;
        low: number;
    }): BoolSignalMock;
    static once(): EventSourceMock;
    /**
     * @param {ScalarSignalMock | Vec2SignalMock} val0
     * @param {ScalarSignalMock | Vec2SignalMock} val1
     */
    static pack2(val0: ScalarSignalMock | Vec2SignalMock, val1: ScalarSignalMock | Vec2SignalMock): VectorSignalMock | Vec2SignalMock;
    /**
     * @param {ScalarSignalMock} val0
     * @param {ScalarSignalMock} val1
     * @param {ScalarSignalMock} val2
     */
    static pack3(val0: ScalarSignalMock, val1: ScalarSignalMock, val2: ScalarSignalMock): VectorSignalMock;
    /**
     * @param {ScalarSignalMock} x
     * @param {ScalarSignalMock} y
     * @param {ScalarSignalMock} z
     */
    static scale(x: ScalarSignalMock, y: ScalarSignalMock, z: ScalarSignalMock): VectorSignalMock;
    /**
     * @param {ScalarSignalMock[]} signalArray
     * @param {{ fireOnInitialValue: boolean; }} [config]
     */
    static monitorMany(signalArray: ScalarSignalMock[], config?: {
        fireOnInitialValue: boolean;
    }): EventSourceMock;
    /**
     * @param {ScalarSignalMock} angle
     * @param {VectorSignalMock} axis
     */
    static quaternionFromAngleAxis(angle: ScalarSignalMock, axis: VectorSignalMock): QuaternionSignalMock;
    /**
     * @param {ScalarSignalMock} pitch
     * @param {ScalarSignalMock} yaw
     * @param {ScalarSignalMock} roll
     */
    static quaternionFromEuler(pitch: ScalarSignalMock, yaw: ScalarSignalMock, roll: ScalarSignalMock): QuaternionSignalMock;
    /**
     * @param {VectorSignalMock} from
     * @param {VectorSignalMock} to
     */
    static quaternionFromTo(from: VectorSignalMock, to: VectorSignalMock): QuaternionSignalMock;
    static quaternionIdentity(): QuaternionSignalMock;
    /**
     *
     * @param {VectorSignalMock} targetPos
     * @param {VectorSignalMock} selfUp
     * @param {VectorSignalMock} forward
     */
    static quaternionLookAt(targetPos: VectorSignalMock, selfUp?: VectorSignalMock, forward?: VectorSignalMock): QuaternionSignalMock;
    /**
     * @param {StringSignalMock} cond
     * @param {{[key: string]: string}} map
     * @param {string} defaultVal
     */
    static switch(cond: StringSignalMock, map: {
        [key: string]: string;
    }, defaultVal: string): StringSignalMock;
    /**
     * @param {VectorSignalMock} translation
     * @param {VectorSignalMock} scale
     * @param {QuaternionSignalMock} rotation
     */
    static transform(translation: VectorSignalMock, scale: VectorSignalMock, rotation: QuaternionSignalMock): TransformSignalMock;
}
export default ReactiveMock;
import { ScalarSignalSourceMock } from "./SignalSource.mock";
import { StringSignalSourceMock } from "./SignalSource.mock";
import { BoolSignalSourceMock } from "./SignalSource.mock";
import ScalarSignalMock from "./ScalarSignal.mock";
import BoolSignalMock from "./BoolSignal.mock";
import StringSignalMock from "./StringSignal.mock";
import VectorSignalMock from "./VectorSignal.mock";
import Vec2SignalMock from "./Vec2Signal.mock";
import QuaternionSignalMock from "./QuaternionSignal.mock";
import EventSourceMock from "./EventSource.mock";
import TransformSignalMock from "./TransformSignal.mock";
