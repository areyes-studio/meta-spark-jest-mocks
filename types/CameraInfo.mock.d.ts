export class CameraInfoModuleMock {
    static get captureDevicePosition(): StringSignalMock;
    static get isCapturingPhoto(): BoolSignalMock;
    static get isRecordingVideo(): BoolSignalMock;
    static get previewScreenScale(): ScalarSignalMock;
    static get previewSize(): Vec2SignalMock;
    static get viewMatrix(): TransformSignalMock;
    /**
     * @param {{
     * captureDevicePosition: StringSignalMock | string;
     * isCapturingPhoto: BoolSignalMock | boolean;
     * isRecordingVideo: BoolSignalMock | boolean;
     * previewScreenScale: ScalarSignalMock | number;
     * previewSize: Vec2SignalMock | Vector2;
     * viewMatrix: TransformSignalMock;
     * }} value
     */
    static mockReset(value?: {
        captureDevicePosition: StringSignalMock | string;
        isCapturingPhoto: BoolSignalMock | boolean;
        isRecordingVideo: BoolSignalMock | boolean;
        previewScreenScale: ScalarSignalMock | number;
        previewSize: Vec2SignalMock | Vector2;
        viewMatrix: TransformSignalMock;
    }): void;
}
export default CameraInfoModuleMock;
import StringSignalMock from "./Reactive/StringSignal.mock";
import BoolSignalMock from "./Reactive/BoolSignal.mock";
import ScalarSignalMock from "./Reactive/ScalarSignal.mock";
import Vec2SignalMock from "./Reactive/Vec2Signal.mock";
import TransformSignalMock from "./Reactive/TransformSignal.mock";
import { Vector2 } from "@areyes-studio/math-module";
