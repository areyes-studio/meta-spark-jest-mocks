import Quaternion from "quaternion";
import BoolSignalMock from "../Reactive/BoolSignal.mock";
import TransformSignalMock from "../Reactive/TransformSignal.mock";

import { Vector3 } from '@areyes-studio/math-module';

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

export default class SceneObjectBaseMock {
    /**
     * @param {SceneObjectBaseMockParams} params
     * @param {SceneObjectBaseMock} parent
     * @memberof SceneObjectBaseMock
     */
    constructor(params, parent = null) {
        this._type = params.type;
        this._name = params.name;
        this._tags = params.tags ?? [];

        this._hidden = new BoolSignalMock(params.hidden ?? false);
        this._identifier = (params.type ?? 'object') + ':' + Math.round(Math.random() * 10000);

        params.transform = params.transform ?? {};

        this._transform = new TransformSignalMock({
            position: new Vector3(params.transform.x ?? 0, params.transform.y ?? 0, params.transform.z ?? 0),
            rotation: new Quaternion(params.transform.rotationW ?? 1, params.transform.rotationX ?? 0, params.transform.rotationY ?? 0, params.transform.rotationZ ?? 0),
            scale: new Vector3(params.transform.scaleX ?? 1, params.transform.scaleY ?? 1, params.transform.scaleZ ?? 1),
        });

        params.children = params.children ?? [];

        this._parent = parent;
        this._dynamic = params.dynamic ?? false;

        this._children = params.children.map(child => new SceneObjectBaseMock(child, this));
    }

    /**
     * @returns {BoolSignalMock}
     * @memberof SceneObjectBaseMock
     */
    get hidden() {
        return this._hidden;
    }

    set hidden(/** @type {BoolSignalMock | boolean}  */ bool) {
        this._hidden.mockUpdate(bool);
    }

    get identifier() {
        return this._identifier;
    }

    get name() {
        return this._name;
    }

    get parentWorldTransform() {
        return;
    }

    get transform() {
        return this._transform;
    }

    set transform(value) {
        this._transform.mockUpdate(value);
    }

    get worldTransform() { return }

    set worldTransform(value) { }

    /**
     * @param {string} name
     * @returns {Promise<SceneObjectBaseMock | null>} 
     * @memberof SceneObjectBaseMock
     */
    async findFirst(name) {
        /**
         * @param {SceneObjectBaseMock[]} children
         * @returns {Promise<SceneObjectBaseMock | null>} 
         */
        let find = async (children) => {
            for (let child of children) {
                if (child.name === name) return child;

                let result = await find(child._children);

                if (result) return result;
            }

            return null;
        };

        return await find(this._children);
    }

    /**
     * @param {string} name
     * @param {{ recursive: boolean }} [config = { recursive = true }]
     * @returns {Promise<SceneObjectBaseMock[]>} 
     * @memberof SceneObjectBaseMock
    */
    async findAll(name, config = { recursive: true }) {
        /** @type {SceneObjectBaseMock[]} */
        let result = [];

        /**
         * @param {SceneObjectBaseMock[]} children
         */
        let find = async (children) => {
            for (let child of children) {
                if (child.name === name) result.push(child)

                if (config.recursive)
                    await find(child._children);
            }
        };

        await find(this._children);

        return result;
    }

    /**
     * @param {string} tag
     * @param {{ recursive?: boolean, limit?: number }} [config = { recursive = true }]
     * @returns {Promise<SceneObjectBaseMock[]>} 
     * @memberof SceneObjectBaseMock
     */
    async findByTag(tag, config = { recursive: true }) {
        return await this.findByAnyTags([tag], config);
    }

    /**
     * @param {string[]} tags
     * @param {{ recursive?: boolean, limit?: number }} [config = { recursive = true }]
     * @returns {Promise<SceneObjectBaseMock[]>} 
     * @memberof SceneObjectBaseMock
     */
    async findByAnyTags(tags, config = { recursive: true }) {
        /** @type {SceneObjectBaseMock[]} */
        let result = [];

        /**
         * @param {SceneObjectBaseMock[]} children
         */
        let find = async (children) => {
            for (let child of children) {
                if (child._tags.some(r => tags.includes(r))) result.push(child);

                if (config.recursive ?? true)
                    await find(child._children);
            }
        };

        await find(this._children);

        return result.slice(0, config.limit ?? result.length);
    }

