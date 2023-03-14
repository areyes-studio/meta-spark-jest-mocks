import ScalarSignalMock from "../Reactive/ScalarSignal.mock";

/**
 * @exports
 * @typedef {Object} TextureBaseMockParams
 * @property {string} name
 * @property {number} [height]
 * @property {number} [width]
 * @property {any} [signal]
 * @property {string} [type]
 */

export default class TextureBaseMock {
    /**
     * @param {TextureBaseMockParams} params 
     * @memberof SceneObjectBaseMock 
     */
    constructor(params) {
        this._identifier = (params.type ?? 'texture') + ':' + Math.round(Math.random() * 10000);
        this._name = params.name;
        this._signal = params.signal ?? null
        this._height = new ScalarSignalMock(params.height ?? 0)  
        this._width = new ScalarSignalMock(params.width ?? 0)  
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