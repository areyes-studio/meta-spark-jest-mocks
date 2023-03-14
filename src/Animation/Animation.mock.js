import ScalarSignalMock from "../Reactive/ScalarSignal.mock";
import TimeDriver from "./TimeDriver.mock";
import { AMath } from '@areyes-studio/math-module';

export class AnimationMock {
    /**
     * @static
     * @param {{durationMilliseconds?: number, loopCount?: number, mirror?: false | true}} params
     * @memberof AnimationMock
     */
    static timeDriver(params) {
        let durationMilliseconds = params.durationMilliseconds ? params.durationMilliseconds : 0;
        let loopCount = params.loopCount ? params.loopCount : 0;
        let mirror = params.mirror ? params.mirror : false;

        return new TimeDriver(durationMilliseconds, loopCount, mirror);
    }

    /**
     * @static
     * @param {TimeDriver} driver
     * @param {ScalarSampler} sampler
     * @memberof AnimationMock
     */
    static animate(driver, sampler) {
        let scalar = new ScalarSignalMock(0);

        driver.progress.monitor({ fireOnInitialValue: true }).subscribe(async () => {
            await scalar.mockUpdate(sampler.curve(driver.progress.value))
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
        this.curve = curve
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
            return new ScalarSampler((/** @type {number} */ t) => AMath.lerp(from, to, t))
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
            let startFrameValue = startFrame ?? 0
            return new ScalarSampler((/** @type {number} */ t) => Math.round(AMath.lerp(0, numberOfFrames, t) + startFrameValue))
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                let t = 1 - Math.pow(1 - x, 3)
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                let t = x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4)
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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

                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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
                return AMath.lerp(from, to, t)
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

                return AMath.lerp(from, to, t)
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

                return AMath.lerp(from, to, t)
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

                return AMath.lerp(from, to, t)
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

                return AMath.lerp(from, to, t)
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

                return AMath.lerp(from, to, t)
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

                return AMath.lerp(from, to, t)
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
                            : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5))

                return AMath.lerp(from, to, t)
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

                return AMath.lerp(from, to, t)
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

                return AMath.lerp(from, to, t)
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

                return AMath.lerp(from, to, t)
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
                return p0.map((e, index) => this.bezier(e, p1[index], p2[index, p3[index]]))
        }

    }
}

export default AnimationMock;