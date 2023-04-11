export class TransformSignalMock extends SignalMock {
    /**
     * @static
     * @param {Mat4} matrix
     * @return {TransformSignalMock}
     * @memberof TransformSignalMock
     */
    static fromMatrix(matrix: Mat4): TransformSignalMock;
    /**
     * @param {{ position: Vector3, rotation: Quaternion, scale: Vector3 }} value
     * @memberof TransformSignalMock
     */
    constructor(value: {
        position: Vector3;
        rotation: Quaternion;
        scale: Vector3;
    });
    _position: VectorSignalMock;
    _rotation: QuaternionSignalMock;
    _scale: VectorSignalMock;
    set position(arg: VectorSignalMock);
    get position(): VectorSignalMock;
    set rotation(arg: QuaternionSignalMock);
    get rotation(): QuaternionSignalMock;
    set scale(arg: VectorSignalMock);
    get scale(): VectorSignalMock;
    set x(arg: import("./ScalarSignal.mock").ScalarSignalMock);
    get x(): import("./ScalarSignal.mock").ScalarSignalMock;
    set y(arg: import("./ScalarSignal.mock").ScalarSignalMock);
    get y(): import("./ScalarSignal.mock").ScalarSignalMock;
    set z(arg: import("./ScalarSignal.mock").ScalarSignalMock);
    get z(): import("./ScalarSignal.mock").ScalarSignalMock;
    set scaleX(arg: import("./ScalarSignal.mock").ScalarSignalMock);
    get scaleX(): import("./ScalarSignal.mock").ScalarSignalMock;
    set scaleY(arg: import("./ScalarSignal.mock").ScalarSignalMock);
    get scaleY(): import("./ScalarSignal.mock").ScalarSignalMock;
    set scaleZ(arg: import("./ScalarSignal.mock").ScalarSignalMock);
    get scaleZ(): import("./ScalarSignal.mock").ScalarSignalMock;
    get forward(): any;
    get right(): any;
    get up(): any;
    /**
     * @param {TransformSignalMock} transform
     * @return {TransformSignalMock}
     * @memberof TransformSignalMock
     */
    applyTo(transform: TransformSignalMock): TransformSignalMock;
    /**
     * @param {VectorSignalMock} point
     * @return {VectorSignalMock}
     * @memberof TransformSignalMock
     */
    applyToPoint(point: VectorSignalMock): VectorSignalMock;
    /**
     * @param {VectorSignalMock} vector
     * @return {VectorSignalMock}
     * @memberof TransformSignalMock
     */
    applyToVector(vector: VectorSignalMock): VectorSignalMock;
    inverse(): TransformSignalMock;
    /**
     *
     *
     * @param {VectorSignalMock} target
     * @param {VectorSignalMock} [up=new VectorSignalMock(new Vector3(0, 1, 0))]
     * @return {TransformSignalMock}
     * @memberof TransformSignalMock
     */
    lookAt(target: VectorSignalMock, up?: VectorSignalMock): TransformSignalMock;
    transpose(): TransformSignalMock;
    toMatrix(): Mat4;
    toSignal(): TransformSignalMock;
}
export default TransformSignalMock;
import SignalMock from "./Signal.mock";
import VectorSignalMock from "./VectorSignal.mock";
import QuaternionSignalMock from "./QuaternionSignal.mock";
import Mat4 from "./Mat4.mock";
import { Vector3 } from "@areyes-studio/math-module";
import Quaternion from "quaternion";
