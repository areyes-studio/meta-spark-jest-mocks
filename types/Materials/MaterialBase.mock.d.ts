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
export class MaterialBaseMock {
    /**
     * @param {MaterialBaseMockParams} params
     * @memberof SceneObjectBaseMock
     */
    constructor(params: MaterialBaseMockParams);
    _identifier: string;
    _name: string;
    _alphaCutoff: ScalarSignalMock;
    _alphaTestEnabled: BoolSignalMock;
    _depthTestEnabled: BoolSignalMock;
    _depthWriteEnabled: BoolSignalMock;
    _diffuse: TextureBase;
    _doubleSided: BoolSignalMock;
    _opacity: ScalarSignalMock;
    get identifier(): string;
    get name(): string;
    set alphaCutoff(arg: ScalarSignalMock);
    get alphaCutoff(): ScalarSignalMock;
    set alphaTestEnabled(arg: BoolSignalMock);
    get alphaTestEnabled(): BoolSignalMock;
    set depthTestEnabled(arg: BoolSignalMock);
    get depthTestEnabled(): BoolSignalMock;
    set depthWriteEnabled(arg: BoolSignalMock);
    get depthWriteEnabled(): BoolSignalMock;
    get diffuse(): TextureBase;
    set doubleSided(arg: BoolSignalMock);
    get doubleSided(): BoolSignalMock;
    set opacity(arg: ScalarSignalMock);
    get opacity(): ScalarSignalMock;
    getDiffuse(): Promise<TextureBase>;
}
export default MaterialBaseMock;
export type MaterialBaseMockParams = {
    name: string;
    alphaCutoff?: number;
    alphaTestEnabled?: boolean;
    depthTestEnabled?: boolean;
    depthWriteEnabled?: boolean;
    diffuse?: TextureBase;
    doubleSided?: boolean;
    opacity?: number;
    type?: string;
};
import ScalarSignalMock from "../Reactive/ScalarSignal.mock";
import BoolSignalMock from "../Reactive/BoolSignal.mock";
import TextureBase from "../Textures/TextureBase.mock";
