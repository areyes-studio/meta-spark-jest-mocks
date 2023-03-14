import ScalarSignalMock from './ScalarSignal.mock';
import SignalMock from './Signal.mock';
import QuaternionSignalMock from './QuaternionSignal.mock';
import Vec2SignalMock from './Vec2Signal.mock';
import SubscriptionMock from './Subscription.mock';

import { Vector3, Vector2 } from '@areyes-studio/math-module';

export default class VectorSignalMock extends SignalMock {
    /**
     * @param {Vector3} value
     * @memberof VectorSignalMock
     */
    constructor(value) {
        super(value);

        this._x = new ScalarSignalMock(this.value.x);
        this._y = new ScalarSignalMock(this.value.y);
        this._z = new ScalarSignalMock(this.value.z);

        this.monitor().subscribe(async () => {
            await this._x.mockUpdate(this.value.x);
            await this._y.mockUpdate(this.value.y);
            await this._z.mockUpdate(this.value.z);
        })

        /** @type {SubscriptionMock} */
        this._reactiveSubscribeX = null;

        /** @type {SubscriptionMock} */
        this._reactiveSubscribeY = null;

        /** @type {SubscriptionMock} */
        this._reactiveSubscribeZ = null;

        /** @type {number | ScalarSignalMock | VectorSignalMock} */
        this._parentSignalX = value.x;
        /** @type {number | ScalarSignalMock | VectorSignalMock} */
        this._parentSignalY = value.y;
        /** @type {number | ScalarSignalMock | VectorSignalMock} */
        this._parentSignalZ = value.z
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
     * Gets absolute value of each vector coordinate and returns new VectorSignalMock
     */
    abs() {
        let callback = () => {
            let x = Math.abs(this.x.value);
            let y = Math.abs(this.y.value);
            let z = Math.abs(this.z.value);
            return new Vector3(x, y, z);
        }
        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @param {Vector3 | VectorSignalMock | ScalarSignalMock | number} signal 
     */
    add(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let x = this.x.value + (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value + (typeof signal === 'number' ? signal : signal.value);
                let z = this.z.value + (typeof signal === 'number' ? signal : signal.value);
                return new Vector3(x, y, z)
            } else {
                let x = this.x.value + (signal instanceof Vector3 ? signal.x : signal.x.value);
                let y = this.y.value + (signal instanceof Vector3 ? signal.y : signal.y.value);
                let z = this.z.value + (signal instanceof Vector3 ? signal.z : signal.z.value);
                return new Vector3(x, y, z)
            }
        };

        let newSignal = new VectorSignalMock(callback());

        if (signal instanceof Vector3 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vector3 | VectorSignalMock | ScalarSignalMock | number} signal 
     */
    sub(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let x = this.x.value - (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value - (typeof signal === 'number' ? signal : signal.value);
                let z = this.z.value - (typeof signal === 'number' ? signal : signal.value);
                return new Vector3(x, y, z)
            } else {
                let x = this.x.value - (signal instanceof Vector3 ? signal.x : signal.x.value);
                let y = this.y.value - (signal instanceof Vector3 ? signal.y : signal.y.value);
                let z = this.z.value - (signal instanceof Vector3 ? signal.z : signal.z.value);
                return new Vector3(x, y, z)
            }
        };

        let newSignal = new VectorSignalMock(callback());

        if (signal instanceof Vector3 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * Multiplies the vector by the number or ScalarSignalMock and returns the vector
     * @param {number | ScalarSignalMock | VectorSignalMock | Vector3} signal 
     */
    mul(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let x = this.x.value * (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value * (typeof signal === 'number' ? signal : signal.value);
                let z = this.z.value * (typeof signal === 'number' ? signal : signal.value);
                return new Vector3(x, y, z)
            } else {
                let x = this.x.value * (typeof signal.x === 'number' ? signal.x : signal.x.value);
                let y = this.y.value * (typeof signal.y === 'number' ? signal.y : signal.y.value);
                let z = this.z.value * (typeof signal.z === 'number' ? signal.z : signal.z.value);
                return new Vector3(x, y, z)
            }

        };

        let newSignal = new VectorSignalMock(callback());

        if (typeof signal === 'number' || signal instanceof Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {number | ScalarSignalMock | VectorSignalMock | Vector3} signal 
     */
    div(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let x = this.x.value / (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value / (typeof signal === 'number' ? signal : signal.value);
                let z = this.z.value / (typeof signal === 'number' ? signal : signal.value);

                return new Vector3(x, y, z)
            } else {
                let signalX = typeof signal.x === 'number' ? signal.x : signal.x.value;
                let signalY = typeof signal.y === 'number' ? signal.y : signal.y.value;
                let signalZ = typeof signal.z === 'number' ? signal.z : signal.z.value;

                let x = this.x.value / signalX;
                let y = this.y.value / signalY;
                let z = this.z.value / signalZ;
                return new Vector3(x, y, z)
            }

        };

        let newSignal = new VectorSignalMock(callback());

        if (typeof signal === 'number' || signal instanceof Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vector3 | VectorSignalMock} signal 
     */
    pow(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let x = this.x.value ** (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value ** (typeof signal === 'number' ? signal : signal.value);
                let z = this.z.value ** (typeof signal === 'number' ? signal : signal.value);
                return new Vector3(x, y, z)
            } else {
                let x = this.x.value ** (signal instanceof Vector3 ? signal.x : signal.x.value);
                let y = this.y.value ** (signal instanceof Vector3 ? signal.y : signal.y.value);
                let z = this.z.value ** (signal instanceof Vector3 ? signal.z : signal.z.value);
                return new Vector3(x, y, z)
            }

        };

        let newSignal = new VectorSignalMock(callback());

        if (signal instanceof Vector3 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    sqrt() {
        let callback = () => {
            let newX = Math.sqrt(this.value.x);
            let newY = Math.sqrt(this.value.y);
            let newZ = Math.sqrt(this.value.z);
            return new Vector3(newX, newY, newZ)
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    neg() {
        let callback = () => {
            let x = this.x.value * (-1);
            let y = this.y.value * (-1);
            let z = this.z.value * (-1);

            return new Vector3(x, y, z)
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    round() {
        let callback = () => {
            let x = Math.round(this.x.value);
            let y = Math.round(this.y.value);
            let z = Math.round(this.z.value);

            return new Vector3(x, y, z)
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    sign() {
        let callback = () => {
            let x = Math.sign(this.x.value);
            let y = Math.sign(this.y.value);
            let z = Math.sign(this.z.value);

            return new Vector3(x, y, z)
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    normalize() {
        let callback = () => {
            let x = this.x.value / this.magnitude().value;
            let y = this.y.value / this.magnitude().value;
            let z = this.z.value / this.magnitude().value;

            return new Vector3(x, y, z)
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }


    /**
     * @param {Vector3 | VectorSignalMock} signal 
     */
    cross(signal) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;
            let thisZ = this.z.value;

            let signalX = signal instanceof Vector3 ? signal.x : signal.x.value;
            let signalY = signal instanceof Vector3 ? signal.y : signal.y.value;
            let signalZ = signal instanceof Vector3 ? signal.z : signal.z.value;

            let x = thisY * signalZ - thisZ * signalY;
            let y = thisZ * signalX - thisX * signalZ;
            let z = thisX * signalY - thisY * signalX;

            return new Vector3(x, y, z)
        };

        let newSignal = new VectorSignalMock(callback());

        if (signal instanceof Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vector3 | VectorSignalMock} signal
     * @returns {ScalarSignalMock}
     */
    dot(signal) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;
            let thisZ = this.z.value;

            let signalX = signal instanceof Vector3 ? signal.x : signal.x.value;
            let signalY = signal instanceof Vector3 ? signal.y : signal.y.value;
            let signalZ = signal instanceof Vector3 ? signal.z : signal.z.value;

            return thisX * signalX + thisY * signalY + thisZ * signalZ;
        };

        let newSignal = new ScalarSignalMock(callback());

        if (signal instanceof Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @returns {ScalarSignalMock}
     */
    magnitude() {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;
            let thisZ = this.z.value;

            return Math.sqrt(thisX ** 2 + thisY ** 2 + thisZ ** 2);
        };

        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @returns {ScalarSignalMock}
     */
    magnitudeSquared() {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;
            let thisZ = this.z.value;

            return thisX ** 2 + thisY ** 2 + thisZ ** 2;
        };

        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * 
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3} signal 
     */
    atan2(signal) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;
            let thisZ = this.z.value;

            if (signal instanceof VectorSignalMock || signal instanceof Vector3) {
                let signalX = signal instanceof Vector3 ? signal.x : signal.value.x;
                let signalY = signal instanceof Vector3 ? signal.y : signal.value.y;
                let signalZ = signal instanceof Vector3 ? signal.z : signal.value.z;

                return new Vector3(
                    Math.atan2(signalX, thisX),
                    Math.atan2(signalY, thisY),
                    Math.atan2(signalZ, thisZ)
                )
            } else {
                let signalVal = typeof signal === 'number' ? signal : signal.value;

                return new Vector3(
                    Math.atan2(signalVal, thisX),
                    Math.atan2(signalVal, thisY),
                    Math.atan2(signalVal, thisZ)
                )
            }
        };

        let newSignal = new VectorSignalMock(callback());

        if (typeof signal === 'number' || signal instanceof Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @returns {VectorSignalMock}
     */
    ceil() {
        let callback = () => {
            let x = Math.ceil(this.x.value);
            let y = Math.ceil(this.y.value);
            let z = Math.ceil(this.z.value);

            return new Vector3(x, y, z);
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @returns {VectorSignalMock}
     */
    floor() {
        let callback = () => {
            let x = Math.floor(this.x.value);
            let y = Math.floor(this.y.value);
            let z = Math.floor(this.z.value);

            return new Vector3(x, y, z);
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * 
     * @param {ScalarSignalMock | number | Vector3 | VectorSignalMock} min 
     * @param {ScalarSignalMock | number | Vector3 | VectorSignalMock} max 
     */
    clamp(min, max) {
        let callback = () => {
            let newThisX = this.value.x;
            let newThisY = this.value.y;
            let newThisZ = this.value.z;

            let caseMinScalar = min instanceof ScalarSignalMock || typeof min === 'number';
            let caseMaxScalar = max instanceof ScalarSignalMock || typeof max === 'number';
            let caseMinVec2 = min instanceof Vector2 || min instanceof Vec2SignalMock;
            let caseMaxVec2 = max instanceof Vector2 || max instanceof Vec2SignalMock;
            let caseMinVec3 = min instanceof Vector3 || min instanceof VectorSignalMock;
            let caseMaxVec3 = max instanceof Vector3 || max instanceof VectorSignalMock;

            let errorCase0 = caseMinScalar && caseMaxVec2;
            let errorCase1 = caseMinScalar && caseMaxVec3;
            let errorCase2 = caseMinVec2 && caseMaxScalar;
            let errorCase3 = caseMinVec2 && caseMaxVec3;
            let errorCase4 = caseMinVec3 && caseMaxScalar;
            let errorCase5 = caseMinVec3 && caseMaxVec2;
            let errorCase6 = caseMinVec2 && caseMaxVec2;

            if (errorCase0 || errorCase1 || errorCase2 || errorCase3 || errorCase4 || errorCase5 || errorCase6) {
                throw new Error('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types')
            } else {
                /**@type {number} */
                let x, y, z;

                if (caseMinScalar && caseMaxScalar) {
                    // @ts-ignore
                    let valMin = typeof min === 'number' ? min : min.value;
                    // @ts-ignore
                    let valMax = typeof max === 'number' ? max : max.value;

                    if (valMin >= valMax) { x = valMax; y = valMax; z = valMax }
                    else {
                        if (newThisX <= valMin) x = valMin;
                        if (newThisX >= valMax) x = valMax;
                        if ((newThisX > valMin) && (newThisX < valMax)) x = this.value.x;

                        if (newThisY <= valMin) y = valMin;
                        if (newThisY >= valMax) y = valMax;
                        if ((newThisX > valMin) && (newThisX < valMax)) y = this.value.y;

                        if (newThisZ <= valMin) z = valMin;
                        if (newThisZ >= valMax) z = valMax;
                        if ((newThisZ > valMin) && (newThisZ < valMax)) z = this.value.z;
                    }
                }
                if (caseMinVec3 && caseMaxVec3) {
                    // @ts-ignore
                    let valMinX = min instanceof Vector3 ? min.x : min.value.x;
                    // @ts-ignore
                    let valMaxX = max instanceof Vector3 ? max.x : max.value.x;
                    // @ts-ignore
                    let valMinY = min instanceof Vector3 ? min.y : min.value.y;
                    // @ts-ignore
                    let valMaxY = max instanceof Vector3 ? max.y : max.value.y;
                    // @ts-ignore
                    let valMinZ = min instanceof Vector3 ? min.z : min.value.z;
                    // @ts-ignore
                    let valMaxZ = max instanceof Vector3 ? max.z : max.value.z;

                    if (valMinX >= valMaxX) x = valMaxX;
                    else {
                        if (newThisX <= valMinX) x = valMinX;
                        if (newThisX >= valMaxX) x = valMaxX;
                        if ((newThisX > valMinX) && (newThisX < valMaxX)) x = this.value.x;
                    }
                    if (valMinY >= valMaxY) y = valMaxY;
                    else {
                        if (newThisY <= valMinY) y = valMinY;
                        if (newThisY >= valMaxY) y = valMaxY;
                        if ((newThisY > valMinY) && (newThisY < valMaxY)) y = this.value.y;
                    }
                    if (valMinZ >= valMaxZ) z = valMaxZ;
                    else {
                        if (newThisZ <= valMinZ) z = valMinZ;
                        if (newThisZ >= valMaxZ) z = valMaxZ;
                        if ((newThisZ > valMinZ) && (newThisZ < valMaxZ)) z = this.value.z;
                    }
                }

                return new Vector3(x, y, z)
            }
        }

        let newSignal = new VectorSignalMock(callback());

        if (min instanceof Vector3 || typeof min === "number") {
            if (max instanceof Vector3 || typeof max === "number") {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, max, newSignal, callback);
            }
        } else {
            if (max instanceof Vector3 || typeof max === "number") {
                monitor(this, min, newSignal, callback);
            } else {
                monitorForTwoArg(this, min, max, newSignal, callback);
            }
        }

        return newSignal;
    }

    /**
     * 
     * @param {VectorSignalMock | Vector3} vec 
     */
    distance(vec) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;
            let thisZ = this.z.value;

            let vecX = typeof vec.x === 'number' ? vec.x : vec.x.value;
            let vecY = typeof vec.y === 'number' ? vec.y : vec.y.value;
            let vecZ = typeof vec.z === 'number' ? vec.z : vec.z.value;

            return Math.sqrt(
                (vecX - thisX) * (vecX - thisX) +
                (vecY - thisY) * (vecY - thisY) +
                (vecZ - thisZ) * (vecZ - thisZ)
            )
        };

        let newSignal = new ScalarSignalMock(callback());

        if (vec instanceof Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, vec, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3} min
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3} max
     * @memberof ScalarSignalMock
     */
    toRange(min, max) {
        let caseMinScalar = min instanceof ScalarSignalMock || typeof min === 'number';
        let caseMaxScalar = max instanceof ScalarSignalMock || typeof max === 'number';
        let caseMinVec2 = min instanceof Vector2 || min instanceof Vec2SignalMock;
        let caseMaxVec2 = max instanceof Vector2 || max instanceof Vec2SignalMock;
        let caseMinVec3 = min instanceof Vector3 || min instanceof VectorSignalMock;
        let caseMaxVec3 = max instanceof Vector3 || max instanceof VectorSignalMock;

        let errorCase0 = caseMinScalar && caseMaxVec2;
        let errorCase1 = caseMinScalar && caseMaxVec3;
        let errorCase2 = caseMinVec2 && caseMaxScalar;
        let errorCase3 = caseMinVec2 && caseMaxVec3;
        let errorCase4 = caseMinVec3 && caseMaxScalar;
        let errorCase5 = caseMinVec3 && caseMaxVec2;
        let errorCase6 = caseMinVec2 && caseMaxVec2;

        if (errorCase0 || errorCase1 || errorCase2 || errorCase3 || errorCase4 || errorCase5 || errorCase6) {
            throw new Error('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types')
        }

        let callback = () => {
            let thisX = this.value.x;
            let thisY = this.value.y;
            let thisZ = this.value.z;

            /**@type {number} */
            let x, y, z;

            if (caseMinScalar && caseMaxScalar) {
                // @ts-ignore
                let valMin = typeof min === 'number' ? min : min.value;
                // @ts-ignore
                let valMax = typeof max === 'number' ? max : max.value;

                let sub = valMax - valMin;
                x = valMin + sub * thisX;
                y = valMin + sub * thisY;
                z = valMin + sub * thisZ;
            }
            if (caseMinVec2 && caseMaxVec2) {
                // @ts-ignore
                let valMinX = min instanceof Vector3 ? min.x : min.value.x;
                // @ts-ignore
                let valMaxX = max instanceof Vector3 ? max.x : max.value.x;
                // @ts-ignore
                let valMinY = min instanceof Vector3 ? min.y : min.value.y;
                // @ts-ignore
                let valMaxY = max instanceof Vector3 ? max.y : max.value.y;
                // @ts-ignore
                let valMinZ = min instanceof Vector3 ? min.z : min.value.z;
                // @ts-ignore
                let valMaxZ = max instanceof Vector3 ? max.z : max.value.z;

                let subX = valMaxX - valMinX;
                x = valMinX + subX * thisX;
                let subY = valMaxY - valMinY;
                y = valMinY + subY * thisY;
                let subZ = valMaxZ - valMinZ;
                z = valMinZ + subZ * thisZ;
            }
            return new Vector3(x, y, z);
        }

        /**@type {ScalarSignalMock | VectorSignalMock} */
        let newSignal;
        if ((min instanceof ScalarSignalMock || typeof min === 'number') && (max instanceof ScalarSignalMock || typeof max === 'number')) {
            newSignal = new VectorSignalMock(callback());
        }
        if ((min instanceof VectorSignalMock || min instanceof Vector3) && (max instanceof VectorSignalMock || max instanceof Vector3)) {
            newSignal = new VectorSignalMock(callback());
        }

        if (typeof min === "number" || min instanceof Vector3) {
            if (typeof max === "number" || max instanceof Vector3) {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, max, newSignal, callback);
            }
        } else {
            if (typeof max === "number" || max instanceof Vector3) {
                monitor(this, min, newSignal, callback);
            } else {
                monitorForTwoArg(this, min, max, newSignal, callback);
            }
        }

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vector3 | VectorSignalMock} min
     * @param {ScalarSignalMock | number | Vector3 | VectorSignalMock} max
     * @memberof ScalarSignalMock
     */
    fromRange(min, max) {
        let caseMinScalar = min instanceof ScalarSignalMock || typeof min === 'number';
        let caseMaxScalar = max instanceof ScalarSignalMock || typeof max === 'number';
        let caseMinVec2 = min instanceof Vector2 || min instanceof Vec2SignalMock;
        let caseMaxVec2 = max instanceof Vector2 || max instanceof Vec2SignalMock;
        let caseMinVec3 = min instanceof Vector3 || min instanceof VectorSignalMock;
        let caseMaxVec3 = max instanceof Vector3 || max instanceof VectorSignalMock;

        let errorCase0 = caseMinScalar && caseMaxVec2;
        let errorCase1 = caseMinScalar && caseMaxVec3;
        let errorCase2 = caseMinVec2 && caseMaxScalar;
        let errorCase3 = caseMinVec2 && caseMaxVec3;
        let errorCase4 = caseMinVec3 && caseMaxScalar;
        let errorCase5 = caseMinVec3 && caseMaxVec2;
        let errorCase6 = caseMinVec2 && caseMaxVec2;

        let callback = () => {
            let thisX = this.value.x;
            let thisY = this.value.y;
            let thisZ = this.value.z;

            /**@type {number} */
            let x, y, z;

            if (caseMinScalar && caseMaxScalar) {
                // @ts-ignore
                let valMin = typeof min === 'number' ? min : min.value;
                // @ts-ignore
                let valMax = typeof max === 'number' ? max : max.value;

                let subX = valMax - valMin;
                let subAimX = thisX - valMin;
                x = subAimX / subX;
                let subY = valMax - valMin;
                let subAimY = thisY - valMin;
                y = subAimY / subY;
                let subZ = valMax - valMin;
                let subAimZ = thisZ - valMin;
                z = subAimZ / subZ;
            }
            if (caseMinVec2 && caseMaxVec2) {
                // @ts-ignore
                let valMinX = min instanceof Vector3 ? min.x : min.value.x;
                // @ts-ignore
                let valMaxX = max instanceof Vector3 ? max.x : max.value.x;
                // @ts-ignore
                let valMinY = min instanceof Vector3 ? min.y : min.value.y;
                // @ts-ignore
                let valMaxY = max instanceof Vector3 ? max.y : max.value.y;
                // @ts-ignore
                let valMinZ = min instanceof Vector3 ? min.z : min.value.z;
                // @ts-ignore
                let valMaxZ = max instanceof Vector3 ? max.z : max.value.z;

                let subX = valMaxX - valMinX;
                let subAimX = thisX - valMinX;
                x = subAimX / subX;
                let subY = valMaxY - valMinY;
                let subAimY = thisY - valMinY;
                y = subAimY / subY;
                let subZ = valMaxZ - valMinZ;
                let subAimZ = thisZ - valMinZ;
                y = subAimZ / subZ;
            }
            return new Vector3(x, y, z)
        }

        if (errorCase0 || errorCase1 || errorCase2 || errorCase3 || errorCase4 || errorCase5 || errorCase6) {
            throw new Error('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types')
        }

        /**@type {ScalarSignalMock | VectorSignalMock} */
        let newSignal;
        if ((min instanceof ScalarSignalMock || typeof min === 'number') && (max instanceof ScalarSignalMock || typeof max === 'number')) {
            newSignal = new VectorSignalMock(callback());
        }
        if ((min instanceof VectorSignalMock || min instanceof Vector3) && (max instanceof VectorSignalMock || max instanceof Vector3)) {
            newSignal = new VectorSignalMock(callback());
        }


        if (typeof min === "number" || min instanceof Vector3) {
            if (typeof max === "number" || max instanceof Vector3) {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, max, newSignal, callback);
            }
        } else {
            if (typeof max === "number" || max instanceof Vector3) {
                monitor(this, min, newSignal, callback);
            } else {
                monitorForTwoArg(this, min, max, newSignal, callback);
            }
        }

        return newSignal;
    }

    /**
     * 
     * @param {VectorSignalMock | Vector3} vec 
     */
    min(vec) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;
            let thisZ = this.z.value;

            let vecX = typeof vec.x === 'number' ? vec.x : vec.x.value;
            let vecY = typeof vec.y === 'number' ? vec.y : vec.y.value;
            let vecZ = typeof vec.z === 'number' ? vec.z : vec.z.value;

            return new Vector3(
                Math.min(thisX, vecX),
                Math.min(thisY, vecY),
                Math.min(thisZ, vecZ)
            )
        };

        let newSignal = new VectorSignalMock(callback());

        if (vec instanceof Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, vec, newSignal, callback);

        return newSignal;
    }

    /**
     * 
     * @param {VectorSignalMock | Vector3} vec 
     */
    max(vec) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;
            let thisZ = this.z.value;

            let vecX = typeof vec.x === 'number' ? vec.x : vec.x.value;
            let vecY = typeof vec.y === 'number' ? vec.y : vec.y.value;
            let vecZ = typeof vec.z === 'number' ? vec.z : vec.z.value;

            return new Vector3(
                Math.max(thisX, vecX),
                Math.max(thisY, vecY),
                Math.max(thisZ, vecZ)
            )
        };

        let newSignal = new VectorSignalMock(callback());

        if (vec instanceof Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, vec, newSignal, callback);

        return newSignal;
    }

    /**
     * 
     * @param {VectorSignalMock | Vector3} vec
     * @param {ScalarSignalMock | number} factor
     */
    mix(vec, factor) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;
            let thisZ = this.z.value;

            let vecX = typeof vec.x === 'number' ? vec.x : vec.x.value;
            let vecY = typeof vec.y === 'number' ? vec.y : vec.y.value;
            let vecZ = typeof vec.z === 'number' ? vec.z : vec.z.value;

            let newFactor = typeof factor === 'number' ? factor : factor.value

            return new Vector3(
                thisX + (vecX - thisX) * newFactor,
                thisY + (vecY - thisY) * newFactor,
                thisZ + (vecZ - thisZ) * newFactor
            )
        };

        let newSignal = new VectorSignalMock(callback());

        if (vec instanceof Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, vec, newSignal, callback);

        return newSignal;
    }

    /**
     * 
     * @param {VectorSignalMock | Vector3} vec 
     */
    mod(vec) {
        let callback = () => {
            let x = this.x.value % (vec instanceof Vector3 ? vec.x : vec.x.value);
            let y = this.y.value % (vec instanceof Vector3 ? vec.y : vec.y.value);
            let z = this.z.value % (vec instanceof Vector3 ? vec.z : vec.z.value);
            return new Vector3(x, y, z)
        };

        let newSignal = new VectorSignalMock(callback());

        if (vec instanceof Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, vec, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vector3 | VectorSignalMock | ScalarSignalMock | number} signal 
     */
    sum(signal) {
        return this.add(signal);
    }

    /**
     * @param {Vector3 | VectorSignalMock} signal 
     */
    reflect(signal) {
        let callback = () => {
            let thisX = this.value.x;
            let thisY = this.value.y;
            let thisZ = this.value.z;
            let signalX = signal instanceof Vector3 ? signal.x : signal.value.x;
            let signalY = signal instanceof Vector3 ? signal.y : signal.value.y;
            let signalZ = signal instanceof Vector3 ? signal.z : signal.value.z;

            let dot = this.value.dot(signal instanceof Vector3 ? signal : signal.value);

            let x = thisX - 2 * dot * signalX;
            let y = thisY - 2 * dot * signalY;
            let z = thisZ - 2 * dot * signalZ;
            return new Vector3(x, y, z);
        };

        let newSignal = new VectorSignalMock(callback());

        if (signal instanceof Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * 
     * @param {QuaternionSignalMock} signal 
     */
    rotate(signal) {
        let callback = () => {
            let signalX = signal.value.x;
            let signalY = signal.value.y;
            let signalZ = signal.value.z;
            let signalW = signal.value.w;

            let u = new Vector3(signalX, signalY, signalZ);

            return u.mul(2 * Vector3.dot(u, this.value))
                .add(this.value.mul(signalW ** 2 - Vector3.dot(this.value, this.value)))
                .add(Vector3.cross(u, this.value).mul(2 * signalW));
        }

        let newSignal = new VectorSignalMock(callback());

        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3} val1
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3} val2
     */
    smoothStep(val1, val2) {
        let callback = () => {
            let thisX = this.value.x;
            let thisY = this.value.y;
            let thisZ = this.value.z;

            let x;
            let y;
            let z;

            if (val1 instanceof ScalarSignalMock || typeof val1 === 'number') {
                let newVal1 = typeof val1 === 'number' ? val1 : val1.value;

                if (val2 instanceof ScalarSignalMock || typeof val2 === 'number') {
                    let newVal2 = typeof val2 === 'number' ? val2 : val2.value;

                    let min = newVal1 < newVal2 ? newVal1 : newVal2;
                    let max = newVal1 >= newVal2 ? newVal1 : newVal2;

                    if (thisX <= min) x = 0;
                    if (thisY <= min) y = 0;
                    if (thisZ <= min) z = 0;
                    if (thisX >= max) x = 1;
                    if (thisY >= max) y = 1;
                    if (thisZ >= max) z = 1;
                    if (thisX > min && thisX < max) x = (thisX - min) / (max - min);
                    if (thisY > min && thisY < max) y = (thisY - min) / (max - min);
                    if (thisZ > min && thisZ < max) z = (thisZ - min) / (max - min);

                    return new Vector3(x, y, z)
                } else {
                    let newVal2_x = val2 instanceof Vector3 ? val2.x : val2.value.x;
                    let newVal2_y = val2 instanceof Vector3 ? val2.y : val2.value.y;
                    let newVal2_z = val2 instanceof Vector3 ? val2.z : val2.value.z;

                    let minX = newVal1 < newVal2_x ? newVal1 : newVal2_x;
                    let maxX = newVal1 >= newVal2_x ? newVal1 : newVal2_x;
                    let minY = newVal1 < newVal2_y ? newVal1 : newVal2_y;
                    let maxY = newVal1 >= newVal2_y ? newVal1 : newVal2_y;
                    let minZ = newVal1 < newVal2_z ? newVal1 : newVal2_z;
                    let maxZ = newVal1 >= newVal2_z ? newVal1 : newVal2_z;

                    if (thisX <= minX) x = 0;
                    if (thisY <= minY) y = 0;
                    if (thisZ <= minZ) z = 0;
                    if (thisX >= maxX) x = 1;
                    if (thisY >= maxY) y = 1;
                    if (thisZ >= maxZ) z = 1;
                    if (thisX > minX && thisX < maxX) x = (thisX - minX) / (maxX - minX);
                    if (thisY > minY && thisY < maxY) y = (thisY - minY) / (maxY - minY);
                    if (thisZ > minZ && thisZ < maxZ) z = (thisZ - minZ) / (maxZ - minZ);

                    return new Vector3(x, y, z)
                }
            } else {
                let newVal1_x = val1 instanceof Vector3 ? val1.x : val1.value.x;
                let newVal1_y = val1 instanceof Vector3 ? val1.y : val1.value.y;
                let newVal1_z = val1 instanceof Vector3 ? val1.z : val1.value.z;

                if (val2 instanceof ScalarSignalMock || typeof val2 === 'number') {
                    let newVal2 = typeof val2 === 'number' ? val2 : val2.value;

                    let minX = newVal2 < newVal1_x ? newVal2 : newVal1_x;
                    let maxX = newVal2 >= newVal1_x ? newVal2 : newVal1_x;
                    let minY = newVal2 < newVal1_y ? newVal2 : newVal1_y;
                    let maxY = newVal2 >= newVal1_y ? newVal2 : newVal1_y;
                    let minZ = newVal2 < newVal1_z ? newVal2 : newVal1_z;
                    let maxZ = newVal2 >= newVal1_z ? newVal2 : newVal1_z;

                    if (thisX <= minX) x = 0;
                    if (thisY <= minY) y = 0;
                    if (thisZ <= minZ) z = 0;
                    if (thisX >= maxX) x = 1;
                    if (thisY >= maxY) y = 1;
                    if (thisZ >= maxZ) z = 1;
                    if (thisX > minX && thisX < maxX) x = (thisX - minX) / (maxX - minX);
                    if (thisY > minY && thisY < maxY) y = (thisY - minY) / (maxY - minY);
                    if (thisZ > minZ && thisZ < maxZ) z = (thisZ - minZ) / (maxZ - minZ);

                    return new Vector3(x, y, z)
                } else {
                    let newVal2_x = val2 instanceof Vector3 ? val2.x : val2.value.x;
                    let newVal2_y = val2 instanceof Vector3 ? val2.y : val2.value.y;
                    let newVal2_z = val2 instanceof Vector3 ? val2.z : val2.value.z;

                    let minX = newVal1_x < newVal2_x ? newVal1_x : newVal2_x;
                    let maxX = newVal1_x >= newVal2_x ? newVal1_x : newVal2_x;
                    let minY = newVal1_y < newVal2_y ? newVal1_y : newVal2_y;
                    let maxY = newVal1_y >= newVal2_y ? newVal1_y : newVal2_y;
                    let minZ = newVal1_z < newVal2_z ? newVal1_z : newVal2_z;
                    let maxZ = newVal1_z >= newVal2_z ? newVal1_z : newVal2_z;

                    if (thisX <= minX) x = 0;
                    if (thisY <= minY) y = 0;
                    if (thisZ <= minZ) z = 0;
                    if (thisX >= maxX) x = 1;
                    if (thisY >= maxY) y = 1;
                    if (thisZ >= maxZ) z = 1;
                    if (thisX > minX && thisX < maxX) x = (thisX - minX) / (maxX - minX);
                    if (thisY > minY && thisY < maxY) y = (thisY - minY) / (maxY - minY);
                    if (thisZ > minZ && thisZ < maxZ) z = (thisZ - minZ) / (maxZ - minZ);

                    return new Vector3(x, y, z)
                }
            }
        }
        let newSignal = new VectorSignalMock(callback());

        if (val1 instanceof Vector3 || typeof val1 === 'number') {
            if (val2 instanceof Vector3 || typeof val2 === 'number') {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, val2, newSignal, callback);
            }
        } else {
            if (val2 instanceof Vector3 || typeof val2 === 'number') {
                monitor(this, val1, newSignal, callback);
            } else {
                monitorForTwoArg(this, val1, val2, newSignal, callback);
            }
        }

        return newSignal;
    }

    pinLastValue() {
        return new VectorSignalMock(this._value);
    }

    /**
 * @param {number | ScalarSignalMock} value
 * @memberof VectorSignalMock
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
     * @memberof VectorSignalMock
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
     * @memberof VectorSignalMock
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
     * @param {VectorSignalMock | Vector3} value
     * @memberof VectorSignalMock
     */
    async mockUpdate(value) {
        if (this._reactiveSubscribe) this._reactiveSubscribe.unsubscribe();
        if (this._reactiveSubscribeX) this._reactiveSubscribeX.unsubscribe();
        if (this._reactiveSubscribeY) this._reactiveSubscribeY.unsubscribe();
        if (this._reactiveSubscribeZ) this._reactiveSubscribeZ.unsubscribe();

        this._parentSignalX = value instanceof VectorSignalMock ? value : value.x;
        this._parentSignalY = value instanceof VectorSignalMock ? value : value.y;
        this._parentSignalZ = value instanceof VectorSignalMock ? value : value.z;

        if (value instanceof VectorSignalMock) {
            this._reactiveSubscribe = value.monitor().subscribe(async () => {
                if (this._parentSignalX !== value && this._parentSignalY !== value && this._parentSignalZ !== value)
                    this._reactiveSubscribe.unsubscribe();
                else
                    await this._update();
            })
        }

        await this._update();
    }

    async _update() {
        let newValue = new Vector3(
            this._parentSignalX instanceof VectorSignalMock ? this._parentSignalX.value.x
                : (this._parentSignalX instanceof ScalarSignalMock ? this._parentSignalX.value : this._parentSignalX),

            this._parentSignalY instanceof VectorSignalMock ? this._parentSignalY.value.y
                : (this._parentSignalY instanceof ScalarSignalMock ? this._parentSignalY.value : this._parentSignalY),

            this._parentSignalZ instanceof VectorSignalMock ? this._parentSignalZ.value.z
                : (this._parentSignalZ instanceof ScalarSignalMock ? this._parentSignalZ.value : this._parentSignalZ)
        )

        if (this._value.x !== newValue.x || this._value.y !== newValue.y || this._value.z !== newValue.z) {
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
}

/**
 * @param {VectorSignalMock} firstSignal
 * @param {VectorSignalMock | ScalarSignalMock | QuaternionSignalMock} secondSignal
 * @param {VectorSignalMock | ScalarSignalMock} signal
 * @param {Function} callback
 */
function monitor(firstSignal, secondSignal, signal, callback) {
    firstSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback())
    })

    secondSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback())
    })
}

/**
 * @param {VectorSignalMock} firstSignal
 * @param {ScalarSignalMock | VectorSignalMock | number} secondSignal
 * @param {ScalarSignalMock | VectorSignalMock | number} thirdSignal
 * @param {ScalarSignalMock | VectorSignalMock} signal
 * @param {Function} callback
 */
function monitorForTwoArg(firstSignal, secondSignal, thirdSignal, signal, callback) {
    firstSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback())
    })

    if (typeof secondSignal !== 'number') {
        secondSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback())
        })
    }

    if (typeof thirdSignal !== 'number') {
        thirdSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback())
        })
    }
}
