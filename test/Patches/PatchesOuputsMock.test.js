
import PatchesOuputsMock from "../../src/Patches/PatchesOutputs.mock";
import StringSignalMock from "../../src/Reactive/StringSignal.mock";
import BoolSignalMock from "../../src/Reactive/BoolSignal.mock";
import ScalarSignalMock from "../../src/Reactive/ScalarSignal.mock";
import Vec2SignalMock from "../../src/Reactive/Vec2Signal.mock";
import VectorSignalMock from "../../src/Reactive/VectorSignal.mock";

import { Vector3, Vector2 } from '@areyes-studio/math-module';

beforeEach(() =>  PatchesOuputsMock.mockReset({
    'out1' : new ScalarSignalMock(1),
    'out2' : new BoolSignalMock(true),
    'out3' : new StringSignalMock('3'),
    'boolean': new BoolSignalMock(false),
    'string' : new StringSignalMock('string'),
    'scalar' : new ScalarSignalMock(10),
    'point' : new VectorSignalMock(new Vector3(1, 10, 100)),
    'point2D' : new Vec2SignalMock(new Vector2(1 ,10)),
    'vector' : new VectorSignalMock(new Vector3(1, 10, 100)),
}));

afterAll(() => PatchesOuputsMock.mockReset())

test('check get function', async () => {
   let test1 = /**@type {ScalarSignalMock}*/ (await PatchesOuputsMock.get('out1'))
   expect(test1.pinLastValue()).toBe(1)
})

test('check getBoolean function', async () => {
    let test1 = /**@type {BoolSignalMock}*/ (await PatchesOuputsMock.getBoolean('boolean'))
    expect(test1.pinLastValue()).toBe(false)
})

test('check getBooleanOrFallback function', async () => {
    let test1 = /**@type {BoolSignalMock}*/ (await PatchesOuputsMock.getBooleanOrFallback('boolean', true))
    let test2 = /**@type {BoolSignalMock}*/ (await PatchesOuputsMock.getBooleanOrFallback('', true))
    let test3 = /**@type {BoolSignalMock}*/ (await PatchesOuputsMock.getBooleanOrFallback('', new BoolSignalMock(true)))

    expect(test1.pinLastValue()).toBe(false)
    expect(test2.pinLastValue()).toBe(true)
    expect(test3.pinLastValue()).toBe(true)
})

test('check getOrFallback function', async () => {
    let test1 = /**@type {BoolSignalMock}*/ (await PatchesOuputsMock.getOrFallback('boolean', true))
    let test2 = /**@type {BoolSignalMock}*/ (await PatchesOuputsMock.getOrFallback('', true))
    let test3 = /**@type {BoolSignalMock}*/ (await PatchesOuputsMock.getOrFallback('', new BoolSignalMock(true)))
    let test4 = /**@type {StringSignalMock}*/ (await PatchesOuputsMock.getOrFallback('string', 'not string'))
    let test5 = /**@type {StringSignalMock}*/ (await PatchesOuputsMock.getOrFallback('', 'not string'))
    let test6 = /**@type {StringSignalMock}*/ (await PatchesOuputsMock.getOrFallback('', new StringSignalMock('not string')))
    let test7 = /**@type {ScalarSignalMock}*/ (await PatchesOuputsMock.getOrFallback('scalar', 0))
    let test8 = /**@type {ScalarSignalMock}*/ (await PatchesOuputsMock.getOrFallback('', 0))
    let test9 = /**@type {ScalarSignalMock}*/ (await PatchesOuputsMock.getOrFallback('', new ScalarSignalMock(0)))

    expect(test1.pinLastValue()).toBe(false)
    expect(test2.pinLastValue()).toBe(true)
    expect(test3.pinLastValue()).toBe(true)
    expect(test4.pinLastValue()).toBe('string')
    expect(test5.pinLastValue()).toBe('not string')
    expect(test6.pinLastValue()).toBe('not string')
    expect(test7.pinLastValue()).toBe(10)
    expect(test8.pinLastValue()).toBe(0)
    expect(test9.pinLastValue()).toBe(0)
})

test('check getPoint function', async () => {
    let test1 = /**@type {VectorSignalMock}*/ (await PatchesOuputsMock.getPoint('point'))
    let point = test1.pinLastValue()

    expect(point.x.pinLastValue()).toBe(1)
    expect(point.y.pinLastValue()).toBe(10)
    expect(point.z.pinLastValue()).toBe(100)
})


