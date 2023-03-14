'use strict';

var Quaternion = require('quaternion');
var mathModule = require('@areyes-studio/math-module');

class SubscriptionMock {
    /**
     * @param {Set<any>} subcriptions
     * @param {Object} subcriptionData
     * @memberof SubscriptionMock
     */
    constructor(subcriptions, subcriptionData) {
        this._subcriptions = subcriptions;
        this._subcriptionsData = subcriptionData;
    }

    unsubscribe() {
        this._subcriptions.delete(this._subcriptionsData);
    }
}

class EventSourceMock {
    constructor(config, source) {
        this._subcriptions = new Set();
        this._config = config;
        this._source = source;
    }

    subscribe(callback) {
        return this.subscribeWithSnapshot(undefined, callback);
    }

    subscribeOnNext(callback) {
        return this.subscribeWithSnapshot(undefined, callback);
    }

    subscribeWithSnapshot(snapshot, callback) {
        const subscriptionData = {
            snapshot,
            callback,
        };
        this._subcriptions.add(subscriptionData);

        // trigger callback for initial value
        if (this._source && this._config && this._config.fireOnInitialValue) {
            this.mockCallback(this._source.getInitialValueEvent());
        }

        return new SubscriptionMock(this._subcriptions, subscriptionData)
    }

    async mockCallback(event) {
        for await (const subcription of this._subcriptions) {
            if (subcription.snapshot) {
                let snapshot = {};
                for (const key in subcription.snapshot) {
                    snapshot[key] = subcription.snapshot[key].pinLastValue();
                }
                await subcription.callback(event, snapshot);
            } else {
                await subcription.callback(event);
            }
        }
    }
}

class SignalMock {
    /**
     * @param {any} value
     * @memberof SignalMock
     */
    constructor(value) {
        /** @type {EventSourceMock[]} */
        this._eventSources = [];
        this._value = value;
        /** @type {SubscriptionMock} */
        this._reactiveSubscribe = null;
    }

    get value() {
        return this._value;
    }

    /**
     * @param {{ fireOnInitialValue: boolean; }} [config]
     */
    monitor(config) {
        const eventSource = new EventSourceMock(config, this);
        this._eventSources.push(eventSource);
        return eventSource;
    }

    getInitialValueEvent() {
        return {
            oldValue: this._value,
            newValue: this._value,
        };
    }

    /**
     * @param {any} newValue
     * @memberof SignalMock
     */
    async mockUpdate(newValue) {
        if (this._reactiveSubscribe) {
            this._reactiveSubscribe.unsubscribe();
            this._reactiveSubscribe = null;
        }

        if (newValue instanceof SignalMock) {
            this._reactiveSubscribe = newValue.monitor().subscribe(async (/** @type {{ newValue: any; }} */ v) => {
                newValue = v.newValue;

                await update();
            });

            newValue = newValue.value;
        }

        let update = async () => {
            if (this._value !== newValue) {
                const event = {
                    oldValue: this._value,
                    newValue: newValue,
                };
                this._value = newValue;
                for (const eventSource of this._eventSources) {
                    await eventSource.mockCallback(event);
                }
            }
        };

        await update();
    }
}

class StringSignalMock extends SignalMock {
    /**
     * @param {string} value
     * @memberof ScalarSignalMock
     */
    constructor(value) {
        super(value);
    }

    /**
     * @param {string | StringSignalMock} signal 
     * @memberof StringSignalMock
     * @returns StringSignalMock
     */
    concat(signal) {
        let callback = () => {
            return (typeof signal === 'string') ? this.value.concat(signal) : this.value.concat(signal.value)
        };
        
        let newSignal = new StringSignalMock(callback());

        monitor$6(this, signal, null, newSignal, callback);

        return newSignal;
    }
    
