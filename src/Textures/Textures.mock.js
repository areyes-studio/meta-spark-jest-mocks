import TextureBaseMock from "./TextureBase.mock";

/** @type {TextureBaseMock[]} */
let TextureStructure = [];

export class TexturesMock {
    /**
     * @param {string} textureName 
     */
    static async findFirst(textureName) {
        let result = TextureStructure.filter(tex => tex.name == textureName)[0]
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

export default TexturesMock 