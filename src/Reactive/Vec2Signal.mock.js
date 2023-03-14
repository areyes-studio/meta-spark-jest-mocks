import ScalarSignalMock from './ScalarSignal.mock';
import SignalMock from './Signal.mock';
import VectorSignalMock from './VectorSignal.mock';
import SubscriptionMock from './Subscription.mock';

import { Vector3, Vector2 } from '@areyes-studio/math-module';

export class Vec2SignalMock extends SignalMock {
    /**
     * @param {Vector2} value
     * @memberof Vec2SignalMock
     */
    constructor(value) {
        super(value);

        this._x = new ScalarSignalMock(this.value.x);
        this._y = new ScalarSignalMock(this.value.y);

        this.monitor().subscribe(async () => {
            await this._x.mockUpdate(this.value.x);
            await this._y.mockUpdate(this.value.y);
        })

        /** @type {SubscriptionMock} */
        this._reactiveSubscribeX = null;

        /** @type {SubscriptionMock} */
        this._reactiveSubscribeY = null;

        /** @type {number | ScalarSignalMock | Vec2SignalMock} */
        this._parentSignalX = value.x;
        /** @type {number | ScalarSignalMock | Vec2SignalMock} */
        this._parentSignalY = value.y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    abs() {
        let callback = () => {
            let x = Math.abs(this.x.value);
            let y = Math.abs(this.y.value);
            return new Vector2(x, y);
        }
        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @param {Vector2 | Vec2SignalMock | ScalarSignalMock | number} signal 
     */
    add(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let x = this.x.value + (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value + (typeof signal === 'number' ? signal : signal.value);
                return new Vector2(x, y)
            } else {
                let x = this.x.value + (signal instanceof Vector2 ? signal.x : signal.x.value);
                let y = this.y.value + (signal instanceof Vector2 ? signal.y : signal.y.value);
                return new Vector2(x, y)
            }

        };

        let newSignal = new Vec2SignalMock(callback());

        if (signal instanceof Vector2 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vector2 | Vec2SignalMock | ScalarSignalMock | number} signal 
     */
    sub(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let x = this.x.value - (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value - (typeof signal === 'number' ? signal : signal.value);
                return new Vector2(x, y)
            } else {
                let x = this.x.value - (signal instanceof Vector2 ? signal.x : signal.x.value);
                let y = this.y.value - (signal instanceof Vector2 ? signal.y : signal.y.value);
                return new Vector2(x, y)
            }

        };

        let newSignal = new Vec2SignalMock(callback());

        if (signal instanceof Vector2 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} signal 
     */
    mul(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let x = this.x.value * (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value * (typeof signal === 'number' ? signal : signal.value);
                return new Vector2(x, y)
            } else {
                let x = this.x.value * (typeof signal.x === 'number' ? signal.x : signal.x.value);
                let y = this.y.value * (typeof signal.y === 'number' ? signal.y : signal.y.value);
                return new Vector2(x, y)
            }

        };

        let newSignal = new Vec2SignalMock(callback());

        if (typeof signal === 'number' || signal instanceof Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} signal 
     */
    div(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let x = this.x.value / (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value / (typeof signal === 'number' ? signal : signal.value);
                return new Vector2(x, y)
            } else {
                let x = this.x.value / (typeof signal.x === 'number' ? signal.x : signal.x.value);
                let y = this.y.value / (typeof signal.y === 'number' ? signal.y : signal.y.value);
                return new Vector2(x, y)
            }

        };

        let newSignal = new Vec2SignalMock(callback());

        if (typeof signal === 'number' || signal instanceof Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vec2SignalMock | Vector2} signal
     */
    distance(signal) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;

            let signalX = typeof signal.x === 'number' ? signal.x : signal.x.value;
            let signalY = typeof signal.y === 'number' ? signal.y : signal.y.value;

            return Math.sqrt(
                (signalX - thisX) * (signalX - thisX) +
                (signalY - thisY) * (signalY - thisY)
            )
        };

        let newSignal = new ScalarSignalMock(callback());

        if (signal instanceof Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    neg() {
        let callback = () => {
            let x = this.x.value * (-1);
            let y = this.y.value * (-1);
            return new Vector2(x, y);
        }
        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    height() {
        let callback = () => { return this.y.pinLastValue() };

        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    width() {
        let callback = () => { return this.x.pinLastValue() };

        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @param {Vec2SignalMock | Vector2 | ScalarSignalMock | number} signal
     */
    atan2(signal) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;

            if (signal instanceof Vec2SignalMock || signal instanceof Vector2) {
                let signalX = signal instanceof Vector2 ? signal.x : signal.value.x;
                let signalY = signal instanceof Vector2 ? signal.y : signal.value.y;

                return new Vector2(
                    Math.atan2(signalX, thisX),
                    Math.atan2(signalY, thisY)
                )
            } else {
                let signalVal = typeof signal === 'number' ? signal : signal.value;

                return new Vector2(
                    Math.atan2(signalVal, thisX),
                    Math.atan2(signalVal, thisY)
                )
            }
        };

        let newSignal = new Vec2SignalMock(callback());

        if (signal instanceof Vector2 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    ceil() {
        let callback = () => {
            let newX = Math.ceil(this.value.x);
            let newY = Math.ceil(this.value.y);
            return new Vector2(newX, newY)
        };

        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    floor() {
        let callback = () => {
            let newX = Math.floor(this.value.x);
            let newY = Math.floor(this.value.y);
            return new Vector2(newX, newY)
        };

        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * 
     * @param {ScalarSignalMock | number | Vector2 | Vec2SignalMock} min 
     * @param {ScalarSignalMock | number | Vector2 | Vec2SignalMock} max 
     */
    clamp(min, max) {
        let callback = () => {
            let newThisX = this.value.x;
            let newThisY = this.value.y;

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
            let errorCase6 = caseMinVec3 && caseMaxVec3;

            if (errorCase0 || errorCase1 || errorCase2 || errorCase3 || errorCase4 || errorCase5 || errorCase6) {
                throw new Error('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types')
            } else {
                /**@type {number} */
                let x, y;

                if (caseMinScalar && caseMaxScalar) {
                    // @ts-ignore
                    let valMin = typeof min === 'number' ? min : min.value;
                    // @ts-ignore
                    let valMax = typeof max === 'number' ? max : max.value;

                    if (valMin >= valMax) { x = valMax; y = valMax }
                    else {
                        if (newThisX <= valMin) x = valMin;
                        if (newThisX >= valMax) x = valMax;
                        if ((newThisX > valMin) && (newThisX < valMax)) x = this.value.x;

                        if (newThisY <= valMin) y = valMin;
                        if (newThisY >= valMax) y = valMax;
                        if ((newThisX > valMin) && (newThisX < valMax)) y = this.value.x;
                    }
                }
                if (caseMinVec2 && caseMaxVec2) {
                    // @ts-ignore
                    let valMinX = min instanceof Vector2 ? min.x : min.value.x;
                    // @ts-ignore
                    let valMaxX = max instanceof Vector2 ? max.x : max.value.x;
                    // @ts-ignore
                    let valMinY = min instanceof Vector2 ? min.y : min.value.y;
                    // @ts-ignore
                    let valMaxY = max instanceof Vector2 ? max.y : max.value.y;

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
                }

                return new Vector2(x, y)
            }
        }

        let newSignal = new Vec2SignalMock(callback());

        if (min instanceof Vector2 || typeof min === "number") {
            if (max instanceof Vector2 || typeof max === "number") {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, max, newSignal, callback);
            }
        } else {
            if (max instanceof Vector2 || typeof max === "number") {
                monitor(this, min, newSignal, callback);
            } else {
                monitorForTwoArg(this, min, max, newSignal, callback);
            }
        }

        return newSignal;
    }

    /**
     * @param {Vec2SignalMock | Vector2} vector
     */
    dot(vector) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;

            let vectorX = typeof vector.x === 'number' ? vector.x : vector.x.value;
            let vectorY = typeof vector.y === 'number' ? vector.y : vector.y.value;

            return thisX * vectorX + thisY * vectorY;
        }

        let newSignal = new ScalarSignalMock(callback());

        if (vector instanceof Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, vector, newSignal, callback);

        return newSignal;
    }

    magnitude() {
        let callback = () => {
            return Math.sqrt(this.x.value ** 2 + this.y.value ** 2);
        };

        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    magnitudeSquared() {
        let callback = () => {
            return this.x.value ** 2 + this.y.value ** 2;
        };

        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @param {Vec2SignalMock | Vector2} vector
     */
    max(vector) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;

            let vectorX = typeof vector.x === 'number' ? vector.x : vector.x.value;
            let vectorY = typeof vector.y === 'number' ? vector.y : vector.y.value;

            return new Vector2(Math.max(thisX, vectorX), Math.max(thisY, vectorY));
        }

        let newSignal = new Vec2SignalMock(callback());

        if (vector instanceof Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, vector, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vec2SignalMock | Vector2} vector
     */
    min(vector) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;

            let vectorX = typeof vector.x === 'number' ? vector.x : vector.x.value;
            let vectorY = typeof vector.y === 'number' ? vector.y : vector.y.value;

            return new Vector2(Math.min(thisX, vectorX), Math.min(thisY, vectorY));
        }

        let newSignal = new Vec2SignalMock(callback());

        if (vector instanceof Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, vector, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vec2SignalMock | Vector2} vector
     * @param {ScalarSignalMock | number} factor
     */
    mix(vector, factor) {
        let callback = () => {
            let thisX = this.value.x;
            let thisY = this.value.y;

            let vecX = typeof vector.x === 'number' ? vector.x : vector.x.value;
            let vecY = typeof vector.y === 'number' ? vector.y : vector.y.value;

            let newFactor = typeof factor === 'number' ? factor : factor.value

            return new Vector2(
                thisX + (vecX - thisX) * newFactor,
                thisY + (vecY - thisY) * newFactor
            )
        }

        let newSignal = new Vec2SignalMock(callback());

        if (vector instanceof Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, vector, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vector2 | Vec2SignalMock} signal 
     */
    mod(signal) {
        let callback = () => {
            let x = this.x.value % (signal instanceof Vector2 ? signal.x : signal.x.value);
            let y = this.y.value % (signal instanceof Vector2 ? signal.y : signal.y.value);
            return new Vector2(x, y)
        };

        let newSignal = new Vec2SignalMock(callback());

        if (signal instanceof Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    normalize() {
        let callback = () => {
            return this.value.normalize();
        };

        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} signal 
     */
    pow(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let x = this.x.value ** (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value ** (typeof signal === 'number' ? signal : signal.value);
                return new Vector2(x, y)
            } else {
                let x = this.x.value ** (signal instanceof Vector2 ? signal.x : signal.x.value);
                let y = this.y.value ** (signal instanceof Vector2 ? signal.y : signal.y.value);
                return new Vector2(x, y)
            }

        };

        let newSignal = new Vec2SignalMock(callback());

        if (signal instanceof Vector2 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vector2 | Vec2SignalMock} signal 
     */
    reflect(signal) {
        let callback = () => {
            let thisX = this.value.x;
            let thisY = this.value.y;
            let signalX = signal instanceof Vector2 ? signal.x : signal.value.x;
            let signalY = signal instanceof Vector2 ? signal.y : signal.value.y;

            let dot = this.value.dot(signal instanceof Vector2 ? signal : signal.value);

            let x = thisX - 2 * dot * signalX;
            let y = thisY - 2 * dot * signalY;
            return new Vector2(x, y);
        };

        let newSignal = new Vec2SignalMock(callback());

        if (signal instanceof Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            })
        } else monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    round() {
        let callback = () => {
            let newX = Math.round(this.value.x);
            let newY = Math.round(this.value.y);
            return new Vector2(newX, newY)
        };

        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    sign() {
        let callback = () => {
            let newX = Math.sign(this.value.x);
            let newY = Math.sign(this.value.y);
            return new Vector2(newX, newY)
        };

        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @param {Vector2 | Vec2SignalMock | ScalarSignalMock | number} signal 
     */
    sum(signal) {
        return this.add(signal)
    }

    sqrt() {
        let callback = () => {
            let newX = Math.sqrt(this.value.x);
            let newY = Math.sqrt(this.value.y);
            return new Vector2(newX, newY)
        };

        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} min
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} max
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
        let errorCase6 = caseMinVec3 && caseMaxVec3;

        if (errorCase0 || errorCase1 || errorCase2 || errorCase3 || errorCase4 || errorCase5 || errorCase6) {
            throw new Error('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types')
        }

        let callback = () => {
            let thisX = this.value.x;
            let thisY = this.value.y;

            /**@type {number} */
            let x, y;
            if (caseMinScalar && caseMaxScalar) {
                    // @ts-ignore
                let valMin = typeof min === 'number' ? min : min.value;
                    // @ts-ignore
                let valMax = typeof max === 'number' ? max : max.value;

                let sub = valMax - valMin;
                x = valMin + sub * thisX;
                y = valMin + sub * thisY;
            }
            if (caseMinVec2 && caseMaxVec2) {
                    // @ts-ignore
                let valMinX = min instanceof Vector2 ? min.x : min.value.x;
                    // @ts-ignore
                let valMaxX = max instanceof Vector2 ? max.x : max.value.x;
                    // @ts-ignore
                let valMinY = min instanceof Vector2 ? min.y : min.value.y;
                    // @ts-ignore
                let valMaxY = max instanceof Vector2 ? max.y : max.value.y;

                let subX = valMaxX - valMinX;
                x = valMinX + subX * thisX;
                let subY = valMaxY - valMinY;
                y = valMinY + subY * thisY;
            }
            return new Vector2(x, y)
        }

        /**@type {ScalarSignalMock | Vec2SignalMock} */
        let newSignal;
        if ((min instanceof ScalarSignalMock || typeof min === 'number') && (max instanceof ScalarSignalMock || typeof max === 'number')) {
            newSignal = new Vec2SignalMock(callback());
        }
        if ((min instanceof Vec2SignalMock || min instanceof Vector2) && (max instanceof Vec2SignalMock || max instanceof Vector2)) {
            newSignal = new Vec2SignalMock(callback());
        }

        if (typeof min === "number" || min instanceof Vector2) {
            if (typeof max === "number" || max instanceof Vector2) {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, max, newSignal, callback);
            }
        } else {
            if (typeof max === "number" || max instanceof Vector2) {
                monitor(this, min, newSignal, callback);
            } else {
                monitorForTwoArg(this, min, max, newSignal, callback);
            }
        }

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} min
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} max
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
        let errorCase6 = caseMinVec3 && caseMaxVec3;

        let callback = () => {
            let thisX = this.value.x;
            let thisY = this.value.y;

            /**@type {number} */
            let x, y;

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
            }
            if (caseMinVec2 && caseMaxVec2) {
                    // @ts-ignore
                let valMinX = min instanceof Vector2 ? min.x : min.value.x;
                    // @ts-ignore
                let valMaxX = max instanceof Vector2 ? max.x : max.value.x;
                    // @ts-ignore
                let valMinY = min instanceof Vector2 ? min.y : min.value.y;
                    // @ts-ignore
                let valMaxY = max instanceof Vector2 ? max.y : max.value.y;

                let subX = valMaxX - valMinX;
                let subAimX = thisX - valMinX;
                x = subAimX / subX;
                let subY = valMaxY - valMinY;
                let subAimY = thisY - valMinY;
                y = subAimY / subY;
            }
            return new Vector2(x, y)
        }

        if (errorCase0 || errorCase1 || errorCase2 || errorCase3 || errorCase4 || errorCase5 || errorCase6) {
            throw new Error('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types')
        }

        /**@type {ScalarSignalMock | Vec2SignalMock} */
        let newSignal;
        if ((min instanceof ScalarSignalMock || typeof min === 'number') && (max instanceof ScalarSignalMock || typeof max === 'number')) {
            newSignal = new Vec2SignalMock(callback());
        }
        if ((min instanceof Vec2SignalMock || min instanceof Vector2) && (max instanceof Vec2SignalMock || max instanceof Vector2)) {
            newSignal = new Vec2SignalMock(callback());
        }


        if (typeof min === "number" || min instanceof Vector2) {
            if (typeof max === "number" || max instanceof Vector2) {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, max, newSignal, callback);
            }
        } else {
            if (typeof max === "number" || max instanceof Vector2) {
                monitor(this, min, newSignal, callback);
            } else {
                monitorForTwoArg(this, min, max, newSignal, callback);
            }
        }

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} val1
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} val2
     */
    smoothStep(val1, val2) {
        let callback = () => {
            let thisX = this.value.x;
            let thisY = this.value.y;

            let x;
            let y;

            if (val1 instanceof ScalarSignalMock || typeof val1 === 'number') {
                let newVal1 = typeof val1 === 'number' ? val1 : val1.value;

                if (val2 instanceof ScalarSignalMock || typeof val2 === 'number') {
                    let newVal2 = typeof val2 === 'number' ? val2 : val2.value;

                    let min = newVal1 < newVal2 ? newVal1 : newVal2;
                    let max = newVal1 >= newVal2 ? newVal1 : newVal2;

                    if (thisX <= min) x = 0;
                    if (thisY <= min) y = 0;
                    if (thisX >= max) x = 1;
                    if (thisY >= max) y = 1;
                    if (thisX > min && thisX < max) x = (thisX - min) / (max - min);
                    if (thisY > min && thisY < max) y = (thisY - min) / (max - min);

                    return new Vector2(x, y)
                } else {
                    let newVal2_x = val2 instanceof Vector2 ? val2.x : val2.value.x;
                    let newVal2_y = val2 instanceof Vector2 ? val2.y : val2.value.y;

                    let minX = newVal1 < newVal2_x ? newVal1 : newVal2_x;
                    let maxX = newVal1 >= newVal2_x ? newVal1 : newVal2_x;
                    let minY = newVal1 < newVal2_y ? newVal1 : newVal2_y;
                    let maxY = newVal1 >= newVal2_y ? newVal1 : newVal2_y;

                    if (thisX <= minX) x = 0;
                    if (thisY <= minY) y = 0;
                    if (thisX >= maxX) x = 1;
                    if (thisY >= maxY) y = 1;
                    if (thisX > minX && thisX < maxX) x = (thisX - minX) / (maxX - minX);
                    if (thisY > minY && thisY < maxY) y = (thisY - minY) / (maxY - minY);

                    return new Vector2(x, y)
                }
            } else {
                let newVal1_x = val1 instanceof Vector2 ? val1.x : val1.value.x;
                let newVal1_y = val1 instanceof Vector2 ? val1.y : val1.value.y;

                if (val2 instanceof ScalarSignalMock || typeof val2 === 'number') {
                    let newVal2 = typeof val2 === 'number' ? val2 : val2.value;

                    let minX = newVal2 < newVal1_x ? newVal2 : newVal1_x;
                    let maxX = newVal2 >= newVal1_x ? newVal2 : newVal1_x;
                    let minY = newVal2 < newVal1_y ? newVal2 : newVal1_y;
                    let maxY = newVal2 >= newVal1_y ? newVal2 : newVal1_y;

                    if (thisX <= minX) x = 0;
                    if (thisY <= minY) y = 0;
                    if (thisX >= maxX) x = 1;
                    if (thisY >= maxY) y = 1;
                    if (thisX > minX && thisX < maxX) x = (thisX - minX) / (maxX - minX);
                    if (thisY > minY && thisY < maxY) y = (thisY - minY) / (maxY - minY);

                    return new Vector2(x, y)
                } else {
                    let newVal2_x = val2 instanceof Vector2 ? val2.x : val2.value.x;
                    let newVal2_y = val2 instanceof Vector2 ? val2.y : val2.value.y;

                    let minX = newVal1_x < newVal2_x ? newVal1_x : newVal2_x;
                    let maxX = newVal1_x >= newVal2_x ? newVal1_x : newVal2_x;
                    let minY = newVal1_y < newVal2_y ? newVal1_y : newVal2_y;
                    let maxY = newVal1_y >= newVal2_y ? newVal1_y : newVal2_y;

                    if (thisX <= minX) x = 0;
                    if (thisY <= minY) y = 0;
                    if (thisX >= maxX) x = 1;
                    if (thisY >= maxY) y = 1;
                    if (thisX > minX && thisX < maxX) x = (thisX - minX) / (maxX - minX);
                    if (thisY > minY && thisY < maxY) y = (thisY - minY) / (maxY - minY);

                    return new Vector2(x, y)
                }
            }
        }
        let newSignal = new Vec2SignalMock(callback());

        if (val1 instanceof Vector2 || typeof val1 === 'number') {
            if (val2 instanceof Vector2 || typeof val2 === 'number') {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, val2, newSignal, callback);
            }
        } else {
            if (val2 instanceof Vector2 || typeof val2 === 'number') {
                monitor(this, val1, newSignal, callback);
            } else {
                monitorForTwoArg(this, val1, val2, newSignal, callback);
            }
        }