    /**
     * @param {string | StringSignalMock} signal
     * @memberof StringSignalMock
     * @returns BoolSignal
     */
    contains(signal) {
        let callback = () => {
            return (typeof signal === 'string') ? this.value.includes(signal) : this.value.includes(signal.value)
        };
        
        let newSignal = new BoolSignalMock$1(callback());

        monitor$6(this, signal, null, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {string | StringSignalMock} signal
     * @memberof StringSignalMock
     * @returns BoolSignal
     */
    eq(signal) {
        let callback = () => {
            return (typeof signal === 'string') ? this.value == signal : this.value == signal.value 
        };
        
        let newSignal = new BoolSignalMock$1(callback());

        monitor$6(this, signal, null, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {string | StringSignalMock} signal
     * @memberof StringSignalMock
     * @returns BoolSignal
     */
    ne(signal) {
        let callback = () => {
            return (typeof signal === 'string') ? this.value != signal : this.value != signal.value 
        };
        
        let newSignal = new BoolSignalMock$1(callback());

        monitor$6(this, signal, null, newSignal, callback);

        return newSignal;
    }

    pin() {
        return new StringSignalMock(this._value);
    }

    pinLastValue() {
        return this._value;
    }
}

/**
 * @param {SignalMock} outputSignal
 * @param {SignalMock | boolean | string | number | null} inputFirstSignal
 * @param {SignalMock | boolean | string | number | null} inputSecondSignal
 * @param {SignalMock} newOwnsignal
 * @param {Function} callback
 */
function monitor$6(outputSignal, inputFirstSignal, inputSecondSignal, newOwnsignal, callback) {
    outputSignal.monitor().subscribe(async () => {
        await newOwnsignal.mockUpdate(callback());
    });

    if (typeof inputFirstSignal !== 'string' && typeof inputFirstSignal !== 'number' && typeof inputFirstSignal !== 'boolean' && inputFirstSignal !== null && inputFirstSignal !== undefined) {
        inputFirstSignal.monitor().subscribe(async () => {
            await newOwnsignal.mockUpdate(callback());
        });
    }

    if (typeof inputSecondSignal !== 'string' && typeof inputSecondSignal !== 'number' && typeof inputSecondSignal !== 'boolean' && inputSecondSignal !== null && inputSecondSignal !== undefined) {
        inputSecondSignal.monitor().subscribe(async () => {
            await newOwnsignal.mockUpdate(callback());
        });
    }
}

class BoolSignalMock extends SignalMock {
    /**
     * @param {boolean} value
     * @memberof ScalarSignalMock
     */
    constructor(value) {
        super(value);
    }

    /**
     * @param {{ fireOnInitialValue: boolean; }} [config]
     */
    onOn(config) {
        let eventSource = new EventSourceMock(config, this);

        this.monitor().subscribe(async () => {
            if (this.value === true)         
                await eventSource.mockCallback();
        });

        return eventSource;
    }

    /**
     * @param {{ fireOnInitialValue: boolean; }} [config]
     */
    onOff(config) {
        let eventSource = new EventSourceMock(config, this);

        this.monitor().subscribe(async () => {
            if (this.value === false)         
                await eventSource.mockCallback();
        });

        return eventSource;
    }

    /** 
     * @param {boolean | BoolSignalMock} signal 
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    or(signal) {
        let callback = () => {
            return (typeof signal === 'boolean') ? this.value || signal : this.value || signal.value
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor$5(this, signal, null, newSignal, callback);

        return newSignal;
    }

    /** 
     * @param {boolean | BoolSignalMock} signal 
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    and(signal) {
        let callback = () => {
            return (typeof signal === 'boolean') ? this.value && signal : this.value && signal.value
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor$5(this, signal,null, newSignal, callback);

        return newSignal;
    }

    /** 
     * @param {boolean | BoolSignalMock} signal 
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    eq(signal) {
        let callback = () => {
            return (typeof signal === 'boolean') ? this.value == signal : this.value == signal.value
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor$5(this, signal, null, newSignal, callback);

        return newSignal;
    }

    /** 
     * @param {boolean | BoolSignalMock} signal 
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    ne(signal) {
        let callback = () => {
            return (typeof signal === 'boolean') ? this.value != signal : this.value != signal.value
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor$5(this, signal, null, newSignal, callback);

        return newSignal;
    }

    /** 
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    not() {
        let callback = () => {
            // @ts-ignore
            return  !this.value
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor$5(this, null, null, newSignal, callback);

        return newSignal;
    }

    /** 
     * @param {boolean | BoolSignalMock} signal 
     * @memberof BoolSignalMock
     * @returns BoolSignalMock
     */
    xor(signal) {
        let callback = () => {
            return (typeof signal === 'boolean') ? (this.value || signal) && !(this.value && signal) : (this.value || signal.value) && !(this.value && signal.value)
        };
        
        let newSignal = new BoolSignalMock(callback());

        monitor$5(this, signal, null, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {boolean | BoolSignalMock | string | StringSignalMock | number | ScalarSignalMock} thenSignal 
     * @param {boolean | BoolSignalMock | string | StringSignalMock | number | ScalarSignalMock} elseSignal
     * @memberof BoolSignalMock
     * @returns BoolSignalMock  
     */
    ifThenElse(thenSignal, elseSignal) {
        /**@type {boolean | string | number}*/
        let thenSignalValue,
        /**@type {boolean | string | number}*/
        elseSignalValue;

        let callback = () => {
            switch (typeof thenSignal) {
                case 'boolean':     
                case 'string':
                case 'number':
                    thenSignalValue = thenSignal;
                    break;
    
                default:
                    thenSignalValue = thenSignal.value; 
                    break;
    
            }
    
            switch (typeof elseSignal) {
                case 'boolean': 
                case 'string':
                case 'number':
                    elseSignalValue = elseSignal;
                    break;
    
                default:
                    elseSignalValue = elseSignal.value; 
                    break;
            }
            return this.value ? thenSignalValue : elseSignalValue
        };

        let newSignal;

        switch (typeof callback()) {
            case 'string':
                newSignal = new StringSignalMock(/** @type {string} */ (callback()));
                break;

            case 'number':
                newSignal = new ScalarSignalMock$1(/** @type {number} */ (callback()));
                break;
            
            case 'boolean':
                newSignal = new BoolSignalMock(/** @type {boolean} */ (callback()));
                break;
        }

        monitor$5(this, thenSignal, elseSignal, newSignal, callback);

        return newSignal;
    }

    /**
     * @returns BoolSignalMock
     */
    pin() {
        return new BoolSignalMock(this._value);
    }

    /**
     * @returns boolean
     */
    pinLastValue() {
        return this._value;
    }
}

/**
 * @param {SignalMock} outputSignal
 * @param {SignalMock | boolean | string | number | null} inputFirstSignal
 * @param {SignalMock | boolean | string | number | null} inputSecondSignal
 * @param {SignalMock} newOwnsignal
 * @param {Function} callback
 */
function monitor$5(outputSignal, inputFirstSignal, inputSecondSignal, newOwnsignal, callback) {
    outputSignal.monitor().subscribe(async () => {
        await newOwnsignal.mockUpdate(callback());
    });

    if (typeof inputFirstSignal !== 'string' && typeof inputFirstSignal !== 'number' && typeof inputFirstSignal !== 'boolean' && inputFirstSignal !== null && inputFirstSignal !== undefined) {
        inputFirstSignal.monitor().subscribe(async () => {
            await newOwnsignal.mockUpdate(callback());
        });
    }

    if (typeof inputSecondSignal !== 'string' && typeof inputSecondSignal !== 'number' && typeof inputSecondSignal !== 'boolean' && inputSecondSignal !== null && inputSecondSignal !== undefined) {
        inputSecondSignal.monitor().subscribe(async () => {
            await newOwnsignal.mockUpdate(callback());
        });
    }
}

var BoolSignalMock$1 = BoolSignalMock;

class QuaternionSignalMock extends SignalMock {
    /**
     * @param {Quaternion} value
     * @memberof ScalarSignalMock
     */
    constructor(value) {
        super(value);

        this._w = new ScalarSignalMock$1(this.value.w);
        this._x = new ScalarSignalMock$1(this.value.x);
        this._y = new ScalarSignalMock$1(this.value.y);
        this._z = new ScalarSignalMock$1(this.value.z);

        this.monitor().subscribe(async () => {
            await this._w.mockUpdate(this.value.w);
            await this._x.mockUpdate(this.value.x);
            await this._y.mockUpdate(this.value.y);
            await this._z.mockUpdate(this.value.z);
        });

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
        };

        let newSignal = new ScalarSignalMock$1(callback());

        monitor$4(this, signal, null, newSignal, callback);
        return newSignal;
    }

    /**
     * Returns the rotational conjugate of this quaternion. The conjugate of a quaternion represents the same rotation in the opposite direction about the rotational axis.
     * @returns QuaternionSignalMock
     */
    conjugate() {
        let callback = () => {
            return this.value.conjugate()
        };

        let newSignal = new QuaternionSignalMock(callback());

        monitor$4(this, null, null, newSignal, callback);

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
        };

        let newSignal = new ScalarSignalMock$1(callback());

        monitor$4(this, signal, null, newSignal, callback);
        return newSignal;
    }

    /**
     * Returns the rotational conjugate of this quaternion. The conjugate of a quaternion represents the same rotation in the opposite direction about the rotational axis.
     * @returns QuaternionSignalMock
     */
    invert() {
        let callback = () => {
            this.value.x = -this.value.x;
            this.value.y = -this.value.y;
            this.value.z = -this.value.z;
            this.value.w = this.value.w;

            return this.value
        };

        let newSignal = new QuaternionSignalMock(callback());

        monitor$4(this, null, null, newSignal, callback);
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
        };

        let newSignal = new QuaternionSignalMock(callback());

        monitor$4(this, signal, null, newSignal, callback);
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

        if (value instanceof ScalarSignalMock$1) {
            this._reactiveSubscribeW = value.monitor().subscribe(async () => {
                await this._update();
            });
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

        if (value instanceof ScalarSignalMock$1) {
            this._reactiveSubscribeX = value.monitor().subscribe(async () => {
                await this._update();
            });
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

        if (value instanceof ScalarSignalMock$1) {
            this._reactiveSubscribeY = value.monitor().subscribe(async () => {
                await this._update();
            });
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

        if (value instanceof ScalarSignalMock$1) {
            this._reactiveSubscribeZ = value.monitor().subscribe(async () => {
                await this._update();
            });
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
            });
        }

        await this._update();
    }

    async _update() {
        let newValue = new Quaternion(
            this._parentSignalW instanceof QuaternionSignalMock ? this._parentSignalW.value.w
                : (this._parentSignalW instanceof ScalarSignalMock$1 ? this._parentSignalW.value : this._parentSignalW),

            this._parentSignalX instanceof QuaternionSignalMock ? this._parentSignalX.value.x
                : (this._parentSignalX instanceof ScalarSignalMock$1 ? this._parentSignalX.value : this._parentSignalX),

            this._parentSignalY instanceof QuaternionSignalMock ? this._parentSignalY.value.y
                : (this._parentSignalY instanceof ScalarSignalMock$1 ? this._parentSignalY.value : this._parentSignalY),

            this._parentSignalZ instanceof QuaternionSignalMock ? this._parentSignalZ.value.z
                : (this._parentSignalZ instanceof ScalarSignalMock$1 ? this._parentSignalZ.value : this._parentSignalZ),
        );

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
function monitor$4(outputSignal, inputFirstSignal, inputSecondSignal, newOwnsignal, callback) {
    outputSignal.monitor().subscribe(async () => {
        await newOwnsignal.mockUpdate(callback());
    });

    if (typeof inputFirstSignal !== 'string' && typeof inputFirstSignal !== 'number' && typeof inputFirstSignal !== 'boolean' && inputFirstSignal !== null && inputFirstSignal !== undefined) {
        inputFirstSignal.monitor().subscribe(async () => {
            await newOwnsignal.mockUpdate(callback());
        });
    }

    if (typeof inputSecondSignal !== 'string' && typeof inputSecondSignal !== 'number' && typeof inputSecondSignal !== 'boolean' && inputSecondSignal !== null && inputSecondSignal !== undefined) {
        inputSecondSignal.monitor().subscribe(async () => {
            await newOwnsignal.mockUpdate(callback());
        });
    }
}

class VectorSignalMock extends SignalMock {
    /**
     * @param {Vector3} value
     * @memberof VectorSignalMock
     */
    constructor(value) {
        super(value);

        this._x = new ScalarSignalMock$1(this.value.x);
        this._y = new ScalarSignalMock$1(this.value.y);
        this._z = new ScalarSignalMock$1(this.value.z);

        this.monitor().subscribe(async () => {
            await this._x.mockUpdate(this.value.x);
            await this._y.mockUpdate(this.value.y);
            await this._z.mockUpdate(this.value.z);
        });

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
        this._parentSignalZ = value.z;
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
            return new mathModule.Vector3(x, y, z);
        };
        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {Vector3 | VectorSignalMock | ScalarSignalMock | number} signal 
     */
    add(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1 || typeof signal === 'number') {
                let x = this.x.value + (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value + (typeof signal === 'number' ? signal : signal.value);
                let z = this.z.value + (typeof signal === 'number' ? signal : signal.value);
                return new mathModule.Vector3(x, y, z)
            } else {
                let x = this.x.value + (signal instanceof mathModule.Vector3 ? signal.x : signal.x.value);
                let y = this.y.value + (signal instanceof mathModule.Vector3 ? signal.y : signal.y.value);
                let z = this.z.value + (signal instanceof mathModule.Vector3 ? signal.z : signal.z.value);
                return new mathModule.Vector3(x, y, z)
            }
        };

        let newSignal = new VectorSignalMock(callback());

        if (signal instanceof mathModule.Vector3 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vector3 | VectorSignalMock | ScalarSignalMock | number} signal 
     */
    sub(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1 || typeof signal === 'number') {
                let x = this.x.value - (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value - (typeof signal === 'number' ? signal : signal.value);
                let z = this.z.value - (typeof signal === 'number' ? signal : signal.value);
                return new mathModule.Vector3(x, y, z)
            } else {
                let x = this.x.value - (signal instanceof mathModule.Vector3 ? signal.x : signal.x.value);
                let y = this.y.value - (signal instanceof mathModule.Vector3 ? signal.y : signal.y.value);
                let z = this.z.value - (signal instanceof mathModule.Vector3 ? signal.z : signal.z.value);
                return new mathModule.Vector3(x, y, z)
            }
        };

        let newSignal = new VectorSignalMock(callback());

        if (signal instanceof mathModule.Vector3 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * Multiplies the vector by the number or ScalarSignalMock and returns the vector
     * @param {number | ScalarSignalMock | VectorSignalMock | Vector3} signal 
     */
    mul(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1 || typeof signal === 'number') {
                let x = this.x.value * (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value * (typeof signal === 'number' ? signal : signal.value);
                let z = this.z.value * (typeof signal === 'number' ? signal : signal.value);
                return new mathModule.Vector3(x, y, z)
            } else {
                let x = this.x.value * (typeof signal.x === 'number' ? signal.x : signal.x.value);
                let y = this.y.value * (typeof signal.y === 'number' ? signal.y : signal.y.value);
                let z = this.z.value * (typeof signal.z === 'number' ? signal.z : signal.z.value);
                return new mathModule.Vector3(x, y, z)
            }

        };

        let newSignal = new VectorSignalMock(callback());

        if (typeof signal === 'number' || signal instanceof mathModule.Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {number | ScalarSignalMock | VectorSignalMock | Vector3} signal 
     */
    div(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1 || typeof signal === 'number') {
                let x = this.x.value / (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value / (typeof signal === 'number' ? signal : signal.value);
                let z = this.z.value / (typeof signal === 'number' ? signal : signal.value);

                return new mathModule.Vector3(x, y, z)
            } else {
                let signalX = typeof signal.x === 'number' ? signal.x : signal.x.value;
                let signalY = typeof signal.y === 'number' ? signal.y : signal.y.value;
                let signalZ = typeof signal.z === 'number' ? signal.z : signal.z.value;

                let x = this.x.value / signalX;
                let y = this.y.value / signalY;
                let z = this.z.value / signalZ;
                return new mathModule.Vector3(x, y, z)
            }

        };

        let newSignal = new VectorSignalMock(callback());

        if (typeof signal === 'number' || signal instanceof mathModule.Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vector3 | VectorSignalMock} signal 
     */
    pow(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1 || typeof signal === 'number') {
                let x = this.x.value ** (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value ** (typeof signal === 'number' ? signal : signal.value);
                let z = this.z.value ** (typeof signal === 'number' ? signal : signal.value);
                return new mathModule.Vector3(x, y, z)
            } else {
                let x = this.x.value ** (signal instanceof mathModule.Vector3 ? signal.x : signal.x.value);
                let y = this.y.value ** (signal instanceof mathModule.Vector3 ? signal.y : signal.y.value);
                let z = this.z.value ** (signal instanceof mathModule.Vector3 ? signal.z : signal.z.value);
                return new mathModule.Vector3(x, y, z)
            }

        };

        let newSignal = new VectorSignalMock(callback());

        if (signal instanceof mathModule.Vector3 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, signal, newSignal, callback);

        return newSignal;
    }

    sqrt() {
        let callback = () => {
            let newX = Math.sqrt(this.value.x);
            let newY = Math.sqrt(this.value.y);
            let newZ = Math.sqrt(this.value.z);
            return new mathModule.Vector3(newX, newY, newZ)
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    neg() {
        let callback = () => {
            let x = this.x.value * (-1);
            let y = this.y.value * (-1);
            let z = this.z.value * (-1);

            return new mathModule.Vector3(x, y, z)
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    round() {
        let callback = () => {
            let x = Math.round(this.x.value);
            let y = Math.round(this.y.value);
            let z = Math.round(this.z.value);

            return new mathModule.Vector3(x, y, z)
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    sign() {
        let callback = () => {
            let x = Math.sign(this.x.value);
            let y = Math.sign(this.y.value);
            let z = Math.sign(this.z.value);

            return new mathModule.Vector3(x, y, z)
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    normalize() {
        let callback = () => {
            let x = this.x.value / this.magnitude().value;
            let y = this.y.value / this.magnitude().value;
            let z = this.z.value / this.magnitude().value;

            return new mathModule.Vector3(x, y, z)
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

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

            let signalX = signal instanceof mathModule.Vector3 ? signal.x : signal.x.value;
            let signalY = signal instanceof mathModule.Vector3 ? signal.y : signal.y.value;
            let signalZ = signal instanceof mathModule.Vector3 ? signal.z : signal.z.value;

            let x = thisY * signalZ - thisZ * signalY;
            let y = thisZ * signalX - thisX * signalZ;
            let z = thisX * signalY - thisY * signalX;

            return new mathModule.Vector3(x, y, z)
        };

        let newSignal = new VectorSignalMock(callback());

        if (signal instanceof mathModule.Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, signal, newSignal, callback);

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

            let signalX = signal instanceof mathModule.Vector3 ? signal.x : signal.x.value;
            let signalY = signal instanceof mathModule.Vector3 ? signal.y : signal.y.value;
            let signalZ = signal instanceof mathModule.Vector3 ? signal.z : signal.z.value;

            return thisX * signalX + thisY * signalY + thisZ * signalZ;
        };

        let newSignal = new ScalarSignalMock$1(callback());

        if (signal instanceof mathModule.Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, signal, newSignal, callback);

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

        let newSignal = new ScalarSignalMock$1(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

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

        let newSignal = new ScalarSignalMock$1(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

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

            if (signal instanceof VectorSignalMock || signal instanceof mathModule.Vector3) {
                let signalX = signal instanceof mathModule.Vector3 ? signal.x : signal.value.x;
                let signalY = signal instanceof mathModule.Vector3 ? signal.y : signal.value.y;
                let signalZ = signal instanceof mathModule.Vector3 ? signal.z : signal.value.z;

                return new mathModule.Vector3(
                    Math.atan2(signalX, thisX),
                    Math.atan2(signalY, thisY),
                    Math.atan2(signalZ, thisZ)
                )
            } else {
                let signalVal = typeof signal === 'number' ? signal : signal.value;

                return new mathModule.Vector3(
                    Math.atan2(signalVal, thisX),
                    Math.atan2(signalVal, thisY),
                    Math.atan2(signalVal, thisZ)
                )
            }
        };

        let newSignal = new VectorSignalMock(callback());

        if (typeof signal === 'number' || signal instanceof mathModule.Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, signal, newSignal, callback);

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

            return new mathModule.Vector3(x, y, z);
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

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

            return new mathModule.Vector3(x, y, z);
        };

        let newSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

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

            let caseMinScalar = min instanceof ScalarSignalMock$1 || typeof min === 'number';
            let caseMaxScalar = max instanceof ScalarSignalMock$1 || typeof max === 'number';
            let caseMinVec2 = min instanceof mathModule.Vector2 || min instanceof Vec2SignalMock$1;
            let caseMaxVec2 = max instanceof mathModule.Vector2 || max instanceof Vec2SignalMock$1;
            let caseMinVec3 = min instanceof mathModule.Vector3 || min instanceof VectorSignalMock;
            let caseMaxVec3 = max instanceof mathModule.Vector3 || max instanceof VectorSignalMock;

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

                    if (valMin >= valMax) { x = valMax; y = valMax; z = valMax; }
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
                    let valMinX = min instanceof mathModule.Vector3 ? min.x : min.value.x;
                    // @ts-ignore
                    let valMaxX = max instanceof mathModule.Vector3 ? max.x : max.value.x;
                    // @ts-ignore
                    let valMinY = min instanceof mathModule.Vector3 ? min.y : min.value.y;
                    // @ts-ignore
                    let valMaxY = max instanceof mathModule.Vector3 ? max.y : max.value.y;
                    // @ts-ignore
                    let valMinZ = min instanceof mathModule.Vector3 ? min.z : min.value.z;
                    // @ts-ignore
                    let valMaxZ = max instanceof mathModule.Vector3 ? max.z : max.value.z;

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

                return new mathModule.Vector3(x, y, z)
            }
        };

        let newSignal = new VectorSignalMock(callback());

        if (min instanceof mathModule.Vector3 || typeof min === "number") {
            if (max instanceof mathModule.Vector3 || typeof max === "number") {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$3(this, max, newSignal, callback);
            }
        } else {
            if (max instanceof mathModule.Vector3 || typeof max === "number") {
                monitor$3(this, min, newSignal, callback);
            } else {
                monitorForTwoArg$2(this, min, max, newSignal, callback);
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

        let newSignal = new ScalarSignalMock$1(callback());

        if (vec instanceof mathModule.Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, vec, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3} min
     * @param {ScalarSignalMock | number | VectorSignalMock | Vector3} max
     * @memberof ScalarSignalMock
     */
    toRange(min, max) {
        let caseMinScalar = min instanceof ScalarSignalMock$1 || typeof min === 'number';
        let caseMaxScalar = max instanceof ScalarSignalMock$1 || typeof max === 'number';
        let caseMinVec2 = min instanceof mathModule.Vector2 || min instanceof Vec2SignalMock$1;
        let caseMaxVec2 = max instanceof mathModule.Vector2 || max instanceof Vec2SignalMock$1;
        let caseMinVec3 = min instanceof mathModule.Vector3 || min instanceof VectorSignalMock;
        let caseMaxVec3 = max instanceof mathModule.Vector3 || max instanceof VectorSignalMock;

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
                let valMinX = min instanceof mathModule.Vector3 ? min.x : min.value.x;
                // @ts-ignore
                let valMaxX = max instanceof mathModule.Vector3 ? max.x : max.value.x;
                // @ts-ignore
                let valMinY = min instanceof mathModule.Vector3 ? min.y : min.value.y;
                // @ts-ignore
                let valMaxY = max instanceof mathModule.Vector3 ? max.y : max.value.y;
                // @ts-ignore
                let valMinZ = min instanceof mathModule.Vector3 ? min.z : min.value.z;
                // @ts-ignore
                let valMaxZ = max instanceof mathModule.Vector3 ? max.z : max.value.z;

                let subX = valMaxX - valMinX;
                x = valMinX + subX * thisX;
                let subY = valMaxY - valMinY;
                y = valMinY + subY * thisY;
                let subZ = valMaxZ - valMinZ;
                z = valMinZ + subZ * thisZ;
            }
            return new mathModule.Vector3(x, y, z);
        };

        /**@type {ScalarSignalMock | VectorSignalMock} */
        let newSignal;
        if ((min instanceof ScalarSignalMock$1 || typeof min === 'number') && (max instanceof ScalarSignalMock$1 || typeof max === 'number')) {
            newSignal = new VectorSignalMock(callback());
        }
        if ((min instanceof VectorSignalMock || min instanceof mathModule.Vector3) && (max instanceof VectorSignalMock || max instanceof mathModule.Vector3)) {
            newSignal = new VectorSignalMock(callback());
        }

        if (typeof min === "number" || min instanceof mathModule.Vector3) {
            if (typeof max === "number" || max instanceof mathModule.Vector3) {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$3(this, max, newSignal, callback);
            }
        } else {
            if (typeof max === "number" || max instanceof mathModule.Vector3) {
                monitor$3(this, min, newSignal, callback);
            } else {
                monitorForTwoArg$2(this, min, max, newSignal, callback);
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
        let caseMinScalar = min instanceof ScalarSignalMock$1 || typeof min === 'number';
        let caseMaxScalar = max instanceof ScalarSignalMock$1 || typeof max === 'number';
        let caseMinVec2 = min instanceof mathModule.Vector2 || min instanceof Vec2SignalMock$1;
        let caseMaxVec2 = max instanceof mathModule.Vector2 || max instanceof Vec2SignalMock$1;
        let caseMinVec3 = min instanceof mathModule.Vector3 || min instanceof VectorSignalMock;
        let caseMaxVec3 = max instanceof mathModule.Vector3 || max instanceof VectorSignalMock;

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
                let valMinX = min instanceof mathModule.Vector3 ? min.x : min.value.x;
                // @ts-ignore
                let valMaxX = max instanceof mathModule.Vector3 ? max.x : max.value.x;
                // @ts-ignore
                let valMinY = min instanceof mathModule.Vector3 ? min.y : min.value.y;
                // @ts-ignore
                let valMaxY = max instanceof mathModule.Vector3 ? max.y : max.value.y;
                // @ts-ignore
                let valMinZ = min instanceof mathModule.Vector3 ? min.z : min.value.z;
                // @ts-ignore
                let valMaxZ = max instanceof mathModule.Vector3 ? max.z : max.value.z;

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
            return new mathModule.Vector3(x, y, z)
        };

        if (errorCase0 || errorCase1 || errorCase2 || errorCase3 || errorCase4 || errorCase5 || errorCase6) {
            throw new Error('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types')
        }

        /**@type {ScalarSignalMock | VectorSignalMock} */
        let newSignal;
        if ((min instanceof ScalarSignalMock$1 || typeof min === 'number') && (max instanceof ScalarSignalMock$1 || typeof max === 'number')) {
            newSignal = new VectorSignalMock(callback());
        }
        if ((min instanceof VectorSignalMock || min instanceof mathModule.Vector3) && (max instanceof VectorSignalMock || max instanceof mathModule.Vector3)) {
            newSignal = new VectorSignalMock(callback());
        }


        if (typeof min === "number" || min instanceof mathModule.Vector3) {
            if (typeof max === "number" || max instanceof mathModule.Vector3) {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$3(this, max, newSignal, callback);
            }
        } else {
            if (typeof max === "number" || max instanceof mathModule.Vector3) {
                monitor$3(this, min, newSignal, callback);
            } else {
                monitorForTwoArg$2(this, min, max, newSignal, callback);
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

            return new mathModule.Vector3(
                Math.min(thisX, vecX),
                Math.min(thisY, vecY),
                Math.min(thisZ, vecZ)
            )
        };

        let newSignal = new VectorSignalMock(callback());

        if (vec instanceof mathModule.Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, vec, newSignal, callback);

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

            return new mathModule.Vector3(
                Math.max(thisX, vecX),
                Math.max(thisY, vecY),
                Math.max(thisZ, vecZ)
            )
        };

        let newSignal = new VectorSignalMock(callback());

        if (vec instanceof mathModule.Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, vec, newSignal, callback);

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

            let newFactor = typeof factor === 'number' ? factor : factor.value;

            return new mathModule.Vector3(
                thisX + (vecX - thisX) * newFactor,
                thisY + (vecY - thisY) * newFactor,
                thisZ + (vecZ - thisZ) * newFactor
            )
        };

        let newSignal = new VectorSignalMock(callback());

        if (vec instanceof mathModule.Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, vec, newSignal, callback);

        return newSignal;
    }

    /**
     * 
     * @param {VectorSignalMock | Vector3} vec 
     */
    mod(vec) {
        let callback = () => {
            let x = this.x.value % (vec instanceof mathModule.Vector3 ? vec.x : vec.x.value);
            let y = this.y.value % (vec instanceof mathModule.Vector3 ? vec.y : vec.y.value);
            let z = this.z.value % (vec instanceof mathModule.Vector3 ? vec.z : vec.z.value);
            return new mathModule.Vector3(x, y, z)
        };

        let newSignal = new VectorSignalMock(callback());

        if (vec instanceof mathModule.Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, vec, newSignal, callback);

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
            let signalX = signal instanceof mathModule.Vector3 ? signal.x : signal.value.x;
            let signalY = signal instanceof mathModule.Vector3 ? signal.y : signal.value.y;
            let signalZ = signal instanceof mathModule.Vector3 ? signal.z : signal.value.z;

            let dot = this.value.dot(signal instanceof mathModule.Vector3 ? signal : signal.value);

            let x = thisX - 2 * dot * signalX;
            let y = thisY - 2 * dot * signalY;
            let z = thisZ - 2 * dot * signalZ;
            return new mathModule.Vector3(x, y, z);
        };

        let newSignal = new VectorSignalMock(callback());

        if (signal instanceof mathModule.Vector3) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$3(this, signal, newSignal, callback);

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

            let u = new mathModule.Vector3(signalX, signalY, signalZ);

            return u.mul(2 * mathModule.Vector3.dot(u, this.value))
                .add(this.value.mul(signalW ** 2 - mathModule.Vector3.dot(this.value, this.value)))
                .add(mathModule.Vector3.cross(u, this.value).mul(2 * signalW));
        };

        let newSignal = new VectorSignalMock(callback());

        monitor$3(this, signal, newSignal, callback);

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

            if (val1 instanceof ScalarSignalMock$1 || typeof val1 === 'number') {
                let newVal1 = typeof val1 === 'number' ? val1 : val1.value;

                if (val2 instanceof ScalarSignalMock$1 || typeof val2 === 'number') {
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

                    return new mathModule.Vector3(x, y, z)
                } else {
                    let newVal2_x = val2 instanceof mathModule.Vector3 ? val2.x : val2.value.x;
                    let newVal2_y = val2 instanceof mathModule.Vector3 ? val2.y : val2.value.y;
                    let newVal2_z = val2 instanceof mathModule.Vector3 ? val2.z : val2.value.z;

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

                    return new mathModule.Vector3(x, y, z)
                }
            } else {
                let newVal1_x = val1 instanceof mathModule.Vector3 ? val1.x : val1.value.x;
                let newVal1_y = val1 instanceof mathModule.Vector3 ? val1.y : val1.value.y;
                let newVal1_z = val1 instanceof mathModule.Vector3 ? val1.z : val1.value.z;

                if (val2 instanceof ScalarSignalMock$1 || typeof val2 === 'number') {
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

                    return new mathModule.Vector3(x, y, z)
                } else {
                    let newVal2_x = val2 instanceof mathModule.Vector3 ? val2.x : val2.value.x;
                    let newVal2_y = val2 instanceof mathModule.Vector3 ? val2.y : val2.value.y;
                    let newVal2_z = val2 instanceof mathModule.Vector3 ? val2.z : val2.value.z;

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

                    return new mathModule.Vector3(x, y, z)
                }
            }
        };
        let newSignal = new VectorSignalMock(callback());

        if (val1 instanceof mathModule.Vector3 || typeof val1 === 'number') {
            if (val2 instanceof mathModule.Vector3 || typeof val2 === 'number') {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$3(this, val2, newSignal, callback);
            }
        } else {
            if (val2 instanceof mathModule.Vector3 || typeof val2 === 'number') {
                monitor$3(this, val1, newSignal, callback);
            } else {
                monitorForTwoArg$2(this, val1, val2, newSignal, callback);
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

        if (value instanceof ScalarSignalMock$1) {
            this._reactiveSubscribeX = value.monitor().subscribe(async () => {
                await this._update();
            });
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

        if (value instanceof ScalarSignalMock$1) {
            this._reactiveSubscribeY = value.monitor().subscribe(async () => {
                await this._update();
            });
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

        if (value instanceof ScalarSignalMock$1) {
            this._reactiveSubscribeZ = value.monitor().subscribe(async () => {
                await this._update();
            });
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
            });
        }

        await this._update();
    }

    async _update() {
        let newValue = new mathModule.Vector3(
            this._parentSignalX instanceof VectorSignalMock ? this._parentSignalX.value.x
                : (this._parentSignalX instanceof ScalarSignalMock$1 ? this._parentSignalX.value : this._parentSignalX),

            this._parentSignalY instanceof VectorSignalMock ? this._parentSignalY.value.y
                : (this._parentSignalY instanceof ScalarSignalMock$1 ? this._parentSignalY.value : this._parentSignalY),

            this._parentSignalZ instanceof VectorSignalMock ? this._parentSignalZ.value.z
                : (this._parentSignalZ instanceof ScalarSignalMock$1 ? this._parentSignalZ.value : this._parentSignalZ)
        );

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
function monitor$3(firstSignal, secondSignal, signal, callback) {
    firstSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback());
    });

    secondSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback());
    });
}

/**
 * @param {VectorSignalMock} firstSignal
 * @param {ScalarSignalMock | VectorSignalMock | number} secondSignal
 * @param {ScalarSignalMock | VectorSignalMock | number} thirdSignal
 * @param {ScalarSignalMock | VectorSignalMock} signal
 * @param {Function} callback
 */
function monitorForTwoArg$2(firstSignal, secondSignal, thirdSignal, signal, callback) {
    firstSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback());
    });

    if (typeof secondSignal !== 'number') {
        secondSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback());
        });
    }

    if (typeof thirdSignal !== 'number') {
        thirdSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback());
        });
    }
}

class Vec2SignalMock extends SignalMock {
    /**
     * @param {Vector2} value
     * @memberof Vec2SignalMock
     */
    constructor(value) {
        super(value);

        this._x = new ScalarSignalMock$1(this.value.x);
        this._y = new ScalarSignalMock$1(this.value.y);

        this.monitor().subscribe(async () => {
            await this._x.mockUpdate(this.value.x);
            await this._y.mockUpdate(this.value.y);
        });

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
            return new mathModule.Vector2(x, y);
        };
        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {Vector2 | Vec2SignalMock | ScalarSignalMock | number} signal 
     */
    add(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1 || typeof signal === 'number') {
                let x = this.x.value + (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value + (typeof signal === 'number' ? signal : signal.value);
                return new mathModule.Vector2(x, y)
            } else {
                let x = this.x.value + (signal instanceof mathModule.Vector2 ? signal.x : signal.x.value);
                let y = this.y.value + (signal instanceof mathModule.Vector2 ? signal.y : signal.y.value);
                return new mathModule.Vector2(x, y)
            }

        };

        let newSignal = new Vec2SignalMock(callback());

