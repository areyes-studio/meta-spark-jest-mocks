export class PatchesInputsMock {
    /**
     * @param {string} name
     * @param {SignalMock | boolean | number | string} signal
     */
    static set(name: string, signal: SignalMock | boolean | number | string): Promise<void>;
    /**
     * @param {string} name
     * @param {BoolSignalMock | boolean} signal
     */
    static setBoolean(name: string, signal: BoolSignalMock | boolean): Promise<void>;
    /**
     * @param {string} name
     * @param {SignalMock} signal
     */
    static setColor(name: string, signal: SignalMock): Promise<void>;
    /**
     * @param {string} name
     * @param {ScalarSignalMock | number} signal
     */
    static setScalar(name: string, signal: ScalarSignalMock | number): Promise<void>;
    /**
     * @param {string} name
     * @param {StringSignalMock | string} signal
     */
    static setString(name: string, signal: StringSignalMock | string): Promise<void>;
    /**
     * @param {string} name
     * @param {VectorSignalMock} signal
     */
    static setPoint(name: string, signal: VectorSignalMock): Promise<void>;
    /**
     * @param {string} name
     * @param {Vec2SignalMock} signal
     */
    static setPoint2D(name: string, signal: Vec2SignalMock): Promise<void>;
    /**
     * @param {string} name
     * @param {VectorSignalMock} signal
     */
    static setVector(name: string, signal: VectorSignalMock): Promise<void>;
    /**
     * @param {string} name
     * @param {EventSourceMock} signal
     */
    static setPulse(name: string, signal: EventSourceMock): Promise<void>;
    static mockReset(): void;
    static mockGetPatchesStructureInputs(): {
        [x: string]: EventSourceMock | SignalMock;
    };
}
export default PatchesInputsMock;
import SignalMock from "../Reactive/Signal.mock";
import BoolSignalMock from "../Reactive/BoolSignal.mock";
import ScalarSignalMock from "../Reactive/ScalarSignal.mock";
import StringSignalMock from "../Reactive/StringSignal.mock";
import VectorSignalMock from "../Reactive/VectorSignal.mock";
import Vec2SignalMock from "../Reactive/Vec2Signal.mock";
import EventSourceMock from "../Reactive/EventSource.mock";
