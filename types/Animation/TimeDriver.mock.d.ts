export class TimeDriverMock {
    /**
     * @param {number} durationMilliseconds
     * @param {number} loopCount
     * @param {boolean} mirror
     * @memberof TimeDriverMock
     */
    constructor(durationMilliseconds: number, loopCount: number, mirror: boolean);
    durationMilliseconds: number;
    loopCount: number;
    mirror: boolean;
    _isRunning: BoolSignalMock;
    progress: ScalarSignalMock;
    _reverse: boolean;
    _loop: number;
    _updateSubscription: import("..").Subscription;
    _onCompleted: EventSourceMock;
    _onAfterIteration: EventSourceMock;
    start(): void;
    stop(): void;
    reset(): void;
    reverse(): void;
    isRunning(): BoolSignalMock;
    onCompleted(): EventSourceMock;
    onAfterIteration(): EventSourceMock;
    /**
     * @param {number} deltatime
     * @memberof TimeDriverMock
     */
    _update(deltatime: number): Promise<void>;
}
export default TimeDriverMock;
import BoolSignalMock from "../Reactive/BoolSignal.mock";
import ScalarSignalMock from "../Reactive/ScalarSignal.mock";
import EventSourceMock from "../Reactive/EventSource.mock";
