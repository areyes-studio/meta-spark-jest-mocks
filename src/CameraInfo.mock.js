import StringSignalMock from "./Reactive/StringSignalMock"
import BoolSignalMock from "./Reactive/BoolSignal.mock"
import ScalarSignalMock from "./Reactive/ScalarSignal.mock"
import Vec2SignalMock from "./Reactive/Vec2Signal.mock"
import TransformSignalMock from "./Reactive/TransformSignal.mock"
import Quaternion from "quaternion"

import { Vector3, Vector2 } from '@areyes-studio/math-module';

let cameraInfoModuleStructure = {
    'captureDevicePosition': new StringSignalMock('x: 0, y: 0, z: 0'),
    'isCapturingPhoto': new BoolSignalMock(false),
    'isRecordingVideo': new BoolSignalMock(false),
    'previewScreenScale': new ScalarSignalMock(0),
    'previewSize': new Vec2SignalMock(new Vector2(0, 0)),
    'viewMatrix': new TransformSignalMock({
        position: new Vector3(0, 0, 0),
        rotation: new Quaternion(0, 0, 0, 0),
        scale: new Vector3(0, 0, 0)
    })
}

export default class CameraInfoModuleMock {

    static get captureDevicePosition() {
        return cameraInfoModuleStructure['captureDevicePosition']
    }

    static get isCapturingPhoto() {
        return cameraInfoModuleStructure['isCapturingPhoto']
    }

    static get isRecordingVideo() {
        return cameraInfoModuleStructure['isRecordingVideo']
    }

    static get previewScreenScale() {
        return cameraInfoModuleStructure['previewScreenScale']
    }

    static get previewSize() {
        return cameraInfoModuleStructure['previewSize']
    }

    static get viewMatrix() {
        return cameraInfoModuleStructure['viewMatrix']
    }

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
    static mockReset(value = {
        'captureDevicePosition': null,
        'isCapturingPhoto': null,
        'isRecordingVideo': null,
        'previewScreenScale': null,
        'previewSize': null,
        'viewMatrix': null
    }) {
        value['captureDevicePosition'] = (typeof value['captureDevicePosition'] === 'string') ? new StringSignalMock(value['captureDevicePosition']) : value['captureDevicePosition']
        value['isCapturingPhoto'] = (typeof value['isCapturingPhoto'] === 'boolean') ? new BoolSignalMock(value['isCapturingPhoto']) : value['isCapturingPhoto']
        value['isRecordingVideo'] = (typeof value['isRecordingVideo'] === 'boolean') ? new BoolSignalMock(value['isRecordingVideo']) : value['isRecordingVideo']
        value['previewScreenScale'] = (typeof value['previewScreenScale'] === 'number') ? new ScalarSignalMock(value['previewScreenScale']) : value['previewScreenScale']
        value['previewSize'] = (value['previewSize'] instanceof Vector2) ? new Vec2SignalMock(value['previewSize']) : value['previewSize']

        cameraInfoModuleStructure['captureDevicePosition'] = value['captureDevicePosition'] ?? new StringSignalMock('x: 0, y: 0, z: 0')
        cameraInfoModuleStructure['isCapturingPhoto'] = value['isCapturingPhoto'] ?? new BoolSignalMock(false)
        cameraInfoModuleStructure['isRecordingVideo'] = value['isRecordingVideo'] ?? new BoolSignalMock(false)
        cameraInfoModuleStructure['previewScreenScale'] = value['previewScreenScale'] ??  new ScalarSignalMock(0),
        cameraInfoModuleStructure['previewSize'] = value['previewSize'] ?? new Vec2SignalMock(new Vector2(0, 0))
        cameraInfoModuleStructure['viewMatrix'] = value['viewMatrix'] ??  new TransformSignalMock({
            position: new Vector3(0, 0, 0),
            rotation: new Quaternion(0, 0, 0, 0),
            scale: new Vector3(0, 0, 0)
        })
    }
}