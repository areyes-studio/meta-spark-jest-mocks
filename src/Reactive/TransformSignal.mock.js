
import Quaternion from "quaternion";
import VectorSignalMock from "./VectorSignal.mock";
import QuaternionSignalMock from "./QuaternionSignal.mock";
import Reactive from "./Reactive.mock";
import Mat4 from "./Mat4.mock";
import SignalMock from "./Signal.mock";

import { Vector3 } from '@areyes-studio/math-module';

export default class TransformSignalMock extends SignalMock {
    /**
     * @param {{ position: Vector3, rotation: Quaternion, scale: Vector3 }} value
     * @memberof TransformSignalMock
     */
    constructor(value) {
        super(value);

        this._position = new VectorSignalMock(this.value.position);
        this._rotation = new QuaternionSignalMock(this.value.rotation);
        this._scale = new VectorSignalMock(this.value.scale);

        this.monitor().subscribe(async () => {
            await this._position.mockUpdate(this.value.position);
            await this._rotation.mockUpdate(this.value.rotation);
            await this._scale.mockUpdate(this.value.scale);
        })
    }

    get position() { return this._position }

    set position(position) {
        this._position.mockUpdate(position);
    }

    get rotation() { return this._rotation }

    set rotation(rotation) {
        this._rotation.mockUpdate(rotation);
    }

    get scale() { return this._scale }

    set scale(scale) {
        this._scale.mockUpdate(scale);
    }

    get x() { return this.position.x }
    set x(value) { this.position.mockUpdateX(value) }

    get y() { return this.position.y }
    set y(value) { this.position.mockUpdateY(value) }

    get z() { return this.position.z }
    set z(value) { this.position.mockUpdateZ(value) }

    // get rotationX() { return this.rotation.eulerAngles.x }
    // get rotationY() { return this.rotation.eulerAngles.y }
    // get rotationZ() { return this.rotation.eulerAngles.z }

    get scaleX() { return this.scale.x }
    set scaleX(value) { this.scale.mockUpdateX(value) }

    get scaleY() { return this.scale.y }
    set scaleY(value) { this.scale.mockUpdateY(value) }

    get scaleZ() { return this.scale.z }
    set scaleZ(value) { this.scale.mockUpdateZ(value) }

    get forward() {
        // @ts-ignore
        return rotateVector(Reactive.vector(0, 0, -1), this.rotation);
    }

    get right() {
        // @ts-ignore
        return rotateVector(Reactive.vector(1, 0, 0), this.rotation);
    }

    get up() {
        // @ts-ignore
        return rotateVector(Reactive.vector(0, 1, 0), this.rotation);
    }

    /**
     * @param {TransformSignalMock} transform
     * @return {TransformSignalMock} 
     * @memberof TransformSignalMock
     */
    applyTo(transform) {
        return TransformSignalMock.fromMatrix(this.toMatrix().multiply(transform.toMatrix()));
    }

    /**
     * @param {VectorSignalMock} point
     * @return {VectorSignalMock} 
     * @memberof TransformSignalMock
     */
    applyToPoint(point) {
        return this.toMatrix().transformPoint(point);
    }

    /**
     * @param {VectorSignalMock} vector
     * @return {VectorSignalMock} 
     * @memberof TransformSignalMock
     */
    applyToVector(vector) {
        return this.toMatrix().transformVector(vector);
    }

    inverse() {
        return TransformSignalMock.fromMatrix(this.toMatrix().inverse());
    }

    /**
     *
     *
     * @param {VectorSignalMock} target
     * @param {VectorSignalMock} [up=new VectorSignalMock(new Vector3(0, 1, 0))]
     * @return {TransformSignalMock} 
     * @memberof TransformSignalMock
     */
    lookAt(target, up = new VectorSignalMock(new Vector3(0, 1, 0))) {
        return TransformSignalMock.fromMatrix(this.toMatrix().lookAt(target, up));
    }

    transpose() {
        return TransformSignalMock.fromMatrix(this.toMatrix().transpose());
    }

    toMatrix() {
        return Mat4.compose(
            this.position,
            this.rotation,
            this.scale
        );
    }

    /**
     * @static
     * @param {Mat4} matrix
     * @return {TransformSignalMock} 
     * @memberof TransformSignalMock
     */
    static fromMatrix(matrix) {
        function callback() {
            const te = matrix.value.elements;

            // Extract the position, rotation, and scale from the given matrix
            const position = new Vector3(te[12], te[13], te[14]);

            const scale = new Vector3(
                Math.sqrt(te[0] * te[0] + te[1] * te[1] + te[2] * te[2]),
                Math.sqrt(te[4] * te[4] + te[5] * te[5] + te[6] * te[6]),
                Math.sqrt(te[8] * te[8] + te[9] * te[9] + te[10] * te[10])
            );

            let w = 0,
                x = 0,
                y = 0,
                z = 0;

            const invSX = 1 / scale.x;
            const invSY = 1 / scale.y;
            const invSZ = 1 / scale.z;

            const m11 = te[0] * invSX, m12 = te[4] * invSY, m13 = te[8] * invSZ;
            const m21 = te[1] * invSX, m22 = te[5] * invSY, m23 = te[9] * invSZ;
            const m31 = te[2] * invSX, m32 = te[6] * invSY, m33 = te[10] * invSZ;

            const trace = m11 + m22 + m33;

            if (trace > 0) {
                const s = 0.5 / Math.sqrt(trace + 1.0);

                w = 0.25 / s;
                x = (m32 - m23) * s;
                y = (m13 - m31) * s;
                z = (m21 - m12) * s;

            } else if (m11 > m22 && m11 > m33) {
                const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

                w = (m32 - m23) / s;
                x = 0.25 * s;
                y = (m12 + m21) / s;
                z = (m13 + m31) / s;

            } else if (m22 > m33) {
                const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

                w = (m13 - m31) / s;
                x = (m12 + m21) / s;
                y = 0.25 * s;
                z = (m23 + m32) / s;

            } else {
                const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

                w = (m21 - m12) / s;
                x = (m13 + m31) / s;
                y = (m23 + m32) / s;
                z = 0.25 * s;
            }

            const rotation = new Quaternion(w, x, y, z)

            return { position: position, rotation: rotation, scale: scale };
        }

        matrix.monitor().subscribe(async () => {
            await transformSignal.mockUpdate(callback());
        })

        let transformSignal = new TransformSignalMock(callback());

        return transformSignal;
    }

    toSignal() {
        return this;
    }
}

/**
 * @param {VectorSignalMock} vector
 * @param {QuaternionSignalMock} rotation
 * @return {*} 
 */
function rotateVector(vector, rotation) {
    let point_q = Reactive.quaternion(0, vector.x, vector.y, vector.z);
    return rotation.mul(point_q).mul(rotation.conjugate());
}