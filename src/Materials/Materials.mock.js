import MaterialBaseMock from "./MaterialBase.mock";

/** @type {MaterialBaseMock[]} */
let MaterialStructure = [];

export default class MaterialMock {
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
        MaterialStructure = structure.map(s => new MaterialBaseMock(s)) ?? []
    }

}