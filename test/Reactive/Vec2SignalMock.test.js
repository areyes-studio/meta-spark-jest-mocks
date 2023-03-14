import ScalarSignalMock from "../../src/Reactive/ScalarSignal.mock";
import Vec2SignalMock from "../../src/Reactive/Vec2Signal.mock";
import VectorSignalMock from "../../src/Reactive/VectorSignal.mock";

import { Vector3, Vector2 } from '@areyes-studio/math-module';

test('check getting x, y and z coordinates', () => {
    let vector = new Vec2SignalMock(new Vector2(1,2));

    expect(vector.x instanceof ScalarSignalMock).toBeTruthy();
    expect(vector.x.value).toEqual(1);

    expect(vector.y.value).toEqual(2);
})

test('check abs function', async() => {
    let vector = new Vec2SignalMock(new Vector2(-10, 2));
    let test = vector.abs();

    expect(test instanceof Vec2SignalMock).toBeTruthy();
    expect(test.value.x).toEqual(10);
    expect(test.value.y).toEqual(2);

    await vector.mockUpdate(new Vector2(-9, -5));

    expect(test.value.x).toEqual(9);
    expect(test.value.y).toEqual(5);
})

test('check add function', async() => {
    let vector = new Vec2SignalMock(new Vector2(-10, 2));
    let vector1 = new Vec2SignalMock(new Vector2(9,2));
    let test = vector.add(vector1);
    let test1 = vector.add(5)

    expect(test instanceof Vec2SignalMock).toBeTruthy();
    expect(test.value.x).toEqual(-1);
    expect(test.value.y).toEqual(4);

    expect(test1.value.x).toEqual(-5);
    expect(test1.value.y).toEqual(7);

    await vector.mockUpdate(new Vector2(-9, -5));

    expect(test.value.x).toEqual(0);
    expect(test.value.y).toEqual(-3);

    expect(test1.value.x).toEqual(-4);
    expect(test1.value.y).toEqual(0);
})

test('check sub function', async() => {
    let vector = new Vec2SignalMock(new Vector2(-10, 2));
    let vector1 = new Vec2SignalMock(new Vector2(9,2));
    let test = vector.sub(vector1);
    let test1 = vector.sub(5);

    expect(test instanceof Vec2SignalMock).toBeTruthy();
    expect(test.value.x).toEqual(-19);
    expect(test.value.y).toEqual(0);

    expect(test1.value.x).toEqual(-15);
    expect(test1.value.y).toEqual(-3);

    await vector.mockUpdate(new Vector2(-9, -5));

    expect(test.value.x).toEqual(-18);
    expect(test.value.y).toEqual(-7);

    expect(test1.value.x).toEqual(-14);
    expect(test1.value.y).toEqual(-10);
})

test('check mul function', async() => {
    let vector = new Vec2SignalMock(new Vector2(-10, 2));
    let scalar = new ScalarSignalMock(5)
    let test = vector.mul(scalar);
    let test1 = vector.mul(new Vector2(1,2));

    expect(test instanceof Vec2SignalMock).toBeTruthy();

    expect(test.value.x).toEqual(-50);
    expect(test.value.y).toEqual(10);

    expect(test1.value.x).toEqual(-10);
    expect(test1.value.y).toEqual(4);

    await vector.mockUpdate(new Vector2(-9, -5));

    expect(test.value.x).toEqual(-45);
    expect(test.value.y).toEqual(-25);

    expect(test1.value.x).toEqual(-9);
    expect(test1.value.y).toEqual(-10);
})

