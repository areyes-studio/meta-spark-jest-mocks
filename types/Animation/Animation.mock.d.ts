export class AnimationMock {
    /**
     * @static
     * @param {{durationMilliseconds?: number, loopCount?: number, mirror?: false | true}} params
     * @memberof AnimationMock
     */
    static timeDriver(params: {
        durationMilliseconds?: number;
        loopCount?: number;
        mirror?: false | true;
    }): TimeDriver;
    /**
     * @static
     * @param {TimeDriver} driver
     * @param {ScalarSampler} sampler
     * @memberof AnimationMock
     */
    static animate(driver: TimeDriver, sampler: ScalarSampler): ScalarSignalMock;
    static get samplers(): typeof SamplerFactory;
}
export default AnimationMock;
import TimeDriver from "./TimeDriver.mock";
declare class ScalarSampler {
    /**
     * @param {Function} curve
     * @memberof ScalarSampler
     */
    constructor(curve: Function);
    curve: Function;
}
import ScalarSignalMock from "../Reactive/ScalarSignal.mock";
declare class SamplerFactory {
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static linear(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} numberOfFrames
    * @param {number | number[]} [startFrame = null]
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static frame(numberOfFrames: number | number[], startFrame?: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInSine(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutSine(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutSine(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInQuad(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutQuad(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutQuad(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInCubic(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutCubic(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutCubic(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInQuart(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutQuart(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutQuart(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInQuint(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutQuint(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutQuint(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInExpo(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutExpo(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutExpo(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInCirc(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutCirc(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutCirc(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInBack(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutBack(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutBack(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInElastic(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutElastic(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutElastic(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInBounce(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeOutBounce(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
    * @static
    * @param {number | number[]} from
    * @param {number | number[]} to
    * @returns {ScalarSampler | ScalarSampler[]}
    * @memberof SamplerFactory
    */
    static easeInOutBounce(from: number | number[], to: number | number[]): ScalarSampler | ScalarSampler[];
    /**
     * @static
     * @param {number | number[]} value
     * @memberof SamplerFactory
     * @returns {ScalarSampler | ScalarSampler[]}
     */
    static constant(value: number | number[]): ScalarSampler | ScalarSampler[];
    /**
     * @static
     * @param {number | number[]} p0
     * @param {number | number[]} p1
     * @param {number | number[]} p2
     * @param {number | number[]} p3
     * @returns {ScalarSampler | ScalarSampler[]}
     * @memberof SamplerFactory
     */
    static bezier(p0: number | number[], p1: number | number[], p2: number | number[], p3: number | number[]): ScalarSampler | ScalarSampler[];
}
