export class TexturesMock {
    /**
     * @param {string} textureName
     */
    static findFirst(textureName: string): Promise<TextureBaseMock>;
    static getAll(): Promise<TextureBaseMock[]>;
    /**
     * @param {string} namePattern
     * @param {{limit?: number}} config
     */
    static findUsingPattern(namePattern: string, config?: {
        limit?: number;
    }): Promise<TextureBaseMock[]>;
    /**
     * @param {import("./TextureBase.mock").TextureBaseMockParams[]} structure
     * @memberof SceneMock
     */
    static mockReset(structure?: import("./TextureBase.mock").TextureBaseMockParams[]): void;
}
export default TexturesMock;
import TextureBaseMock from "./TextureBase.mock";