test('check div function', async() => {
    let vector = new Vec2SignalMock(new Vector2(-10, 2));
    let scalar = new ScalarSignalMock(2)
    let test = vector.div(scalar);
    let test1 = vector.div(new Vector2(1,2));
    let test2 = vector.div(0);
    let test3 = vector.div(Vector2.zero);

    expect(test instanceof Vec2SignalMock).toBeTruthy();

    expect(test.value.x).toEqual(-5);
    expect(test.value.y).toEqual(1);

    expect(test1.value.x).toEqual(-10);
    expect(test1.value.y).toEqual(1);

    expect(test2.value.x).toBe(-Infinity);
    expect(test2.value.y).toBe(Infinity);

    expect(test3.value.x).toBe(-Infinity);
    expect(test3.value.y).toBe(Infinity);

    await vector.mockUpdate(new Vector2(-9, -5));

    expect(test.value.x).toEqual(-4.5);
    expect(test.value.y).toEqual(-2.5);

    expect(test1.value.x).toEqual(-9);
    expect(test1.value.y).toEqual(-2.5);

    expect(test2.value.x).toBe(-Infinity);
    expect(test2.value.y).toBe(-Infinity);
})

test('check distance function', async () => {
    let vector0 = new Vec2SignalMock(new Vector2(1,2));
    let vector1 = new Vec2SignalMock(new Vector2(-2,3));
    let vector2 = new Vec2SignalMock(new Vector2(-4,0));

    expect(vector0.distance(vector1) instanceof ScalarSignalMock).toBeTruthy();
    expect(vector0.distance(vector0).value).toEqual(0);

    expect(vector0.distance(vector1).value).toBeCloseTo(Math.sqrt(10));

    expect(vector0.distance(vector2).value).toBeCloseTo(Math.sqrt(29));

    expect(vector1.distance(vector2).value).toBeCloseTo(Math.sqrt(13));

    await vector0.mockUpdate(new Vector2(4,3));

    expect(vector0.distance(vector1).value).toBeCloseTo(6);
    expect(vector0.distance(vector2).value).toBeCloseTo(Math.sqrt(73));
})

test('check neg function', async() => {
    let vector = new Vec2SignalMock(new Vector2(-10, 2));
    let test = vector.neg();

    expect(test instanceof Vec2SignalMock).toBeTruthy();

    expect(test.value.x).toEqual(10);
    expect(test.value.y).toEqual(-2);

    await vector.mockUpdate(new Vector2(-9, -5));

    expect(test.value.x).toEqual(9);
    expect(test.value.y).toEqual(5);
})

test('check height and width methods', async () => {
    let vector = new Vec2SignalMock(new Vector2(2,3));

    expect(vector.height().value).toEqual(3);
    expect(vector.width().value).toEqual(2);

    await vector.mockUpdate(new Vector2(4,5));

    expect(vector.height().value).toEqual(5);
    expect(vector.width().value).toEqual(4);
})

test('check atan2 method', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(9,2));
    let vec1 = new Vec2SignalMock(new Vector2(-2, 4));
    let scalar = new ScalarSignalMock(5);

    expect(vec0.atan2(vec1).value.x).toEqual(Math.atan2(-2, 9));
    expect(vec0.atan2(vec1).value.y).toEqual(Math.atan2(4, 2));

    expect(vec0.atan2(scalar).value.x).toEqual(Math.atan2(5, 9));
    expect(vec0.atan2(scalar).value.y).toEqual(Math.atan2(5, 2));

    await vec0.mockUpdate(new Vector2(-8,6));

    expect(vec0.atan2(vec1).value.x).toEqual(Math.atan2(-2, -8));
    expect(vec0.atan2(vec1).value.y).toEqual(Math.atan2(4, 6));
})

test('check ceil method', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(9.2,6.8));
    let vec1 = new Vec2SignalMock(new Vector2(3.467, 6.892));

    expect(vec0.ceil().value.x).toEqual(10);
    expect(vec0.ceil().value.y).toEqual(7);
    expect(vec1.ceil().value.x).toEqual(4);
    expect(vec1.ceil().value.y).toEqual(7);

    await vec0.mockUpdate(new Vector2(5.6, 4.9));
    await vec1.mockUpdate(new Vector2(11.7, 2.678));

    expect(vec0.ceil().value.x).toEqual(6);
    expect(vec0.ceil().value.y).toEqual(5);
    expect(vec1.ceil().value.x).toEqual(12);
    expect(vec1.ceil().value.y).toEqual(3);
})

