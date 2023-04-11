/**
 * @exports
 * @typedef {Object} SceneObjectBaseMockParams
 * @property {string} type
 * @property {string} name
 * @property {boolean} [hidden = false]
 * @property {string} [type = "object"]
 * @property {TransformParams} [transform = {}]
 * @property {SceneObjectBaseMockParams[]} [children = []]
 * @property {string[]} [tags = []]
 * @property {boolean} [dynamic = false]
 */
/**
 * @exports
 * @typedef {Object} TransformParams
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [rotationW=1]
 * @property {number} [rotationX=0]
 * @property {number} [rotationY=0]
 * @property {number} [rotationZ=0]
 * @property {number} [scaleX=1]
 * @property {number} [scaleY=1]
 * @property {number} [scaleZ=1]
 */
export class SceneObjectBaseMock {
    /**
     * @param {SceneObjectBaseMockParams} params
     * @param {SceneObjectBaseMock} parent
     * @memberof SceneObjectBaseMock
     */
    constructor(params: SceneObjectBaseMockParams, parent?: SceneObjectBaseMock);
    _type: string;
    _name: string;
    _tags: string[];
    _hidden: BoolSignalMock;
    _identifier: string;
    _transform: TransformSignalMock;
    _parent: SceneObjectBaseMock;
    _dynamic: boolean;
    _children: SceneObjectBaseMock[];
    set hidden(arg: BoolSignalMock);
    /**
     * @returns {BoolSignalMock}
     * @memberof SceneObjectBaseMock
     */
    get hidden(): BoolSignalMock;
    get identifier(): string;
    get name(): string;
    get parentWorldTransform(): void;
    set transform(arg: TransformSignalMock);
    get transform(): TransformSignalMock;
    set worldTransform(arg: void);
    get worldTransform(): void;
    /**
     * @param {string} name
     * @returns {Promise<SceneObjectBaseMock | null>}
     * @memberof SceneObjectBaseMock
     */
    findFirst(name: string): Promise<SceneObjectBaseMock | null>;
    /**
     * @param {string} name
     * @param {{ recursive: boolean }} [config = { recursive = true }]
     * @returns {Promise<SceneObjectBaseMock[]>}
     * @memberof SceneObjectBaseMock
    */
    findAll(name: string, config?: {
        recursive: boolean;
    }): Promise<SceneObjectBaseMock[]>;
    /**
     * @param {string} tag
     * @param {{ recursive?: boolean, limit?: number }} [config = { recursive = true }]
     * @returns {Promise<SceneObjectBaseMock[]>}
     * @memberof SceneObjectBaseMock
     */
    findByTag(tag: string, config?: {
        recursive?: boolean;
        limit?: number;
    }): Promise<SceneObjectBaseMock[]>;
    /**
     * @param {string[]} tags
     * @param {{ recursive?: boolean, limit?: number }} [config = { recursive = true }]
     * @returns {Promise<SceneObjectBaseMock[]>}
     * @memberof SceneObjectBaseMock
     */
    findByAnyTags(tags: string[], config?: {
        recursive?: boolean;
        limit?: number;
    }): Promise<SceneObjectBaseMock[]>;
    /**
     * @param {string[]} tags
     * @param {{ recursive?: boolean, limit?: number }} [config = { recursive = true }]
     * @returns {Promise<SceneObjectBaseMock[]>}
     * @memberof SceneObjectBaseMock
     */
    findByAllTags(tags: string[], config?: {
        recursive?: boolean;
        limit?: number;
    }): Promise<SceneObjectBaseMock[]>;
    /**
     * @param {string} pathQuery
     * @param {{ limit?: number }} [config={}]
     * @memberof SceneObjectBaseMock
     */
    findByPath(pathQuery: string, config?: {
        limit?: number;
    }): Promise<SceneObjectBaseMock[]>;
    /**
     * @param {SceneObjectBaseMock} child
     */
    addChild(child: SceneObjectBaseMock): Promise<void>;
    /**
     * @param {SceneObjectBaseMock} child
     */
    removeChild(child: SceneObjectBaseMock): Promise<void>;
    getParent(): Promise<SceneObjectBaseMock>;
    removeFromParent(): Promise<void>;
    /**
     * @param {string[]} tags
     */
    setTags(tags: string[]): Promise<void>;
    /**
     * @param {string} tag
     */
    addTag(tag: string): Promise<void>;
    getTags(): Promise<string[]>;
    /**
     * @param {string} tag
     */
    removeTag(tag: string): Promise<void>;
}
export default SceneObjectBaseMock;
export type SceneObjectBaseMockParams = {
    type?: string;
    name: string;
    hidden?: boolean;
    transform?: TransformParams;
    children?: SceneObjectBaseMockParams[];
    tags?: string[];
    dynamic?: boolean;
};
export type TransformParams = {
    x?: number;
    y?: number;
    z?: number;
    rotationW?: number;
    rotationX?: number;
    rotationY?: number;
    rotationZ?: number;
    scaleX?: number;
    scaleY?: number;
    scaleZ?: number;
};
import BoolSignalMock from "../Reactive/BoolSignal.mock";
import TransformSignalMock from "../Reactive/TransformSignal.mock";