        if (signal instanceof mathModule.Vector2 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vector2 | Vec2SignalMock | ScalarSignalMock | number} signal 
     */
    sub(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1 || typeof signal === 'number') {
                let x = this.x.value - (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value - (typeof signal === 'number' ? signal : signal.value);
                return new mathModule.Vector2(x, y)
            } else {
                let x = this.x.value - (signal instanceof mathModule.Vector2 ? signal.x : signal.x.value);
                let y = this.y.value - (signal instanceof mathModule.Vector2 ? signal.y : signal.y.value);
                return new mathModule.Vector2(x, y)
            }

        };

        let newSignal = new Vec2SignalMock(callback());

        if (signal instanceof mathModule.Vector2 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} signal 
     */
    mul(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1 || typeof signal === 'number') {
                let x = this.x.value * (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value * (typeof signal === 'number' ? signal : signal.value);
                return new mathModule.Vector2(x, y)
            } else {
                let x = this.x.value * (typeof signal.x === 'number' ? signal.x : signal.x.value);
                let y = this.y.value * (typeof signal.y === 'number' ? signal.y : signal.y.value);
                return new mathModule.Vector2(x, y)
            }

        };

        let newSignal = new Vec2SignalMock(callback());

        if (typeof signal === 'number' || signal instanceof mathModule.Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} signal 
     */
    div(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1 || typeof signal === 'number') {
                let x = this.x.value / (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value / (typeof signal === 'number' ? signal : signal.value);
                return new mathModule.Vector2(x, y)
            } else {
                let x = this.x.value / (typeof signal.x === 'number' ? signal.x : signal.x.value);
                let y = this.y.value / (typeof signal.y === 'number' ? signal.y : signal.y.value);
                return new mathModule.Vector2(x, y)
            }

        };

        let newSignal = new Vec2SignalMock(callback());

        if (typeof signal === 'number' || signal instanceof mathModule.Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, signal, newSignal, callback);

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

        let newSignal = new ScalarSignalMock$1(callback());

        if (signal instanceof mathModule.Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, signal, newSignal, callback);

        return newSignal;
    }

    neg() {
        let callback = () => {
            let x = this.x.value * (-1);
            let y = this.y.value * (-1);
            return new mathModule.Vector2(x, y);
        };
        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    height() {
        let callback = () => { return this.y.pinLastValue() };

        let newSignal = new ScalarSignalMock$1(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    width() {
        let callback = () => { return this.x.pinLastValue() };

        let newSignal = new ScalarSignalMock$1(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {Vec2SignalMock | Vector2 | ScalarSignalMock | number} signal
     */
    atan2(signal) {
        let callback = () => {
            let thisX = this.x.value;
            let thisY = this.y.value;

            if (signal instanceof Vec2SignalMock || signal instanceof mathModule.Vector2) {
                let signalX = signal instanceof mathModule.Vector2 ? signal.x : signal.value.x;
                let signalY = signal instanceof mathModule.Vector2 ? signal.y : signal.value.y;

                return new mathModule.Vector2(
                    Math.atan2(signalX, thisX),
                    Math.atan2(signalY, thisY)
                )
            } else {
                let signalVal = typeof signal === 'number' ? signal : signal.value;

                return new mathModule.Vector2(
                    Math.atan2(signalVal, thisX),
                    Math.atan2(signalVal, thisY)
                )
            }
        };

        let newSignal = new Vec2SignalMock(callback());

        if (signal instanceof mathModule.Vector2 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, signal, newSignal, callback);

        return newSignal;
    }

    ceil() {
        let callback = () => {
            let newX = Math.ceil(this.value.x);
            let newY = Math.ceil(this.value.y);
            return new mathModule.Vector2(newX, newY)
        };

        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    floor() {
        let callback = () => {
            let newX = Math.floor(this.value.x);
            let newY = Math.floor(this.value.y);
            return new mathModule.Vector2(newX, newY)
        };

        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

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

            let caseMinScalar = min instanceof ScalarSignalMock$1 || typeof min === 'number';
            let caseMaxScalar = max instanceof ScalarSignalMock$1 || typeof max === 'number';
            let caseMinVec2 = min instanceof mathModule.Vector2 || min instanceof Vec2SignalMock;
            let caseMaxVec2 = max instanceof mathModule.Vector2 || max instanceof Vec2SignalMock;
            let caseMinVec3 = min instanceof mathModule.Vector3 || min instanceof VectorSignalMock;
            let caseMaxVec3 = max instanceof mathModule.Vector3 || max instanceof VectorSignalMock;

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

                    if (valMin >= valMax) { x = valMax; y = valMax; }
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
                    let valMinX = min instanceof mathModule.Vector2 ? min.x : min.value.x;
                    // @ts-ignore
                    let valMaxX = max instanceof mathModule.Vector2 ? max.x : max.value.x;
                    // @ts-ignore
                    let valMinY = min instanceof mathModule.Vector2 ? min.y : min.value.y;
                    // @ts-ignore
                    let valMaxY = max instanceof mathModule.Vector2 ? max.y : max.value.y;

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

                return new mathModule.Vector2(x, y)
            }
        };

        let newSignal = new Vec2SignalMock(callback());

        if (min instanceof mathModule.Vector2 || typeof min === "number") {
            if (max instanceof mathModule.Vector2 || typeof max === "number") {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$2(this, max, newSignal, callback);
            }
        } else {
            if (max instanceof mathModule.Vector2 || typeof max === "number") {
                monitor$2(this, min, newSignal, callback);
            } else {
                monitorForTwoArg$1(this, min, max, newSignal, callback);
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
        };

        let newSignal = new ScalarSignalMock$1(callback());

        if (vector instanceof mathModule.Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, vector, newSignal, callback);

        return newSignal;
    }

    magnitude() {
        let callback = () => {
            return Math.sqrt(this.x.value ** 2 + this.y.value ** 2);
        };

        let newSignal = new ScalarSignalMock$1(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    magnitudeSquared() {
        let callback = () => {
            return this.x.value ** 2 + this.y.value ** 2;
        };

        let newSignal = new ScalarSignalMock$1(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

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

            return new mathModule.Vector2(Math.max(thisX, vectorX), Math.max(thisY, vectorY));
        };

        let newSignal = new Vec2SignalMock(callback());

        if (vector instanceof mathModule.Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, vector, newSignal, callback);

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

            return new mathModule.Vector2(Math.min(thisX, vectorX), Math.min(thisY, vectorY));
        };

        let newSignal = new Vec2SignalMock(callback());

        if (vector instanceof mathModule.Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, vector, newSignal, callback);

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

            let newFactor = typeof factor === 'number' ? factor : factor.value;

            return new mathModule.Vector2(
                thisX + (vecX - thisX) * newFactor,
                thisY + (vecY - thisY) * newFactor
            )
        };

        let newSignal = new Vec2SignalMock(callback());

        if (vector instanceof mathModule.Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, vector, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vector2 | Vec2SignalMock} signal 
     */
    mod(signal) {
        let callback = () => {
            let x = this.x.value % (signal instanceof mathModule.Vector2 ? signal.x : signal.x.value);
            let y = this.y.value % (signal instanceof mathModule.Vector2 ? signal.y : signal.y.value);
            return new mathModule.Vector2(x, y)
        };

        let newSignal = new Vec2SignalMock(callback());

        if (signal instanceof mathModule.Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, signal, newSignal, callback);

        return newSignal;
    }

    normalize() {
        let callback = () => {
            return this.value.normalize();
        };

        let newSignal = new ScalarSignalMock$1(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} signal 
     */
    pow(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1 || typeof signal === 'number') {
                let x = this.x.value ** (typeof signal === 'number' ? signal : signal.value);
                let y = this.y.value ** (typeof signal === 'number' ? signal : signal.value);
                return new mathModule.Vector2(x, y)
            } else {
                let x = this.x.value ** (signal instanceof mathModule.Vector2 ? signal.x : signal.x.value);
                let y = this.y.value ** (signal instanceof mathModule.Vector2 ? signal.y : signal.y.value);
                return new mathModule.Vector2(x, y)
            }

        };

        let newSignal = new Vec2SignalMock(callback());

        if (signal instanceof mathModule.Vector2 || typeof signal === 'number') {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @param {Vector2 | Vec2SignalMock} signal 
     */
    reflect(signal) {
        let callback = () => {
            let thisX = this.value.x;
            let thisY = this.value.y;
            let signalX = signal instanceof mathModule.Vector2 ? signal.x : signal.value.x;
            let signalY = signal instanceof mathModule.Vector2 ? signal.y : signal.value.y;

            let dot = this.value.dot(signal instanceof mathModule.Vector2 ? signal : signal.value);

            let x = thisX - 2 * dot * signalX;
            let y = thisY - 2 * dot * signalY;
            return new mathModule.Vector2(x, y);
        };

        let newSignal = new Vec2SignalMock(callback());

        if (signal instanceof mathModule.Vector2) {
            this.monitor().subscribe(async () => {
                await newSignal.mockUpdate(callback());
            });
        } else monitor$2(this, signal, newSignal, callback);

        return newSignal;
    }

    round() {
        let callback = () => {
            let newX = Math.round(this.value.x);
            let newY = Math.round(this.value.y);
            return new mathModule.Vector2(newX, newY)
        };

        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    sign() {
        let callback = () => {
            let newX = Math.sign(this.value.x);
            let newY = Math.sign(this.value.y);
            return new mathModule.Vector2(newX, newY)
        };

        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

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
            return new mathModule.Vector2(newX, newY)
        };

        let newSignal = new Vec2SignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} min
     * @param {ScalarSignalMock | number | Vec2SignalMock | Vector2} max
     * @memberof ScalarSignalMock
     */
    toRange(min, max) {
        let caseMinScalar = min instanceof ScalarSignalMock$1 || typeof min === 'number';
        let caseMaxScalar = max instanceof ScalarSignalMock$1 || typeof max === 'number';
        let caseMinVec2 = min instanceof mathModule.Vector2 || min instanceof Vec2SignalMock;
        let caseMaxVec2 = max instanceof mathModule.Vector2 || max instanceof Vec2SignalMock;
        let caseMinVec3 = min instanceof mathModule.Vector3 || min instanceof VectorSignalMock;
        let caseMaxVec3 = max instanceof mathModule.Vector3 || max instanceof VectorSignalMock;

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
                let valMinX = min instanceof mathModule.Vector2 ? min.x : min.value.x;
                    // @ts-ignore
                let valMaxX = max instanceof mathModule.Vector2 ? max.x : max.value.x;
                    // @ts-ignore
                let valMinY = min instanceof mathModule.Vector2 ? min.y : min.value.y;
                    // @ts-ignore
                let valMaxY = max instanceof mathModule.Vector2 ? max.y : max.value.y;

                let subX = valMaxX - valMinX;
                x = valMinX + subX * thisX;
                let subY = valMaxY - valMinY;
                y = valMinY + subY * thisY;
            }
            return new mathModule.Vector2(x, y)
        };

        /**@type {ScalarSignalMock | Vec2SignalMock} */
        let newSignal;
        if ((min instanceof ScalarSignalMock$1 || typeof min === 'number') && (max instanceof ScalarSignalMock$1 || typeof max === 'number')) {
            newSignal = new Vec2SignalMock(callback());
        }
        if ((min instanceof Vec2SignalMock || min instanceof mathModule.Vector2) && (max instanceof Vec2SignalMock || max instanceof mathModule.Vector2)) {
            newSignal = new Vec2SignalMock(callback());
        }

        if (typeof min === "number" || min instanceof mathModule.Vector2) {
            if (typeof max === "number" || max instanceof mathModule.Vector2) {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$2(this, max, newSignal, callback);
            }
        } else {
            if (typeof max === "number" || max instanceof mathModule.Vector2) {
                monitor$2(this, min, newSignal, callback);
            } else {
                monitorForTwoArg$1(this, min, max, newSignal, callback);
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
        let caseMinScalar = min instanceof ScalarSignalMock$1 || typeof min === 'number';
        let caseMaxScalar = max instanceof ScalarSignalMock$1 || typeof max === 'number';
        let caseMinVec2 = min instanceof mathModule.Vector2 || min instanceof Vec2SignalMock;
        let caseMaxVec2 = max instanceof mathModule.Vector2 || max instanceof Vec2SignalMock;
        let caseMinVec3 = min instanceof mathModule.Vector3 || min instanceof VectorSignalMock;
        let caseMaxVec3 = max instanceof mathModule.Vector3 || max instanceof VectorSignalMock;

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
                let valMinX = min instanceof mathModule.Vector2 ? min.x : min.value.x;
                    // @ts-ignore
                let valMaxX = max instanceof mathModule.Vector2 ? max.x : max.value.x;
                    // @ts-ignore
                let valMinY = min instanceof mathModule.Vector2 ? min.y : min.value.y;
                    // @ts-ignore
                let valMaxY = max instanceof mathModule.Vector2 ? max.y : max.value.y;

                let subX = valMaxX - valMinX;
                let subAimX = thisX - valMinX;
                x = subAimX / subX;
                let subY = valMaxY - valMinY;
                let subAimY = thisY - valMinY;
                y = subAimY / subY;
            }
            return new mathModule.Vector2(x, y)
        };

        if (errorCase0 || errorCase1 || errorCase2 || errorCase3 || errorCase4 || errorCase5 || errorCase6) {
            throw new Error('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types')
        }

        /**@type {ScalarSignalMock | Vec2SignalMock} */
        let newSignal;
        if ((min instanceof ScalarSignalMock$1 || typeof min === 'number') && (max instanceof ScalarSignalMock$1 || typeof max === 'number')) {
            newSignal = new Vec2SignalMock(callback());
        }
        if ((min instanceof Vec2SignalMock || min instanceof mathModule.Vector2) && (max instanceof Vec2SignalMock || max instanceof mathModule.Vector2)) {
            newSignal = new Vec2SignalMock(callback());
        }


        if (typeof min === "number" || min instanceof mathModule.Vector2) {
            if (typeof max === "number" || max instanceof mathModule.Vector2) {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$2(this, max, newSignal, callback);
            }
        } else {
            if (typeof max === "number" || max instanceof mathModule.Vector2) {
                monitor$2(this, min, newSignal, callback);
            } else {
                monitorForTwoArg$1(this, min, max, newSignal, callback);
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

            if (val1 instanceof ScalarSignalMock$1 || typeof val1 === 'number') {
                let newVal1 = typeof val1 === 'number' ? val1 : val1.value;

                if (val2 instanceof ScalarSignalMock$1 || typeof val2 === 'number') {
                    let newVal2 = typeof val2 === 'number' ? val2 : val2.value;

                    let min = newVal1 < newVal2 ? newVal1 : newVal2;
                    let max = newVal1 >= newVal2 ? newVal1 : newVal2;

                    if (thisX <= min) x = 0;
                    if (thisY <= min) y = 0;
                    if (thisX >= max) x = 1;
                    if (thisY >= max) y = 1;
                    if (thisX > min && thisX < max) x = (thisX - min) / (max - min);
                    if (thisY > min && thisY < max) y = (thisY - min) / (max - min);

                    return new mathModule.Vector2(x, y)
                } else {
                    let newVal2_x = val2 instanceof mathModule.Vector2 ? val2.x : val2.value.x;
                    let newVal2_y = val2 instanceof mathModule.Vector2 ? val2.y : val2.value.y;

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

                    return new mathModule.Vector2(x, y)
                }
            } else {
                let newVal1_x = val1 instanceof mathModule.Vector2 ? val1.x : val1.value.x;
                let newVal1_y = val1 instanceof mathModule.Vector2 ? val1.y : val1.value.y;

                if (val2 instanceof ScalarSignalMock$1 || typeof val2 === 'number') {
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

                    return new mathModule.Vector2(x, y)
                } else {
                    let newVal2_x = val2 instanceof mathModule.Vector2 ? val2.x : val2.value.x;
                    let newVal2_y = val2 instanceof mathModule.Vector2 ? val2.y : val2.value.y;

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

                    return new mathModule.Vector2(x, y)
                }
            }
        };
        let newSignal = new Vec2SignalMock(callback());

        if (val1 instanceof mathModule.Vector2 || typeof val1 === 'number') {
            if (val2 instanceof mathModule.Vector2 || typeof val2 === 'number') {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$2(this, val2, newSignal, callback);
            }
        } else {
            if (val2 instanceof mathModule.Vector2 || typeof val2 === 'number') {
                monitor$2(this, val1, newSignal, callback);
            } else {
                monitorForTwoArg$1(this, val1, val2, newSignal, callback);
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

        if (value instanceof ScalarSignalMock$1) {
            this._reactiveSubscribeX = value.monitor().subscribe(async () => {
                await this._update();
            });
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

        if (value instanceof ScalarSignalMock$1) {
            this._reactiveSubscribeY = value.monitor().subscribe(async () => {
                await this._update();
            });
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
            });
        }

        await this._update();
    }

    async _update() {
        let newValue = new mathModule.Vector2(
            this._parentSignalX instanceof Vec2SignalMock ? this._parentSignalX.value.x
                : (this._parentSignalX instanceof ScalarSignalMock$1 ? this._parentSignalX.value : this._parentSignalX),

            this._parentSignalY instanceof Vec2SignalMock ? this._parentSignalY.value.y
                : (this._parentSignalY instanceof ScalarSignalMock$1 ? this._parentSignalY.value : this._parentSignalY)
        );

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
function monitor$2(firstSignal, secondSignal, signal, callback) {
    firstSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback());
    });

    if (typeof secondSignal !== 'number') {
        secondSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback());
        });
    }
}

/**
 * @param {Vec2SignalMock} firstSignal
 * @param {ScalarSignalMock | Vec2SignalMock} secondSignal
 * @param {ScalarSignalMock | Vec2SignalMock} thirdSignal
 * @param {ScalarSignalMock | Vec2SignalMock} signal
 * @param {Function} callback
 */
function monitorForTwoArg$1(firstSignal, secondSignal, thirdSignal, signal, callback) {
    firstSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback());
    });

    secondSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback());
    });

    thirdSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback());
    });
}

var Vec2SignalMock$1 = Vec2SignalMock;

