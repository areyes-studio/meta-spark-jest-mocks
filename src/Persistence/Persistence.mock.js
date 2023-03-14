import StorageLocationMock from "./StorageLocation.mock"

let block = new StorageLocationMock()
let local = new StorageLocationMock()

export class PersistenceMock {
    
    static get block() {
        return block
    }

    static get local() {
        return local
    }

    /**
     * 
     * @param {*} blockParam 
     * @param {*} localParam 
     */
    static mockReset(blockParam = {}, localParam = {}) {
        block = new StorageLocationMock(blockParam)
        local = new StorageLocationMock(localParam)
    }
}

export default PersistenceMock