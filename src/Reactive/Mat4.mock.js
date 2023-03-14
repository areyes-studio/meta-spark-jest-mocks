import VectorSignalMock from "./VectorSignal.mock";
import QuaternionSignalMock from "./QuaternionSignal.mock";
import SignalMock from "./Signal.mock";

import { Vector3, Matrix } from '@areyes-studio/math-module';

export default class Mat4Mock extends SignalMock {
    /**
     * @param {Matrix} value
     * @memberof Mat4
     */
    constructor(value) {
        super(value);
    }

    /**
     * @param {Mat4Mock} matrix
     * @memberof Mat4Mock
     */
    multiply(matrix) {
        let mat4 = new Mat4Mock(this.value.multiply(matrix.value));

        this.monitor().subscribe(async () => {
            await mat4.mockUpdate(this.value.multiply(matrix.value))
        })

        matrix.monitor().subscribe(async () => {
            await mat4.mockUpdate(this.value.multiply(matrix.value))
        })

        return mat4;
    }

    /**
     * @param {VectorSignalMock} point
     * @memberof Mat4Mock
     */
    transformPoint(point) {
        let callback = () => {
            return this.value.transformPoint(point.value);
        }

        let pointSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await pointSignal.mockUpdate(callback())
        })

        point.monitor().subscribe(async () => {
            await pointSignal.mockUpdate(callback())
        })

        return pointSignal;
    }

    /**
     * @param {VectorSignalMock} vector
     * @memberof Mat4Mock
     */
    transformVector(vector) {
        let callback = () => {
            return this.value.transformVector(vector.value);
        }

        let vectorSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await vectorSignal.mockUpdate(callback())
        })

        vector.monitor().subscribe(async () => {
            await vectorSignal.mockUpdate(callback())
        })

        return vectorSignal;
    }

    inverse() {
        let mat4 = new Mat4Mock(this.value.inverse());

        this.monitor().subscribe(async () => {
            await mat4.mockUpdate(this.value.inverse())
        })

        return mat4;
    }


    /**
     * @param {VectorSignalMock} target
     * @param {VectorSignalMock} [up=new VectorSignalMock(new Vector3(0, 1, 0))]
     * @return {Mat4Mock} 
     * @memberof Mat4Mock
     */
    lookAt(target, up = new VectorSignalMock(new Vector3(0, 1, 0))) {
        let callback = () => {
            return this.value.lookAt(target.value, up.value);
        }

        let mat4 = new Mat4Mock(callback());

        this.monitor().subscribe(async () => {
            await mat4.mockUpdate(callback())
        })

        target.monitor().subscribe(async () => {
            await mat4.mockUpdate(callback())
        })

        up.monitor().subscribe(async () => {
            await mat4.mockUpdate(callback())
        })

        return mat4;
    }


    transpose() {
        let mat4 = new Mat4Mock(this.value.transpose());

        this.monitor().subscribe(async () => {
            await mat4.mockUpdate(this.value.transpose())
        })

        return mat4;
    }

    /**
     * @static
     * @param {VectorSignalMock} position
     * @param {QuaternionSignalMock} quaternion
     * @param {VectorSignalMock} scale
     * @return {Mat4Mock} 
     * @memberof Matrix
     */
    static compose(position, quaternion, scale) {
        function callback() { return Matrix.compose(position.value, quaternion.value, scale.value) }
        async function update() { await mat4.mockUpdate(callback()) }

        let mat4 = new Mat4Mock(callback());

        position.monitor().subscribe(update)
        quaternion.monitor().subscribe(update)
        scale.monitor().subscribe(update)

        return mat4;
    }
}