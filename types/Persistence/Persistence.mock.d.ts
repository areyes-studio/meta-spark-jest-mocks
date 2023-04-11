export class PersistenceMock {
    static get block(): StorageLocationMock;
    static get local(): StorageLocationMock;
    /**
     *
     * @param {*} blockParam
     * @param {*} localParam
     */
    static mockReset(blockParam?: any, localParam?: any): void;
}
export default PersistenceMock;
import StorageLocationMock from "./StorageLocation.mock";
