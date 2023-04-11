export class StorageLocationMock {
    /**
     * @param {Object<string,Object>} storageLocationData
     */
    constructor(storageLocationData?: {
        [x: string]: Object;
    });
    /**@type {Object<string,Object>} */
    _storageLocationData: {
        [x: string]: Object;
    };
    /**
     * @param {string} key
     * @returns {Promise<Object | null>}
     */
    get(key: string): Promise<Object | null>;
    /**
     * @param {string} key
     */
    remove(key: string): Promise<void>;
    /**
     *
     * @param {string} key
     * @param {Object} value
     */
    set(key: string, value: Object): Promise<void>;
}
export default StorageLocationMock;
