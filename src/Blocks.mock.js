import Scene from './Scene/SceneModule.mock';
import StorageLocation from "./Persistence/StorageLocation.mock";

/**
 * @exports
 * @typedef {Object} BlockModulesConfig
 * @property {{[key: string]: any}} extras
 * @property {string} multipeerId
 * @property {StorageLocation} storage
 */

export default class BlocksMock {
    /**
     * @param {string} blockName 
     * @param {import("./Scene/SceneObjectBase.mock").SceneObjectBaseMockParams} initialState
     * @param {BlockModulesConfig | {}} config
     */
    static instantiate(blockName, initialState = {name: 'dynamicBlock'}, config = {}) {
        return Scene.create('Block', initialState)
    }
}