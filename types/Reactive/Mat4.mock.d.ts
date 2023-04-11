export class Mat4Mock extends SignalMock {
    /**
     * @static
     * @param {VectorSignalMock} position
     * @param {QuaternionSignalMock} quaternion
     * @param {VectorSignalMock} scale
     * @return {Mat4Mock}
     * @memberof Matrix
     */
    static compose(position: VectorSignalMock, quaternion: QuaternionSignalMock, scale: VectorSignalMock): Mat4Mock;
    /**
     * @param {Matrix} value
     * @memberof Mat4
     */
    constructor(value: Matrix);
    /**
     * @param {Mat4Mock} matrix
     * @memberof Mat4Mock
     */
    multiply(matrix: Mat4Mock): Mat4Mock;
    /**
     * @param {VectorSignalMock} point
     * @memberof Mat4Mock
     */
    transformPoint(point: VectorSignalMock): VectorSignalMock;
    /**
     * @param {VectorSignalMock} vector
     * @memberof Mat4Mock
     */
    transformVector(vector: VectorSignalMock): VectorSignalMock;
    inverse(): Mat4Mock;
    /**
     * @param {VectorSignalMock} target
     * @param {VectorSignalMock} [up=new VectorSignalMock(new Vector3(0, 1, 0))]
     * @return {Mat4Mock}
     * @memberof Mat4Mock
     */
    lookAt(target: VectorSignalMock, up?: VectorSignalMock): Mat4Mock;
    transpose(): Mat4Mock;
}
export default Mat4Mock;
import SignalMock from "./Signal.mock";
import VectorSignalMock from "./VectorSignal.mock";
import QuaternionSignalMock from "./QuaternionSignal.mock";
import { Matrix } from "@areyes-studio/math-module";