test('check getPointOrFallback function', async () => {
    let test1 = /**@type {VectorSignalMock}*/ (await PatchesOuputsMock.getPointOrFallback('point', new VectorSignalMock(new Vector3(-1,-10,-100))))
    let point1 = test1.pinLastValue()
    let test2 = /**@type {VectorSignalMock}*/ (await PatchesOuputsMock.getPointOrFallback('', new VectorSignalMock(new Vector3(-1,-10,-100))))
    let point2 = test2.pinLastValue()

    expect(point1.x.pinLastValue()).toBe(1)
    expect(point1.y.pinLastValue()).toBe(10)
    expect(point1.z.pinLastValue()).toBe(100)
    expect(point2.x.pinLastValue()).toBe(-1)
    expect(point2.y.pinLastValue()).toBe(-10)
    expect(point2.z.pinLastValue()).toBe(-100)
})

test('check getPoint2D function', async () => {
    let test1 = /**@type {Vec2SignalMock}*/ (await PatchesOuputsMock.getPoint2D('point2D'))
    let point = test1.pinLastValue()

    expect(point.x.pinLastValue()).toBe(1)
    expect(point.y.pinLastValue()).toBe(10)
})


test('check getPoint2DOrFallback function', async () => {
    let test1 = /**@type {Vec2SignalMock}*/ (await PatchesOuputsMock.getPoint2DOrFallback('point2D', new Vec2SignalMock(new Vector2(-1,-10))))
    let point1 = test1.pinLastValue()
    let test2 = /**@type {Vec2SignalMock}*/ (await PatchesOuputsMock.getPoint2DOrFallback('', new Vec2SignalMock(new Vector2(-1,-10))))
    let point2 = test2.pinLastValue()

    expect(point1.x.pinLastValue()).toBe(1)
    expect(point1.y.pinLastValue()).toBe(10)
    expect(point2.x.pinLastValue()).toBe(-1)
    expect(point2.y.pinLastValue()).toBe(-10)
})

test('check getPulse function', async () => {
    //need to write 
    expect(1).toBe(1)
})


test('check getPulseOrFallback function', async () => {
    //need to write 
    expect(1).toBe(1)
})

test('check getScalar function', async () => {
    let test1 = /**@type {ScalarSignalMock}*/ (await PatchesOuputsMock.getScalar('scalar'))
    expect(test1.pinLastValue()).toBe(10)
})

test('check getScalarOrFallback function', async () => {
    let test1 = /**@type {ScalarSignalMock}*/ (await PatchesOuputsMock.getScalarOrFallback('scalar', -100))
    let test2 = /**@type {ScalarSignalMock}*/ (await PatchesOuputsMock.getScalarOrFallback('', -100))
    let test3 = /**@type {ScalarSignalMock}*/ (await PatchesOuputsMock.getScalarOrFallback('', new ScalarSignalMock(-100)))

    expect(test1.pinLastValue()).toBe(10)
    expect(test2.pinLastValue()).toBe(-100)
    expect(test3.pinLastValue()).toBe(-100)
})

test('check getString function', async () => {
    let test1 = /**@type {StringSignalMock}*/ (await PatchesOuputsMock.getString('string'))
    expect(test1.pinLastValue()).toBe('string')
})

test('check getStringOrFallback function', async () => {
    let test1 = /**@type {StringSignalMock}*/ (await PatchesOuputsMock.getStringOrFallback('string', 'not string'))
    let test2 = /**@type {StringSignalMock}*/ (await PatchesOuputsMock.getStringOrFallback('', 'not string'))
    let test3 = /**@type {StringSignalMock}*/ (await PatchesOuputsMock.getStringOrFallback('', new StringSignalMock('not string')))

    expect(test1.pinLastValue()).toBe('string')
    expect(test2.pinLastValue()).toBe('not string')
    expect(test3.pinLastValue()).toBe('not string')
})

test('check getVector function', async () => {
    let test1 = /**@type {VectorSignalMock}*/ (await PatchesOuputsMock.getVector('vector'))
    let point = test1.pinLastValue()

    expect(point.x.pinLastValue()).toBe(1)
    expect(point.y.pinLastValue()).toBe(10)
    expect(point.z.pinLastValue()).toBe(100)
})


test('check getVectorOrFallback function', async () => {
    let test1 = /**@type {VectorSignalMock}*/ (await PatchesOuputsMock.getVectorOrFallback('vector', new VectorSignalMock(new Vector3(-1,-10,-100))))
    let point1 = test1.pinLastValue()
    let test2 = /**@type {VectorSignalMock}*/ (await PatchesOuputsMock.getVectorOrFallback('', new VectorSignalMock(new Vector3(-1,-10,-100))))
    let point2 = test2.pinLastValue()

    expect(point1.x.pinLastValue()).toBe(1)
    expect(point1.y.pinLastValue()).toBe(10)
    expect(point1.z.pinLastValue()).toBe(100)
    expect(point2.x.pinLastValue()).toBe(-1)
    expect(point2.y.pinLastValue()).toBe(-10)
    expect(point2.z.pinLastValue()).toBe(-100)
})