class ScalarSignalMock extends SignalMock {
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
            if (signal instanceof Vec2SignalMock$1 || signal instanceof mathModule.Vector2) {
                let signalVal = signal instanceof mathModule.Vector2 ? signal : signal.value;
                let x = this.value + signalVal.x;
                let y = this.value + signalVal.y;
                return new mathModule.Vector2(x,y)
            }
            if (signal instanceof VectorSignalMock || signal instanceof mathModule.Vector3) {
                let signalVal = signal instanceof mathModule.Vector3 ? signal : signal.value;
                let x = this.value + signalVal.x;
                let y = this.value + signalVal.y;
                let z = this.value + signalVal.z;
                return new mathModule.Vector3(x,y,z)
            }
        };
        
        let newSignal;
        if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
            newSignal = new ScalarSignalMock(callback());
        }
        if (signal instanceof Vec2SignalMock$1 || signal instanceof mathModule.Vector2) {
            newSignal = new Vec2SignalMock$1(callback());
        }
        if (signal instanceof VectorSignalMock || signal instanceof mathModule.Vector3) {
            newSignal = new VectorSignalMock(callback());
        }
        
        monitor$1(this, signal, newSignal, callback);

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
            if (signal instanceof Vec2SignalMock$1 || signal instanceof mathModule.Vector2) {
                let signalVal = signal instanceof mathModule.Vector2 ? signal : signal.value;
                let x = this.value - signalVal.x;
                let y = this.value - signalVal.y;
                return new mathModule.Vector2(x,y)
            }
            if (signal instanceof VectorSignalMock || signal instanceof mathModule.Vector3) {
                let signalVal = signal instanceof mathModule.Vector3 ? signal : signal.value;
                let x = this.value - signalVal.x;
                let y = this.value - signalVal.y;
                let z = this.value - signalVal.z;
                return new mathModule.Vector3(x,y,z)
            }
        };
        
        let newSignal;
        if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
            // @ts-ignore
            newSignal = new ScalarSignalMock(callback());
        }
        if (signal instanceof Vec2SignalMock$1 || signal instanceof mathModule.Vector2) {
            // @ts-ignore
            newSignal = new Vec2SignalMock$1(callback());
        }
        if (signal instanceof VectorSignalMock || signal instanceof mathModule.Vector3) {
            // @ts-ignore
            newSignal = new VectorSignalMock(callback());
        }
        
        monitor$1(this, signal, newSignal, callback);

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
            if (signal instanceof Vec2SignalMock$1 || signal instanceof mathModule.Vector2) {
                let signalVal = signal instanceof mathModule.Vector2 ? signal : signal.value;
                let x = this.value * signalVal.x;
                let y = this.value * signalVal.y;
                return new mathModule.Vector2(x,y)
            }
            if (signal instanceof VectorSignalMock || signal instanceof mathModule.Vector3) {
                let signalVal = signal instanceof mathModule.Vector3 ? signal : signal.value;
                let x = this.value * signalVal.x;
                let y = this.value * signalVal.y;
                let z = this.value * signalVal.z;
                return new mathModule.Vector3(x,y,z)
            }
        };
        
        let newSignal;
        if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
            // @ts-ignore
            newSignal = new ScalarSignalMock(callback());
        }
        if (signal instanceof Vec2SignalMock$1 || signal instanceof mathModule.Vector2) {
            // @ts-ignore
            newSignal = new Vec2SignalMock$1(callback());
        }
        if (signal instanceof VectorSignalMock || signal instanceof mathModule.Vector3) {
            // @ts-ignore
            newSignal = new VectorSignalMock(callback());
        }
        
        monitor$1(this, signal, newSignal, callback);

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
            if (signal instanceof Vec2SignalMock$1 || signal instanceof mathModule.Vector2) {
                let signalVal = signal instanceof mathModule.Vector2 ? signal : signal.value;
                let x = this.value / signalVal.x;
                let y = this.value / signalVal.y;
                return new mathModule.Vector2(x,y)
            }
            if (signal instanceof VectorSignalMock || signal instanceof mathModule.Vector3) {
                let signalVal = signal instanceof mathModule.Vector3 ? signal : signal.value;
                let x = this.value / signalVal.x;
                let y = this.value / signalVal.y;
                let z = this.value / signalVal.z;
                return new mathModule.Vector3(x,y,z)
            }
        };
        
        let newSignal;
        if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
            // @ts-ignore
            newSignal = new ScalarSignalMock(callback());
        }
        if (signal instanceof Vec2SignalMock$1 || signal instanceof mathModule.Vector2) {
            // @ts-ignore
            newSignal = new Vec2SignalMock$1(callback());
        }
        if (signal instanceof VectorSignalMock || signal instanceof mathModule.Vector3) {
            // @ts-ignore
            newSignal = new VectorSignalMock(callback());
        }
        
        monitor$1(this, signal, newSignal, callback);

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

        monitor$1(this, signal, newSignal, callback);

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

        monitor$1(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    abs() {
        let callback = () => {
            return Math.abs(this.value);
        };
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    round() {
        let callback = () => {
            return Math.round(this.value);
        };
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    sign() {
        let callback = () => {
            return Math.sign(this.value);
        };
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    sqrt() {
        let callback = () => {
            return Math.sqrt(this.value);
        };
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    neg() {
        let callback = () => {
            if(this.value === 0) return 0;
            else return this.value * (-1);
        };
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

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
            if (signal instanceof Vec2SignalMock$1 || signal instanceof mathModule.Vector2) {
                let signalVal = signal instanceof mathModule.Vector2 ? signal : signal.value;
                let x = Math.atan2(signalVal.x, this.value);
                let y = Math.atan2(signalVal.y, this.value);
                return new mathModule.Vector2(x,y)
            }
            if (signal instanceof VectorSignalMock || signal instanceof mathModule.Vector3) {
                let signalVal = signal instanceof mathModule.Vector3 ? signal : signal.value;
                let x = Math.atan2(signalVal.x, this.value);
                let y = Math.atan2(signalVal.y, this.value);
                let z = Math.atan2(signalVal.z, this.value);
                return new mathModule.Vector3(x,y,z)
            }
        };
        
        let newSignal;
        if (signal instanceof ScalarSignalMock || typeof signal === 'number') {
            // @ts-ignore
            newSignal = new ScalarSignalMock(callback());
        }
        if (signal instanceof Vec2SignalMock$1 || signal instanceof mathModule.Vector2) {
            // @ts-ignore
            newSignal = new Vec2SignalMock$1(callback());
        }
        if (signal instanceof VectorSignalMock || signal instanceof mathModule.Vector3) {
            // @ts-ignore
            newSignal = new VectorSignalMock(callback());
        }
        
        monitor$1(this, signal, newSignal, callback);

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    ceil() {
        let callback = () => {
            return Math.ceil(this.value);
        };
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    floor() {
        let callback = () => {
            return Math.floor(this.value);
        };
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

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
            let caseMinVec2 = min instanceof mathModule.Vector2 || min instanceof Vec2SignalMock$1;
            let caseMaxVec2 = max instanceof mathModule.Vector2 || max instanceof Vec2SignalMock$1;
            let caseMinVec3 = min instanceof mathModule.Vector3 || min instanceof VectorSignalMock;
            let caseMaxVec3 = max instanceof mathModule.Vector3 || max instanceof VectorSignalMock;

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
                    let valMinX = min instanceof mathModule.Vector2 ? min.x : min.value.x;
                    // @ts-ignore
                    let valMaxX = max instanceof mathModule.Vector2 ? max.x : max.value.x;
                    // @ts-ignore
                    let valMinY = min instanceof mathModule.Vector2 ? min.y : min.value.y;
                    // @ts-ignore
                    let valMaxY = max instanceof mathModule.Vector2 ? max.y : max.value.y;

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

                    return new mathModule.Vector2(x,y)
                }
                if (caseMinVec3 && caseMaxVec3) {
                    // @ts-ignore
                    let valMinX = min instanceof mathModule.Vector3 ? min.x : min.value.x;
                    // @ts-ignore
                    let valMaxX = max instanceof mathModule.Vector3 ? max.x : max.value.x;
                    // @ts-ignore
                    let valMinY = min instanceof mathModule.Vector3 ? min.y : min.value.y;
                    // @ts-ignore
                    let valMaxY = max instanceof mathModule.Vector3 ? max.y : max.value.y;
                    // @ts-ignore
                    let valMinZ = min instanceof mathModule.Vector3 ? min.z : min.value.z;
                    // @ts-ignore
                    let valMaxZ = max instanceof mathModule.Vector3 ? max.z : max.value.z;

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

                    return new mathModule.Vector3(x,y,z)
                }
            }
        };

        let newSignal = new ScalarSignalMock(callback());

        if (min instanceof mathModule.Vector2 || min instanceof mathModule.Vector3 || typeof min === "number") {
            if(max instanceof mathModule.Vector2 || max instanceof mathModule.Vector3 || typeof max === "number") {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$1(this, max, newSignal, callback);
            }
        } else {
            if(max instanceof mathModule.Vector2 || max instanceof mathModule.Vector3 || typeof max === "number") {
                monitor$1(this, min, newSignal, callback);
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
        let caseMinVec2 = min instanceof mathModule.Vector2 || min instanceof Vec2SignalMock$1;
        let caseMaxVec2 = max instanceof mathModule.Vector2 || max instanceof Vec2SignalMock$1;
        let caseMinVec3 = min instanceof mathModule.Vector3 || min instanceof VectorSignalMock;
        let caseMaxVec3 = max instanceof mathModule.Vector3 || max instanceof VectorSignalMock;

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
                let valMinX = min instanceof mathModule.Vector2 ? min.x : min.value.x;
                // @ts-ignore
                let valMaxX = max instanceof mathModule.Vector2 ? max.x : max.value.x;
                // @ts-ignore
                let valMinY = min instanceof mathModule.Vector2 ? min.y : min.value.y;
                // @ts-ignore
                let valMaxY = max instanceof mathModule.Vector2 ? max.y : max.value.y;

                /**@type {number} */
                let x, y;
                let subX = valMaxX - valMinX;
                let subAimX = newThis - valMinX;
                x = subAimX / subX;
                let subY = valMaxY - valMinY;
                let subAimY = newThis - valMinY;
                y = subAimY / subY;

                return new mathModule.Vector2(x,y)
            }
            if (caseMinVec3 && caseMaxVec3) {
                // @ts-ignore
                let valMinX = min instanceof mathModule.Vector3 ? min.x : min.value.x;
                // @ts-ignore
                let valMaxX = max instanceof mathModule.Vector3 ? max.x : max.value.x;
                // @ts-ignore
                let valMinY = min instanceof mathModule.Vector3 ? min.y : min.value.y;
                // @ts-ignore
                let valMaxY = max instanceof mathModule.Vector3 ? max.y : max.value.y;
                // @ts-ignore
                let valMinZ = min instanceof mathModule.Vector3 ? min.z : min.value.z;
                // @ts-ignore
                let valMaxZ = max instanceof mathModule.Vector3 ? max.z : max.value.z;

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

                return new mathModule.Vector3(x,y,z)
            }       
        };

        if(errorCase0 || errorCase1 || errorCase2 || errorCase3 || errorCase4 || errorCase5) {
            throw new Error('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types')
        }

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        if ((min instanceof ScalarSignalMock || typeof min === 'number') && (max instanceof ScalarSignalMock || typeof max === 'number')) {
            // @ts-ignore
            newSignal = new ScalarSignalMock(callback());
        }
        if ((min instanceof Vec2SignalMock$1 || min instanceof mathModule.Vector2) && (max instanceof Vec2SignalMock$1 || max instanceof mathModule.Vector2)) {
            // @ts-ignore
            newSignal = new Vec2SignalMock$1(callback());
        }
        if ((min instanceof VectorSignalMock || min instanceof mathModule.Vector3) && (max instanceof VectorSignalMock || max instanceof mathModule.Vector3)) {
            // @ts-ignore
            newSignal = new VectorSignalMock(callback());
        }


        if (typeof min === "number" || min instanceof mathModule.Vector2 || min instanceof mathModule.Vector3) {
            if(typeof max === "number" || max instanceof mathModule.Vector2 || max instanceof mathModule.Vector3) {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$1(this, max, newSignal, callback);
            }
        } else {
            if (typeof max === "number" || max instanceof mathModule.Vector2 || max instanceof mathModule.Vector3) {
                monitor$1(this, min, newSignal, callback);
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
        let caseMinVec2 = min instanceof mathModule.Vector2 || min instanceof Vec2SignalMock$1;
        let caseMaxVec2 = max instanceof mathModule.Vector2 || max instanceof Vec2SignalMock$1;
        let caseMinVec3 = min instanceof mathModule.Vector3 || min instanceof VectorSignalMock;
        let caseMaxVec3 = max instanceof mathModule.Vector3 || max instanceof VectorSignalMock;

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
                let valMinX = min instanceof mathModule.Vector2 ? min.x : min.value.x;
                // @ts-ignore
                let valMaxX = max instanceof mathModule.Vector2 ? max.x : max.value.x;
                // @ts-ignore
                let valMinY = min instanceof mathModule.Vector2 ? min.y : min.value.y;
                // @ts-ignore
                let valMaxY = max instanceof mathModule.Vector2 ? max.y : max.value.y;

                /**@type {number} */
                let x, y;
                let subX = valMaxX - valMinX;
                x = valMinX + subX * this.value;
                let subY = valMaxY - valMinY;
                y = valMinY + subY * this.value;

                return new mathModule.Vector2(x,y)
            }
            if (caseMinVec3 && caseMaxVec3) {
                // @ts-ignore
                let valMinX = min instanceof mathModule.Vector3 ? min.x : min.value.x;
                // @ts-ignore
                let valMaxX = max instanceof mathModule.Vector3 ? max.x : max.value.x;
                // @ts-ignore
                let valMinY = min instanceof mathModule.Vector3 ? min.y : min.value.y;
                // @ts-ignore
                let valMaxY = max instanceof mathModule.Vector3 ? max.y : max.value.y;
                // @ts-ignore
                let valMinZ = min instanceof mathModule.Vector3 ? min.z : min.value.z;
                // @ts-ignore
                let valMaxZ = max instanceof mathModule.Vector3 ? max.z : max.value.z;

                /**@type {number} */
                let x, y, z;

                let subX = valMaxX - valMinX;
                x = valMinX + subX * this.value;
                let subY = valMaxY - valMinY;
                y = valMinY + subY * this.value;
                let subZ = valMaxZ - valMinZ;
                z = valMinZ + subZ * this.value;

                return new mathModule.Vector3(x,y,z)
            }        
        };

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        if ((min instanceof ScalarSignalMock || typeof min === 'number') && (max instanceof ScalarSignalMock || typeof max === 'number')) {
            newSignal = new ScalarSignalMock(callback());
        }
        if ((min instanceof Vec2SignalMock$1 || min instanceof mathModule.Vector2) && (max instanceof Vec2SignalMock$1 || max instanceof mathModule.Vector2)) {
            newSignal = new Vec2SignalMock$1(callback());
        }
        if ((min instanceof VectorSignalMock || min instanceof mathModule.Vector3) && (max instanceof VectorSignalMock || max instanceof mathModule.Vector3)) {
            newSignal = new VectorSignalMock(callback());
        }

        if (typeof min === "number" || min instanceof mathModule.Vector2 || min instanceof mathModule.Vector3) {
            if(typeof max === "number" || max instanceof mathModule.Vector2 || max instanceof mathModule.Vector3) {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$1(this, max, newSignal, callback);
            }
        } else {
            if (typeof max === "number" || max instanceof mathModule.Vector2 || max instanceof mathModule.Vector3) {
                monitor$1(this, min, newSignal, callback);
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
        
        let newSignal = new BoolSignalMock$1(callback());

        monitor$1(this, signal, newSignal, callback);

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
        
        let newSignal = new BoolSignalMock$1(callback());

        monitor$1(this, signal, newSignal, callback);

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
        
        let newSignal = new BoolSignalMock$1(callback());

        monitor$1(this, signal, newSignal, callback);

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
        
        let newSignal = new BoolSignalMock$1(callback());

        monitor$1(this, signal, newSignal, callback);

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
        
        let newSignal = new BoolSignalMock$1(callback());

        monitor$1(this, signal, newSignal, callback);

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
        
        let newSignal = new BoolSignalMock$1(callback());

        monitor$1(this, signal, newSignal, callback);

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
                result = false;
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
        };
        
        let newSignal = new BoolSignalMock$1(callback());

        this.monitor().subscribe(async() => {
            await newSignal.mockUpdate(callback());
        });

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
        };

        let callback = async () => {
            if ((this.value - edge) >= threshold) {
                let i = Math.floor((this.value - edge) / threshold);
                for(i; i >= 0; i--) {
                    await eventSource.mockCallback();
                    edge += threshold;
                }
            }
        };

        setTimeout(() => firstCallback(), 30);

        this.monitor().subscribe(async() => {
            await callback();
        });

        return eventSource;
    }

    /**
     * @memberof ScalarSignalMock
     */
    magnitude() {
        let callback = () => {
            return this.value;
        };
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @memberof ScalarSignalMock
     */
    magnitudeSquared() {
        let callback = () => {
            return this.value ** 2;
        };
        let newSignal = new ScalarSignalMock(callback());

        this.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} scalar
     * @memberof ScalarSignalMock
     */
    max(scalar) {
        let callback = () => {
            return Math.max(this.value, typeof scalar == 'number' ? scalar : scalar.value);
        };
        let newSignal = new ScalarSignalMock(callback());

        monitor$1(this, scalar, newSignal, callback);
        
        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | number} scalar
     * @memberof ScalarSignalMock
     */
    min(scalar) {
        let callback = () => {
            return Math.min(this.value, typeof scalar == 'number' ? scalar : scalar.value);
        };
        let newSignal = new ScalarSignalMock(callback());

        monitor$1(this, scalar, newSignal, callback);
        
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
            let newFactor = typeof factor === 'number' ? factor : factor.value;
            return this.value + (newScalar - this.value) * newFactor
        };
        let newSignal = new ScalarSignalMock(callback());
        
        if (typeof scalar === "number") {
            if(typeof factor === "number") {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$1(this, factor, newSignal, callback);
            }
        } else {
            if(typeof factor === "number") {
                monitor$1(this, scalar, newSignal, callback);
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
            let newMax = typeof max === 'number' ? max : max.value;

            if (this.value <= newMin) return 0;
            if (this.value >= newMax) return 1;
            if (this.value > newMin && this.value < newMax) {
                return (this.value - newMin) / (newMax - newMin);
            }
        };
        let newSignal = new ScalarSignalMock(callback());

        if (typeof min === "number") {
            if(typeof max === "number") {
                this.monitor().subscribe(async () => {
                    await newSignal.mockUpdate(callback());
                });
            } else {
                monitor$1(this, max, newSignal, callback);
            }
        } else {
            if(typeof max === "number") {
                monitor$1(this, min, newSignal, callback);
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
        });

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
        });

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
function monitor$1(firstSignal, secondSignal, signal, callback) {
    firstSignal.monitor().subscribe(async () => {
        await signal.mockUpdate(callback());
    });

    if (secondSignal instanceof VectorSignalMock || secondSignal instanceof Vec2SignalMock$1 || secondSignal instanceof ScalarSignalMock) {
        secondSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback());
        });
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
        await signal.mockUpdate(callback());
    });

    if (typeof secondSignal !== 'number') {
        secondSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback());
        });
    }

    if (typeof thirdSignal !== 'number') {
        thirdSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback());
        });
    }
}

var ScalarSignalMock$1 = ScalarSignalMock;

const ms = new ScalarSignalMock$1(0);
const deltaTimeMS = new ScalarSignalMock$1(0);

ms.monitor().subscribe(async (/** @type {{ newValue: number; oldValue: number; }} */ v) => {
    await deltaTimeMS.mockUpdate(v.newValue - v.oldValue);
});

/** @type {SubscriptionMock[]} */
let subscriptions = [];

class TimeMock {
    static get deltaTimeMS() {
        return deltaTimeMS;
    }

    static get ms() {
        return ms;
    }

    /**
     * @static
     * @param {SubscriptionMock} subcription
     * @memberof TimeMock
     */
    static clearInterval(subcription) {
        subcription.unsubscribe();
    }

    /**
     * @static
     * @param {SubscriptionMock} subcription
     * @memberof TimeMock
     */
    static clearTimeout(subcription) {
        subcription.unsubscribe();
    }

    /**
     * @static
     * @param {Function} callback
     * @param {number} delay
     * @memberof TimeMock
     */
    static setInterval(callback, delay) {
        return TimeMock.setIntervalWithSnapshot(undefined, callback, delay)
    }

    /**
     *
     *
     * @static
     * @param {*} snapshot
     * @param {Function} callback
     * @param {number} delay
     * @return {*} 
     * @memberof TimeMock
     */
    static setIntervalWithSnapshot(snapshot, callback, delay) {
        let deltatime = 0;

        let sub = ms.monitor().subscribeWithSnapshot(snapshot, (/** @type {{ newValue: number; oldValue: number; }} */ v) => {
            deltatime += v.newValue - v.oldValue;
            let times = Math.floor(deltatime / delay);

            if (times >= 1) {
                deltatime -= delay * times;

                for (let i = 0; i < times; i++) callback();
            }
        });

        subscriptions.push(sub);

        return sub;
    }

    /**
     * @static
     * @param {Function} callback
     * @param {number} delay
     * @memberof TimeMock
     */
    static setTimeout(callback, delay) {
        return TimeMock.setTimeoutWithSnapshot(undefined, callback, delay);
    }

