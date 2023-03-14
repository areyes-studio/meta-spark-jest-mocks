import BoolSignalMock from "../Reactive/BoolSignal.mock";
import ScalarSignalMock from "../Reactive/ScalarSignal.mock";
import TextureBase from "../Textures/TextureBase.mock";

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

export default class MaterialBaseMock {
    /**
     * @param {MaterialBaseMockParams} params 
     * @memberof SceneObjectBaseMock 
     */
    constructor(params) {
        this._identifier = (params.type ?? 'material') + ':' + Math.round(Math.random() * 10000);
        this._name = params.name;
        this._alphaCutoff = new ScalarSignalMock(params.alphaCutoff ?? 0)
        this._alphaTestEnabled = new BoolSignalMock(params.alphaTestEnabled ?? false)
        this._depthTestEnabled = new BoolSignalMock(params.depthTestEnabled ?? false)
        this._depthWriteEnabled = new BoolSignalMock(params.depthWriteEnabled ?? false)
        this._diffuse = params.diffuse ?? null
        this._doubleSided = new BoolSignalMock(params.doubleSided ?? false)
        this._opacity = new ScalarSignalMock(params.opacity ?? 0)
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
