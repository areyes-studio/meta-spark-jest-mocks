import Quaternion from 'quaternion';
import QuaternionSignalMock from './QuaternionSignal.mock';
import ScalarSignalMock from './ScalarSignal.mock';
import { ScalarSignalSourceMock, StringSignalSourceMock, BoolSignalSourceMock } from './SignalSource.mock';
import VectorSignalMock from './VectorSignal.mock';
import Vec2SignalMock from './Vec2Signal.mock';
import StringSignalMock from './StringSignal.mock';
import BoolSignalMock from './BoolSignal.mock';
import EventSourceMock from './EventSource.mock';
import TransformSignalMock from './TransformSignal.mock';

import { Vector3, Vector2 } from '@areyes-studio/math-module';

export class ReactiveMock {
    /**
     * @param {string} name
     * @return {ScalarSignalSourceMock} 
     * @memberof ReactiveMock
     */
    static scalarSignalSource(name) {
        return new ScalarSignalSourceMock(name);
    }

    /**
     * @param {string} name
     * @return {StringSignalSourceMock} 
     * @memberof ReactiveMock
     */
    static stringSignalSource(name) {
        return new StringSignalSourceMock(name);
    }

    /**
     * @param {string} name
     * @return {BoolSignalSourceMock} 
     * @memberof ReactiveMock
     */
    static boolSignalSource(name) {
        return new BoolSignalSourceMock(name);
    }

    /**
     * 
     * @param {string | number | boolean} signal 
     */
    static val(signal) {
        switch (typeof signal) {
            case 'string': return new StringSignalMock(signal);
            case 'number': return new ScalarSignalMock(signal);
            case 'boolean': return new BoolSignalMock(signal);
        }
    }

    /**
     * @param {ScalarSignalMock | number} x
     * @param {ScalarSignalMock | number} y
     * @param {ScalarSignalMock | number} z
     * @return {VectorSignalMock} 
     * @memberof ReactiveMock
     */
    static vector(x, y, z) {
        if (typeof x !== 'number') {
            x.monitor().subscribe(async (/** @type {{ newValue: number }} */ v) => {
                x = v.newValue;

                await vectorSignal.mockUpdate(new Vector3(
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                    /** @type {number} */(z),
                ))
            })

            x = x.value;
        }

        if (typeof y !== 'number') {
            y.monitor().subscribe(async (/** @type {{ newValue: number }} */ v) => {
                y = v.newValue;

                await vectorSignal.mockUpdate(new Vector3(
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                    /** @type {number} */(z),
                ))
            })

            y = y.value;
        }

        if (typeof z !== 'number') {
            z.monitor().subscribe(async (/** @type {{ newValue: number }} */ v) => {
                z = v.newValue;

                await vectorSignal.mockUpdate(new Vector3(
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                    /** @type {number} */(z),
                ))
            })

            z = z.value;
        }

        let vectorSignal = new VectorSignalMock(new Vector3(
            /** @type {number} */(x),
            /** @type {number} */(y),
            /** @type {number} */(z),
        ));

        return vectorSignal;
    }

    /**
     * @param {ScalarSignalMock | number} x
     * @param {ScalarSignalMock | number} y
     * @param {ScalarSignalMock | number} z
     * @return {VectorSignalMock} 
     * @memberof ReactiveMock
     */
    static point(x, y, z) {
        return ReactiveMock.vector(x,y,z);
    }

    /**
     * @param {ScalarSignalMock | number} x
     * @param {ScalarSignalMock | number} y
     * @return {Vec2SignalMock} 
     * @memberof ReactiveMock
     */
    static point2d(x, y) {
        if (typeof x !== 'number') {
            x.monitor().subscribe(async (/** @type {{ newValue: number }} */ v) => {
                x = v.newValue;

                await vectorSignal.mockUpdate(new Vector2(
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                ))
            })

            x = x.value;
        }

        if (typeof y !== 'number') {
            y.monitor().subscribe(async (/** @type {{ newValue: number }} */ v) => {
                y = v.newValue;

                await vectorSignal.mockUpdate(new Vector2(
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                ))
            })

            y = y.value;
        }

        let vectorSignal = new Vec2SignalMock(new Vector2(
            /** @type {number} */(x),
            /** @type {number} */(y)
        ));

        return vectorSignal;
    }