    /**
     * @static
     * @param {*} snapshot
     * @param {Function} callback
     * @param {number} delay
     * @memberof TimeMock
     */
    static setTimeoutWithSnapshot(snapshot, callback, delay) {
        let deltatime = 0;

        let sub = ms.monitor().subscribeWithSnapshot(snapshot, (/** @type {{ newValue: number; oldValue: number; }} */ v) => {
            deltatime += v.newValue - v.oldValue;

            if (deltatime >= delay) {
                callback();
                sub.unsubscribe();
            }
        });

        subscriptions.push(sub);

        return sub;
    }

    /**
     * @static
     * @param {number} number
     * @memberof TimeMock
     */
    static async mockIncreaseMs(number) {
        await ms.mockUpdate(ms.value + number);
    }

    static async mockReset() {
        await ms.mockUpdate(0);
        await deltaTimeMS.mockUpdate(0);

        subscriptions.forEach(sub => sub.unsubscribe());
        subscriptions = [];
    }
}

class TimeDriverMock {
    /**
     * @param {number} durationMilliseconds
     * @param {number} loopCount
     * @param {boolean} mirror
     * @memberof TimeDriverMock
     */
    constructor(durationMilliseconds, loopCount, mirror) {
        this.durationMilliseconds = durationMilliseconds;
        this.loopCount = loopCount;
        this.mirror = mirror;

        this._isRunning = new BoolSignalMock$1(false);

        this.progress = new ScalarSignalMock$1(0);
        this._reverse = false;
        this._loop = 0;
        this._updateSubscription = null;

        this._onCompleted = new EventSourceMock();
        this._onAfterIteration = new EventSourceMock();
    }

    start() {
        if (this._isRunning.value) return;

        this._updateSubscription = TimeMock.ms.monitor().subscribe(async (/** @type {{ newValue: number; oldValue: number; }} */ v) => {
            await this._update(v.newValue - v.oldValue);
        });

        this._isRunning.mockUpdate(true);
    }

    stop() {
        if (this._updateSubscription) this._updateSubscription.unsubscribe();

        this._isRunning.mockUpdate(false);
    }

    reset() {
        this.progress.mockUpdate(0);
        this._reverse = false;
        this._loop = 0;
    }

    reverse() {
        this._reverse = !this._reverse;
        this._loop = this.loopCount - this._loop - 1;
    }

    isRunning() {
        return this._isRunning;
    }

    onCompleted() {
        return this._onCompleted;
    }

    onAfterIteration() {
        return this._onAfterIteration;
    }

    /**
     * @param {number} deltatime
     * @memberof TimeDriverMock
     */
    async _update(deltatime) {
        if (!this._isRunning.value) return;

        let progress = this.progress.value;
        
        if (this._reverse)
            progress = progress - (deltatime / this.durationMilliseconds);
        else
            progress = progress + (deltatime / this.durationMilliseconds);

        while (!(progress < 1 && progress >= 0)) {
            this._loop += 1;

            if (this.loopCount <= this._loop) {
                await this._isRunning.mockUpdate(false);
                await this._onCompleted.mockCallback();

                await this._onAfterIteration.mockCallback();
                break;
            } else {
                if (this.mirror) {
                    this._reverse = !this._reverse;

                    if (progress < 0) progress = Math.abs(progress);
                    else progress = 1 - (progress - 1);

                } else {
                    if (progress < 0) progress = Math.abs(progress);
                
                    progress -= 1;
                }
            }
            await this._onAfterIteration.mockCallback();
        }

        await this.progress.mockUpdate(progress);
    }
}

class AnimationMock {
    /**
     * @static
     * @param {{durationMilliseconds?: number, loopCount?: number, mirror?: false | true}} params
     * @memberof AnimationMock
     */
    static timeDriver(params) {
        let durationMilliseconds = params.durationMilliseconds ? params.durationMilliseconds : 0;
        let loopCount = params.loopCount ? params.loopCount : 0;
        let mirror = params.mirror ? params.mirror : false;

        return new TimeDriverMock(durationMilliseconds, loopCount, mirror);
    }

    /**
     * @static
     * @param {TimeDriver} driver
     * @param {ScalarSampler} sampler
     * @memberof AnimationMock
     */
    static animate(driver, sampler) {
        let scalar = new ScalarSignalMock$1(0);

        driver.progress.monitor({ fireOnInitialValue: true }).subscribe(async () => {
            await scalar.mockUpdate(sampler.curve(driver.progress.value));
        });

        return scalar;
    }

    static get samplers() {
        return SamplerFactory
    }
}

class ScalarSampler {
    /**
     * @param {Function} curve
     * @memberof ScalarSampler
     */
    constructor(curve) {
        this.curve = curve;
    }
}