test('check floor method', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(9.2,6.8));
    let vec1 = new Vec2SignalMock(new Vector2(3.467, 6.892));

    expect(vec0.floor().value.x).toEqual(9);
    expect(vec0.floor().value.y).toEqual(6);
    expect(vec1.floor().value.x).toEqual(3);
    expect(vec1.floor().value.y).toEqual(6);

    await vec0.mockUpdate(new Vector2(5.6, 4.9));
    await vec1.mockUpdate(new Vector2(11.7, 2.678));

    expect(vec0.floor().value.x).toEqual(5);
    expect(vec0.floor().value.y).toEqual(4);
    expect(vec1.floor().value.x).toEqual(11);
    expect(vec1.floor().value.y).toEqual(2);
})

test('check clamp method', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(9.2, 6.8));
    let vec1 = new Vec2SignalMock(new Vector2(3.4, 6.8));

    expect(vec0.clamp(5,8).value.x).toEqual(8);
    expect(vec1.clamp(4,7).value.x).toEqual(4);

    expect(vec1.clamp(Vector2.zero, vec0).value.x).toEqual(3.4);
    expect(vec1.clamp(Vector2.zero, vec0).value.y).toEqual(6.8);
    expect(vec1.clamp(vec0, Vector2.zero).value.x).toEqual(0);
    expect(vec1.clamp(vec0, Vector2.zero).value.y).toEqual(0);


    await vec0.mockUpdate(new Vector2(5.5, 10));

    expect(vec0.clamp(5,8).value.x).toEqual(5.5);
    expect(vec0.clamp(5,8).value.y).toEqual(5.5);
    expect(vec0.clamp(8,5).value.x).toEqual(5);
    expect(vec0.clamp(8,5).value.y).toEqual(5);
})

test('check dot method', async() => {
    let vec0 = new Vec2SignalMock(new Vector2(5,8));
    let vec1 = new Vec2SignalMock(new Vector2(3, -4));

    expect(vec0.dot(vec1).value).toEqual(-17);
    expect(vec0.dot(new Vector2(-5, 9)).value).toEqual(47);

    await vec0.mockUpdate(new Vector2(9, 4));

    expect(vec0.dot(vec1).value).toEqual(11);
})

test('check magnitude and magnitudeSquared methods', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(5,8));
    let vec1 = new Vec2SignalMock(new Vector2(3, -4));

    expect(vec0.magnitude().value).toBeCloseTo(Math.sqrt(89));
    expect(vec0.magnitudeSquared().value).toEqual(89);
    expect(vec1.magnitude().value).toEqual(5);
    expect(vec1.magnitudeSquared().value).toEqual(25);

    await vec0.mockUpdate(new Vector2(9, 10));

    expect(vec0.magnitude().value).toBeCloseTo(Math.sqrt(181));
    expect(vec0.magnitudeSquared().value).toEqual(181);
})

test('check max and min methods', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(5, -4));
    let vec1 = new Vec2SignalMock(new Vector2(3, 8));

    expect(vec0.max(vec1).value.x).toEqual(5);
    expect(vec0.max(vec1).value.y).toEqual(8);
    expect(vec0.min(vec1).value.x).toEqual(3);
    expect(vec0.min(vec1).value.y).toEqual(-4);

    await vec0.mockUpdate(new Vector2(-10, 9));

    expect(vec0.max(vec1).value.x).toEqual(3);
    expect(vec0.max(vec1).value.y).toEqual(9);
    expect(vec0.min(vec1).value.x).toEqual(-10);
    expect(vec0.min(vec1).value.y).toEqual(8);
})

