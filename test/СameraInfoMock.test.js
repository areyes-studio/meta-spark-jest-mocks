import CameraInfo from "../src/CameraInfo.mock";
import TransformSignalMock from "../src/Reactive/TransformSignal.mock"
import Quaternion from "quaternion"

import { Vector3, Vector2 } from '@areyes-studio/math-module';

test('check properties of CameraInfoModuleMock', () => {
    CameraInfo.mockReset()

    expect(CameraInfo.captureDevicePosition.pinLastValue()).toBe('x: 0, y: 0, z: 0')
    expect(CameraInfo.isCapturingPhoto.pinLastValue()).toBe(false)
    expect(CameraInfo.isRecordingVideo.pinLastValue()).toBe(false)
    expect(CameraInfo.previewScreenScale.pinLastValue()).toBe(0)

    let vec2_1Test = CameraInfo.previewSize.pinLastValue()
    expect(vec2_1Test.x.pinLastValue()).toBe(0)
    expect(vec2_1Test.y.pinLastValue()).toBe(0)
   
    let pos1FromTransform = CameraInfo.viewMatrix.position.pinLastValue()
    expect(pos1FromTransform.x.pinLastValue()).toBe(0)
    expect(pos1FromTransform.y.pinLastValue()).toBe(0)
    expect(pos1FromTransform.z.pinLastValue()).toBe(0)

    let scale1FromTransform = CameraInfo.viewMatrix.scale.pinLastValue()
    expect(scale1FromTransform.x.pinLastValue()).toBe(0)
    expect(scale1FromTransform.y.pinLastValue()).toBe(0)
    expect(scale1FromTransform.z.pinLastValue()).toBe(0)

    let rotation1FromTransform = CameraInfo.viewMatrix.rotation.pinLastValue()
    expect(rotation1FromTransform.w.pinLastValue()).toBe(0)
    expect(rotation1FromTransform.x.pinLastValue()).toBe(0)
    expect(rotation1FromTransform.y.pinLastValue()).toBe(0)
    expect(rotation1FromTransform.z.pinLastValue()).toBe(0)

    CameraInfo.mockReset({
        'captureDevicePosition': 'x: 10, y: 10, z: 10',
        'isCapturingPhoto': true,
        'isRecordingVideo': true,
        'previewScreenScale': 10,
        'previewSize': new Vector2(2,3),
        'viewMatrix':  new TransformSignalMock({
            position: new Vector3(1, 1, 1),
            rotation: new Quaternion(2, 2, 2, 2),
            scale: new Vector3(3, 3, 3)
        })
    })

    expect(CameraInfo.captureDevicePosition.pinLastValue()).toBe('x: 10, y: 10, z: 10')
    expect(CameraInfo.isCapturingPhoto.pinLastValue()).toBe(true)
    expect(CameraInfo.isRecordingVideo.pinLastValue()).toBe(true)
    expect(CameraInfo.previewScreenScale.pinLastValue()).toBe(10)

    let vec2_2Test = CameraInfo.previewSize.pinLastValue()
    expect(vec2_2Test.x.pinLastValue()).toBe(2)
    expect(vec2_2Test.y.pinLastValue()).toBe(3)
   
    let pos2FromTransform = CameraInfo.viewMatrix.position.pinLastValue()
    expect(pos2FromTransform.x.pinLastValue()).toBe(1)
    expect(pos2FromTransform.y.pinLastValue()).toBe(1)
    expect(pos2FromTransform.z.pinLastValue()).toBe(1)

    let scale2FromTransform = CameraInfo.viewMatrix.scale.pinLastValue()
    expect(scale2FromTransform.x.pinLastValue()).toBe(3)
    expect(scale2FromTransform.y.pinLastValue()).toBe(3)
    expect(scale2FromTransform.z.pinLastValue()).toBe(3)

    let rotation2FromTransform = CameraInfo.viewMatrix.rotation.pinLastValue()
    expect(rotation2FromTransform.w.pinLastValue()).toBe(2)
    expect(rotation2FromTransform.x.pinLastValue()).toBe(2)
    expect(rotation2FromTransform.y.pinLastValue()).toBe(2)
    expect(rotation2FromTransform.z.pinLastValue()).toBe(2)

    CameraInfo.mockReset()
})