class SamplerFactory {
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static linear(from, to) {
        if (typeof from === 'number' && typeof to === 'number')
            return new ScalarSampler((/** @type {number} */ t) => mathModule.AMath.lerp(from, to, t))
        else {
            // @ts-ignore
            return from.map((e, index) => this.linear(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} numberOfFrames
    * @param {number | number[]} [startFrame = null] 
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static frame(numberOfFrames, startFrame) {
        if (typeof numberOfFrames === 'number' && typeof startFrame === 'number') {
            let startFrameValue = startFrame ?? 0;
            return new ScalarSampler((/** @type {number} */ t) => Math.round(mathModule.AMath.lerp(0, numberOfFrames, t) + startFrameValue))
        }
        else {
            // @ts-ignore
            return numberOfFrames.map((e, index) => this.frame(e, startFrame[index]) ?? this.frame(e))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInSine(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = 1 - Math.cos((x * Math.PI) / 2);
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInSine(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutSine(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = Math.sin((x * Math.PI) / 2);
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeOutSine(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutSine(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = -(Math.cos(Math.PI * x) - 1) / 2;
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInOutSine(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInQuad(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x * x;
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInQuad(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutQuad(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = 1 - (1 - x) * (1 - x);
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeOutQuad(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutQuad(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInOutQuad(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInCubic(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x * x * x;
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInCubic(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutCubic(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = 1 - Math.pow(1 - x, 3);
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeOutCubic(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutCubic(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInOutCubic(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInQuart(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x * x * x * x;
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInQuart(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutQuart(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = 1 - Math.pow(1 - x, 4);
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.lineaseOutQuartear(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutQuart(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4);
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInOutQuart(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInQuint(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x * x * x * x * x;
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInQuint(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutQuint(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = 1 - Math.pow(1 - x, 5);
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeOutQuint(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutQuint(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInOutQuint(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInExpo(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x === 0 ? 0 : Math.pow(2, 10 * x - 10);
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInExpo(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutExpo(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeOutExpo(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutExpo(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x === 0
                    ? 0
                    : x === 1
                        ? 1
                        : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                            : (2 - Math.pow(2, -20 * x + 10)) / 2;

                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInOutExpo(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInCirc(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = 1 - Math.sqrt(1 - Math.pow(x, 2));
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInCirc(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutCirc(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = Math.sqrt(1 - Math.pow(x - 1, 2));
                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeOutCirc(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutCirc(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x < 0.5
                    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;

                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInOutCirc(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInBack(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let c1 = 1.70158;
                let c3 = c1 + 1;
                let t = c3 * x * x * x - c1 * x * x;

                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInBack(e, to[index]))
        }
    }
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutBack(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let c1 = 1.70158;
                let c3 = c1 + 1;
                let t = 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);

                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeOutBack(e, to[index]))
        }
    }
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutBack(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let c1 = 1.70158;
                let c2 = c1 * 1.525;
                let t = x < 0.5
                    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;

                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInOutBack(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInElastic(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let t = x === 0
                    ? 0
                    : x === 1
                        ? 1
                        // @ts-ignore
                        : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);

                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInElastic(e, to[index]))
        }
    }
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutElastic(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let c4 = (2 * Math.PI) / 3;
                let t = x === 0
                    ? 0
                    : x === 1
                        ? 1
                        : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;

                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeOutElastic(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutElastic(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                let c5 = (2 * Math.PI) / 4.5;
                let t = x === 0
                    ? 0
                    : x === 1
                        ? 1
                        : x < 0.5
                            ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                            : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5));

                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInOutElastic(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInBounce(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                /**
                 * @param {number} x 
                 * @returns 
                 */
                function easeOutBounce(x) {
                    let n1 = 7.5625;
                    let d1 = 2.75;

                    if (x < 1 / d1) {
                        return n1 * x * x;
                    } else if (x < 2 / d1) {
                        return n1 * (x -= 1.5 / d1) * x + 0.75;
                    } else if (x < 2.5 / d1) {
                        return n1 * (x -= 2.25 / d1) * x + 0.9375;
                    } else {
                        return n1 * (x -= 2.625 / d1) * x + 0.984375;
                    }
                }
                // @ts-ignore
                function easeInBounce(x) {
                    return 1 - easeOutBounce(1 - x);
                }
                let t = easeInBounce(x);

                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInBounce(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutBounce(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                /**
                 * @param {number} x 
                 * @returns 
                 */
                function easeOutBounce(x) {
                    let n1 = 7.5625;
                    let d1 = 2.75;

                    if (x < 1 / d1) {
                        return n1 * x * x;
                    } else if (x < 2 / d1) {
                        return n1 * (x -= 1.5 / d1) * x + 0.75;
                    } else if (x < 2.5 / d1) {
                        return n1 * (x -= 2.25 / d1) * x + 0.9375;
                    } else {
                        return n1 * (x -= 2.625 / d1) * x + 0.984375;
                    }
                }
                let t = easeOutBounce(x);

                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeOutBounce(e, to[index]))
        }
    }

    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutBounce(from, to) {
        if (typeof from === 'number' && typeof to === 'number') {
            return new ScalarSampler((/** @type {number} */ x) => {
                /**
                 * @param {number} x 
                 * @returns 
                 */
                function easeOutBounce(x) {
                    let n1 = 7.5625;
                    let d1 = 2.75;

                    if (x < 1 / d1) {
                        return n1 * x * x;
                    } else if (x < 2 / d1) {
                        return n1 * (x -= 1.5 / d1) * x + 0.75;
                    } else if (x < 2.5 / d1) {
                        return n1 * (x -= 2.25 / d1) * x + 0.9375;
                    } else {
                        return n1 * (x -= 2.625 / d1) * x + 0.984375;
                    }
                }
                let t = x < 0.5
                    ? (1 - easeOutBounce(1 - 2 * x)) / 2
                    : (1 + easeOutBounce(2 * x - 1)) / 2;

                return mathModule.AMath.lerp(from, to, t)
            })
        } else {
                // @ts-ignore
                return from.map((e, index) => this.easeInOutBounce(e, to[index]))
        }
    }

    /**
     * @static
     * @param {number | number[]} value
     * @memberof SamplerFactory
     * @returns {ScalarSampler | ScalarSampler[]}
     */
    static constant(value) {
        if (typeof value === 'number') {
            // @ts-ignore
            return new ScalarSampler((/** @type {number} */ t) => value)
        } else {
            if (value instanceof Array)
                // @ts-ignore
                return value.map((e) => this.constant(e))
        }
    }

    /**
     * @static
     * @param {number | number[]} p0 
     * @param {number | number[]} p1 
     * @param {number | number[]} p2 
     * @param {number | number[]} p3 
     * @returns {ScalarSampler | ScalarSampler[]}
     * @memberof SamplerFactory
     */
    static bezier(p0, p1, p2, p3) {
        if (typeof p0 === 'number' && typeof p1 === 'number' && typeof p2 === 'number' && typeof p3 === 'number') {
            // @ts-ignore
            return new ScalarSampler((/** @type {number} */ t) => ((1 - t) ** 3) * p0 + 3.0 * t * ((1 - t) ** 2) * p1 + 3.0 * (t ** 2) * (1 - t) * p2.x + (t ** 3) * p3)
        } else {
            // @ts-ignore
            if (p0.length == p1.length && p0.length == p2.length && p0.length == p3.length)
                // @ts-ignore
                return p0.map((e, index) => this.bezier(e, p1[index], p2[p3[index]]))
        }

    }
}

/**
 * @exports
 * @typedef {Object} TextureBaseMockParams
 * @property {string} name
 * @property {number} [height]
 * @property {number} [width]
 * @property {any} [signal]
 * @property {string} [type]
 */

class TextureBaseMock {
    /**
     * @param {TextureBaseMockParams} params 
     * @memberof SceneObjectBaseMock 
     */
    constructor(params) {
        this._identifier = (params.type ?? 'texture') + ':' + Math.round(Math.random() * 10000);
        this._name = params.name;
        this._signal = params.signal ?? null;
        this._height = new ScalarSignalMock$1(params.height ?? 0);  
        this._width = new ScalarSignalMock$1(params.width ?? 0);  
    }

    get identifier() {
        return this._identifier;
    }

    get name() {
        return this._name;
    }

    get signal() {
        return this._signal;
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }
}

/**
 * @exports
 * @typedef {Object} MaterialBaseMockParams
 * @property {string} name
 * @property {number} [alphaCutoff]
 * @property {boolean} [alphaTestEnabled]
 * @property {boolean} [depthTestEnabled]
 * @property {boolean} [depthWriteEnabled]
 * @property {TextureBase} [diffuse]
 * @property {boolean} [doubleSided]
 * @property {number} [opacity]
 * @property {string} [type]
 */

class MaterialBaseMock {
    /**
     * @param {MaterialBaseMockParams} params 
     * @memberof SceneObjectBaseMock 
     */
    constructor(params) {
        this._identifier = (params.type ?? 'material') + ':' + Math.round(Math.random() * 10000);
        this._name = params.name;
        this._alphaCutoff = new ScalarSignalMock$1(params.alphaCutoff ?? 0);
        this._alphaTestEnabled = new BoolSignalMock$1(params.alphaTestEnabled ?? false);
        this._depthTestEnabled = new BoolSignalMock$1(params.depthTestEnabled ?? false);
        this._depthWriteEnabled = new BoolSignalMock$1(params.depthWriteEnabled ?? false);
        this._diffuse = params.diffuse ?? null;
        this._doubleSided = new BoolSignalMock$1(params.doubleSided ?? false);
        this._opacity = new ScalarSignalMock$1(params.opacity ?? 0);
    }

    get identifier() {
        return this._identifier;
    }

    get name() {
        return this._name;
    }

    get alphaCutoff() {
        return this._alphaCutoff;
    }

    set alphaCutoff(value) {
        this._alphaCutoff.mockUpdate(value);
    }

    get alphaTestEnabled() {
        return this._alphaTestEnabled;
    }

    set alphaTestEnabled(value) {
        this._alphaTestEnabled.mockUpdate(value);
    }

    get depthTestEnabled() {
        return this._alphaTestEnabled;
    }

    set depthTestEnabled(value) {
        this._depthTestEnabled.mockUpdate(value);
    }

    get depthWriteEnabled() {
        return this._depthWriteEnabled;
    }

    set depthWriteEnabled(value) {
        this._depthWriteEnabled.mockUpdate(value);
    }

    get diffuse() {
        return this._diffuse;
    }
   
    get doubleSided() {
        return this._doubleSided;
    }

    set doubleSided(value) {
        this._doubleSided.mockUpdate(value);
    }

    get opacity() {
        return this._opacity;
    }

    set opacity(value) {
        this._opacity.mockUpdate(value);
    }

    async getDiffuse() {
        return this._diffuse;
    }
}

/** @type {MaterialBaseMock[]} */
let MaterialStructure = [];

class MaterialsMock {
    /**
     * @param {string} materialName 
     */
    static async findFirst(materialName) {
        let result = MaterialStructure.filter(mat => mat.name == materialName)[0];
        return result ?? null;
    }

    static async getAll() {
        return MaterialStructure
    }
    
    /**
     * @param {string} namePattern 
     * @param {{limit?: number}} config 
     */
    static async findUsingPattern(namePattern, config = {}) {
        if (namePattern.charAt(0) === '*') namePattern = '.' + namePattern;

        let result = MaterialStructure.filter(mat => mat.name.match(namePattern));

        return result.slice(0, config.limit ?? result.length);
    }

    /**
     * @param {import("./MaterialBase.mock").MaterialBaseMockParams[]} structure
     * @memberof SceneMock
     */
    static mockReset(structure = []) {
        MaterialStructure = structure.map(s => new MaterialBaseMock(s)) ?? [];
    }

}

/** @type {Object<string, SignalMock|EventSourceMock>} */
let  PatchesStructureInputs = {};

class PatchesInputsMock {
    /**
     * @param {string} name 
     * @param {SignalMock | boolean | number | string} signal 
     */
    static async set(name, signal) {
        let value;
        switch (typeof signal) {
            case 'string':
                value = new StringSignalMock(signal);
                break;

            case 'boolean':
                value = new BoolSignalMock$1(signal);
                break;

            case 'number':
                value = new ScalarSignalMock$1(signal);
                break;

            default:
                value = signal;
        }
        PatchesStructureInputs[name] = value;
    }

    /** 
     * @param {string} name 
     * @param {BoolSignalMock | boolean} signal 
     */
    static async setBoolean(name, signal) {
        let value;
        switch (typeof signal) {
            case 'boolean':
                value = new BoolSignalMock$1(signal);
                break;
            default:
                value = signal;
        }
        PatchesStructureInputs[name] = value;
    }

    /**
     * @param {string} name 
     * @param {SignalMock} signal 
     */
    static async setColor(name, signal) {
        PatchesStructureInputs[name] = signal;
    }

    /** 
     * @param {string} name 
     * @param {ScalarSignalMock | number} signal 
     */
    static async setScalar(name, signal) {
        let value;
        switch (typeof signal) {
            case 'number':
                value = new ScalarSignalMock$1(signal);
                break;

            default:
                value = signal;
        }
        PatchesStructureInputs[name] = value;
    }

    /** 
     * @param {string} name 
     * @param {StringSignalMock | string} signal 
     */
    static async setString(name, signal) {
        let value;
        switch (typeof signal) {
            case 'string':
                value = new StringSignalMock(signal);
                break;

            default:
                value = signal;
        }
        PatchesStructureInputs[name] = value;
    }

    /** 
     * @param {string} name 
     * @param {VectorSignalMock} signal 
     */
    static async setPoint(name, signal) {
        PatchesStructureInputs[name] = signal;
    }

    /** 
     * @param {string} name 
     * @param {Vec2SignalMock} signal 
     */
    static async setPoint2D(name, signal) {
        PatchesStructureInputs[name] = signal;
    }

    /** 
     * @param {string} name 
     * @param {VectorSignalMock} signal 
     */
    static async setVector(name, signal) {
        PatchesStructureInputs[name] = signal;
    }

    /** 
     * @param {string} name 
     * @param {EventSourceMock} signal 
     */
    static async setPulse(name, signal) {
        PatchesStructureInputs[name] = signal;
    }

    static mockReset() {
        PatchesStructureInputs = {};
    }

    static mockGetPatchesStructureInputs() {
        return PatchesStructureInputs
    }
}

/** @type {Object<string, SignalMock|EventSourceMock>} */
let PatchesStructureOutputs = {};

//Skipped getColor, getColorOrFallback methods
class PatchesOuputsMock {
    /**
     * @param {string} name 
     */
   static async get(name) {
        return PatchesStructureOutputs[name]
   }

    /**
     * @param {string} name 
     * @returns {Promise<BoolSignalMock>}
     */
    static async getBoolean(name) {
        if (!(PatchesStructureOutputs[name] instanceof BoolSignalMock$1)) 
            throw new TypeError(`Expected BoolSignalMock but got: ${typeof PatchesStructureOutputs[name]}`);
        return /**@type {BoolSignalMock}*/ (PatchesStructureOutputs[name])
   } 
   
    /**
     * @param {string} name 
     * @param {BoolSignalMock | boolean} fallback 
     * @returns {Promise<BoolSignalMock>}
     */
    static async getBooleanOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof BoolSignalMock$1)) {
            if (typeof fallback == 'boolean') value = new BoolSignalMock$1(fallback);
            else value = fallback; 
        }
        else 
            value = PatchesStructureOutputs[name];
        return /**@type {BoolSignalMock}*/ (value)
   }
   
   /**
    * @param {string} name 
    * @param {SignalMock | boolean | number | string} fallback 
    * @returns {Promise<SignalMock>}
    */
   static async getOrFallback(name, fallback) {
    let value;
    if (!(PatchesStructureOutputs[name] instanceof SignalMock)) {
        switch (typeof fallback) {
            case 'boolean':
                value = new BoolSignalMock$1(fallback);
                break;

            case 'number':
                value = new ScalarSignalMock$1(fallback);
                break;
            
            case 'string':
                value = new StringSignalMock(fallback);
                break;

            default:
                value = fallback;
        }
    }
    else 
        value = PatchesStructureOutputs[name];
    return /**@type {SignalMock}*/ (value)
   }

    /**
    * @param {string} name 
    * @returns {Promise<VectorSignalMock>}
    */
    static async getPoint(name) {
        if (!(PatchesStructureOutputs[name] instanceof VectorSignalMock)) 
            throw new TypeError(`Expected VectorSignalMock`);
        return /**@type {VectorSignalMock}*/ (PatchesStructureOutputs[name])
    }

    /**
    * @param {string} name 
    * @param {VectorSignalMock} fallback 
    * @returns {Promise<VectorSignalMock>}
    */
    static async getPointOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof VectorSignalMock)) value = fallback;
        else value = PatchesStructureOutputs[name];
        return /**@type {VectorSignalMock}*/ (value)
    }

    /**
    * @param {string} name 
    * @returns {Promise<Vec2SignalMock>}
    */
    static async getPoint2D(name) {
        if (!(PatchesStructureOutputs[name] instanceof Vec2SignalMock$1)) 
            throw new TypeError(`Expected Vec2SignalMock`);
        return /**@type {Vec2SignalMock}*/ (PatchesStructureOutputs[name])
    }

   /**
    * @param {string} name 
    * @param {Vec2SignalMock} fallback 
    * @returns {Promise<Vec2SignalMock>}
    */
    static async getPoint2DOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof Vec2SignalMock$1)) value = fallback;
        else value = PatchesStructureOutputs[name];
        return /**@type {Vec2SignalMock}*/ (value)
    }

    /**
    * @param {string} name 
    * @returns {Promise<EventSourceMock>}
    */
    static async getPulse(name) {
        if (!(PatchesStructureOutputs[name] instanceof EventSourceMock)) 
            throw new TypeError(`Expected EventSourceMock`);
        return /**@type {EventSourceMock}*/ (PatchesStructureOutputs[name])
    }

   /**
    * @param {string} name 
    * @param {EventSourceMock} fallback 
    * @returns {Promise<EventSourceMock>}
    */
    static async getPulseOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof EventSourceMock)) value = fallback;    
        else value = PatchesStructureOutputs[name];
        return /**@type {EventSourceMock}*/ (value)
    }

    /**
    * @param {string} name 
    * @returns {Promise<ScalarSignalMock>}
    */
    static async getScalar(name) {
        if (!(PatchesStructureOutputs[name] instanceof ScalarSignalMock$1)) 
            throw new TypeError(`Expected ScalarSiganlMcok`);
        return /**@type {ScalarSignalMock}*/ (PatchesStructureOutputs[name])
    }
    
    /**
     * @param {string} name 
     * @param {ScalarSignalMock | number} fallback 
     * @returns {Promise<ScalarSignalMock>}
     */
    static async getScalarOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof ScalarSignalMock$1)) {
            if (typeof fallback == 'number') value = new ScalarSignalMock$1(fallback);
            else value = fallback; 
        }
        else 
            value = PatchesStructureOutputs[name];
        return /**@type {ScalarSignalMock}*/ (value)
    }

    /**
    * @param {string} name 
    * @returns {Promise<StringSignalMock>}
    */
    static async getString(name) {
        if (!(PatchesStructureOutputs[name] instanceof StringSignalMock)) 
            throw new TypeError(`Expected StringSignalMock`);
        return /**@type {StringSignalMock}*/ (PatchesStructureOutputs[name])
    }
    
    /**
     * @param {string} name 
     * @param {StringSignalMock | string} fallback 
     * @returns {Promise<StringSignalMock>}
     */
    static async getStringOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof StringSignalMock)) {
            if (typeof fallback == 'string') value = new StringSignalMock(fallback);
            else value = fallback; 
        }
        else 
            value = PatchesStructureOutputs[name];
        return /**@type {StringSignalMock}*/ (value)
    }

    /**
    * @param {string} name 
    * @returns {Promise<VectorSignalMock>}
    */
    static async getVector(name) {
        if (!(PatchesStructureOutputs[name] instanceof VectorSignalMock)) 
            throw new TypeError(`Expected VectorSignalMock`);
        return /**@type {VectorSignalMock}*/ (PatchesStructureOutputs[name])
    }
    
    /**
     * @param {string} name 
     * @param {VectorSignalMock} fallback 
     * @returns {Promise<VectorSignalMock>}
     */
    static async getVectorOrFallback(name, fallback) {
        let value;
        if (!(PatchesStructureOutputs[name] instanceof VectorSignalMock)) value = fallback;
        else value = PatchesStructureOutputs[name];
        return /**@type {VectorSignalMock}*/ (value)
    }

    /**
     * @param {Object<string, SignalMock|EventSourceMock>} value 
     */
    static mockReset(value = {}) {
        PatchesStructureOutputs = value;
    }
}

class PatchesMock {
    static get inputs() {
        return PatchesInputsMock
    }

    static get outputs() {
        return PatchesOuputsMock
    }
}

class StorageLocationMock {
    
    /**
     * @param {Object<string,Object>} storageLocationData 
     */
    constructor(storageLocationData = {}) {
        /**@type {Object<string,Object>} */
        this._storageLocationData = storageLocationData;
    }

    /**
     * @param {string} key 
     * @returns {Promise<Object | null>}
     */
    async get(key) {
        return this._storageLocationData[key] ?? null
    }

    /**
     * @param {string} key 
     */
    async remove(key) {
        this._storageLocationData[key] = undefined;
    }

    /**
     * 
     * @param {string} key 
     * @param {Object} value 
     */
    async set(key, value) {
        this._storageLocationData[key] = value;
    }
}

let block = new StorageLocationMock();
let local = new StorageLocationMock();

class PersistenceMock {
    
    static get block() {
        return block
    }

    static get local() {
        return local
    }

    /**
     * 
     * @param {*} blockParam 
     * @param {*} localParam 
     */
    static mockReset(blockParam = {}, localParam = {}) {
        block = new StorageLocationMock(blockParam);
        local = new StorageLocationMock(localParam);
    }
}

class Mat4Mock extends SignalMock {
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
            await mat4.mockUpdate(this.value.multiply(matrix.value));
        });

        matrix.monitor().subscribe(async () => {
            await mat4.mockUpdate(this.value.multiply(matrix.value));
        });

        return mat4;
    }

    /**
     * @param {VectorSignalMock} point
     * @memberof Mat4Mock
     */
    transformPoint(point) {
        let callback = () => {
            return this.value.transformPoint(point.value);
        };

        let pointSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await pointSignal.mockUpdate(callback());
        });

        point.monitor().subscribe(async () => {
            await pointSignal.mockUpdate(callback());
        });

        return pointSignal;
    }

    /**
     * @param {VectorSignalMock} vector
     * @memberof Mat4Mock
     */
    transformVector(vector) {
        let callback = () => {
            return this.value.transformVector(vector.value);
        };

        let vectorSignal = new VectorSignalMock(callback());

        this.monitor().subscribe(async () => {
            await vectorSignal.mockUpdate(callback());
        });

        vector.monitor().subscribe(async () => {
            await vectorSignal.mockUpdate(callback());
        });

        return vectorSignal;
    }

    inverse() {
        let mat4 = new Mat4Mock(this.value.inverse());

        this.monitor().subscribe(async () => {
            await mat4.mockUpdate(this.value.inverse());
        });

        return mat4;
    }


    /**
     * @param {VectorSignalMock} target
     * @param {VectorSignalMock} [up=new VectorSignalMock(new Vector3(0, 1, 0))]
     * @return {Mat4Mock} 
     * @memberof Mat4Mock
     */
    lookAt(target, up = new VectorSignalMock(new mathModule.Vector3(0, 1, 0))) {
        let callback = () => {
            return this.value.lookAt(target.value, up.value);
        };

        let mat4 = new Mat4Mock(callback());

        this.monitor().subscribe(async () => {
            await mat4.mockUpdate(callback());
        });

        target.monitor().subscribe(async () => {
            await mat4.mockUpdate(callback());
        });

        up.monitor().subscribe(async () => {
            await mat4.mockUpdate(callback());
        });

        return mat4;
    }


    transpose() {
        let mat4 = new Mat4Mock(this.value.transpose());

        this.monitor().subscribe(async () => {
            await mat4.mockUpdate(this.value.transpose());
        });

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
        function callback() { return mathModule.Matrix.compose(position.value, quaternion.value, scale.value) }
        async function update() { await mat4.mockUpdate(callback()); }

        let mat4 = new Mat4Mock(callback());

        position.monitor().subscribe(update);
        quaternion.monitor().subscribe(update);
        scale.monitor().subscribe(update);

        return mat4;
    }
}

class ScalarSignalSourceMock {
    constructor(name) {
        this._name = name;
        this._signal = new ScalarSignalMock$1(0);
    }

    get signal() {
        return this._signal;
    }

    /**
     * @param {number} value 
     */
    set(value) {
        this._signal.mockUpdate(value);
    }
}

class StringSignalSourceMock {
    constructor(name) {
        this._name = name;
        this._signal = new StringSignalMock('');
    }

    get signal() {
        return this._signal;
    }

    /**
     * @param {string} value 
     */
    set(value) {
        this._signal.mockUpdate(value);
    }
}

class BoolSignalSourceMock {
    constructor(name) {
        this._name = name;
        this._signal = new BoolSignalMock$1(true);
    }

    get signal() {
        return this._signal;
    }
    
    /**
     * @param {boolean} value 
     */
    set(value) {
        this._signal.mockUpdate(value);
    }
}

class TransformSignalMock extends SignalMock {
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
        });
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
    set x(value) { this.position.mockUpdateX(value); }

    get y() { return this.position.y }
    set y(value) { this.position.mockUpdateY(value); }

    get z() { return this.position.z }
    set z(value) { this.position.mockUpdateZ(value); }

    // get rotationX() { return this.rotation.eulerAngles.x }
    // get rotationY() { return this.rotation.eulerAngles.y }
    // get rotationZ() { return this.rotation.eulerAngles.z }

    get scaleX() { return this.scale.x }
    set scaleX(value) { this.scale.mockUpdateX(value); }

    get scaleY() { return this.scale.y }
    set scaleY(value) { this.scale.mockUpdateY(value); }

    get scaleZ() { return this.scale.z }
    set scaleZ(value) { this.scale.mockUpdateZ(value); }

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
    lookAt(target, up = new VectorSignalMock(new mathModule.Vector3(0, 1, 0))) {
        return TransformSignalMock.fromMatrix(this.toMatrix().lookAt(target, up));
    }

    transpose() {
        return TransformSignalMock.fromMatrix(this.toMatrix().transpose());
    }

    toMatrix() {
        return Mat4Mock.compose(
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
            const position = new mathModule.Vector3(te[12], te[13], te[14]);

            const scale = new mathModule.Vector3(
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

            const rotation = new Quaternion(w, x, y, z);

            return { position: position, rotation: rotation, scale: scale };
        }

        matrix.monitor().subscribe(async () => {
            await transformSignal.mockUpdate(callback());
        });

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

class ReactiveMock {
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
            case 'number': return new ScalarSignalMock$1(signal);
            case 'boolean': return new BoolSignalMock$1(signal);
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

                await vectorSignal.mockUpdate(new mathModule.Vector3(
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                    /** @type {number} */(z),
                ));
            });

            x = x.value;
        }

        if (typeof y !== 'number') {
            y.monitor().subscribe(async (/** @type {{ newValue: number }} */ v) => {
                y = v.newValue;

                await vectorSignal.mockUpdate(new mathModule.Vector3(
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                    /** @type {number} */(z),
                ));
            });

            y = y.value;
        }

        if (typeof z !== 'number') {
            z.monitor().subscribe(async (/** @type {{ newValue: number }} */ v) => {
                z = v.newValue;

                await vectorSignal.mockUpdate(new mathModule.Vector3(
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                    /** @type {number} */(z),
                ));
            });

            z = z.value;
        }

        let vectorSignal = new VectorSignalMock(new mathModule.Vector3(
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

                await vectorSignal.mockUpdate(new mathModule.Vector2(
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                ));
            });

            x = x.value;
        }

        if (typeof y !== 'number') {
            y.monitor().subscribe(async (/** @type {{ newValue: number }} */ v) => {
                y = v.newValue;

                await vectorSignal.mockUpdate(new mathModule.Vector2(
                    /** @type {number} */(x),
                    /** @type {number} */(y),
                ));
            });

            y = y.value;
        }

        let vectorSignal = new Vec2SignalMock$1(new mathModule.Vector2(
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
                ));
            });

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
                ));
            });

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
                ));
            });

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
                ));
            });

            w = w.value;
        }

        let quaternionSignal = new QuaternionSignalMock(new Quaternion(
            /** @type {number} */(w),
            /** @type {number} */(x),
            /** @type {number} */(y),
            /** @type {number} */(z),
        ));

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
        if(val1 instanceof ScalarSignalMock$1) return val1.add(val2);
        if(val1 instanceof Vec2SignalMock$1) {
            if (val2 instanceof VectorSignalMock) throw Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val1.add(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock$1) throw new Error(
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
        if(val1 instanceof ScalarSignalMock$1) return val1.sub(val2);
        if(val1 instanceof Vec2SignalMock$1) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.sub(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock$1) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.sub(val2) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static mul(val1, val2) {
        if(val1 instanceof ScalarSignalMock$1) return val1.mul(val2);
        if(val1 instanceof Vec2SignalMock$1) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.mul(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock$1) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.mul(val2) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static div(val1, val2) {
        if(val1 instanceof ScalarSignalMock$1) return val1.div(val2);
        if(val1 instanceof Vec2SignalMock$1) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.div(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock$1) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.div(val2) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static mod(val1, val2) {
        if(val1 instanceof ScalarSignalMock$1) return val1.mod(val2);
        if(val1 instanceof Vec2SignalMock$1) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.mod(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock$1) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.mod(val2) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static pow(val1, val2) {
        if(val1 instanceof ScalarSignalMock$1) {
            if (val2 instanceof ScalarSignalMock$1) return val1.pow(val2);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types');
        }
        if(val1 instanceof Vec2SignalMock$1) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.pow(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock$1) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
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
            if (signal instanceof ScalarSignalMock$1) return Math.exp(signal.value);
            if (signal instanceof Vec2SignalMock$1) {
                return new mathModule.Vector2(
                    Math.exp(signal.value.x),
                    Math.exp(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new mathModule.Vector3(
                    Math.exp(signal.value.x),
                    Math.exp(signal.value.y),
                    Math.exp(signal.value.z)
                )
            }
        };

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock$1) newSignal = new ScalarSignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock$1) newSignal = new Vec2SignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static acos(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1) return Math.acos(signal.value);
            if (signal instanceof Vec2SignalMock$1) {
                return new mathModule.Vector2(
                    Math.acos(signal.value.x),
                    Math.acos(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new mathModule.Vector3(
                    Math.acos(signal.value.x),
                    Math.acos(signal.value.y),
                    Math.acos(signal.value.z)
                )
            }
        };

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock$1) newSignal = new ScalarSignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock$1) newSignal = new Vec2SignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static asin(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1) return Math.asin(signal.value);
            if (signal instanceof Vec2SignalMock$1) {
                return new mathModule.Vector2(
                    Math.asin(signal.value.x),
                    Math.asin(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new mathModule.Vector3(
                    Math.asin(signal.value.x),
                    Math.asin(signal.value.y),
                    Math.asin(signal.value.z)
                )
            }
        };

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock$1) newSignal = new ScalarSignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock$1) newSignal = new Vec2SignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static atan(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1) return Math.atan(signal.value);
            if (signal instanceof Vec2SignalMock$1) {
                return new mathModule.Vector2(
                    Math.atan(signal.value.x),
                    Math.atan(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new mathModule.Vector3(
                    Math.atan(signal.value.x),
                    Math.atan(signal.value.y),
                    Math.atan(signal.value.z)
                )
            }
        };

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock$1) newSignal = new ScalarSignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock$1) newSignal = new Vec2SignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static cos(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1) return Math.cos(signal.value);
            if (signal instanceof Vec2SignalMock$1) {
                return new mathModule.Vector2(
                    Math.cos(signal.value.x),
                    Math.cos(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new mathModule.Vector3(
                    Math.cos(signal.value.x),
                    Math.cos(signal.value.y),
                    Math.cos(signal.value.z)
                )
            }
        };

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock$1) newSignal = new ScalarSignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock$1) newSignal = new Vec2SignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static tan(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1) return Math.tan(signal.value);
            if (signal instanceof Vec2SignalMock$1) {
                return new mathModule.Vector2(
                    Math.tan(signal.value.x),
                    Math.tan(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new mathModule.Vector3(
                    Math.tan(signal.value.x),
                    Math.tan(signal.value.y),
                    Math.tan(signal.value.z)
                )
            }
        };

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock$1) newSignal = new ScalarSignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock$1) newSignal = new Vec2SignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static sin(signal) {
        let callback = () => {
            if (signal instanceof ScalarSignalMock$1) return Math.sin(signal.value);
            if (signal instanceof Vec2SignalMock$1) {
                return new mathModule.Vector2(
                    Math.sin(signal.value.x),
                    Math.sin(signal.value.y)
                )
            }
            if (signal instanceof VectorSignalMock) {
                return new mathModule.Vector3(
                    Math.sin(signal.value.x),
                    Math.sin(signal.value.y),
                    Math.sin(signal.value.z)
                )
            }
        };

        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock$1) newSignal = new ScalarSignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock$1) newSignal = new Vec2SignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());

        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static log(signal) {
        if (!(signal instanceof ScalarSignalMock$1 || signal instanceof Vec2SignalMock$1 || signal instanceof VectorSignalMock)) {
            throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }

        let callback = () => {
            switch (Object.getPrototypeOf(signal)) {
                case ScalarSignalMock$1.prototype:
                    return Math.log(signal.value)
                case Vec2SignalMock$1.prototype:
                    return new mathModule.Vector2(Math.log(signal.value.x), Math.log(signal.value.y));
                case VectorSignalMock.prototype:
                    return new mathModule.Vector3(Math.log(signal.value.x), Math.log(signal.value.y), Math.log(signal.value.z));
            }
        };
        
        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        // @ts-ignore
        if (signal instanceof ScalarSignalMock$1) newSignal = new ScalarSignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof Vec2SignalMock$1) newSignal = new Vec2SignalMock$1(callback());
        // @ts-ignore
        if (signal instanceof VectorSignalMock) newSignal = new VectorSignalMock(callback());
        
        signal.monitor().subscribe(async () => {
            await newSignal.mockUpdate(callback());
        });

        return newSignal;
    }

    /**
     * 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     */
    static atan2(val1, val2) {
        if(val1 instanceof ScalarSignalMock$1) return val1.atan2(val2);
        if(val1 instanceof Vec2SignalMock$1) {
            if (val2 instanceof VectorSignalMock) throw Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val1.atan2(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock$1) throw new Error(
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
        if(val instanceof ScalarSignalMock$1) return val.clamp(min, max);
        if(val instanceof Vec2SignalMock$1) {
            if (min instanceof VectorSignalMock || max instanceof VectorSignalMock) throw Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val.clamp(min, max) 
        }
        if(val instanceof VectorSignalMock) {
            if (min instanceof Vec2SignalMock$1 || max instanceof Vec2SignalMock$1) throw new Error(
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
                case ScalarSignalMock$1.prototype:
                    if (edge instanceof ScalarSignalMock$1) {
                        if(val.value < edge.value) return 0;
                        else return 1;
                    }

                    if (edge instanceof Vec2SignalMock$1) {
                        /**@type {number} */
                        let x,y;
                        
                        if (val.value < edge.value.x) x = 0;
                        else x = 1;
                        if (val.value < edge.value.y) y = 0;
                        else y = 1;

                        return new mathModule.Vector2(x,y)
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

                        return new mathModule.Vector3(x,y,z)
                    }

                case Vec2SignalMock$1.prototype:
                    /**@type {number} */
                    let vec2X, vec2Y;

                    if (edge instanceof ScalarSignalMock$1) {
                        if (val.value.x < edge.value) vec2X = 0;
                        else vec2X = 1;
                        if (val.value.y < edge.value) vec2Y = 0;
                        else vec2Y = 1;
                    }

                    if (edge instanceof Vec2SignalMock$1) {
                        if (val.value.x < edge.value.x) vec2X = 0;
                        else vec2X = 1;
                        if (val.value.y < edge.value.y) vec2Y = 0;
                        else vec2Y = 1;
                    }

                    return new mathModule.Vector2(vec2X, vec2Y)
                    
                case VectorSignalMock.prototype:
                    /**@type {number} */
                    let x,y,z;

                    if (edge instanceof ScalarSignalMock$1) {
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
                    return new mathModule.Vector3(x,y,z)
            }
        };

        if ((val instanceof Vec2SignalMock$1 && edge instanceof VectorSignalMock) || (edge instanceof Vec2SignalMock$1 && val instanceof VectorSignalMock)) {
            throw new Error("Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}");
        }
        
        /**@type {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        if (val instanceof ScalarSignalMock$1 && edge instanceof ScalarSignalMock$1) newSignal = new ScalarSignalMock$1(callback());
        if (edge instanceof Vec2SignalMock$1 || val instanceof Vec2SignalMock$1) newSignal = new Vec2SignalMock$1(callback());
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
        if(val instanceof ScalarSignalMock$1) return val.smoothStep(min, max);
        if(val instanceof Vec2SignalMock$1) {
            if (min instanceof VectorSignalMock || max instanceof VectorSignalMock) throw Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val.smoothStep(min, max) 
        }
        if(val instanceof VectorSignalMock) {
            if (min instanceof Vec2SignalMock$1 || max instanceof Vec2SignalMock$1) throw new Error(
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
        if(val instanceof ScalarSignalMock$1) return val.fromRange(min, max);
        if(val instanceof Vec2SignalMock$1) {
            if (min instanceof VectorSignalMock || max instanceof VectorSignalMock) throw Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val.fromRange(min, max) 
        }
        if(val instanceof VectorSignalMock) {
            if (min instanceof Vec2SignalMock$1 || max instanceof Vec2SignalMock$1) throw new Error(
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
        if(val instanceof ScalarSignalMock$1) return val.toRange(min, max);
        if(val instanceof Vec2SignalMock$1) {
            if (min instanceof VectorSignalMock || max instanceof VectorSignalMock) throw Error(
                'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
            );
            else return val.toRange(min, max) 
        }
        if(val instanceof VectorSignalMock) {
            if (min instanceof Vec2SignalMock$1 || max instanceof Vec2SignalMock$1) throw new Error(
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
        if((vec0 instanceof Vec2SignalMock$1 && vec1 instanceof Vec2SignalMock$1) || (vec0 instanceof VectorSignalMock && vec1 instanceof VectorSignalMock)) {
            return vec0.distance(vec1)
        } else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
    }

    /**
     * @param {Vec2SignalMock | VectorSignalMock} vec0 
     * @param {Vec2SignalMock | VectorSignalMock} vec1 
     */
    static dot(vec0, vec1) {
        if((vec0 instanceof Vec2SignalMock$1 && vec1 instanceof Vec2SignalMock$1) || (vec0 instanceof VectorSignalMock && vec1 instanceof VectorSignalMock)) {
            return vec0.dot(vec1)
        } else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
    }

    /**
     * @param {Vec2SignalMock | VectorSignalMock} vec0 
     * @param {Vec2SignalMock | VectorSignalMock} vec1 
     */
    static reflect(vec0, vec1) {
        if((vec0 instanceof Vec2SignalMock$1 && vec1 instanceof Vec2SignalMock$1) || (vec0 instanceof VectorSignalMock && vec1 instanceof VectorSignalMock)) {
            return vec0.reflect(vec1)
        } else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static magnitude(signal) {
        if (signal instanceof ScalarSignalMock$1 || signal instanceof Vec2SignalMock$1 || signal instanceof VectorSignalMock) return signal.magnitude();
        else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
    }

    /**
     * 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} signal 
     */
    static magnitudeSquared(signal) {
        if (signal instanceof ScalarSignalMock$1 || signal instanceof Vec2SignalMock$1 || signal instanceof VectorSignalMock) return signal.magnitudeSquared();
        else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static max(val1, val2) {
        if(val1 instanceof ScalarSignalMock$1) return val1.max(val2);
        if(val1 instanceof Vec2SignalMock$1) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.max(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock$1) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.max(val2) 
        }
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val1 
     * @param {ScalarSignalMock | Vec2SignalMock | VectorSignalMock} val2 
     */
    static min(val1, val2) {
        if(val1 instanceof ScalarSignalMock$1) return val1.min(val2);
        if(val1 instanceof Vec2SignalMock$1) {
            if (val2 instanceof VectorSignalMock) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
            else return val1.min(val2) 
        }
        if(val1 instanceof VectorSignalMock) {
            if (val2 instanceof Vec2SignalMock$1) throw new Error('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');
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
            });

            if(boolArray.length === 0) result = false;

            return result;
        };

        let newSignal = new BoolSignalMock$1(callback());

        monitorForArray(boolArray, newSignal, callback);

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
            });

            return result;
        };

        let newSignal = new BoolSignalMock$1(callback());

        monitorForArray(boolArray, newSignal, callback);

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
                    if (bool.pinLastValue() === false) result = true;
                });
            } else {
                boolArray.forEach(bool => {
                    if (bool.pinLastValue() === true) result = true;
                });
            }

            return result;
        };

        let newSignal = new BoolSignalMock$1(callback());

        monitorForArray(boolArray, newSignal, callback);

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
        if (val0 instanceof ScalarSignalMock$1) {
            if (val1 instanceof ScalarSignalMock$1) return val0.eq(val1);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }
        if (val0 instanceof StringSignalMock) {
            if (val1 instanceof StringSignalMock) return val0.eq(val1);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }
        if (val0 instanceof BoolSignalMock$1) {
            if (val1 instanceof BoolSignalMock$1) return val0.eq(val1);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }
    }

    /**
     * @param {ScalarSignalMock | StringSignalMock | BoolSignalMock} val0 
     * @param {ScalarSignalMock | StringSignalMock | BoolSignalMock} val1 
     */
    static ne(val0, val1) {
        if (val0 instanceof ScalarSignalMock$1) {
            if (val1 instanceof ScalarSignalMock$1) return val0.ne(val1);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }
        if (val0 instanceof StringSignalMock) {
            if (val1 instanceof StringSignalMock) return val0.ne(val1);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }
        if (val0 instanceof BoolSignalMock$1) {
            if (val1 instanceof BoolSignalMock$1) return val0.ne(val1);
            else throw new Error('Exception in HostFunction: Component is not defined for the provided input types')
        }
    }

    /**
     * @param {ScalarSignalMock} val0 
     * @param {ScalarSignalMock} val1 
     */
    static ge(val0, val1) {
        if(val0 instanceof ScalarSignalMock$1 && val1 instanceof ScalarSignalMock$1) return val0.ge(val1);
        else throw new Error('Exception in HostFunction: Component is not defined for the provided input types');
    }

    /**
     * @param {ScalarSignalMock} val0 
     * @param {ScalarSignalMock} val1 
     */
    static gt(val0, val1) {
        if(val0 instanceof ScalarSignalMock$1 && val1 instanceof ScalarSignalMock$1) return val0.gt(val1);
        else throw new Error('Exception in HostFunction: Component is not defined for the provided input types');
    }

    /**
     * @param {ScalarSignalMock} val0 
     * @param {ScalarSignalMock} val1 
     */
    static le(val0, val1) {
        if(val0 instanceof ScalarSignalMock$1 && val1 instanceof ScalarSignalMock$1) return val0.le(val1);
        else throw new Error('Exception in HostFunction: Component is not defined for the provided input types');
    }

    /**
     * @param {ScalarSignalMock} val0 
     * @param {ScalarSignalMock} val1 
     */
    static lt(val0, val1) {
        if(val0 instanceof ScalarSignalMock$1 && val1 instanceof ScalarSignalMock$1) return val0.lt(val1);
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
        if(bool0 instanceof BoolSignalMock$1 && (
            bool1 instanceof ScalarSignalMock$1 || bool1 instanceof StringSignalMock || bool1 instanceof BoolSignalMock$1
        )) return bool0.ifThenElse(bool1, elseSignal)
        else {
            if(bool1 instanceof BoolSignalMock$1 && (
                bool0 instanceof ScalarSignalMock$1 || bool0 instanceof StringSignalMock || bool0 instanceof BoolSignalMock$1
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
        let eventSourceMock = new EventSourceMock();
        setTimeout(async() => {
            await eventSourceMock.mockCallback();
        }, 0);
        return eventSourceMock;
    }

    /**
     * @param {ScalarSignalMock | Vec2SignalMock} val0 
     * @param {ScalarSignalMock | Vec2SignalMock} val1 
     */
    static pack2(val0, val1){
        let callback = () => {
            if (val0 instanceof ScalarSignalMock$1) {
                if (val1 instanceof ScalarSignalMock$1) return new mathModule.Vector2(val0.value, val1.value);
                if (val1 instanceof Vec2SignalMock$1) return new mathModule.Vector3(val0.value, val1.value.x, val1.value.y);
            }
            if (val0 instanceof Vec2SignalMock$1) {
                if (val1 instanceof ScalarSignalMock$1) return new mathModule.Vector3(val0.value.x, val0.value.y, val1.value);
                if (val1 instanceof Vec2SignalMock$1) return new mathModule.Vector2(null, null) // should return Vector4
            }
        };

        /**@type {Vec2SignalMock | VectorSignalMock} */
        let newSignal;
        if (callback() instanceof mathModule.Vector2) newSignal = new Vec2SignalMock$1(callback());
        if (callback() instanceof mathModule.Vector3) newSignal = new VectorSignalMock(callback());

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
            return new mathModule.Vector3(val0.value, val1.value, val2.value)
        };

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
            return new mathModule.Vector3(x.value, y.value, z.value);
        };

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
            signal.monitor().subscribe(async() => await eventSource.mockCallback());
        });
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
        };
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
        };
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
            );

            return quaternion;
        };

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
    static quaternionLookAt(targetPos, selfUp = new VectorSignalMock(new mathModule.Vector3(0,1,0)), forward = new VectorSignalMock(new mathModule.Vector3(0,0,1))) {
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
            );

            return quaternion;
        }; 
        
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
        };

        let newSignal = new StringSignalMock(callback());

        cond.monitor().subscribe(() => {
            newSignal.mockUpdate(callback());
        });

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
        };

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
        await signal.mockUpdate(callback());
    });

    if (secondSignal instanceof ScalarSignalMock$1 ||
        secondSignal instanceof StringSignalMock ||
        secondSignal instanceof BoolSignalMock$1 ||
        secondSignal instanceof Vec2SignalMock$1 ||
        secondSignal instanceof VectorSignalMock ||
        secondSignal instanceof QuaternionSignalMock) {
        secondSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback());
        });
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
            await signal.mockUpdate(callback());
        });
    });  
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
        await signal.mockUpdate(callback());
    });

    if (typeof secondSignal !== 'number') {
        secondSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback());
        });
    }

    if (typeof thirdSignal !== 'number') {
        thirdSignal.monitor().subscribe(async () => {
            await signal.mockUpdate(callback());
        });
    }
}