    /**
     * @param {string[]} tags
     * @param {{ recursive?: boolean, limit?: number }} [config = { recursive = true }]
     * @returns {Promise<SceneObjectBaseMock[]>} 
     * @memberof SceneObjectBaseMock
     */
    async findByAllTags(tags, config = { recursive: true }) {
        /** @type {SceneObjectBaseMock[]} */
        let result = [];

        /**
         * @param {SceneObjectBaseMock[]} children
         */
        let find = async (children) => {
            for (let child of children) {
                if (tags.every(r => child._tags.includes(r))) result.push(child);

                if (config.recursive ?? true)
                    await find(child._children);
            }
        };

        await find(this._children);

        return result.slice(0, config.limit ?? result.length);
    }

    /**
     * @param {string} pathQuery
     * @param {{ limit?: number }} [config={}]
     * @memberof SceneObjectBaseMock
     */
    async findByPath(pathQuery, config = {}) {
        /** @type {SceneObjectBaseMock[]} */
        let result = [this];

        let path = pathQuery.split('/');

        /**
         * @param {SceneObjectBaseMock[]} children
         */
        let findAll = async (children) => {
            let result = [children]
            for (let child of children) {
                result.push(await findAll(child._children))
            }

            return result.flat();
        };

        for (let p of path) {
            if (p === '**')
                result = await findAll(result);
            else {
                if (p.charAt(0) === '*' && p.length > 1) p = '.' + p;

                result = result.map(object => 
                    p === '*' ? object._children : object._children.filter(c =>  p.includes('*') ? c.name.match(p) : c.name === p)
                ).flat();
            }
        }

        return result.slice(0, config.limit ?? result.length);
    }

    /**
     * @param {SceneObjectBaseMock} child 
     */
    async addChild(child) {
        let add = async () => {
            if (this._dynamic && this._parent === null) {
                console.warn("Possible Unhandled Promise Rejection: Error: Can't add children to orphaned objects.");
                return;
            }

            if (!(child instanceof SceneObjectBaseMock)) {
                console.warn("Warning: Possible Unhandled Promise Rejection: Error: Child with this identifier doesn't exist.");
                return;
            }

            if (child._parent !== null) {
                child.removeFromParent();
            }
            child._parent = this;
            if (this._children.length !== 0) {
                this._children.forEach(c => {
                    while (c._name === child._name) {
                        let lastChar = c._name.split('')[c._name.split('').length - 1];
                        if (!isNaN(parseInt(lastChar))) {
                            let newIndex = parseInt(lastChar) + 1;
                            let childNameArray = child._name.split('').fill(newIndex.toString(), -1);
                            child._name = childNameArray.join('');
                        } else {
                            child._name = child._name + (0).toString();
                        }
                    }
                })
            }

            this._children.push(child);
        }

        await add();
    }

    /**
     * @param {SceneObjectBaseMock} child 
     */
    async removeChild(child) {
        let remove = async () => { this._children = this._children.filter(c => c.name !== child.name) };
        await remove();
    }

    async getParent() {
        let get = async () => {
            if (!this._parent) return null;
            else return this._parent;
        }

        return await get();
    }

    async removeFromParent() {
        let remove = async () => { this._parent.removeChild(this) };
        await remove();
    }

    /**
     * @param {string[]} tags 
     */
    async setTags(tags) {
        let set = async () => {
            tags.forEach(tag => {
                this._tags.push(tag);
            })
        }
        await set();
    }

    /**
     * @param {string} tag 
     */
    async addTag(tag) {
        let add = async () => { this._tags.push(tag) };
        await add();
    }

    async getTags() {
        let get = async () => { return this._tags };
        return await get();
    }

    /**
     * @param {string} tag 
     */
    async removeTag(tag) {
        let remove = async () => { this._tags = this._tags.filter(t => t !== tag) };
        await remove();
    }
}
