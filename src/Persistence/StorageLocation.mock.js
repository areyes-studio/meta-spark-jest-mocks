export class StorageLocationMock {
    
    /**
     * @param {Object<string,Object>} storageLocationData 
     */
    constructor(storageLocationData = {}) {
        /**@type {Object<string,Object>} */
        this._storageLocationData = storageLocationData
    }

    /**
     * @param {string} key 
     * @returns {Promise<Object | null>}
     */
    async get(key) {
        return this._storageLocationData[key] ?? null
    }

    /**
     * @param {string} key 
     */
    async remove(key) {
        this._storageLocationData[key] = undefined
    }

    /**
     * 
     * @param {string} key 
     * @param {Object} value 
     */
    async set(key, value) {
        this._storageLocationData[key] = value
    }
}

export default StorageLocationMock