    /**
     * @param {ScalarSignalMock | number} w
     * @param {ScalarSignalMock | number} x
     * @param {ScalarSignalMock | number} y
     * @param {ScalarSignalMock | number} z
     * @return {QuaternionSignalMock} 
     * @memberof ReactiveMock
     */
    static quaternion(w, x, y, z) {
        if (typeof x !== 'number') {
            x.monitor().subscribe(async (/** @type {{ newValue: number }} */ v) => {
                x = v.newValue;

                await quaternionSignal.mockUpdate(new Quaternion(
                    /** @type {number} */(w),
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                    /** @type {number} */(z),
                ))
            })

            x = x.value;
        }

        if (typeof y !== 'number') {
            y.monitor().subscribe(async (/** @type {{ newValue: number }} */ v) => {
                y = v.newValue;

                await quaternionSignal.mockUpdate(new Quaternion(
                    /** @type {number} */(w),
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                    /** @type {number} */(z),
                ))
            })

            y = y.value;
        }

        if (typeof z !== 'number') {
            z.monitor().subscribe(async (/** @type {{ newValue: number }} */ v) => {
                z = v.newValue;

                await quaternionSignal.mockUpdate(new Quaternion(
                    /** @type {number} */(w),
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                    /** @type {number} */(z),
                ))
            })

            z = z.value;
        }

        if (typeof w !== 'number') {
            w.monitor().subscribe(async (/** @type {{ newValue: number }} */ v) => {
                w = v.newValue;

                await quaternionSignal.mockUpdate(new Quaternion(
                    /** @type {number} */(w),
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                    /** @type {number} */(z),
                ))
            })

            w = w.value;
        }

        let quaternionSignal = new QuaternionSignalMock(new Quaternion(
            /** @type {number} */(w),
            /** @type {number} */(x),
            /** @type {number} */(y),
            /** @type {number} */(z),
        ))

        return quaternionSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} value 
     */
    static abs(value) {
        return value.abs();
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static add(val1, val2) {
        if(val1 instanceof ScalarSignalMock) return val1.add(val2);
        if(val1 instanceof Vec2SignalMock) {
            if (val2 instanceof VectorSignalMock) throw Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val1.add(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock) throw new Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val1.add(val2) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static sub(val1, val2) {
        if(val1 instanceof ScalarSignalMock) return val1.sub(val2);
        if(val1 instanceof Vec2SignalMock) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.sub(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.sub(val2) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static mul(val1, val2) {
        if(val1 instanceof ScalarSignalMock) return val1.mul(val2);
        if(val1 instanceof Vec2SignalMock) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.mul(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.mul(val2) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static div(val1, val2) {
        if(val1 instanceof ScalarSignalMock) return val1.div(val2);
        if(val1 instanceof Vec2SignalMock) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.div(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.div(val2) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static mod(val1, val2) {
        if(val1 instanceof ScalarSignalMock) return val1.mod(val2);
        if(val1 instanceof Vec2SignalMock) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.mod(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.mod(val2) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static pow(val1, val2) {
        if(val1 instanceof ScalarSignalMock) {
            if (val2 instanceof ScalarSignalMock) return val1.pow(val2);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types');
        }
        if(val1 instanceof Vec2SignalMock) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.pow(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.pow(val2) 
        }
    }

    /**
     * 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static sqrt(signal) {
        return signal.sqrt();
    }

    /**
     * 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static neg(signal) {
        return signal.neg();
    }

    /**
     * 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static normalize(signal) {
        return signal.normalize();
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static sum(val1, val2) {
        return ReactiveMock.add(val1, val2);
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal
     */
    static exp(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock) return Math.exp(signal.value);
            if (signal instanceof Vec2SignalMock) {
                return new Vector2(
                    Math.exp(signal.value.x),
                    Math.exp(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new Vector3(
                    Math.exp(signal.value.x),
                    Math.exp(signal.value.y),
                    Math.exp(signal.value.z)
                )
            }
        }

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock) newSignal = new ScalarSignalMock(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock) newSignal = new Vec2SignalMock(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback())
        })

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static acos(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock) return Math.acos(signal.value);
            if (signal instanceof Vec2SignalMock) {
                return new Vector2(
                    Math.acos(signal.value.x),
                    Math.acos(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new Vector3(
                    Math.acos(signal.value.x),
                    Math.acos(signal.value.y),
                    Math.acos(signal.value.z)
                )
            }
        }

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock) newSignal = new ScalarSignalMock(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock) newSignal = new Vec2SignalMock(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback())
        })

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static asin(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock) return Math.asin(signal.value);
            if (signal instanceof Vec2SignalMock) {
                return new Vector2(
                    Math.asin(signal.value.x),
                    Math.asin(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new Vector3(
                    Math.asin(signal.value.x),
                    Math.asin(signal.value.y),
                    Math.asin(signal.value.z)
                )
            }
        }

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock) newSignal = new ScalarSignalMock(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock) newSignal = new Vec2SignalMock(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback())
        })

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static atan(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock) return Math.atan(signal.value);
            if (signal instanceof Vec2SignalMock) {
                return new Vector2(
                    Math.atan(signal.value.x),
                    Math.atan(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new Vector3(
                    Math.atan(signal.value.x),
                    Math.atan(signal.value.y),
                    Math.atan(signal.value.z)
                )
            }
        }

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock) newSignal = new ScalarSignalMock(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock) newSignal = new Vec2SignalMock(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback())
        })

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static cos(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock) return Math.cos(signal.value);
            if (signal instanceof Vec2SignalMock) {
                return new Vector2(
                    Math.cos(signal.value.x),
                    Math.cos(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new Vector3(
                    Math.cos(signal.value.x),
                    Math.cos(signal.value.y),
                    Math.cos(signal.value.z)
                )
            }
        }

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock) newSignal = new ScalarSignalMock(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock) newSignal = new Vec2SignalMock(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback())
        })

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static tan(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock) return Math.tan(signal.value);
            if (signal instanceof Vec2SignalMock) {
                return new Vector2(
                    Math.tan(signal.value.x),
                    Math.tan(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new Vector3(
                    Math.tan(signal.value.x),
                    Math.tan(signal.value.y),
                    Math.tan(signal.value.z)
                )
            }
        }

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock) newSignal = new ScalarSignalMock(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock) newSignal = new Vec2SignalMock(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback())
        })

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static sin(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock) return Math.sin(signal.value);
            if (signal instanceof Vec2SignalMock) {
                return new Vector2(
                    Math.sin(signal.value.x),
                    Math.sin(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new Vector3(
                    Math.sin(signal.value.x),
                    Math.sin(signal.value.y),
                    Math.sin(signal.value.z)
                )
            }
        }

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock) newSignal = new ScalarSignalMock(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock) newSignal = new Vec2SignalMock(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback())
        })

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static log(signal) {
        if (!(signal instanceof ScalarSignalMock || signal instanceof Vec2SignalMock || signal instanceof VectorSignalMock)) {
            throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }

        let callback = () => {
            switch (Object.getPrototypeOf(signal)) {
                case ScalarSignalMock.prototype:
                    return Math.log(signal.value)
                case Vec2SignalMock.prototype:
                    return new Vector2(Math.log(signal.value.x), Math.log(signal.value.y));
                case VectorSignalMock.prototype:
                    return new Vector3(Math.log(signal.value.x), Math.log(signal.value.y), Math.log(signal.value.z));
            }
        }
        
        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock) newSignal = new ScalarSignalMock(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock) newSignal = new Vec2SignalMock(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());
        
        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback())
        })

        return newSignal;
    }

    /**
     * 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     */
    static atan2(val1, val2) {
        if(val1 instanceof ScalarSignalMock) return val1.atan2(val2);
        if(val1 instanceof Vec2SignalMock) {
            if (val2 instanceof VectorSignalMock) throw Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val1.atan2(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock) throw new Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val1.atan2(val2) 
        }
    }

    /**
     * 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} min
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} max
     */
    static clamp(val, min, max) {
        if(val instanceof ScalarSignalMock) return val.clamp(min, max);
        if(val instanceof Vec2SignalMock) {
            if (min instanceof VectorSignalMock || max instanceof VectorSignalMock) throw Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val.clamp(min, max) 
        }
        if(val instanceof VectorSignalMock) {
            if (min instanceof Vec2SignalMock || max instanceof Vec2SignalMock) throw new Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val.clamp(min, max) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} edge 
     */
    static step(val, edge) {
        let callback = () => {
            switch (Object.getPrototypeOf(val)) {
                case ScalarSignalMock.prototype:
                    if (edge instanceof ScalarSignalMock) {
                        if(val.value < edge.value) return 0;
                        else return 1;
                    }

                    if (edge instanceof Vec2SignalMock) {
                        /**@type {number} */
                        let x,y;
                        
                        if (val.value < edge.value.x) x = 0;
                        else x = 1;
                        if (val.value < edge.value.y) y = 0;
                        else y = 1;

                        return new Vector2(x,y)
                    }

                    if (edge instanceof VectorSignalMock) {
                        /**@type {number} */
                        let x,y,z;
                        
                        if (val.value < edge.value.x) x = 0;
                        else x = 1;
                        if (val.value < edge.value.y) y = 0;
                        else y = 1;
                        if (val.value < edge.value.z) z = 0;
                        else z = 1;

                        return new Vector3(x,y,z)
                    }

                case Vec2SignalMock.prototype:
                    /**@type {number} */
                    let vec2X, vec2Y;

                    if (edge instanceof ScalarSignalMock) {
                        if (val.value.x < edge.value) vec2X = 0;
                        else vec2X = 1;
                        if (val.value.y < edge.value) vec2Y = 0;
                        else vec2Y = 1;
                    }

                    if (edge instanceof Vec2SignalMock) {
                        if (val.value.x < edge.value.x) vec2X = 0;
                        else vec2X = 1;
                        if (val.value.y < edge.value.y) vec2Y = 0;
                        else vec2Y = 1;
                    }

                    return new Vector2(vec2X, vec2Y)
                    
                case VectorSignalMock.prototype:
                    /**@type {number} */
                    let x,y,z;

                    if (edge instanceof ScalarSignalMock) {
                        if (val.value.x < edge.value) x = 0;
                        else x = 1;
                        if (val.value.y < edge.value) y = 0;
                        else y = 1;
                        if (val.value.z < edge.value) z = 0;
                        else z = 1;
                    }

                    if (edge instanceof VectorSignalMock) {
                        if (val.value.x < edge.value.x) x = 0;
                        else x = 1;
                        if (val.value.y < edge.value.y) y = 0;
                        else y = 1;
                        if (val.value.z < edge.value.z) z = 0;
                        else z = 1;
                    }
                    return new Vector3(x,y,z)
            }
        }

        if ((val instanceof Vec2SignalMock && edge instanceof VectorSignalMock) || (edge instanceof Vec2SignalMock && val instanceof VectorSignalMock)) {
            throw new Error("Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}");
        }
        
        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        if (val instanceof ScalarSignalMock && edge instanceof ScalarSignalMock) newSignal = new ScalarSignalMock(callback());
        if (edge instanceof Vec2SignalMock || val instanceof Vec2SignalMock) newSignal = new Vec2SignalMock(callback());
        if (edge instanceof VectorSignalMock || val instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());
        
        monitor(val, edge, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} min
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} max
     */
    static smoothStep(val, min, max) {
        if(val instanceof ScalarSignalMock) return val.smoothStep(min, max);
        if(val instanceof Vec2SignalMock) {
            if (min instanceof VectorSignalMock || max instanceof VectorSignalMock) throw Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val.smoothStep(min, max) 
        }
        if(val instanceof VectorSignalMock) {
            if (min instanceof Vec2SignalMock || max instanceof Vec2SignalMock) throw new Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val.smoothStep(min, max) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} min
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} max
     */
    static fromRange(val, min, max) {
        if(val instanceof ScalarSignalMock) return val.fromRange(min, max);
        if(val instanceof Vec2SignalMock) {
            if (min instanceof VectorSignalMock || max instanceof VectorSignalMock) throw Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val.fromRange(min, max) 
        }
        if(val instanceof VectorSignalMock) {
            if (min instanceof Vec2SignalMock || max instanceof Vec2SignalMock) throw new Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val.fromRange(min, max) 
        }
    }

    /**
     * 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} min
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} max
     */
    static toRange(val, min, max) {
        if(val instanceof ScalarSignalMock) return val.toRange(min, max);
        if(val instanceof Vec2SignalMock) {
            if (min instanceof VectorSignalMock || max instanceof VectorSignalMock) throw Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val.toRange(min, max) 
        }
        if(val instanceof VectorSignalMock) {
            if (min instanceof Vec2SignalMock || max instanceof Vec2SignalMock) throw new Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val.toRange(min, max) 
        }
    }

    /**
     * @param {VectorSignalMock} bool0 
     * @param {VectorSignalMock} bool1 
     */
    static cross(bool0, bool1) {
        return bool0.cross(bool1);
    }

    /**
     * @param {Vec2SignalMock | VectorSignalMock} vec0 
     * @param {Vec2SignalMock | VectorSignalMock} vec1 
     */
    static distance(vec0, vec1) {
        if((vec0 instanceof Vec2SignalMock && vec1 instanceof Vec2SignalMock) || (vec0 instanceof VectorSignalMock && vec1 instanceof VectorSignalMock)) {
            return vec0.distance(vec1)
        } else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
    }

    /**
     * @param {Vec2SignalMock | VectorSignalMock} vec0 
     * @param {Vec2SignalMock | VectorSignalMock} vec1 
     */
    static dot(vec0, vec1) {
        if((vec0 instanceof Vec2SignalMock && vec1 instanceof Vec2SignalMock) || (vec0 instanceof VectorSignalMock && vec1 instanceof VectorSignalMock)) {
            return vec0.dot(vec1)
        } else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
    }

    /**
     * @param {Vec2SignalMock | VectorSignalMock} vec0 
     * @param {Vec2SignalMock | VectorSignalMock} vec1 
     */
    static reflect(vec0, vec1) {
        if((vec0 instanceof Vec2SignalMock && vec1 instanceof Vec2SignalMock) || (vec0 instanceof VectorSignalMock && vec1 instanceof VectorSignalMock)) {
            return vec0.reflect(vec1)
        } else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static magnitude(signal) {
        if (signal instanceof ScalarSignalMock || signal instanceof Vec2SignalMock || signal instanceof VectorSignalMock) return signal.magnitude();
        else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
    }

    /**
     * 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static magnitudeSquared(signal) {
        if (signal instanceof ScalarSignalMock || signal instanceof Vec2SignalMock || signal instanceof VectorSignalMock) return signal.magnitudeSquared();
        else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static max(val1, val2) {
        if(val1 instanceof ScalarSignalMock) return val1.max(val2);
        if(val1 instanceof Vec2SignalMock) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.max(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.max(val2) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static min(val1, val2) {
        if(val1 instanceof ScalarSignalMock) return val1.min(val2);
        if(val1 instanceof Vec2SignalMock) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.min(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.min(val2) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal0
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal1
     * @param {ScalarSignalMock | number} factor
     */
    static mix(signal0, signal1, factor) {
        // @ts-ignore
        return signal0.mix(signal1, factor);
    }

    /**
     * @param {BoolSignalMock} bool0 
     * @param {BoolSignalMock} bool1 
     */
    static and(bool0, bool1) {
        return bool0.and(bool1);
    }

    /**
     * @param {BoolSignalMock []} boolArray 
     */
    static andList(boolArray) {
        let callback = () => {
            let result = true;

            boolArray.forEach(bool => {
                let boolVal = bool.value;
                if(boolVal === false) result = false;
            })

            if(boolArray.length === 0) result = false;

            return result;
        }

        let newSignal = new BoolSignalMock(callback());

        monitorForArray(boolArray, newSignal, callback)

        return newSignal;
    }

    /**
     * @param {BoolSignalMock} bool0 
     * @param {BoolSignalMock} bool1 
     */
    static or(bool0, bool1) {
        return bool0.or(bool1);
    }

    /**
     * @param {BoolSignalMock []} boolArray 
     */
    static orList(boolArray) {
        let callback = () => {
            let result = false;

            boolArray.forEach(bool => {
                let boolVal = bool.value;
                if(boolVal === true) result = true;
            })

            return result;
        }

        let newSignal = new BoolSignalMock(callback());

        monitorForArray(boolArray, newSignal, callback)

        return newSignal;
    }

    /**
     * @param {BoolSignalMock} bool0 
     * @param {BoolSignalMock} bool1 
     */
    static xor(bool0, bool1) {
        return bool0.xor(bool1);
    }

    /**
     * @param {BoolSignalMock []} boolArray 
     */
    static xorList(boolArray) {
        let callback = () => {
            let result = false;

            if(boolArray[0].pinLastValue()) {
                boolArray.forEach(bool => {
                    if (bool.pinLastValue() === false) result = true
                })
            } else {
                boolArray.forEach(bool => {
                    if (bool.pinLastValue() === true) result = true
                })
            }

            return result;
        }

        let newSignal = new BoolSignalMock(callback());

        monitorForArray(boolArray, newSignal, callback)

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static ceil(signal) {
        return signal.ceil();
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static floor(signal) {
        return signal.floor();
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static round(signal) {
        return signal.round();
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static sign(signal) {
        return signal.sign();
    }

    /**
     * @param {StringSignalMock} str1 
     * @param {StringSignalMock} str2 
     */
    static concat(str1, str2) {
        return str1.concat(str2);
    }

    /**
     * @param {ScalarSignalMock | StringSignalMock | BoolSignalMock} val0 
     * @param {ScalarSignalMock | StringSignalMock | BoolSignalMock} val1 
     */
    static eq(val0, val1) {
        if (val0 instanceof ScalarSignalMock) {
            if (val1 instanceof ScalarSignalMock) return val0.eq(val1);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }
        if (val0 instanceof StringSignalMock) {
            if (val1 instanceof StringSignalMock) return val0.eq(val1);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }
        if (val0 instanceof BoolSignalMock) {
            if (val1 instanceof BoolSignalMock) return val0.eq(val1);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }
    }

    /**
     * @param {ScalarSignalMock | StringSignalMock | BoolSignalMock} val0 
     * @param {ScalarSignalMock | StringSignalMock | BoolSignalMock} val1 
     */
    static ne(val0, val1) {
        if (val0 instanceof ScalarSignalMock) {
            if (val1 instanceof ScalarSignalMock) return val0.ne(val1);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }
        if (val0 instanceof StringSignalMock) {
            if (val1 instanceof StringSignalMock) return val0.ne(val1);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }
        if (val0 instanceof BoolSignalMock) {
            if (val1 instanceof BoolSignalMock) return val0.ne(val1);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }
    }

    /**
     * @param {ScalarSignalMock} val0 
     * @param {ScalarSignalMock} val1 
     */
    static ge(val0, val1) {
        if(val0 instanceof ScalarSignalMock && val1 instanceof ScalarSignalMock) return val0.ge(val1);
        else throw new Error('Exception in HostFunction: Component is not defined for the provided input types');
    }

    /**
     * @param {ScalarSignalMock} val0 
     * @param {ScalarSignalMock} val1 
     */
    static gt(val0, val1) {
        if(val0 instanceof ScalarSignalMock && val1 instanceof ScalarSignalMock) return val0.gt(val1);
        else throw new Error('Exception in HostFunction: Component is not defined for the provided input types');
    }

    /**
     * @param {ScalarSignalMock} val0 
     * @param {ScalarSignalMock} val1 
     */
    static le(val0, val1) {
        if(val0 instanceof ScalarSignalMock && val1 instanceof ScalarSignalMock) return val0.le(val1);
        else throw new Error('Exception in HostFunction: Component is not defined for the provided input types');
    }

    /**
     * @param {ScalarSignalMock} val0 
     * @param {ScalarSignalMock} val1 
     */
    static lt(val0, val1) {
        if(val0 instanceof ScalarSignalMock && val1 instanceof ScalarSignalMock) return val0.lt(val1);
        else throw new Error('Exception in HostFunction: Component is not defined for the provided input types');
    }

    /**
     * @param {BoolSignalMock} signal 
     */
    static not(signal) {
        return signal.not();
    }

    /**
     * @param {BoolSignalMock | StringSignalMock | ScalarSignalMock} bool0 
     * @param {BoolSignalMock | StringSignalMock | ScalarSignalMock} bool1 
     * @param {BoolSignalMock | StringSignalMock | ScalarSignalMock} elseSignal
     */
    static ifThenElse(bool0, bool1, elseSignal) {
        if(bool0 instanceof BoolSignalMock && (
            bool1 instanceof ScalarSignalMock || bool1 instanceof StringSignalMock || bool1 instanceof BoolSignalMock
        )) return bool0.ifThenElse(bool1, elseSignal)
        else {
            if(bool1 instanceof BoolSignalMock && (
                bool0 instanceof ScalarSignalMock || bool0 instanceof StringSignalMock || bool0 instanceof BoolSignalMock
            )) return bool1.ifThenElse(bool0, elseSignal)
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types');
        }
    }

    /**
     * 
     * @param {ScalarSignalMock} signal 
     * @param {{high: number, initialValue?: false | true, low: number}} config 
     */
    static schmittTrigger(signal, config) {
        return signal.schmittTrigger(config);
    }

    static once() {
        let eventSourceMock = new EventSourceMock()
        setTimeout(async() => {
            await eventSourceMock.mockCallback()
        }, 0)
        return eventSourceMock;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock} val0 
     * @param {ScalarSignalMock | Vec2SignalMock} val1 
     */
    static pack2(val0, val1){
        let callback = () => {
            if (val0 instanceof ScalarSignalMock) {
                if (val1 instanceof ScalarSignalMock) return new Vector2(val0.value, val1.value);
                if (val1 instanceof Vec2SignalMock) return new Vector3(val0.value, val1.value.x, val1.value.y);
            }
            if (val0 instanceof Vec2SignalMock) {
                if (val1 instanceof ScalarSignalMock) return new Vector3(val0.value.x, val0.value.y, val1.value);
                if (val1 instanceof Vec2SignalMock) return new Vector2(null, null) // should return Vector4
            }
        }

        /**@type {Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        if (callback() instanceof Vector2) newSignal = new Vec2SignalMock(callback());
        if (callback() instanceof Vector3) newSignal = new VectorSignalMock(callback());

        monitor(val0, val1, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock} val0 
     * @param {ScalarSignalMock} val1 
     * @param {ScalarSignalMock} val2 
     */
    static pack3(val0, val1, val2){
        let callback = () => {
            return new Vector3(val0.value, val1.value, val2.value)
        }

        let newSignal = new VectorSignalMock(callback());

        monitorForThreeArg(val0, val1, val2, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock} x 
     * @param {ScalarSignalMock} y 
     * @param {ScalarSignalMock} z 
     */
    static scale(x,y,z) {
        let callback = () => {
            return new Vector3(x.value, y.value, z.value);
        }

        let newSignal = new VectorSignalMock(callback());
        
        monitorForThreeArg(x, y, z, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock[]} signalArray
     * @param {{ fireOnInitialValue: boolean; }} [config]
     */
    static monitorMany(signalArray, config) {
        const eventSource = new EventSourceMock(config);
        signalArray.forEach(signal => {
            signal.monitor().subscribe(async() => await eventSource.mockCallback())
        })
        return eventSource;
    }

    /**
     * @param {ScalarSignalMock} angle 
     * @param {VectorSignalMock} axis 
     */
    static quaternionFromAngleAxis(angle, axis) {
        let callback = () => {
            let normVec = axis.normalize();
            let x = normVec.value.x * Math.sin(angle.value / 2);
            let y = normVec.value.y * Math.sin(angle.value / 2);
            let z = normVec.value.z * Math.sin(angle.value / 2);
            let w = Math.cos(angle.value / 2);

            return new Quaternion(w, x, y, z)
        }
        let newSignal = new QuaternionSignalMock(callback());

        monitor(angle, axis, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock} pitch
     * @param {ScalarSignalMock} yaw
     * @param {ScalarSignalMock} roll
     */
    static quaternionFromEuler(pitch, yaw, roll) {
        let callback = () => {
            let qx = new Quaternion(Math.cos(pitch.value / 2), Math.sin(pitch.value / 2), 0, 0);
            let qy = new Quaternion(Math.cos(yaw.value / 2), 0, Math.sin(yaw.value / 2), 0);
            let qz = new Quaternion(Math.cos(roll.value / 2), 0, 0, Math.sin(roll.value / 2));

            let q0 = qx.mul(qy);
            let quaternion = q0.mul(qz);
            
            return quaternion;
        }
        let newSignal = new QuaternionSignalMock(callback());

        monitorForThreeArg(pitch, yaw, roll, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {VectorSignalMock} from 
     * @param {VectorSignalMock} to 
     */
    static quaternionFromTo(from, to) {
        let callback = () => {
            let cross = from.cross(to).value;
            let dot = from.dot(to).pinLastValue();
            let magnFrom = from.magnitude().pinLastValue();
            let magnTo = to.magnitude().pinLastValue();
            let angle = Math.acos(dot / (magnFrom * magnTo));
            let quaternion = new Quaternion(
                Math.cos(angle / 2), 
                cross.x * Math.sin(angle / 2),
                cross.y * Math.sin(angle / 2),
                cross.z * Math.sin(angle / 2)
            )

            return quaternion;
        }

        let newSignal = new QuaternionSignalMock(callback());

        monitor(from, to, newSignal, callback);

        return newSignal;
    }

    static quaternionIdentity() {
        return new QuaternionSignalMock(new Quaternion (1,0,0,0));
    }

    /**
     * 
     * @param {VectorSignalMock} targetPos 
     * @param {VectorSignalMock} selfUp
     * @param {VectorSignalMock} forward
     */
    static quaternionLookAt(targetPos, selfUp = new VectorSignalMock(new Vector3(0,1,0)), forward = new VectorSignalMock(new Vector3(0,0,1))) {
        let callback = () => {
            let targetDirection = targetPos.sub(selfUp).normalize().value;

            let forwardVec = forward.value;
            let angle = Math.acos(forwardVec.dot(targetDirection));

            let axis = forwardVec.cross(targetDirection).normalize();

            let quaternion = new Quaternion(
                Math.cos(angle / 2),
                axis.x * Math.sin(angle / 2),
                axis.y * Math.sin(angle / 2),
                axis.z * Math.sin(angle / 2)
            )

            return quaternion;
        } 
        
        let newSignal = new QuaternionSignalMock(callback());

        monitor(targetPos, selfUp, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {StringSignalMock} cond 
     * @param {{[key: string]: string}} map 
     * @param {string} defaultVal 
     */
    static switch(cond, map, defaultVal) {
        let callback = () => {
            if (Array.from(Object.keys(map)).includes(cond.pinLastValue())) return map[cond.pinLastValue()];
            else return defaultVal;
        }

        let newSignal = new StringSignalMock(callback());

        cond.monitor().subscribe(() => {
            newSignal.mockUpdate(callback());
        })

        return newSignal;
    }

    /**
     * @param {VectorSignalMock} translation 
     * @param {VectorSignalMock} scale 
     * @param {QuaternionSignalMock} rotation 
     */
    static transform(translation, scale, rotation) {
        let callback = () => {
            return {
                position: translation.value,
                rotation: rotation.value,
                scale: scale.value
            }
        }

        let newSignal = new TransformSignalMock(callback());

        monitorForThreeArg(translation, scale, rotation, newSignal, callback);

        return newSignal;
    }
}

/**
 * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock | StringSignalMock | BoolSignalMock | QuaternionSignalMock} firstSignal
 * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock | StringSignalMock | BoolSignalMock | number | Vector3 | Vector2 | string | boolean | Quaternion | QuaternionSignalMock} secondSignal
 * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock | StringSignalMock | BoolSignalMock | QuaternionSignalMock} signal
 * @param {Function} callback
 */
function monitor(firstSignal, secondSignal, signal, callback) {
    firstSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback())
    })

    if (secondSignal instanceof ScalarSignalMock ||
        secondSignal instanceof StringSignalMock ||
        secondSignal instanceof BoolSignalMock ||
        secondSignal instanceof Vec2SignalMock ||
        secondSignal instanceof VectorSignalMock ||
        secondSignal instanceof QuaternionSignalMock) {
        secondSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback())
        })
    }
}

/**
 * @param {BoolSignalMock[]} array
 * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock | StringSignalMock | BoolSignalMock} signal
 * @param {Function} callback
 */
function monitorForArray(array, signal, callback) {
    array.forEach(element => {
        element.monitor().subscribe(async () => {
            await signal.mockUpdate(callback())
        })
    })  
}

/**
 * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock | QuaternionSignalMock} firstSignal
 * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock | QuaternionSignalMock} secondSignal
 * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock | QuaternionSignalMock} thirdSignal
 * @param {ScalarSignalMock | BoolSignalMock | Vec2SignalMock | VectorSignalMock | QuaternionSignalMock | TransformSignalMock} signal
 * @param {Function} callback
 */
function monitorForThreeArg(firstSignal, secondSignal, thirdSignal, signal, callback) {
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

export default ReactiveMock