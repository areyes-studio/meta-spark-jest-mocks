import SignalMock from './Signal.mock';
import BoolSignalMock from './BoolSignal.mock';
import EventSourceMock from "../Reactive/EventSource.mock";
import Vec2SignalMock from './Vec2Signal.mock';
import VectorSignalMock from './VectorSignal.mock';

import { Vector3, Vector2 } from '@areyes-studio/math-module';

export default class ScalarSignalMock extends SignalMock {
    /**
     * @param {number} value
     * @memberof ScalarSignalMock
     */
    constructor(value) {
        super(value);
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3} signal
     * @memberof ScalarSignalMock
     */
    add(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let signalVal = typeof signal === 'number' ? signal : signal.value;
                return this.value + signalVal;
            }
            if (signal instanceof Vec2SignalMock || signal instanceof Vector2) {
                let signalVal = signal instanceof Vector2 ? signal : signal.value;
                let x = this.value + signalVal.x;
                let y = this.value + signalVal.y;
                return new Vector2(x,y)
            }
            if (signal instanceof VectorSignalMock || signal instanceof Vector3) {
                let signalVal = signal instanceof Vector3 ? signal : signal.value;
                let x = this.value + signalVal.x;
                let y = this.value + signalVal.y;
                let z = this.value + signalVal.z;
                return new Vector3(x,y,z)
            }
        };
        
        let newSignal;
        if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
            newSignal = new ScalarSignalMock(callback());
        }
        if (signal instanceof Vec2SignalMock || signal instanceof Vector2) {
            newSignal = new Vec2SignalMock(callback());
        }
        if (signal instanceof VectorSignalMock || signal instanceof Vector3) {
            newSignal = new VectorSignalMock(callback());
        }
        
        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3} signal
     * @memberof ScalarSignalMock
     */
    sub(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let signalVal = typeof signal === 'number' ? signal : signal.value;
                return this.value - signalVal;
            }
            if (signal instanceof Vec2SignalMock || signal instanceof Vector2) {
                let signalVal = signal instanceof Vector2 ? signal : signal.value;
                let x = this.value - signalVal.x;
                let y = this.value - signalVal.y;
                return new Vector2(x,y)
            }
            if (signal instanceof VectorSignalMock || signal instanceof Vector3) {
                let signalVal = signal instanceof Vector3 ? signal : signal.value;
                let x = this.value - signalVal.x;
                let y = this.value - signalVal.y;
                let z = this.value - signalVal.z;
                return new Vector3(x,y,z)
            }
        };
        
        let newSignal;
        if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
            // @ts-ignore
            newSignal = new ScalarSignalMock(callback());
        }
        if (signal instanceof Vec2SignalMock || signal instanceof Vector2) {
            // @ts-ignore
            newSignal = new Vec2SignalMock(callback());
        }
        if (signal instanceof VectorSignalMock || signal instanceof Vector3) {
            // @ts-ignore
            newSignal = new VectorSignalMock(callback());
        }
        
        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3} signal
     * @memberof ScalarSignalMock
     */
    mul(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let signalVal = typeof signal === 'number' ? signal : signal.value;
                return this.value * signalVal;
            }
            if (signal instanceof Vec2SignalMock || signal instanceof Vector2) {
                let signalVal = signal instanceof Vector2 ? signal : signal.value;
                let x = this.value * signalVal.x;
                let y = this.value * signalVal.y;
                return new Vector2(x,y)
            }
            if (signal instanceof VectorSignalMock || signal instanceof Vector3) {
                let signalVal = signal instanceof Vector3 ? signal : signal.value;
                let x = this.value * signalVal.x;
                let y = this.value * signalVal.y;
                let z = this.value * signalVal.z;
                return new Vector3(x,y,z)
            }
        };
        
        let newSignal;
        if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
            // @ts-ignore
            newSignal = new ScalarSignalMock(callback());
        }
        if (signal instanceof Vec2SignalMock || signal instanceof Vector2) {
            // @ts-ignore
            newSignal = new Vec2SignalMock(callback());
        }
        if (signal instanceof VectorSignalMock || signal instanceof Vector3) {
            // @ts-ignore
            newSignal = new VectorSignalMock(callback());
        }
        
        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3} signal
     * @memberof ScalarSignalMock
     */
    div(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let signalVal = typeof signal === 'number' ? signal : signal.value;
                return this.value / signalVal;
            }
            if (signal instanceof Vec2SignalMock || signal instanceof Vector2) {
                let signalVal = signal instanceof Vector2 ? signal : signal.value;
                let x = this.value / signalVal.x;
                let y = this.value / signalVal.y;
                return new Vector2(x,y)
            }
            if (signal instanceof VectorSignalMock || signal instanceof Vector3) {
                let signalVal = signal instanceof Vector3 ? signal : signal.value;
                let x = this.value / signalVal.x;
                let y = this.value / signalVal.y;
                let z = this.value / signalVal.z;
                return new Vector3(x,y,z)
            }
        };
        
        let newSignal;
        if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
            // @ts-ignore
            newSignal = new ScalarSignalMock(callback());
        }
        if (signal instanceof Vec2SignalMock || signal instanceof Vector2) {
            // @ts-ignore
            newSignal = new Vec2SignalMock(callback());
        }
        if (signal instanceof VectorSignalMock || signal instanceof Vector3) {
            // @ts-ignore
            newSignal = new VectorSignalMock(callback());
        }
        
        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     */
    pow(signal) {
        let callback = () => {
            let secondValue = typeof signal === 'number' ? signal : signal.value;
            return this.value ** secondValue;
        };
        
        let newSignal = new ScalarSignalMock(callback());

        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     */
    mod(signal) {
        let callback = () => {
            let secondValue = typeof signal === 'number' ? signal : signal.value;
            return this.value % secondValue;
        };
        
        let newSignal = new ScalarSignalMock(callback());

        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    abs() {
        let callback = () => {
            return Math.abs(this.value);
        }
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    round() {
        let callback = () => {
            return Math.round(this.value);
        }
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    sign() {
        let callback = () => {
            return Math.sign(this.value);
        }
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    sqrt() {
        let callback = () => {
            return Math.sqrt(this.value);
        }
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    neg() {
        let callback = () => {
            if(this.value === 0) return 0;
            else return this.value * (-1);
        }
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3} signal
     * @memberof ScalarSignalMock
     */
    atan2(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
                let signalVal = typeof signal === 'number' ? signal : signal.value;
                return Math.atan2(signalVal, this.value);
            }
            if (signal instanceof Vec2SignalMock || signal instanceof Vector2) {
                let signalVal = signal instanceof Vector2 ? signal : signal.value;
                let x = Math.atan2(signalVal.x, this.value);
                let y = Math.atan2(signalVal.y, this.value);
                return new Vector2(x,y)
            }
            if (signal instanceof VectorSignalMock || signal instanceof Vector3) {
                let signalVal = signal instanceof Vector3 ? signal : signal.value;
                let x = Math.atan2(signalVal.x, this.value);
                let y = Math.atan2(signalVal.y, this.value);
                let z = Math.atan2(signalVal.z, this.value);
                return new Vector3(x,y,z)
            }
        };
        
        let newSignal;
        if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
            // @ts-ignore
            newSignal = new ScalarSignalMock(callback());
        }
        if (signal instanceof Vec2SignalMock || signal instanceof Vector2) {
            // @ts-ignore
            newSignal = new Vec2SignalMock(callback());
        }
        if (signal instanceof VectorSignalMock || signal instanceof Vector3) {
            // @ts-ignore
            newSignal = new VectorSignalMock(callback());
        }
        
        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    ceil() {
        let callback = () => {
            return Math.ceil(this.value);
        }
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    floor() {
        let callback = () => {
            return Math.floor(this.value);
        }
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3 | Vec2SignalMock | Vector2} min
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3 | Vec2SignalMock | Vector2} max
     * @memberof ScalarSignalMock
     */
    clamp(min, max) {
        let callback = () => {
            let newThis = this.value;

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

            if(errorCase0 || errorCase1 || errorCase2 || errorCase3 || errorCase4 || errorCase5) {
                throw new Error('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types')
            } else {
                if (caseMinScalar && caseMaxScalar) {
                    // @ts-ignore
                    let valMin = typeof min === 'number' ? min : min.value;
                    // @ts-ignore
                    let valMax = typeof max === 'number' ? max : max.value;
                    
                    if (valMin >= valMax) return valMin;
                    else {
                        if (newThis <= valMin) return valMin;
                        if (newThis >= valMax) return valMax;
                        if ((newThis > valMin) && (newThis < valMax)) return this.value;
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

                    /**@type {number} */
                    let x, y;
                    if (valMinX >= valMaxX) x = valMinX;
                    else {
                        if (newThis <= valMinX) x = valMinX;
                        if (newThis >= valMaxX) x = valMaxX;
                        if ((newThis > valMinX) && (newThis < valMaxX)) x = this.value;
                    }
                    if (valMinY >= valMaxY) y = valMinY;
                    else {
                        if (newThis <= valMinY) y = valMinY;
                        if (newThis >= valMaxY) y = valMaxY;
                        if ((newThis > valMinY) && (newThis < valMaxY)) y = this.value;
                    }

                    return new Vector2(x,y)
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

                    /**@type {number} */
                    let x, y, z;
                    if (valMinX >= valMaxX) x = valMinX;
                    else {
                        if (newThis <= valMinX) x = valMinX;
                        if (newThis >= valMaxX) x = valMaxX;
                        if ((newThis > valMinX) && (newThis < valMaxX)) x = this.value;
                    }
                    if (valMinY >= valMaxY) y = valMinY;
                    else {
                        if (newThis <= valMinY) y = valMinY;
                        if (newThis >= valMaxY) y = valMaxY;
                        if ((newThis > valMinY) && (newThis < valMaxY)) y = this.value;
                    }
                    if (valMinZ >= valMaxZ) z = valMinZ;
                    else {
                        if (newThis <= valMinZ) z = valMinZ;
                        if (newThis >= valMaxZ) z = valMaxZ;
                        if ((newThis > valMinZ) && (newThis < valMaxZ)) z = this.value;
                    }

                    return new Vector3(x,y,z)
                }
            }
        }

        let newSignal = new ScalarSignalMock(callback());

        if (min instanceof Vector2 || min instanceof Vector3 || typeof min === "number") {
            if(max instanceof Vector2 || max instanceof Vector3 || typeof max === "number") {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, max, newSignal, callback);
            }
        } else {
            if(max instanceof Vector2 || max instanceof Vector3 || typeof max === "number") {
                monitor(this, min, newSignal, callback);
            } else {
                monitorForTwoArg(this, min, max, newSignal, callback);
            }
        }
        
        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3} min
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3} max
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

        let callback = () => {
            let newThis = this.value;

            if (caseMinScalar && caseMaxScalar) {
                // @ts-ignore
                let valMin = typeof min === 'number' ? min : min.value;
                // @ts-ignore
                let valMax = typeof max === 'number' ? max : max.value;
                
                let sub = valMax - valMin;
                let subAim = newThis - valMin;
                return subAim / sub;
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

                /**@type {number} */
                let x, y;
                let subX = valMaxX - valMinX;
                let subAimX = newThis - valMinX;
                x = subAimX / subX;
                let subY = valMaxY - valMinY;
                let subAimY = newThis - valMinY;
                y = subAimY / subY;

                return new Vector2(x,y)
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

                /**@type {number} */
                let x, y, z;

                let subX = valMaxX - valMinX;
                let subAimX = newThis - valMinX;
                x = subAimX / subX;
                let subY = valMaxY - valMinY;
                let subAimY = newThis - valMinY;
                y = subAimY / subY;
                let subZ = valMaxZ - valMinZ;
                let subAimZ = newThis - valMinZ;
                z = subAimZ / subZ;

                return new Vector3(x,y,z)
            }       
        }

        if(errorCase0 || errorCase1 || errorCase2 || errorCase3 || errorCase4 || errorCase5) {
            throw new Error('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types')
        }

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        if ((min instanceof ScalarSignalMock || typeof min === 'number') && (max instanceof ScalarSignalMock || typeof max === 'number')) {
            // @ts-ignore
            newSignal = new ScalarSignalMock(callback());
        }
        if ((min instanceof Vec2SignalMock || min instanceof Vector2) && (max instanceof Vec2SignalMock || max instanceof Vector2)) {
            // @ts-ignore
            newSignal = new Vec2SignalMock(callback());
        }
        if ((min instanceof VectorSignalMock || min instanceof Vector3) && (max instanceof VectorSignalMock || max instanceof Vector3)) {
            // @ts-ignore
            newSignal = new VectorSignalMock(callback());
        }


        if (typeof min === "number" || min instanceof Vector2 || min instanceof Vector3) {
            if(typeof max === "number" || max instanceof Vector2 || max instanceof Vector3) {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, max, newSignal, callback);
            }
        } else {
            if (typeof max === "number" || max instanceof Vector2 || max instanceof Vector3) {
                monitor(this, min, newSignal, callback);
            } else {
                monitorForTwoArg(this, min, max, newSignal, callback);
            }
        }

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3} min
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2 | VectorSignalMock | Vector3} max
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

        if(errorCase0 || errorCase1 || errorCase2 || errorCase3 || errorCase4 || errorCase5) {
            throw new Error('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types')
        }

        let callback = () => {
            if (caseMinScalar && caseMaxScalar) {
                // @ts-ignore
                let valMin = typeof min === 'number' ? min : min.value;
                // @ts-ignore
                let valMax = typeof max === 'number' ? max : max.value;
                
                let sub = valMax - valMin;
                return valMin + sub * this.value;
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

                /**@type {number} */
                let x, y;
                let subX = valMaxX - valMinX;
                x = valMinX + subX * this.value;
                let subY = valMaxY - valMinY;
                y = valMinY + subY * this.value;

                return new Vector2(x,y)
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

                /**@type {number} */
                let x, y, z;

                let subX = valMaxX - valMinX;
                x = valMinX + subX * this.value;
                let subY = valMaxY - valMinY;
                y = valMinY + subY * this.value;
                let subZ = valMaxZ - valMinZ;
                z = valMinZ + subZ * this.value;

                return new Vector3(x,y,z)
            }        
        }

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        if ((min instanceof ScalarSignalMock || typeof min === 'number') && (max instanceof ScalarSignalMock || typeof max === 'number')) {
            newSignal = new ScalarSignalMock(callback());
        }
        if ((min instanceof Vec2SignalMock || min instanceof Vector2) && (max instanceof Vec2SignalMock || max instanceof Vector2)) {
            newSignal = new Vec2SignalMock(callback());
        }
        if ((min instanceof VectorSignalMock || min instanceof Vector3) && (max instanceof VectorSignalMock || max instanceof Vector3)) {
            newSignal = new VectorSignalMock(callback());
        }

        if (typeof min === "number" || min instanceof Vector2 || min instanceof Vector3) {
            if(typeof max === "number" || max instanceof Vector2 || max instanceof Vector3) {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, max, newSignal, callback);
            }
        } else {
            if (typeof max === "number" || max instanceof Vector2 || max instanceof Vector3) {
                monitor(this, min, newSignal, callback);
            } else {
                monitorForTwoArg(this, min, max, newSignal, callback);
            }
        }

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     * @returns {BoolSignalMock}
     */
    eq(signal) {
        let callback = () => {
            let secondValue = typeof signal === 'number' ? signal : signal.value;
            return this.value === secondValue;
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     * @returns {BoolSignalMock}
     */
    ge(signal) {
        let callback = () => {
            let secondValue = typeof signal === 'number' ? signal : signal.value;
            return this.value >= secondValue;
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     * @returns {BoolSignalMock}
     */
    gt(signal) {
        let callback = () => {
            let secondValue = typeof signal === 'number' ? signal : signal.value;
            return this.value > secondValue;
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     * @returns {BoolSignalMock}
     */
    le(signal) {
        let callback = () => {
            let secondValue = typeof signal === 'number' ? signal : signal.value;
            return this.value <= secondValue;
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     * @returns {BoolSignalMock}
     */
    lt(signal) {
        let callback = () => {
            let secondValue = typeof signal === 'number' ? signal : signal.value;
            return this.value < secondValue;
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     * @returns {BoolSignalMock}
     */
    ne(signal) {
        let callback = () => {
            let secondValue = typeof signal === 'number' ? signal : signal.value;
            return this.value !== secondValue;
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {{high: number, initialValue?: false | true, low: number}} config
     * @returns {BoolSignalMock} 
     */
    schmittTrigger(config) {
        /**@type {boolean} */
        let result;
        let callback = () => {
            if (config.high < config.low) return undefined
            if (this.value > config.high) {
                result = true;
                return true;
            }
            if (this.value < config.low) {
                result = false
                return false;
            }
            if (this.value >= config.low && this.value <= config.high) {
                if (result !== undefined) return result;
                if (config.initialValue !== undefined) {
                    if (result === undefined) return config.initialValue;
                } else {
                    if (result === undefined) return undefined
                }
                
            }
        }
        
        let newSignal = new BoolSignalMock(callback());

        this.monitor().subscribe(async() => {
            await newSignal.mockUpdate(callback())
        })

        return newSignal;
    }

    /**
     * @param {number} threshold 
     * @returns 
     */
    interval(threshold) {
        let eventSource = new EventSourceMock();
        let edge = threshold;

        let firstCallback = async () => {
            let i = Math.floor(this.value / threshold);
            for(i; i > 0; i--) {
                await eventSource.mockCallback();
                edge += threshold;
            }
        }

        let callback = async () => {
            if ((this.value - edge) >= threshold) {
                let i = Math.floor((this.value - edge) / threshold);
                for(i; i >= 0; i--) {
                    await eventSource.mockCallback();
                    edge += threshold;
                }
            }
        }

        setTimeout(() => firstCallback(), 30);

        this.monitor().subscribe(async() => {
            await callback();
        })

        return eventSource;
    }

    /**
     * @memberof ScalarSignalMock
     */
    magnitude() {
        let callback = () => {
            return this.value;
        }
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    magnitudeSquared() {
        let callback = () => {
            return this.value ** 2;
        }
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} scalar
     * @memberof ScalarSignalMock
     */
    max(scalar) {
        let callback = () => {
            return Math.max(this.value, typeof scalar == 'number' ? scalar : scalar.value);
        }
        let newSignal = new ScalarSignalMock(callback());

        monitor(this, scalar, newSignal, callback);
        
        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} scalar
     * @memberof ScalarSignalMock
     */
    min(scalar) {
        let callback = () => {
            return Math.min(this.value, typeof scalar == 'number' ? scalar : scalar.value);
        }
        let newSignal = new ScalarSignalMock(callback());

        monitor(this, scalar, newSignal, callback);
        
        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} scalar
     * @param {ScalarSignalMock | number} factor
     * @memberof ScalarSignalMock
     */
    mix(scalar, factor) {
        let callback = () => {
            let newScalar = typeof scalar === 'number' ? scalar : scalar.value;
            let newFactor = typeof factor === 'number' ? factor : factor.value
            return this.value + (newScalar - this.value) * newFactor
        }
        let newSignal = new ScalarSignalMock(callback());
        
        if (typeof scalar === "number") {
            if(typeof factor === "number") {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, factor, newSignal, callback);
            }
        } else {
            if(typeof factor === "number") {
                monitor(this, scalar, newSignal, callback);
            } else {
                monitorForTwoArg(this, scalar, factor, newSignal, callback);
            }
        }
        
        return newSignal;
    }

    normalize() {
        return new ScalarSignalMock(1);
    }

    /**
     * @param {ScalarSignalMock | number} max
     * @param {ScalarSignalMock | number} min
     */
    smoothStep(min, max) {
        let callback = () => {
            let newMin = typeof min === 'number' ? min : min.value;
            let newMax = typeof max === 'number' ? max : max.value

            if (this.value <= newMin) return 0;
            if (this.value >= newMax) return 1;
            if (this.value > newMin && this.value < newMax) {
                return (this.value - newMin) / (newMax - newMin);
            }
        }
        let newSignal = new ScalarSignalMock(callback());

        if (typeof min === "number") {
            if(typeof max === "number") {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback())
                })
            } else {
                monitor(this, max, newSignal, callback);
            }
        } else {
            if(typeof max === "number") {
                monitor(this, min, newSignal, callback);
            } else {
                monitorForTwoArg(this, min, max, newSignal, callback);
            }
        }
        
        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} signal
     * @memberof ScalarSignalMock
     */
    sum(signal) {
        return this.add(signal);
    }

    /**
     * 
     * @param {number} threshold 
     * @returns 
     */
    multiTrigger(threshold) {
        let eventSource = new EventSourceMock();

        this.monitor().subscribe(async () => {
            if (this.value >= threshold)         
                await eventSource.mockCallback();
        })

        return eventSource;
    }

    /**
     * 
     * @param {number} threshold 
     * @returns 
     */
    trigger(threshold) {
        let eventSource = new EventSourceMock();

        let subscription = this.monitor().subscribe(async () => {
            if (this.value >= threshold) {
                await eventSource.mockCallback();
                subscription.unsubscribe();
            }
        })

        return eventSource;
    }

    pin() {
        return new SignalMock(this._value);
    }

    pinLastValue() {
        return this._value;
    }
}

/**
 * @param {ScalarSignalMock} firstSignal
 * @param {ScalarSignalMock | number | Vec2SignalMock | VectorSignalMock | Vector2 | Vector3} secondSignal
 * @param {ScalarSignalMock | BoolSignalMock | Vec2SignalMock | VectorSignalMock} signal
 * @param {Function} callback
 */
function monitor(firstSignal, secondSignal, signal, callback) {
    firstSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback())
    })

    if (secondSignal instanceof VectorSignalMock || secondSignal instanceof Vec2SignalMock || secondSignal instanceof ScalarSignalMock) {
        secondSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback())
        })
    }
}

/**
 * @param {ScalarSignalMock} firstSignal
 * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} secondSignal
 * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} thirdSignal
 * @param {ScalarSignalMock | BoolSignalMock | Vec2SignalMock | VectorSignalMock} signal
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