test('check mix method', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(5, -10));
    let vec1 = new Vec2SignalMock(new Vector2(9, 2));

    expect(vec0.mix(vec1, 0.5).value.x).toEqual(7);
    expect(vec0.mix(vec1, 0.5).value.y).toEqual(-4);

    await vec0.mockUpdate(new Vector2(5, 7));

    expect(vec0.mix(vec1, 0.6).x.pinLastValue()).toBeCloseTo(7.4);
    expect(vec0.mix(vec1, 0.6).y.pinLastValue()).toBeCloseTo(4);
})

test('check mod function', async() => {
    let vector0 = new Vec2SignalMock(new Vector2(-10, 2));
    let vector1 = new Vec2SignalMock(new Vector2(9,2));
    let test = vector0.mod(vector1);
    let test1 = vector0.mod(vector1.value);

    expect(test instanceof Vec2SignalMock).toBeTruthy();
    expect(test.value.x).toEqual(-1);
    expect(test.value.y).toEqual(0);
    expect(test1.value.x).toEqual(-1);
    expect(test1.value.y).toEqual(0);

    await vector0.mockUpdate(new Vector2(11, 5));

    expect(test.value.x).toEqual(2);
    expect(test.value.y).toEqual(1);
    expect(test1.value.x).toEqual(2);
    expect(test1.value.y).toEqual(1);
})

test('check normalize method', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(1,1));
    let vec1 = new Vec2SignalMock(new Vector2(0,0));

    expect(vec1.normalize().value.x).toBeNaN();
    expect(vec0.normalize().value.x).toEqual(1 / Math.sqrt(2));
    expect(vec0.normalize().value.y).toEqual(1 / Math.sqrt(2));
    
    await vec0.mockUpdate(new Vector2(-2,-3));
    await vec1.mockUpdate(new Vector2(7,8));

    expect(vec0.normalize().value.x).toEqual(vec0.x.value / vec0.value.magnitude);
    expect(vec0.normalize().value.y).toEqual(vec0.y.value / vec0.value.magnitude);
    expect(vec1.normalize().value.x).toEqual(vec1.x.value / vec1.value.magnitude);
    expect(vec1.normalize().value.y).toEqual(vec1.y.value / vec1.value.magnitude);
})

test('check pow method', async() => {
    let vec0 = new Vec2SignalMock(new Vector2(3, -2));
    let vec1 = new Vec2SignalMock(new Vector2(-7, 12));

    expect(vec0.pow(3).value.x).toEqual(27);
    expect(vec0.pow(3).value.y).toEqual(-8);
    expect(vec1.pow(new ScalarSignalMock(2)).value.x).toEqual(49);
    expect(vec1.pow(new ScalarSignalMock(2)).value.y).toEqual(144);
    expect(vec0.pow(new Vector2(1,2)).value.x).toEqual(3);
    expect(vec0.pow(new Vector2(1,2)).value.y).toEqual(4);

    await vec0.mockUpdate(new Vector2(4, 5));

    expect(vec0.pow(2).value.x).toEqual(16);
    expect(vec0.pow(2).value.y).toEqual(25);
    expect(vec0.pow(new ScalarSignalMock(0)).value.x).toEqual(1);
    expect(vec0.pow(new ScalarSignalMock(0)).value.y).toEqual(1);
    expect(vec0.pow(new Vector2(1,2)).value.x).toEqual(4);
    expect(vec0.pow(new Vector2(1,2)).value.y).toEqual(25);
})

test('check reflect method', async() => {
    let vec0 = new Vec2SignalMock(new Vector2(-2, 4));
    let vec1 = new Vec2SignalMock(new Vector2(0, 1));
    let vec2 = new Vec2SignalMock(new Vector2(-5, 7));

    expect(vec0.reflect(vec1).value.x).toEqual(-2);
    expect(vec0.reflect(vec1).value.y).toEqual(-4);
    expect(vec0.reflect(vec2).value.x).toEqual(378);
    expect(vec0.reflect(vec2).value.y).toEqual(-528);

    await vec0.mockUpdate(new Vector2(1,-2));

    expect(vec0.reflect(vec1).value.x).toEqual(1);
    expect(vec0.reflect(vec1).value.y).toEqual(2);
    expect(vec0.reflect(vec2).value.x).toEqual(-189);
    expect(vec0.reflect(vec2).value.y).toEqual(264);
})

