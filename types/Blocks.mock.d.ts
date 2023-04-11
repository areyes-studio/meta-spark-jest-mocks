/**
 * @exports
 * @typedef {Object} BlockModulesConfig
 * @property {{[key: string]: any}} extras
 * @property {string} multipeerId
 * @property {StorageLocation} storage
 */
export class BlocksMock {
    /**
     * @param {string} blockName
     * @param {import("./Scene/SceneObjectBase.mock").SceneObjectBaseMockParams} initialState
     * @param {BlockModulesConfig | {}} config
     */
    static instantiate(blockName: string, initialState?: import("./Scene/SceneObjectBase.mock").SceneObjectBaseMockParams, config?: BlockModulesConfig | {}): Promise<import("./Scene/SceneObjectBase.mock").SceneObjectBaseMock>;
}
export default BlocksMock;
export type BlockModulesConfig = {
    extras: {
        [key: string]: any;
    };
    multipeerId: string;
    storage: StorageLocation;
};
import StorageLocation from "./Persistence/StorageLocation.mock";
