import PatchesInputsMock from "../../src/Patches/PatchesInputs.mock";
import SignalMock from "../../src/Reactive/Signal.mock";
import StringSignalMock from "../../src/Reactive/StringSignalMock";
import BoolSignalMock from "../../src/Reactive/BoolSignal.mock";
import ScalarSignalMock from "../../src/Reactive/ScalarSignal.mock";
import Vec2SignalMock from "../../src/Reactive/Vec2Signal.mock";
import VectorSignalMock from "../../src/Reactive/VectorSignal.mock";

import { Vector3, Vector2 } from '@areyes-studio/math-module';

beforeEach(async() =>  PatchesInputsMock.mockReset());

test('check set function', async () => {
    PatchesInputsMock.set('set0', new SignalMock('some signal'))
    PatchesInputsMock.set('set1', 'string')
    PatchesInputsMock.set('set2', true)
    PatchesInputsMock.set('set3', 10)

    let testKeys = Object.keys(PatchesInputsMock.mockGetPatchesStructureInputs())
    let testValues = /**@type {SignalMock[]}*/ (Object.values(PatchesInputsMock.mockGetPatchesStructureInputs()))
    expect(testKeys.length).toBe(4)
    testKeys.forEach((e,index) => expect(e).toBe('set' + index.toString()))

    expect(testValues.length).toBe(4)
    expect(testValues[0].value).toBe('some signal')
    expect(testValues[1].value).toBe('string')
    expect(testValues[2].value).toBe(true)
    expect(testValues[3].value).toBe(10)
})

test('check setBoolean function', async () => {
    PatchesInputsMock.setBoolean('set0', new BoolSignalMock(true))
    PatchesInputsMock.setBoolean('set1', false)

    let testKeys = Object.keys(PatchesInputsMock.mockGetPatchesStructureInputs())
    let testValues = /**@type {BoolSignalMock[]}*/ (Object.values(PatchesInputsMock.mockGetPatchesStructureInputs()))
    expect(testKeys.length).toBe(2)
    testKeys.forEach((e,index) => expect(e).toBe('set' + index.toString()))

    expect(testValues.length).toBe(2)
    expect(testValues[0].pinLastValue()).toBe(true)
    expect(testValues[1].pinLastValue()).toBe(false)
})

test('check setColor function', async () => {
    PatchesInputsMock.setColor('set0', new SignalMock('color' + true))

    let testKeys = Object.keys(PatchesInputsMock.mockGetPatchesStructureInputs())
    let testValues = /**@type {SignalMock[]}*/ (Object.values(PatchesInputsMock.mockGetPatchesStructureInputs()))
    expect(testKeys.length).toBe(1)
    testKeys.forEach((e,index) => expect(e).toBe('set' + index.toString()))

    expect(testValues.length).toBe(1)
    expect(testValues[0].value).toBe('color' + true)
})

test('check setScalar function', async () => {
    PatchesInputsMock.setScalar('set0', new ScalarSignalMock(10))
    PatchesInputsMock.setScalar('set1', 0)

    let testKeys = Object.keys(PatchesInputsMock.mockGetPatchesStructureInputs())
    let testValues = /**@type {ScalarSignalMock[]}*/ (Object.values(PatchesInputsMock.mockGetPatchesStructureInputs()))
    expect(testKeys.length).toBe(2)
    testKeys.forEach((e,index) => expect(e).toBe('set' + index.toString()))

    expect(testValues.length).toBe(2)
    expect(testValues[0].pinLastValue()).toBe(10)
    expect(testValues[1].pinLastValue()).toBe(0)
})

test('check setString function', async () => {
    PatchesInputsMock.setString('set0', new StringSignalMock('10'))
    PatchesInputsMock.setString('set1', '0')

    let testKeys = Object.keys(PatchesInputsMock.mockGetPatchesStructureInputs())
    let testValues = /**@type {StringSignalMock[]}*/ (Object.values(PatchesInputsMock.mockGetPatchesStructureInputs()))
    expect(testKeys.length).toBe(2)
    testKeys.forEach((e,index) => expect(e).toBe('set' + index.toString()))

    expect(testValues.length).toBe(2)
    expect(testValues[0].pinLastValue()).toBe('10')
    expect(testValues[1].pinLastValue()).toBe('0')
})

test('check setPoint function', async () => {
    PatchesInputsMock.setPoint('set0', new VectorSignalMock(new Vector3(1,10,100)))

    let testKeys = Object.keys(PatchesInputsMock.mockGetPatchesStructureInputs())
    let testValues = /**@type {VectorSignalMock[]}*/ (Object.values(PatchesInputsMock.mockGetPatchesStructureInputs()))
    expect(testKeys.length).toBe(1)
    testKeys.forEach((e,index) => expect(e).toBe('set' + index.toString()))

    expect(testValues.length).toBe(1)
    let point = /**@type {VectorSignalMock}*/ (testValues[0].pinLastValue()) 

    expect(point.x.pinLastValue()).toBe(1)
    expect(point.y.pinLastValue()).toBe(10)
    expect(point.z.pinLastValue()).toBe(100)
})

test('check setPoint2D function', async () => {
    PatchesInputsMock.setPoint2D('set0', new Vec2SignalMock(new Vector2(1,10)))

    let testKeys = Object.keys(PatchesInputsMock.mockGetPatchesStructureInputs())
    let testValues = /**@type {Vec2SignalMock[]}*/ (Object.values(PatchesInputsMock.mockGetPatchesStructureInputs()))
    expect(testKeys.length).toBe(1)
    testKeys.forEach((e,index) => expect(e).toBe('set' + index.toString()))

    expect(testValues.length).toBe(1)
    let point = /**@type {Vec2SignalMock}*/ (testValues[0].pinLastValue()) 

    expect(point.x.pinLastValue()).toBe(1)
    expect(point.y.pinLastValue()).toBe(10)
})

test('check setVector function', async () => {
    PatchesInputsMock.setVector('set0', new VectorSignalMock(new Vector3(1,10,100)))

    let testKeys = Object.keys(PatchesInputsMock.mockGetPatchesStructureInputs())
    let testValues = /**@type {VectorSignalMock[]}*/ (Object.values(PatchesInputsMock.mockGetPatchesStructureInputs()))
    expect(testKeys.length).toBe(1)
    testKeys.forEach((e,index) => expect(e).toBe('set' + index.toString()))

    expect(testValues.length).toBe(1)
    let point = /**@type {VectorSignalMock}*/ (testValues[0].pinLastValue()) 

    expect(point.x.pinLastValue()).toBe(1)
    expect(point.y.pinLastValue()).toBe(10)
    expect(point.z.pinLastValue()).toBe(100)
})

// need to do
test('check setPulse function', async () => {
    expect(1).toBe(1)
})
