import SignalMock from './Signal.mock';
import ScalarSignalMock from './ScalarSignal.mock';
import Quaternion from 'quaternion';
import SubscriptionMock from './Subscription.mock';

export class QuaternionSignalMock extends SignalMock {
    /**
     * @param {Quaternion} value
     * @memberof ScalarSignalMock
     */
    constructor(value) {
        super(value);

        this._w = new ScalarSignalMock(this.value.w)
        this._x = new ScalarSignalMock(this.value.x);
        this._y = new ScalarSignalMock(this.value.y);
        this._z = new ScalarSignalMock(this.value.z);

        this.monitor().subscribe(async () => {
            await this._w.mockUpdate(this.value.w);
            await this._x.mockUpdate(this.value.x);
            await this._y.mockUpdate(this.value.y);
            await this._z.mockUpdate(this.value.z);
        })

        /** @type {SubscriptionMock} */
        this._reactiveSubscribeW = null;

        /** @type {SubscriptionMock} */
        this._reactiveSubscribeX = null;

        /** @type {SubscriptionMock} */
        this._reactiveSubscribeY = null;

        /** @type {SubscriptionMock} */
        this._reactiveSubscribeZ = null;

        /** @type {number | ScalarSignalMock | QuaternionSignalMock} */
        this._parentSignalW = value.w;

        /** @type {number | ScalarSignalMock | QuaternionSignalMock} */
        this._parentSignalX = value.x;
        /** @type {number | ScalarSignalMock | QuaternionSignalMock} */
        this._parentSignalY = value.y;
        /** @type {number | ScalarSignalMock | QuaternionSignalMock} */
        this._parentSignalZ = value.z;
    }