test('check round method', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(9.2,6.8));
    let vec1 = new Vec2SignalMock(new Vector2(3.467, 6.892));

    expect(vec0.round().value.x).toEqual(9);
    expect(vec0.round().value.y).toEqual(7);
    expect(vec1.round().value.x).toEqual(3);
    expect(vec1.round().value.y).toEqual(7);

    await vec0.mockUpdate(new Vector2(5.6, 4.9));
    await vec1.mockUpdate(new Vector2(11.7, 2.678));

    expect(vec0.round().value.x).toEqual(6);
    expect(vec0.round().value.y).toEqual(5);
    expect(vec1.round().value.x).toEqual(12);
    expect(vec1.round().value.y).toEqual(3);
})

test('check sign method', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(9.2,0));
    let vec1 = new Vec2SignalMock(new Vector2(3.467, -6.892));

    expect(vec0.sign().value.x).toEqual(1);
    expect(vec0.sign().value.y).toEqual(0);
    expect(vec1.sign().value.x).toEqual(1);
    expect(vec1.sign().value.y).toEqual(-1);

    await vec0.mockUpdate(new Vector2(5.6, -4.9));
    await vec1.mockUpdate(new Vector2(-11.7, 2.678));

    expect(vec0.sign().value.x).toEqual(1);
    expect(vec0.sign().value.y).toEqual(-1);
    expect(vec1.sign().value.x).toEqual(-1);
    expect(vec1.sign().value.y).toEqual(1);
})

test('check sqrt method', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(81, 0));
    let vec1 = new Vec2SignalMock(new Vector2(1, 2));

    expect(vec0.sqrt().value.x).toEqual(9);
    expect(vec0.sqrt().value.y).toEqual(0);
    expect(vec1.sqrt().value.x).toEqual(1);
    expect(vec1.sqrt().value.y).toEqual(Math.sqrt(2));

    await vec0.mockUpdate(new Vector2(6, 49));
    await vec1.mockUpdate(new Vector2(169, 8));

    expect(vec0.sqrt().value.x).toEqual(Math.sqrt(6));
    expect(vec0.sqrt().value.y).toEqual(7);
    expect(vec1.sqrt().value.x).toEqual(13);
    expect(vec1.sqrt().value.y).toEqual(Math.sqrt(8));
})

test('check toRange function', async () => {
    let vector = new Vec2SignalMock(new Vector2(0.2, 0.5));
    let min = new ScalarSignalMock(5);
    let max = new ScalarSignalMock(10);
    let minVec2 = new Vec2SignalMock(new Vector2(5, 5));
    let maxVec2 = new Vec2SignalMock(new Vector2(10, 10));
    let vec3 = new VectorSignalMock(new Vector3(1,1,1));
    let test0 = vector.toRange(min, max);
    let test1 = vector.toRange(minVec2, maxVec2);
    
    expect(test0 instanceof Vec2SignalMock).toBeTruthy();
    expect(test0.value.x).toEqual(6);
    expect(test0.value.y).toEqual(7.5);
    expect(test1.value.x).toEqual(6);
    expect(test1.value.y).toEqual(7.5);
    // @ts-ignore
    expect(() => {vector.toRange(vec3, Vector3.zero)}).toThrowError('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types');
    // @ts-ignore
    expect(() => {vector.toRange(vec3, Vector2.zero)}).toThrowError('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types');
    
    await vector.mockUpdate(new Vector2(1,0));

    expect(test0.value.x).toEqual(10);
    expect(test0.value.y).toEqual(5);

    await vector.mockUpdate(new Vector2(2, 0.2));

    expect(vector.toRange(10, 5).value.x).toEqual(0);
    expect(vector.toRange(10, 5).value.y).toEqual(9);
})

