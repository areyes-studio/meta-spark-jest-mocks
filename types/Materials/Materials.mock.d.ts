export class MaterialsMock {
    /**
     * @param {string} materialName
     */
    static findFirst(materialName: string): Promise<MaterialBaseMock>;
    static getAll(): Promise<MaterialBaseMock[]>;
    /**
     * @param {string} namePattern
     * @param {{limit?: number}} config
     */
    static findUsingPattern(namePattern: string, config?: {
        limit?: number;
    }): Promise<MaterialBaseMock[]>;
    /**
     * @param {import("./MaterialBase.mock").MaterialBaseMockParams[]} structure
     * @memberof SceneMock
     */
    static mockReset(structure?: import("./MaterialBase.mock").MaterialBaseMockParams[]): void;
}
export default MaterialsMock;
import MaterialBaseMock from "./MaterialBase.mock";
