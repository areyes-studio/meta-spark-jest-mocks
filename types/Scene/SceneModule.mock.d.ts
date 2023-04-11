export class SceneMock {
    static get root(): SceneObjectBaseMock;
    static projectToScreen(): void;
    static unprojectToFocalPlane(): void;
    static unprojectWithDepth(): void;
    /**
     * @param {import("./SceneObjectBase.mock").SceneObjectBaseMockParams[]} structure
     * @memberof SceneMock
     */
    static mockReset(structure?: import("./SceneObjectBase.mock").SceneObjectBaseMockParams[]): void;
    /**
     * @param {string} className
     * @param {import("./SceneObjectBase.mock").SceneObjectBaseMockParams} initialState
     * @returns { Promise<SceneObjectBaseMock> }
     */
    static create(className: string, initialState?: import("./SceneObjectBase.mock").SceneObjectBaseMockParams): Promise<SceneObjectBaseMock>;
    /**
     *
     * @param {SceneObjectBaseMock} object
     * @param {import("./SceneObjectBase.mock").SceneObjectBaseMockParams} initialState
     * @param {boolean} cloneChildren
     */
    static clone(object: SceneObjectBaseMock, cloneChildren?: boolean, initialState?: import("./SceneObjectBase.mock").SceneObjectBaseMockParams): Promise<SceneObjectBaseMock>;
    /**
     * @param {SceneObjectBaseMock} object
     */
    static destroy(object: SceneObjectBaseMock): Promise<void>;
}
export default SceneMock;
import SceneObjectBaseMock from "./SceneObjectBase.mock";