    get w() {
        return this._w;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get z() {
        return this._z;
    }

    /**
     * Returns a signal with the value that is the angular distance between this quaternion and the provided quaternion, in radians.
     * signal - the other signal to calculate the angular distance between, as a QuaternionSignal.
     * @param {QuaternionSignalMock} signal 
     * @returns ScalarSignalMock
     */
    angleTo(signal) {
        let callback = () => {
            return this.value.sub(signal).norm()
        }

        let newSignal = new ScalarSignalMock(callback());

        monitor(this, signal, null, newSignal, callback);
        return newSignal;
    }

    /**
     * Returns the rotational conjugate of this quaternion. The conjugate of a quaternion represents the same rotation in the opposite direction about the rotational axis.
     * @returns QuaternionSignalMock
     */
    conjugate() {
        let callback = () => {
            return this.value.conjugate()
        }

        let newSignal = new QuaternionSignalMock(callback());

        monitor(this, null, null, newSignal, callback);

        return newSignal;
    }

    /**
     * Returns a scalar signal with the value that is the dot product of the given signals.
     * signal - the other to use in the dot product operation, as a QuaternionSignal.
     * @param {QuaternionSignalMock} signal 
     * @returns ScalarSignalMock
     */
    dot(signal) {
        let callback = () => {
            return this.value.dot(signal.value)
        }

        let newSignal = new ScalarSignalMock(callback());

        monitor(this, signal, null, newSignal, callback);
        return newSignal;
    }

    /**
     * Returns the rotational conjugate of this quaternion. The conjugate of a quaternion represents the same rotation in the opposite direction about the rotational axis.
     * @returns QuaternionSignalMock
     */
    invert() {
        let callback = () => {
            this.value.x = -this.value.x
            this.value.y = -this.value.y
            this.value.z = -this.value.z
            this.value.w = this.value.w

            return this.value
        }

        let newSignal = new QuaternionSignalMock(callback());

        monitor(this, null, null, newSignal, callback);
        return newSignal;
    }

    /**
     * Returns a signal with the value that is the product of the values of the given signals.
     * signal - the other signal to use in the multiplication operation, as a QuaternionSignal.
     * @param {QuaternionSignalMock} signal 
     * @returns QuaternionSignalMock
     */
    mul(signal) {
        let callback = () => {
            return this.value.mul(signal.value)
        }

        let newSignal = new QuaternionSignalMock(callback())

        monitor(this, signal, null, newSignal, callback)
        return newSignal;
    }

    /**
     * pin the signal
     * @returns QuaternionSignalMock
     */
    pinLastValue() {
        return new QuaternionSignalMock(this.value)
    }

    /**
     * @param {number | ScalarSignalMock} value
     * @memberof QuaternionMocksignal
     */
    async mockUpdateW(value) {
        if (this._reactiveSubscribeW) this._reactiveSubscribeW.unsubscribe();

        this._parentSignalW = value;

        if (value instanceof ScalarSignalMock) {
            this._reactiveSubscribeW = value.monitor().subscribe(async () => {
                await this._update();
            })
        }

        await this._update();
    }

    /**
     * @param {number | ScalarSignalMock} value
     * @memberof QuaternionMocksignal
     */
    async mockUpdateX(value) {
        if (this._reactiveSubscribeX) this._reactiveSubscribeX.unsubscribe();

        this._parentSignalX = value;

        if (value instanceof ScalarSignalMock) {
            this._reactiveSubscribeX = value.monitor().subscribe(async () => {
                await this._update();
            })
        }

        await this._update();
    }

    /**
     * @param {number | ScalarSignalMock} value
     * @memberof QuaternionMocksignal
     */
    async mockUpdateY(value) {
        if (this._reactiveSubscribeY) this._reactiveSubscribeY.unsubscribe();

        this._parentSignalY = value;

        if (value instanceof ScalarSignalMock) {
            this._reactiveSubscribeY = value.monitor().subscribe(async () => {
                await this._update();
            })
        }

        await this._update();
    }

    /**
     * @param {number | ScalarSignalMock} value
     * @memberof QuaternionMocksignal
     */
    async mockUpdateZ(value) {
        if (this._reactiveSubscribeZ) this._reactiveSubscribeZ.unsubscribe();

        this._parentSignalZ = value;

        if (value instanceof ScalarSignalMock) {
            this._reactiveSubscribeZ = value.monitor().subscribe(async () => {
                await this._update();
            })
        }

        await this._update();
    }

    /**
     * @override
     * @param {QuaternionSignalMock | Quaternion} value
     * @memberof VectorSignalMock
     */
    async mockUpdate(value) {
        if (this._reactiveSubscribe) this._reactiveSubscribe.unsubscribe();
        if (this._reactiveSubscribeW) this._reactiveSubscribeW.unsubscribe();
        if (this._reactiveSubscribeX) this._reactiveSubscribeX.unsubscribe();
        if (this._reactiveSubscribeY) this._reactiveSubscribeY.unsubscribe();
        if (this._reactiveSubscribeZ) this._reactiveSubscribeZ.unsubscribe();

        this._parentSignalW = value instanceof QuaternionSignalMock ? value : value.w;
        this._parentSignalX = value instanceof QuaternionSignalMock ? value : value.x;
        this._parentSignalY = value instanceof QuaternionSignalMock ? value : value.y;
        this._parentSignalZ = value instanceof QuaternionSignalMock ? value : value.z;

        if (value instanceof QuaternionSignalMock) {
            this._reactiveSubscribe = value.monitor().subscribe(async () => {
                if (this._parentSignalW !== value && this._parentSignalX !== value && this._parentSignalY !== value && this._parentSignalZ !== value)
                    this._reactiveSubscribe.unsubscribe();
                else
                    await this._update();
            })
        }

        await this._update();
    }

    async _update() {
        let newValue = new Quaternion(
            this._parentSignalW instanceof QuaternionSignalMock ? this._parentSignalW.value.w
                : (this._parentSignalW instanceof ScalarSignalMock ? this._parentSignalW.value : this._parentSignalW),

            this._parentSignalX instanceof QuaternionSignalMock ? this._parentSignalX.value.x
                : (this._parentSignalX instanceof ScalarSignalMock ? this._parentSignalX.value : this._parentSignalX),

            this._parentSignalY instanceof QuaternionSignalMock ? this._parentSignalY.value.y
                : (this._parentSignalY instanceof ScalarSignalMock ? this._parentSignalY.value : this._parentSignalY),

            this._parentSignalZ instanceof QuaternionSignalMock ? this._parentSignalZ.value.z
                : (this._parentSignalZ instanceof ScalarSignalMock ? this._parentSignalZ.value : this._parentSignalZ),
        )

        if (this._value.w !== newValue.w || this._value.x !== newValue.x || this._value.y !== newValue.y || this._value.z !== newValue.z) {
            const event = {
                oldValue: this._value,
                newValue: newValue,
            };

            this._value = newValue;

            for (const eventSource of this._eventSources) {
                await eventSource.mockCallback(event);
            }
        }
    }


    // slerp bag in Quatenion uncomment when the bag will be fixed add to the test
    // /** 
    //  * Returns a signal with the value that is the spherical linear interpolation between this and another signal by a given factor.
    //  * signal - the other signal to interpolate between, as a QuaternionSignal.
    //  * factor - the factor to interpolate by, as a ScalarSignal or numbe
    //  * @param {QuaternionSignalMock} signal
    //  * @param {ScalarSignalMock | number} factor
    //  * @returns QuaternionSignalMock
    //  */
    // slerp(signal, factor) {
    //     let callback = () => {
    //         return ((typeof factor === 'number') ? this.value.slerp(signal.value, factor) : this.value.slerp(signal.value, factor.value))
    //     }

    //     let newSignal = new QuaternionSignalMock(callback());
    //     //console.log('slerp ' +  this.value.slerp(signal.value, factor.value).x) 
    //     //console.log('slrp Quat' + newSignal)
    //     monitor(this, signal, factor, newSignal, callback);
    //     return newSignal;
    // }
}

/**
 * @param {SignalMock} outputSignal
 * @param {SignalMock | boolean | string | number | null} inputFirstSignal
 * @param {SignalMock | boolean | string | number | null} inputSecondSignal
 * @param {SignalMock} newOwnsignal
 * @param {Function} callback
 */
function monitor(outputSignal, inputFirstSignal, inputSecondSignal, newOwnsignal, callback) {
    outputSignal.monitor().subscribe(async () => {
        await newOwnsignal.mockUpdate(callback())
    })

    if (typeof inputFirstSignal !== 'string' && typeof inputFirstSignal !== 'number' && typeof inputFirstSignal !== 'boolean' && inputFirstSignal !== null && inputFirstSignal !== undefined) {
        inputFirstSignal.monitor().subscribe(async () => {
            await newOwnsignal.mockUpdate(callback())
        })
    }

    if (typeof inputSecondSignal !== 'string' && typeof inputSecondSignal !== 'number' && typeof inputSecondSignal !== 'boolean' && inputSecondSignal !== null && inputSecondSignal !== undefined) {
        inputSecondSignal.monitor().subscribe(async () => {
            await newOwnsignal.mockUpdate(callback())
        })
    }
}

export default QuaternionSignalMock