var Reactive = ReactiveMock;

/**
 * @exports
 * @typedef {Object} SceneObjectBaseMockParams
 * @property {string} type
 * @property {string} name
 * @property {boolean} [hidden = false]
 * @property {string} [type = "object"]
 * @property {TransformParams} [transform = {}]
 * @property {SceneObjectBaseMockParams[]} [children = []]
 * @property {string[]} [tags = []]
 * @property {boolean} [dynamic = false]
 */

/**
 * @exports
 * @typedef {Object} TransformParams
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [rotationW=1]
 * @property {number} [rotationX=0]
 * @property {number} [rotationY=0]
 * @property {number} [rotationZ=0]
 * @property {number} [scaleX=1]
 * @property {number} [scaleY=1]
 * @property {number} [scaleZ=1]
 */

class SceneObjectBaseMock {
    /**
     * @param {SceneObjectBaseMockParams} params
     * @param {SceneObjectBaseMock} parent
     * @memberof SceneObjectBaseMock
     */
    constructor(params, parent = null) {
        this._type = params.type;
        this._name = params.name;
        this._tags = params.tags ?? [];

        this._hidden = new BoolSignalMock$1(params.hidden ?? false);
        this._identifier = (params.type ?? 'object') + ':' + Math.round(Math.random() * 10000);

        params.transform = params.transform ?? {};

        this._transform = new TransformSignalMock({
            position: new mathModule.Vector3(params.transform.x ?? 0, params.transform.y ?? 0, params.transform.z ?? 0),
            rotation: new Quaternion(params.transform.rotationW ?? 1, params.transform.rotationX ?? 0, params.transform.rotationY ?? 0, params.transform.rotationZ ?? 0),
            scale: new mathModule.Vector3(params.transform.scaleX ?? 1, params.transform.scaleY ?? 1, params.transform.scaleZ ?? 1),
        });

        params.children = params.children ?? [];

        this._parent = parent;
        this._dynamic = params.dynamic ?? false;

        this._children = params.children.map(child => new SceneObjectBaseMock(child, this));
    }

    /**
     * @returns {BoolSignalMock}
     * @memberof SceneObjectBaseMock
     */
    get hidden() {
        return this._hidden;
    }

    set hidden(/** @type {BoolSignalMock | boolean}  */ bool) {
        this._hidden.mockUpdate(bool);
    }

    get identifier() {
        return this._identifier;
    }

    get name() {
        return this._name;
    }

    get parentWorldTransform() {
        return;
    }

    get transform() {
        return this._transform;
    }

    set transform(value) {
        this._transform.mockUpdate(value);
    }

    get worldTransform() { return }

    set worldTransform(value) { }

    /**
     * @param {string} name
     * @returns {Promise<SceneObjectBaseMock | null>} 
     * @memberof SceneObjectBaseMock
     */
    async findFirst(name) {
        /**
         * @param {SceneObjectBaseMock[]} children
         * @returns {Promise<SceneObjectBaseMock | null>} 
         */
        let find = async (children) => {
            for (let child of children) {
                if (child.name === name) return child;

                let result = await find(child._children);

                if (result) return result;
            }

            return null;
        };

        return await find(this._children);
    }

    /**
     * @param {string} name
     * @param {{ recursive: boolean }} [config = { recursive = true }]
     * @returns {Promise<SceneObjectBaseMock[]>} 
     * @memberof SceneObjectBaseMock
    */
    async findAll(name, config = { recursive: true }) {
        /** @type {SceneObjectBaseMock[]} */
        let result = [];

        /**
         * @param {SceneObjectBaseMock[]} children
         */
        let find = async (children) => {
            for (let child of children) {
                if (child.name === name) result.push(child);

                if (config.recursive)
                    await find(child._children);
            }
        };

        await find(this._children);

        return result;
    }

    /**
     * @param {string} tag
     * @param {{ recursive?: boolean, limit?: number }} [config = { recursive = true }]
     * @returns {Promise<SceneObjectBaseMock[]>} 
     * @memberof SceneObjectBaseMock
     */
    async findByTag(tag, config = { recursive: true }) {
        return await this.findByAnyTags([tag], config);
    }

    /**
     * @param {string[]} tags
     * @param {{ recursive?: boolean, limit?: number }} [config = { recursive = true }]
     * @returns {Promise<SceneObjectBaseMock[]>} 
     * @memberof SceneObjectBaseMock
     */
    async findByAnyTags(tags, config = { recursive: true }) {
        /** @type {SceneObjectBaseMock[]} */
        let result = [];

        /**
         * @param {SceneObjectBaseMock[]} children
         */
        let find = async (children) => {
            for (let child of children) {
                if (child._tags.some(r => tags.includes(r))) result.push(child);

                if (config.recursive ?? true)
                    await find(child._children);
            }
        };

        await find(this._children);

        return result.slice(0, config.limit ?? result.length);
    }

    /**
     * @param {string[]} tags
     * @param {{ recursive?: boolean, limit?: number }} [config = { recursive = true }]
     * @returns {Promise<SceneObjectBaseMock[]>} 
     * @memberof SceneObjectBaseMock
     */
    async findByAllTags(tags, config = { recursive: true }) {
        /** @type {SceneObjectBaseMock[]} */
        let result = [];

        /**
         * @param {SceneObjectBaseMock[]} children
         */
        let find = async (children) => {
            for (let child of children) {
                if (tags.every(r => child._tags.includes(r))) result.push(child);

                if (config.recursive ?? true)
                    await find(child._children);
            }
        };

        await find(this._children);

        return result.slice(0, config.limit ?? result.length);
    }

    /**
     * @param {string} pathQuery
     * @param {{ limit?: number }} [config={}]
     * @memberof SceneObjectBaseMock
     */
    async findByPath(pathQuery, config = {}) {
        /** @type {SceneObjectBaseMock[]} */
        let result = [this];

        let path = pathQuery.split('/');

        /**
         * @param {SceneObjectBaseMock[]} children
         */
        let findAll = async (children) => {
            let result = [children];
            for (let child of children) {
                result.push(await findAll(child._children));
            }

            return result.flat();
        };

        for (let p of path) {
            if (p === '**')
                result = await findAll(result);
            else {
                if (p.charAt(0) === '*' && p.length > 1) p = '.' + p;

                result = result.map(object => 
                    p === '*' ? object._children : object._children.filter(c =>  p.includes('*') ? c.name.match(p) : c.name === p)
                ).flat();
            }
        }

        return result.slice(0, config.limit ?? result.length);
    }

    /**
     * @param {SceneObjectBaseMock} child 
     */
    async addChild(child) {
        let add = async () => {
            if (this._dynamic && this._parent === null) {
                console.warn("Possible Unhandled Promise Rejection: Error: Can't add children to orphaned objects.");
                return;
            }

            if (!(child instanceof SceneObjectBaseMock)) {
                console.warn("Warning: Possible Unhandled Promise Rejection: Error: Child with this identifier doesn't exist.");
                return;
            }

            if (child._parent !== null) {
                child.removeFromParent();
            }
            child._parent = this;
            if (this._children.length !== 0) {
                this._children.forEach(c => {
                    while (c._name === child._name) {
                        let lastChar = c._name.split('')[c._name.split('').length - 1];
                        if (!isNaN(parseInt(lastChar))) {
                            let newIndex = parseInt(lastChar) + 1;
                            let childNameArray = child._name.split('').fill(newIndex.toString(), -1);
                            child._name = childNameArray.join('');
                        } else {
                            child._name = child._name + (0).toString();
                        }
                    }
                });
            }

            this._children.push(child);
        };

        await add();
    }