        return newSignal;
    }

    pinLastValue() {
        return new Vec2SignalMock(this._value);
    }

    /**
* @param {number | ScalarSignalMock} value
* @memberof Vec2SignalMock
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
     * @memberof Vec2SignalMock
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
     * @override
     * @param {Vec2SignalMock | Vector2} value
     * @memberof Vec2SignalMock
     */
    async mockUpdate(value) {
        if (this._reactiveSubscribe) this._reactiveSubscribe.unsubscribe();
        if (this._reactiveSubscribeX) this._reactiveSubscribeX.unsubscribe();
        if (this._reactiveSubscribeY) this._reactiveSubscribeY.unsubscribe();

        this._parentSignalX = value instanceof Vec2SignalMock ? value : value.x;
        this._parentSignalY = value instanceof Vec2SignalMock ? value : value.y;

        if (value instanceof Vec2SignalMock) {
            this._reactiveSubscribe = value.monitor().subscribe(async () => {
                if (this._parentSignalX !== value && this._parentSignalY !== value)
                    this._reactiveSubscribe.unsubscribe();
                else
                    await this._update();
            })
        }

        await this._update();
    }

    async _update() {
        let newValue = new Vector2(
            this._parentSignalX instanceof Vec2SignalMock ? this._parentSignalX.value.x
                : (this._parentSignalX instanceof ScalarSignalMock ? this._parentSignalX.value : this._parentSignalX),

            this._parentSignalY instanceof Vec2SignalMock ? this._parentSignalY.value.y
                : (this._parentSignalY instanceof ScalarSignalMock ? this._parentSignalY.value : this._parentSignalY)
        )

        if (this._value.x !== newValue.x || this._value.y !== newValue.y) {
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
 * @param {Vec2SignalMock} firstSignal
 * @param {ScalarSignalMock | Vec2SignalMock} secondSignal
 * @param {ScalarSignalMock | Vec2SignalMock} signal
 * @param {Function} callback
 */
function monitor(firstSignal, secondSignal, signal, callback) {
    firstSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback())
    })

    if (typeof secondSignal !== 'number') {
        secondSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback())
        })
    }
}

/**
 * @param {Vec2SignalMock} firstSignal
 * @param {ScalarSignalMock | Vec2SignalMock} secondSignal
 * @param {ScalarSignalMock | Vec2SignalMock} thirdSignal
 * @param {ScalarSignalMock | Vec2SignalMock} signal
 * @param {Function} callback
 */
function monitorForTwoArg(firstSignal, secondSignal, thirdSignal, signal, callback) {
    firstSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback())
    })

    secondSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback())
    })

    thirdSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback())
    })
}

export default Vec2SignalMock