test('check fromRange function', async () => {
    let vector = new Vec2SignalMock(new Vector2(6, 7.5));
    let min = new ScalarSignalMock(5);
    let max = new ScalarSignalMock(10);
    let minVec2 = new Vec2SignalMock(new Vector2(5, 5));
    let maxVec2 = new Vec2SignalMock(new Vector2(10, 10));
    let vec3 = new VectorSignalMock(new Vector3(1,1,1));
    let test0 = vector.fromRange(min, max);
    let test1 = vector.fromRange(minVec2, maxVec2);

    expect(test0 instanceof Vec2SignalMock).toBeTruthy();
    expect(test0.value.x).toBeCloseTo(0.2);
    expect(test0.value.y).toBeCloseTo(0.5);
    expect(test1.value.x).toBeCloseTo(0.2);
    expect(test1.value.y).toBeCloseTo(0.5);
    // @ts-ignore
    expect(() => {vector.fromRange(vec3, Vector3.zero)}).toThrowError('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types');
    // @ts-ignore
    expect(() => {vector.fromRange(vec3, Vector2.zero)}).toThrowError('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types');

    await vector.mockUpdate(new Vector2(10, 5));

    expect(test0.value.x).toEqual(1);
    expect(test0.value.y).toEqual(0);

    await vector.mockUpdate(new Vector2(20, 7));

    expect(vector.fromRange(10, 5).value.x).toEqual(-2);
    expect(vector.fromRange(10, 5).value.y).toBeCloseTo(0.6);
})

test('check smoothStep method', async () => {
    let vector0 = new Vec2SignalMock(new Vector2(2, 1));
    let min = new ScalarSignalMock(5);
    let max = new ScalarSignalMock(6);
    let vector1 = new Vec2SignalMock(new Vector2(3, 0));
    let vector2 = new Vector2(4, -2);

    expect(vector0.smoothStep(min, max).value.x).toEqual(0);
    expect(vector0.smoothStep(min, max).value.y).toEqual(0);
    expect(vector0.smoothStep(vector1, vector2).value.x).toEqual(0);
    expect(vector0.smoothStep(vector1, vector2).value.y).toEqual(1);

    await vector0.mockUpdate(new Vector2(3.5, -1.5));

    expect(vector0.smoothStep(vector1, vector2).value.x).toBeCloseTo(0.5);
    expect(vector0.smoothStep(vector1, vector2).value.y).toBeCloseTo(0.25);
})

test('check reactive', async () => {
    let vec2 = new Vec2SignalMock(new Vector2(1, 2));

    expect(vec2.x.pinLastValue()).toEqual(1);
    expect(vec2.y.pinLastValue()).toEqual(2);

    await vec2.mockUpdateX(10);

    expect(vec2.x.pinLastValue()).toEqual(10);
    expect(vec2.y.pinLastValue()).toEqual(2);

    let scalarX = new ScalarSignalMock(9);

    await vec2.mockUpdateX(scalarX);

    expect(vec2.x.pinLastValue()).toEqual(9);
    expect(vec2.y.pinLastValue()).toEqual(2);

    await scalarX.mockUpdate(5);

    expect(vec2.x.pinLastValue()).toEqual(5);
    expect(vec2.y.pinLastValue()).toEqual(2);

    let vec2Signal = new Vec2SignalMock(new Vector2(0, 0));

    await vec2.mockUpdate(vec2Signal);
    await scalarX.mockUpdate(100);

    expect(vec2.x.pinLastValue()).toEqual(0);
    expect(vec2.y.pinLastValue()).toEqual(0);

    await vec2.mockUpdateX(scalarX);
    await vec2Signal.mockUpdate(new Vector2(0, 10))

    expect(vec2.x.pinLastValue()).toEqual(100);
    expect(vec2.y.pinLastValue()).toEqual(10);

    await vec2.mockUpdateY(scalarX);
    await vec2Signal.mockUpdate(new Vector2(10, 0));

    expect(vec2.x.pinLastValue()).toEqual(100);
    expect(vec2.y.pinLastValue()).toEqual(100);
})