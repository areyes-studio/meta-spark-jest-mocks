/**
 * @exports
 * @typedef {Object} TextureBaseMockParams
 * @property {string} name
 * @property {number} [height]
 * @property {number} [width]
 * @property {any} [signal]
 * @property {string} [type]
 */
export class TextureBaseMock {
    /**
     * @param {TextureBaseMockParams} params
     * @memberof SceneObjectBaseMock
     */
    constructor(params: TextureBaseMockParams);
    _identifier: string;
    _name: string;
    _signal: any;
    _height: ScalarSignalMock;
    _width: ScalarSignalMock;
    get identifier(): string;
    get name(): string;
    get signal(): any;
    get height(): ScalarSignalMock;
    get width(): ScalarSignalMock;
}
export default TextureBaseMock;
export type TextureBaseMockParams = {
    name: string;
    height?: number;
    width?: number;
    signal?: any;
    type?: string;
};
import ScalarSignalMock from "../Reactive/ScalarSignal.mock";