    /**
     * @param {SceneObjectBaseMock} child 
     */
    async removeChild(child) {
        let remove = async () => { this._children = this._children.filter(c => c.name !== child.name); };
        await remove();
    }

    async getParent() {
        let get = async () => {
            if (!this._parent) return null;
            else return this._parent;
        };

        return await get();
    }

    async removeFromParent() {
        let remove = async () => { this._parent.removeChild(this); };
        await remove();
    }

    /**
     * @param {string[]} tags 
     */
    async setTags(tags) {
        let set = async () => {
            tags.forEach(tag => {
                this._tags.push(tag);
            });
        };
        await set();
    }

    /**
     * @param {string} tag 
     */
    async addTag(tag) {
        let add = async () => { this._tags.push(tag); };
        await add();
    }

    async getTags() {
        let get = async () => { return this._tags };
        return await get();
    }

    /**
     * @param {string} tag 
     */
    async removeTag(tag) {
        let remove = async () => { this._tags = this._tags.filter(t => t !== tag); };
        await remove();
    }
}

/** @type {SceneObjectBaseMock} */
let root = null;

/** @type {import("./SceneObjectBase.mock").SceneObjectBaseMockParams[]} */
let sceneStructure = [];

let possibleDynamicSceneObjects = ['Block', 'Plane', 'Canvas', 'PlanarImage', 'AmbientLightSource', 'DirectionalLightSource', 'PointLightSource', 'SpotLightSource', 'ParticleSystem', 'SceneObject'];

class SceneMock {
    static get root() {
        if (!root) {
            root = new SceneObjectBaseMock({name: 'root', children: sceneStructure});
        }
        return root;
    }

    static projectToScreen() {}
    static unprojectToFocalPlane() {}
    static unprojectWithDepth() {}

    /**
     * @param {import("./SceneObjectBase.mock").SceneObjectBaseMockParams[]} structure
     * @memberof SceneMock
     */
    static mockReset(structure = []) {
        root = null;
        sceneStructure = structure;
    }

    /**
     * @param {string} className 
     * @param {import("./SceneObjectBase.mock").SceneObjectBaseMockParams} initialState
     * @returns { Promise<SceneObjectBaseMock> }
     */
    static async create(className, initialState = {name : 'dynamic' + className}) {
        let create = async () => {
            if (possibleDynamicSceneObjects.includes(className)) {
                let resultSceneObject =  new SceneObjectBaseMock(initialState);
                resultSceneObject._type = className;
                resultSceneObject._dynamic = true;
                resultSceneObject._parent = null;
                return resultSceneObject;
            } else {
                console.warn('Possible Unhandled Promise Rejection: Error: Unexpected class name: ' + className + ' in call to Scene.create()');
                return null;
            }
        };

        return create();
    }


    /**
     * 
     * @param {SceneObjectBaseMock} object
     * @param {import("./SceneObjectBase.mock").SceneObjectBaseMockParams} initialState
     * @param {boolean} cloneChildren 
     */
    static async clone(object, cloneChildren = true, initialState = {name: 'dynamic' + object._type}) {
        let clone = async () => {
            /**@type {import("./SceneObjectBase.mock").SceneObjectBaseMockParams} */
            let objParams = {
                name: initialState.name ?? 'dynamic' + object._type,
                hidden: initialState.hidden ?? false,
                type: object._type,
                transform: Array.from(Object.keys(initialState)).includes('transform') ? {
                    x: initialState.transform.x ?? object.transform.x.value,
                    y: initialState.transform.y ?? object.transform.y.value,
                    z: initialState.transform.z ?? object.transform.z.value,
                    rotationW: initialState.transform.rotationW ?? object.transform.rotation.w.value,
                    rotationX: initialState.transform.rotationX ?? object.transform.rotation.x.value,
                    rotationY: initialState.transform.rotationY ?? object.transform.rotation.y.value,
                    rotationZ: initialState.transform.rotationZ ?? object.transform.rotation.z.value,
                    scaleX: initialState.transform.scaleX ?? object.transform.scaleX.value,
                    scaleY: initialState.transform.scaleY ?? object.transform.scaleY.value,
                    scaleZ: initialState.transform.scaleZ ?? object.transform.scaleZ.value,
                } : /**@type {import("./SceneObjectBase.mock").TransformParams}*/ {},
                tags: initialState.tags ?? object._tags,
                dynamic: true,
            };

            let returnedSceneObject = await SceneMock.create(object._type, objParams);
        
            let parent = object._parent;

            parent._children.forEach(c => {
                while (c._name === returnedSceneObject._name) {
                    let lastChar = returnedSceneObject._name.split('')[returnedSceneObject._name.split('').length - 1];
                    if(!isNaN(parseInt(lastChar))) {
                        let newIndex = parseInt(lastChar) + 1;
                        let childNameArray = returnedSceneObject._name.split('').fill(newIndex.toString(), -1);
                        returnedSceneObject._name = childNameArray.join('');
                    } else {
                        returnedSceneObject._name = returnedSceneObject._name + 0;
                    }
                }
            });

            await parent.addChild(returnedSceneObject);

            /**@type {SceneObjectBaseMock[]} */
            let childrenArray = [];
            if (cloneChildren) {
                object._children.forEach(async(child) => {
                    let newChild = new SceneObjectBaseMock({name: child.name, type: child._type});
                    childrenArray.push(newChild);
                });
            }
            
            returnedSceneObject._children = childrenArray;

            return returnedSceneObject;
        }; 
        
        return clone();
    }

    /**
     * @param {SceneObjectBaseMock} object 
     */
    static async destroy(object) {
        let destroy = async() => {if (object._parent !== null) object.removeFromParent();};
        await destroy();
    }
}

/** @type {TextureBaseMock[]} */
let TextureStructure = [];

class TexturesMock {
    /**
     * @param {string} textureName 
     */
    static async findFirst(textureName) {
        let result = TextureStructure.filter(tex => tex.name == textureName)[0];
        return result ?? null;
    }

    static async getAll() {
        return TextureStructure;
    }

    /**
     * @param {string} namePattern 
     * @param {{limit?: number}} config 
     */
    static async findUsingPattern(namePattern, config = {}) {
        if (namePattern.charAt(0) === '*') namePattern = '.' + namePattern;

        let result = TextureStructure.filter(tex => tex.name.match(namePattern));

        return result.slice(0, config.limit ?? result.length);
    }

    /**
     * @param {import("./TextureBase.mock").TextureBaseMockParams[]} structure
     * @memberof SceneMock
     */
    static mockReset(structure = []) {
        TextureStructure = structure.map(s => new TextureBaseMock(s)) ?? [];
    }
}

/**
 * @exports
 * @typedef {Object} BlockModulesConfig
 * @property {{[key: string]: any}} extras
 * @property {string} multipeerId
 * @property {StorageLocation} storage
 */

class BlocksMock {
    /**
     * @param {string} blockName 
     * @param {import("./Scene/SceneObjectBase.mock").SceneObjectBaseMockParams} initialState
     * @param {BlockModulesConfig | {}} config
     */
    static instantiate(blockName, initialState = {name: 'dynamicBlock'}, config = {}) {
        return SceneMock.create('Block', initialState)
    }
}

let cameraInfoModuleStructure = {
    'captureDevicePosition': new StringSignalMock('x: 0, y: 0, z: 0'),
    'isCapturingPhoto': new BoolSignalMock$1(false),
    'isRecordingVideo': new BoolSignalMock$1(false),
    'previewScreenScale': new ScalarSignalMock$1(0),
    'previewSize': new Vec2SignalMock$1(new mathModule.Vector2(0, 0)),
    'viewMatrix': new TransformSignalMock({
        position: new mathModule.Vector3(0, 0, 0),
        rotation: new Quaternion(0, 0, 0, 0),
        scale: new mathModule.Vector3(0, 0, 0)
    })
};

class CameraInfoModuleMock {

    static get captureDevicePosition() {
        return cameraInfoModuleStructure['captureDevicePosition']
    }

    static get isCapturingPhoto() {
        return cameraInfoModuleStructure['isCapturingPhoto']
    }

    static get isRecordingVideo() {
        return cameraInfoModuleStructure['isRecordingVideo']
    }

    static get previewScreenScale() {
        return cameraInfoModuleStructure['previewScreenScale']
    }

    static get previewSize() {
        return cameraInfoModuleStructure['previewSize']
    }

    static get viewMatrix() {
        return cameraInfoModuleStructure['viewMatrix']
    }

    /**
     * @param {{
     * captureDevicePosition: StringSignalMock | string; 
     * isCapturingPhoto: BoolSignalMock | boolean;
     * isRecordingVideo: BoolSignalMock | boolean;
     * previewScreenScale: ScalarSignalMock | number;
     * previewSize: Vec2SignalMock | Vector2;
     * viewMatrix: TransformSignalMock;
     * }} value 
     */
    static mockReset(value = {
        'captureDevicePosition': null,
        'isCapturingPhoto': null,
        'isRecordingVideo': null,
        'previewScreenScale': null,
        'previewSize': null,
        'viewMatrix': null
    }) {
        value['captureDevicePosition'] = (typeof value['captureDevicePosition'] === 'string') ? new StringSignalMock(value['captureDevicePosition']) : value['captureDevicePosition'];
        value['isCapturingPhoto'] = (typeof value['isCapturingPhoto'] === 'boolean') ? new BoolSignalMock$1(value['isCapturingPhoto']) : value['isCapturingPhoto'];
        value['isRecordingVideo'] = (typeof value['isRecordingVideo'] === 'boolean') ? new BoolSignalMock$1(value['isRecordingVideo']) : value['isRecordingVideo'];
        value['previewScreenScale'] = (typeof value['previewScreenScale'] === 'number') ? new ScalarSignalMock$1(value['previewScreenScale']) : value['previewScreenScale'];
        value['previewSize'] = (value['previewSize'] instanceof mathModule.Vector2) ? new Vec2SignalMock$1(value['previewSize']) : value['previewSize'];

        cameraInfoModuleStructure['captureDevicePosition'] = value['captureDevicePosition'] ?? new StringSignalMock('x: 0, y: 0, z: 0');
        cameraInfoModuleStructure['isCapturingPhoto'] = value['isCapturingPhoto'] ?? new BoolSignalMock$1(false);
        cameraInfoModuleStructure['isRecordingVideo'] = value['isRecordingVideo'] ?? new BoolSignalMock$1(false);
        cameraInfoModuleStructure['previewScreenScale'] = value['previewScreenScale'] ??  new ScalarSignalMock$1(0),
        cameraInfoModuleStructure['previewSize'] = value['previewSize'] ?? new Vec2SignalMock$1(new mathModule.Vector2(0, 0));
        cameraInfoModuleStructure['viewMatrix'] = value['viewMatrix'] ??  new TransformSignalMock({
            position: new mathModule.Vector3(0, 0, 0),
            rotation: new Quaternion(0, 0, 0, 0),
            scale: new mathModule.Vector3(0, 0, 0)
        });
    }
}

let print = true;

class DiagnosticsMock {
    /**
     * @static
     * @param {string} text
     * @memberof DiagnosticsMock
     */
    static error(text) { if (print) console.log(text); }

    /**
     * @static
     * @param {string} text
     * @memberof DiagnosticsMock
     */
    static log(text) { if (print) console.log(text); }

    /**
     * @static
     * @param {string} text
     * @memberof DiagnosticsMock
     */
    static warn(text) { if (print) console.log(text); }

    static watch() { }

    static mockLogDisable() {
        print = false;
    }

    static mockLogEnable() {
        print = true;
    }
}

class EchoMessageChannelMock {
    /**
     * @param {string} topic 
     */
    constructor(topic) {
        this._topic = topic;
        this._messageStream = undefined;
    }

    /**
     * @param {Object} message 
     * @param {boolean} realTimeChannel 
     */
    async sendMessage(message, realTimeChannel) {
        if (this._messageStream != undefined) {
            await this._messageStream.mockCallback(message);
        }
    }

    get onMessage() {
        if (this._messageStream == undefined) {
            this._messageStream = new EventSourceMock();
        }
        return this._messageStream;
    }
}

class MultipeerMock {
    constructor() {
        /**@type {{[key: string]: any}} */
        this._channels = {};
    }

    getMessageChannel(topic = 'GLOBAL') {
        if (this._channels[topic] == undefined) {
            this._channels[topic] = new EchoMessageChannelMock(topic);
        }
        return this._channels[topic];
    }

    /**
     * @param {string} topic 
     * @returns {string}
     */
    getBinaryMessageChannel(topic) {
        if (this._channels[topic] == undefined) {
            this._channels[topic] = new EchoMessageChannelMock(topic);
        }
        return this._channels[topic];
    }
}

class ParticipantMock {
    /**
     * 
     * @param {number} id 
     * @param {*} isActiveInCall 
     * @param {*} isActiveInSameEffect 
     */
    constructor(id, isActiveInCall, isActiveInSameEffect) {
        this._id = id;
        this._isActiveInCall = new EventSourceMock(isActiveInCall);
        this._isActiveInSameEffect = new EventSourceMock(isActiveInSameEffect);
    }

    get id() {
        return this._id;
    }

    get isActiveInCall() {
        return this._isActiveInCall;
    }

    get isActiveInSameEffect() {
        return this._isActiveInSameEffect;
    }
}

class ParticipantsMock {
    constructor() {
        this._self = new ParticipantMock('self', true, true);
        this._otherParticipants = [];
        this._onOtherParticipantAdded = new EventSourceMock();
        this._otherParticipantCount = new EventSourceMock(0);
        this._otherParticipantsInSameEffectCount = new EventSourceMock(0);
    }

    get self() {
        return this._self;
    }

    get otherParticipantCount() {
        return this._otherParticipantCount;
    }

    _getParticipantByIdSync(id) {
        if (this._self.id === id) {
            return this._self;
        }
        for (const participant of this._otherParticipants) {
            if (participant.id === id) {
                return participant;
            }
        }
        return null;
    }

    /**
     * 
     * @param {number} id 
     * @returns 
     */
    getParticipantById(id) {
        return new Promise((resolve, reject) => {
            resolve(this._getParticipantByIdSync());
        });
    }

    getAllOtherParticipants() {
        return new Promise((resolve, reject) => {
            resolve([...this._otherParticipants]);
        });
    }

    _getOtherParticipantsInSameEffectSync() {
        return this._otherParticipants.filter(participant =>
            participant.isActiveInSameEffect.pinLastValue(),
        );
    }

    getOtherParticipantsInSameEffect() {
        return new Promise((resolve, reject) => {
            resolve(this._getOtherParticipantsInSameEffectSync());
        });
    }

    onOtherParticipantAdded() {
        return this._onOtherParticipantAdded;
    }

    get otherParticipantsInSameEffectCount() {
        return this._otherParticipantsInSameEffectCount;
    }

    async mockAddParticipant(participant) {
        this._otherParticipants.push(participant);
        await this._onOtherParticipantAdded.mockCallback(participant);
        await this._otherParticipantCount.mockUpdate(this._otherParticipants.length);
        await this._otherParticipantsInSameEffectCount.mockUpdate(
            this._getOtherParticipantsInSameEffectSync().length,
        );
    }

    /**
     * @param {number} id 
     * @param {*} isActiveInCall 
     * @param {*} isActiveInSameEffect 
     */
    async mockParticipantOnlineChanged(id, isActiveInCall, isActiveInSameEffect) {
        const participant = this._getParticipantByIdSync(id);
        if (participant) {
            await participant._isActiveInCall.mockUpdate(isActiveInCall);
            await participant._isActiveInSameEffect.mockUpdate(isActiveInSameEffect);
            if (participant.isActiveInSameEffect !== isActiveInSameEffect) {
                await this._otherParticipantsInSameEffectCount.mockUpdate(
                    this._getOtherParticipantsInSameEffectSync().length,
                );
            }
        }
    }

    mockReset() {
        this._self = new ParticipantMock('self', true, true);
        this._otherParticipants = [];
        this._onOtherParticipantAdded = new EventSourceMock();
        this._otherParticipantCount = new EventSourceMock(0);
        this._otherParticipantsInSameEffectCount = new EventSourceMock(0);
    }
}

jest.mock(
	'Diagnostics',
	() => {
		const DiagnosticsMock = jest.requireActual('./Diagnostics.mock.js');
		return DiagnosticsMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'CameraInfo',
	() => {
		const CameraInfoMock = jest.requireActual('./CameraInfo.mock.js');
		return CameraInfoMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Reactive',
	() => {
		const ReactiveMock = jest.requireActual('./Reactive/Reactive.mock.js');
		return ReactiveMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Animation',
	() => {
		const AnimationMock = jest.requireActual('./Animation/Animation.mock.js');
		return AnimationMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Time',
	() => {
		const TimeMock = jest.requireActual('./Time.mock.js');
		return TimeMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Scene',
	() => {
		const SceneMock = jest.requireActual('./Scene/SceneModule.mock.js');
		return SceneMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Textures',
	() => {
		const TexturesMock = jest.requireActual('./Textures/Textures.mock.js');
		return TexturesMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Materials',
	() => {
		const MaterialsMock = jest.requireActual('./Materials/Materials.mock.js');
		return MaterialsMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Patches',
	() => {
		const PatchesMock = jest.requireActual('./Patches/Patches.mock.js');
		return PatchesMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Persistence',
	() => {
		const PersistenceMock = jest.requireActual('./Persistence/Persistence.mock.js');
		return PersistenceMock.default;
	},
	{ virtual: true },
);

jest.mock(
	'Multipeer',
	() => {
		const MultipeerMock = jest.requireActual('./Multipeer.mock.js');
		return MultipeerMock.default;
	},
	{ virtual: true },
);


jest.mock(
	'Blocks',
	() => {
		const BlocksMock = jest.requireActual('./Blocks.mock.js');
		return BlocksMock.default;
	},
	{ virtual: true },
);

exports.AnimationMock = AnimationMock;
exports.BlocksMock = BlocksMock;
exports.BoolSignalMock = BoolSignalMock;
exports.BoolSignalSourceMock = BoolSignalSourceMock;
exports.CameraInfoModuleMock = CameraInfoModuleMock;
exports.DiagnosticsMock = DiagnosticsMock;
exports.EventSourceMock = EventSourceMock;
exports.Mat4Mock = Mat4Mock;
exports.MaterialBaseMock = MaterialBaseMock;
exports.MaterialsMock = MaterialsMock;
exports.MultipeerMock = MultipeerMock;
exports.ParticipantsMock = ParticipantsMock;
exports.PatchesInputsMock = PatchesInputsMock;
exports.PatchesMock = PatchesMock;
exports.PatchesOuputsMock = PatchesOuputsMock;
exports.PersistenceMock = PersistenceMock;
exports.QuaternionSignalMock = QuaternionSignalMock;
exports.ReactiveMock = ReactiveMock;
exports.ScalarSignalMock = ScalarSignalMock;
exports.ScalarSignalSourceMock = ScalarSignalSourceMock;
exports.SceneMock = SceneMock;
exports.SceneObjectBaseMock = SceneObjectBaseMock;
exports.SignalMock = SignalMock;
exports.StorageLocationMock = StorageLocationMock;
exports.StringSignalMock = StringSignalMock;
exports.StringSignalSourceMock = StringSignalSourceMock;
exports.SubscriptionMock = SubscriptionMock;
exports.TextureBaseMock = TextureBaseMock;
exports.TexturesMock = TexturesMock;
exports.TimeDriverMock = TimeDriverMock;
exports.TimeMock = TimeMock;
exports.TransformSignalMock = TransformSignalMock;
exports.Vec2SignalMock = Vec2SignalMock;
exports.VectorSignalMock = VectorSignalMock;
