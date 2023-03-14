import VectorSignalMock from "../../src/Reactive/VectorSignal.mock";
import ScalarSignalMock from "../../src/Reactive/ScalarSignal.mock";
import QuaternionSignalMock from "../../src/Reactive/QuaternionSignal.mock";
import Quaternion from "quaternion";
import Vec2SignalMock from "../../src/Reactive/Vec2Signal.mock";

import { Vector3, Vector2 } from '@areyes-studio/math-module';

test('check getting x, y and z of particular vector', async () => {
    let vector = new VectorSignalMock(new Vector3(2, 3, 4));

    expect(vector.x instanceof ScalarSignalMock).toBeTruthy();
    expect(vector.x.pinLastValue()).toEqual(2);

    expect(vector.y instanceof ScalarSignalMock).toBeTruthy();
    expect(vector.y.pinLastValue()).toEqual(3);

    expect(vector.z instanceof ScalarSignalMock).toBeTruthy();
    expect(vector.z.pinLastValue()).toEqual(4);

    await vector.mockUpdate(new Vector3(4,3,2));

    expect(vector.x instanceof ScalarSignalMock).toBeTruthy();
    expect(vector.x.pinLastValue()).toEqual(4);

    expect(vector.y instanceof ScalarSignalMock).toBeTruthy();
    expect(vector.y.pinLastValue()).toEqual(3);

    expect(vector.z instanceof ScalarSignalMock).toBeTruthy();
    expect(vector.z.pinLastValue()).toEqual(2);
})

test('check abs function', async() => {
    let vector = new VectorSignalMock(new Vector3(-10, 2, 0));
    let test = vector.abs();

    expect(test instanceof VectorSignalMock).toBeTruthy();
    expect(test.value.x).toEqual(10);
    expect(test.value.y).toEqual(2);
    expect(test.value.z).toEqual(0);

    await vector.mockUpdate(new Vector3(-9, -5, 6));

    expect(test.value.x).toEqual(9);
    expect(test.value.y).toEqual(5);
    expect(test.value.z).toEqual(6);
})

test('check add function', async() => {
    let vector = new VectorSignalMock(new Vector3(-10, 2, 0));
    let vector1 = new VectorSignalMock(new Vector3(9,2,4));
    let test = vector.add(vector1);
    let test1 = vector.add(vector1.value);

    expect(test instanceof VectorSignalMock).toBeTruthy();
    expect(test.value.x).toEqual(-1);
    expect(test.value.y).toEqual(4);
    expect(test.value.z).toEqual(4);

    expect(test1.value.x).toEqual(-1);
    expect(test1.value.y).toEqual(4);
    expect(test1.value.z).toEqual(4);

    await vector.mockUpdate(new Vector3(-9, -5, 6));

    expect(test.value.x).toEqual(0);
    expect(test.value.y).toEqual(-3);
    expect(test.value.z).toEqual(10);
})

test('check sub function', async() => {
    let vector = new VectorSignalMock(new Vector3(-10, 2, 0));
    let vector1 = new VectorSignalMock(new Vector3(9,2,4));
    let test = vector.sub(vector1);
    let test1 = vector.sub(vector1.value);

    expect(test instanceof VectorSignalMock).toBeTruthy();
    expect(test.value.x).toEqual(-19);
    expect(test.value.y).toEqual(0);
    expect(test.value.z).toEqual(-4);

    expect(test1.value.x).toEqual(-19);
    expect(test1.value.y).toEqual(0);
    expect(test1.value.z).toEqual(-4);

    await vector.mockUpdate(new Vector3(-9, -5, 6));

    expect(test.value.x).toEqual(-18);
    expect(test.value.y).toEqual(-7);
    expect(test.value.z).toEqual(2);
})

test('check mul function', async() => {
    let vector = new VectorSignalMock(new Vector3(-10, 2, 0));
    let scalar = new ScalarSignalMock(5);
    let vector1 = new Vector3(9,2,3);
    let test = vector.mul(scalar);
    let test1 = vector.mul(vector1);

    expect(test instanceof VectorSignalMock).toBeTruthy();
    expect(test.value.x).toEqual(-50);
    expect(test.value.y).toEqual(10);
    expect(test.value.z).toEqual(0);

    expect(test1.value.x).toEqual(-90);
    expect(test1.value.y).toEqual(4);
    expect(test1.value.z).toEqual(0);

    await vector.mockUpdate(new Vector3(-9, -5, 6));

    expect(test.value.x).toEqual(-45);
    expect(test.value.y).toEqual(-25);
    expect(test.value.z).toEqual(30);

    expect(test1.value.x).toEqual(-81);
    expect(test1.value.y).toEqual(-10);
    expect(test1.value.z).toEqual(18);
})

test('check div function', async() => {
    let vector = new VectorSignalMock(new Vector3(-10, 2, 0));
    let scalar = new ScalarSignalMock(2);
    let vector0 = Vector3.zero;
    let vector1 = new Vector3(4,2,1);
    
    let test = vector.div(scalar);
    let test1 = vector.div(vector1);
    let test2 = vector.div(0);
    let test3 = vector.div(vector0);

    expect(test instanceof VectorSignalMock).toBeTruthy();

    expect(test.value.x).toEqual(-5);
    expect(test.value.y).toEqual(1);
    expect(test.value.z).toEqual(0);

    expect(test1.value.x).toBeCloseTo(-2.5);
    expect(test1.value.y).toEqual(1);
    expect(test1.value.z).toEqual(0);

    expect(test2.value.x).toBe(-Infinity);
    expect(test2.value.x).toBe(-Infinity);
    expect(test2.value.z).toBeNaN();

    expect(test3.value.x).toBe(-Infinity);
    expect(test3.value.y).toBe(Infinity);
    expect(test3.value.z).toBeNaN();

    await vector.mockUpdate(new Vector3(-9, -5, 6));

    expect(test.value.x).toBeCloseTo(-4.5);
    expect(test.value.y).toBeCloseTo(-2.5);
    expect(test.value.z).toBeCloseTo(3);

    expect(test1.value.x).toBeCloseTo(-2.25);
    expect(test1.value.y).toBeCloseTo(-2.5);
    expect(test1.value.z).toBeCloseTo(6);
})

test('check pow method', async() => {
    let vec0 = new VectorSignalMock(new Vector3(3, -2, 2));
    let vec1 = new VectorSignalMock(new Vector3(-7, 12, 1));

    expect(vec0.pow(3).value.x).toEqual(27);
    expect(vec0.pow(3).value.y).toEqual(-8);
    expect(vec0.pow(3).value.z).toEqual(8);
    expect(vec1.pow(new ScalarSignalMock(2)).value.x).toEqual(49);
    expect(vec1.pow(new ScalarSignalMock(2)).value.y).toEqual(144);
    expect(vec1.pow(new ScalarSignalMock(2)).value.z).toEqual(1);
    expect(vec0.pow(new Vector3(1,2, 0)).value.x).toEqual(3);
    expect(vec0.pow(new Vector3(1,2, 0)).value.y).toEqual(4);
    expect(vec0.pow(new Vector3(1,2, 0)).value.z).toEqual(1);

    await vec0.mockUpdate(new Vector3(4, 5, 5));

    expect(vec0.pow(2).value.x).toEqual(16);
    expect(vec0.pow(2).value.y).toEqual(25);
    expect(vec0.pow(2).value.z).toEqual(25);
    expect(vec0.pow(new ScalarSignalMock(0)).value.x).toEqual(1);
    expect(vec0.pow(new ScalarSignalMock(0)).value.y).toEqual(1);
    expect(vec0.pow(new ScalarSignalMock(0)).value.z).toEqual(1);
    expect(vec0.pow(new Vector3(1,2,1)).value.x).toEqual(4);
    expect(vec0.pow(new Vector3(1,2,1)).value.y).toEqual(25);
    expect(vec0.pow(new Vector3(1,2,1)).value.z).toEqual(5);
})

test('check neg function', async() => {
    let vector = new VectorSignalMock(new Vector3(-10, 2, 0));
    let test = vector.neg();

    expect(test instanceof VectorSignalMock).toBeTruthy();
    expect(test.value.x).toEqual(10);
    expect(test.value.y).toEqual(-2);
    expect(test.value.z).toEqual(-0);

    await vector.mockUpdate(new Vector3(-9, -5, 6));

    expect(test.value.x).toEqual(9);
    expect(test.value.y).toEqual(5);
    expect(test.value.z).toEqual(-6);
})

test('check round function', async() => {
    let vector = new VectorSignalMock(new Vector3(-10.02, 2.78, 0.6809));
    let test = vector.round();

    expect(test instanceof VectorSignalMock).toBeTruthy();
    expect(test.value.x).toEqual(-10);
    expect(test.value.y).toEqual(3);
    expect(test.value.z).toEqual(1);

    await vector.mockUpdate(new Vector3(-9.5, -5.896, 6.283));

    expect(test.value.x).toEqual(-9);
    expect(test.value.y).toEqual(-6);
    expect(test.value.z).toEqual(6);
})

test('check sign function', async() => {
    let vector = new VectorSignalMock(new Vector3(-10, 2, 0));
    let test = vector.sign();

    expect(test instanceof VectorSignalMock).toBeTruthy();
    expect(test.value.x).toEqual(-1);
    expect(test.value.y).toEqual(1);
    expect(test.value.z).toEqual(0);

    await vector.mockUpdate(new Vector3(-9, -5, 6));

    expect(test.value.x).toEqual(-1);
    expect(test.value.y).toEqual(-1);
    expect(test.value.z).toEqual(1);
})

test('check normalize function', async() => {
    let vector = new VectorSignalMock(new Vector3(1, 1, 1));
    let vector1 = new VectorSignalMock(new Vector3(0,0,0));
    let vector2 = new Vector3(-2,-3,-3);
    let vector3 = new Vector3(7,8,6);
    let test = vector.normalize();
    let test1 = vector1.normalize();

    expect(test instanceof VectorSignalMock).toBeTruthy();
    expect(test.value.x).toEqual(1 / Math.sqrt(3));
    expect(test.value.y).toEqual(1 / Math.sqrt(3));
    expect(test.value.z).toEqual(1 / Math.sqrt(3));
    expect(test1.value.x).toBeNaN();
    expect(test1.value.y).toBeNaN();
    expect(test1.value.z).toBeNaN();

    await vector.mockUpdate(new Vector3(-2,-3,-3));
    await vector1.mockUpdate(new Vector3(7,8,6));

    expect(test.value.x).toEqual(vector2.x / vector2.magnitude);
    expect(test.value.y).toEqual(vector2.y / vector2.magnitude);
    expect(test.value.z).toEqual(vector2.z / vector2.magnitude);

    expect(test1.value.x).toEqual(vector3.x / vector3.magnitude);
    expect(test1.value.y).toEqual(vector3.y / vector3.magnitude);
    expect(test1.value.z).toEqual(vector3.z / vector3.magnitude);
})

test('check cross function', async() => {
    let vec0 = new VectorSignalMock(new Vector3(0,2,0));
    let vec1 = new VectorSignalMock(new Vector3(1,0,0));
    let vec2 = new VectorSignalMock(new Vector3(2,-3,-3));
    let vec3 = new Vector3(4,-6,6);
    let vec4 = new VectorSignalMock(new Vector3(1,-8,-7));

    let test0 = vec0.cross(vec1);
    let test1 = vec2.cross(vec3);
    let test2 = vec2.cross(vec4);

    expect(test0 instanceof VectorSignalMock).toBeTruthy();
    expect(test0.value.x).toEqual(0);
    expect(test0.value.y).toEqual(0);
    expect(test0.value.z).toEqual(-2);

    expect(test1.value.x).toEqual(-36);
    expect(test1.value.y).toEqual(-24);
    expect(test1.value.z).toEqual(0);

    expect(test2.value.x).toEqual(-3);
    expect(test2.value.y).toEqual(11);
    expect(test2.value.z).toEqual(-13);

    await vec2.mockUpdate(vec3);

    expect(test2.value.x).toEqual(90);
    expect(test2.value.y).toEqual(34);
    expect(test2.value.z).toEqual(-26);
})

test('check dot function', () => {
    let vec0 = new VectorSignalMock(new Vector3(0,2,0));
    let vec1 = new VectorSignalMock(new Vector3(1,0,0));

    expect(vec0.dot(vec1) instanceof ScalarSignalMock).toBeTruthy();
    expect(vec0.dot(vec1).value).toEqual(0);

    expect(vec0.dot(new Vector3(9,1,-7)).value).toEqual(2);
})

test('check magnitude and magnitude squared calculation of the vector', () => {
    let vec0 = new VectorSignalMock(new Vector3(1,1,1));
    let vec1 = new VectorSignalMock(new Vector3(0,0,0));
    let vec2 = new VectorSignalMock(new Vector3(-2,-3,-3));
    let vec3 = new VectorSignalMock(new Vector3(Math.sqrt(9), Math.sqrt(2), Math.sqrt(5)));

    expect(vec0.magnitude() instanceof ScalarSignalMock).toBeTruthy();
    expect(vec0.magnitude().value).toEqual(Math.sqrt(3));
    expect(vec0.magnitudeSquared().value).toEqual(3);

    expect(vec1.magnitude().value).toEqual(0);
    expect(vec1.magnitudeSquared().value).toEqual(0);

    expect(vec2.magnitude().value).toEqual(Math.sqrt(22));
    expect(vec2.magnitudeSquared().value).toEqual(22);

    expect(vec3.magnitude().value).toEqual(4);
    expect(vec3.magnitudeSquared().value).toEqual(16);
})

test('check atan2 method', async () => {
    let vec0 = new VectorSignalMock(new Vector3(1,2,3));
    let vec1 = new VectorSignalMock(new Vector3(9,2,3));

    expect(vec0.atan2(8).value.x).toEqual(Math.atan2(8,1));
    expect(vec0.atan2(8).value.y).toEqual(Math.atan2(8,2));
    expect(vec0.atan2(8).value.z).toEqual(Math.atan2(8,3));


    expect(vec0.atan2(vec1).value.x).toEqual(Math.atan2(9,1));    
    expect(vec0.atan2(vec1).value.y).toEqual(Math.atan2(2,2));
    expect(vec0.atan2(vec1).value.z).toEqual(Math.atan2(3,3));

    await vec0.mockUpdate(new Vector3(4,6,8));

    expect(vec0.atan2(3).value.x).toEqual(Math.atan2(3,4));
    expect(vec0.atan2(3).value.y).toEqual(Math.atan2(3,6));
    expect(vec0.atan2(3).value.z).toEqual(Math.atan2(3,8));
})

test('check ceil method', async() => {
    let vec0 = new VectorSignalMock(new Vector3(3.2, 4.8, 7.3));
    let vec1 = new VectorSignalMock(new Vector3(10.4, 5.7, 3.3));
    let vec2 = new VectorSignalMock(new Vector3(6.4, 6.5, 8.2));

    expect(vec0.ceil().value.x).toEqual(4);
    expect(vec0.ceil().value.y).toEqual(5);
    expect(vec0.ceil().value.z).toEqual(8);

    expect(vec1.ceil().value.x).toEqual(11);
    expect(vec1.ceil().value.y).toEqual(6);
    expect(vec1.ceil().value.z).toEqual(4);
    
    expect(vec2.ceil().value.x).toEqual(7);
    expect(vec2.ceil().value.y).toEqual(7);
    expect(vec2.ceil().value.z).toEqual(9);

    await vec0.mockUpdate(new Vector3(19.757, 8.567, 9.689));
    await vec1.mockUpdate(new Vector3(9.45, 9.456, 17.89));

    expect(vec0.ceil().value.x).toEqual(20);
    expect(vec0.ceil().value.y).toEqual(9);
    expect(vec0.ceil().value.z).toEqual(10);

    expect(vec1.ceil().value.x).toEqual(10);
    expect(vec1.ceil().value.y).toEqual(10);
    expect(vec1.ceil().value.z).toEqual(18);
})

test('check floor method', async() => {
    let vec0 = new VectorSignalMock(new Vector3(3.2, 4.8, 7.3));
    let vec1 = new VectorSignalMock(new Vector3(10.4, 5.7, 3.3));
    let vec2 = new VectorSignalMock(new Vector3(6.4, 6.5, 8.2));

    expect(vec0.floor().value.x).toEqual(3);
    expect(vec0.floor().value.y).toEqual(4);
    expect(vec0.floor().value.z).toEqual(7);

    expect(vec1.floor().value.x).toEqual(10);
    expect(vec1.floor().value.y).toEqual(5);
    expect(vec1.floor().value.z).toEqual(3);
    
    expect(vec2.floor().value.x).toEqual(6);
    expect(vec2.floor().value.y).toEqual(6);
    expect(vec2.floor().value.z).toEqual(8);

    await vec0.mockUpdate(new Vector3(19.757, 8.567, 9.689));
    await vec1.mockUpdate(new Vector3(9.45, 9.456, 17.89));

    expect(vec0.floor().value.x).toEqual(19);
    expect(vec0.floor().value.y).toEqual(8);
    expect(vec0.floor().value.z).toEqual(9);

    expect(vec1.floor().value.x).toEqual(9);
    expect(vec1.floor().value.y).toEqual(9);
    expect(vec1.floor().value.z).toEqual(17);
})

test('check clamp method', async () => {
    let vec0 = new VectorSignalMock(new Vector3(9.2, 6.8, 6));
    let vec1 = new VectorSignalMock(new Vector3(3.4, 6.8, 8));

    expect(vec0.clamp(5,8).value.x).toEqual(8);
    expect(vec0.clamp(5,8).value.z).toEqual(6);

    expect(vec1.clamp(4, 7).value.x).toEqual(4);
    expect(vec1.clamp(4, 7).value.z).toEqual(7);

    await vec0.mockUpdate(new Vector3(5.5, 10, 0));

    expect(vec0.clamp(5,8).value.x).toBeCloseTo(5.5);
    expect(vec0.clamp(5,8).value.y).toEqual(10);
    expect(vec0.clamp(5,8).value.z).toEqual(5);

    expect(vec0.clamp(8,5).value.x).toBeCloseTo(5);
    expect(vec0.clamp(8,5).value.y).toEqual(5);
    expect(vec0.clamp(8,5).value.z).toEqual(5);
})

test('check distance function', async () => {
    let vector0 = new VectorSignalMock(new Vector3(1,2,3));
    let vector1 = new VectorSignalMock(new Vector3(-2,3,5));
    let vector2 = new VectorSignalMock(new Vector3(-4,0,-9));

    expect(vector0.distance(vector1) instanceof ScalarSignalMock).toBeTruthy;
    expect(vector0.distance(vector0).value).toEqual(0);

    expect(vector0.distance(vector1).value).toBeCloseTo(Math.sqrt(14));

    expect(vector0.distance(vector2).value).toBeCloseTo(Math.sqrt(173));

    expect(vector1.distance(vector2).value).toBeCloseTo(Math.sqrt(209));

    await vector0.mockUpdate(new Vector3(4,3,2));

    expect(vector0.distance(vector1).value).toBeCloseTo(Math.sqrt(45));
    expect(vector0.distance(vector2).value).toBeCloseTo(Math.sqrt(194));
})

test('check toRange function', async () => {
    let vector = new VectorSignalMock(new Vector3(0.2, 0.5, 0.8));
    let min = new ScalarSignalMock(5);
    let max = new ScalarSignalMock(10);
    let test = vector.toRange(min, max);
    
    expect(test instanceof VectorSignalMock).toBeTruthy;
    expect(test.value.x).toEqual(6);
    expect(test.value.y).toBeCloseTo(7.5);
    expect(test.value.z).toEqual(9);

    await vector.mockUpdate(new Vector3(1,0, 0.1));

    expect(test.value.x).toEqual(10);
    expect(test.value.y).toEqual(5);
    expect(test.value.z).toBeCloseTo(5.5);

    await vector.mockUpdate(new Vector3(2, 0.2, -3));

    expect(vector.toRange(10, 5).value.x).toEqual(0);
    expect(vector.toRange(10, 5).value.y).toEqual(9);
    expect(vector.toRange(10, 5).value.z).toEqual(25);
})

test('check fromRange function', async () => {
    let vector = new VectorSignalMock(new Vector3(6, 7.5, 8));
    let min = new ScalarSignalMock(5);
    let max = new ScalarSignalMock(10);
    let vec2 = new Vec2SignalMock(new Vector2(1,1));
    let test = vector.fromRange(min, max);

    expect(test instanceof VectorSignalMock).toBeTruthy();
    expect(test.value.x).toBeCloseTo(0.2);
    expect(test.value.y).toBeCloseTo(0.5);
    expect(test.value.z).toBeCloseTo(0.6);

    // @ts-ignore
    expect(() => {vector.toRange(vec2, Vector3.zero)}).toThrowError('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types');
    // @ts-ignore
    expect(() => {vector.toRange(vec2, Vector2.zero)}).toThrowError('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types');

    await vector.mockUpdate(new Vector3(10, 5, 5.5));

    expect(test.value.x).toEqual(1);
    expect(test.value.y).toEqual(0);
    expect(test.value.z).toBeCloseTo(0.1);

    await vector.mockUpdate(new Vector3(20, 7, 3));

    expect(vector.fromRange(10, 5).value.x).toEqual(-2);
    expect(vector.fromRange(10, 5).value.y).toBeCloseTo(0.6);
    expect(vector.fromRange(10, 5).value.z).toBeCloseTo(1.4);
})

test('check max and min methods', async () => {
    let vec0 = new VectorSignalMock(new Vector3(5, -4, 7));
    let vec1 = new VectorSignalMock(new Vector3(3, 8, 0));

    expect(vec0.max(vec1).value.x).toEqual(5);
    expect(vec0.max(vec1).value.y).toEqual(8);
    expect(vec0.max(vec1).value.z).toEqual(7);
    
    expect(vec0.min(vec1).value.x).toEqual(3);
    expect(vec0.min(vec1).value.y).toEqual(-4);
    expect(vec0.min(vec1).value.z).toEqual(0);

    await vec0.mockUpdate(new Vector3(-10, 9, -8));

    expect(vec0.max(vec1).value.x).toEqual(3);
    expect(vec0.max(vec1).value.y).toEqual(9);
    expect(vec0.max(vec1).value.z).toEqual(0);

    expect(vec0.min(vec1).value.x).toEqual(-10);
    expect(vec0.min(vec1).value.y).toEqual(8);
    expect(vec0.min(vec1).value.z).toEqual(-8);
})

test('check mix method', async () => {
    let vec0 = new VectorSignalMock(new Vector3(5, -10, 0));
    let vec1 = new VectorSignalMock(new Vector3(9, 2, -1));

    expect(vec0.mix(vec1, 0.5).value.x).toEqual(7);
    expect(vec0.mix(vec1, 0.5).value.y).toEqual(-4);
    expect(vec0.mix(vec1, 0.5).value.z).toBeCloseTo(-0.5);

    await vec0.mockUpdate(new Vector3(5, 7, 9));

    expect(vec0.mix(vec1, 0.6).x.pinLastValue()).toBeCloseTo(7.4);
    expect(vec0.mix(vec1, 0.6).y.pinLastValue()).toBeCloseTo(4);
    expect(vec0.mix(vec1, 0.6).z.pinLastValue()).toEqual(3);
})

test('check mod function', async() => {
    let vector0 = new VectorSignalMock(new Vector3(-10, 2, 9));
    let vector1 = new VectorSignalMock(new Vector3(9,2,4));
    let test = vector0.mod(vector1);

    expect(test instanceof VectorSignalMock).toBeTruthy();
    expect(test.value.x).toEqual(-1);
    expect(test.value.y).toEqual(0);
    expect(test.value.z).toEqual(1);

    await vector0.mockUpdate(new Vector3(11, 5, 18));

    expect(test.value.x).toEqual(2);
    expect(test.value.y).toEqual(1);
    expect(test.value.z).toEqual(2);
})

test('check reflect method', async() => {
    let vec0 = new VectorSignalMock(new Vector3(1, -3, 3));
    let vec1 = new VectorSignalMock(new Vector3(5,0,-3));
    let vec2 = new VectorSignalMock(new Vector3(1, -1, 3));

    expect(vec0.reflect(vec1).value.x).toEqual(41);
    expect(vec0.reflect(vec1).value.y).toEqual(-3);
    expect(vec0.reflect(vec1).value.z).toEqual(-21);

    expect(vec0.reflect(vec2).value.x).toEqual(-25);
    expect(vec0.reflect(vec2).value.y).toEqual(23);
    expect(vec0.reflect(vec2).value.z).toEqual(-75);

    await vec0.mockUpdate(new Vector3(2,5,8));

    expect(vec0.reflect(vec1).value.x).toEqual(142);
    expect(vec0.reflect(vec1).value.y).toEqual(5);
    expect(vec0.reflect(vec1).value.z).toEqual(-76);
    
    expect(vec0.reflect(vec2).value.x).toEqual(-40);
    expect(vec0.reflect(vec2).value.y).toEqual(47);
    expect(vec0.reflect(vec2).value.z).toEqual(-118);
})

test('check vector rotation function', () => {
    let vec0 = new VectorSignalMock(new Vector3(1,2,3));
    let vec1 = new VectorSignalMock(new Vector3(0,0,0));
    let vec2 = new VectorSignalMock(new Vector3(-2,-2,-3));

    let quat0 = new QuaternionSignalMock(new Quaternion(0.5, 2, 4, 6));
    let quat1 = new QuaternionSignalMock(new Quaternion(2, 2, 1, -2));
    let quat2 = new QuaternionSignalMock(new Quaternion(0, 1, 2, 0));

    expect(vec0.rotate(quat0).value.x).toBeCloseTo(98.25);
    expect(vec0.rotate(quat0).value.y).toBeCloseTo(196.5);
    expect(vec0.rotate(quat0).value.z).toBeCloseTo(294.75);

    expect(vec1.rotate(quat1).value.x).toEqual(0);
    expect(vec1.rotate(quat1).value.y).toEqual(0);
    expect(vec1.rotate(quat1).value.z).toEqual(0);
    
    expect(vec2.rotate(quat2).value.x).toEqual(22);
    expect(vec2.rotate(quat2).value.y).toEqual(10);
    expect(vec2.rotate(quat2).value.z).toEqual(51);
})

test('check smoothStep method', async () => {
    let vector0 = new VectorSignalMock(new Vector3(2, 1, 5));
    let min = new ScalarSignalMock(5);
    let max = new ScalarSignalMock(6);
    let vector1 = new VectorSignalMock(new Vector3(3, 0, 1));
    let vector2 = new Vector3(4, -2, -9);

    expect(vector0.smoothStep(min, max).value.x).toEqual(0);
    expect(vector0.smoothStep(min, max).value.y).toEqual(0);
    expect(vector0.smoothStep(min, max).value.z).toEqual(0);

    expect(vector0.smoothStep(vector1, vector2).value.x).toEqual(0);
    expect(vector0.smoothStep(vector1, vector2).value.y).toEqual(1);
    expect(vector0.smoothStep(vector1, vector2).value.z).toEqual(1);

    await vector0.mockUpdate(new Vector3(3.5, -1.5, 0));

    expect(vector0.smoothStep(vector1, vector2).value.x).toBeCloseTo(0.5);
    expect(vector0.smoothStep(vector1, vector2).value.y).toBeCloseTo(0.25);
    expect(vector0.smoothStep(vector1, vector2).value.z).toBeCloseTo(0.9);
})

test('check sqrt method', async () => {
    let vec0 = new VectorSignalMock(new Vector3(81, 0, 16));
    let vec1 = new VectorSignalMock(new Vector3(1, 2, 3));

    expect(vec0.sqrt().value.x).toEqual(9);
    expect(vec0.sqrt().value.y).toEqual(0);
    expect(vec0.sqrt().value.z).toEqual(4);

    expect(vec1.sqrt().value.x).toEqual(1);
    expect(vec1.sqrt().value.y).toBeCloseTo(Math.sqrt(2));
    expect(vec1.sqrt().value.z).toBeCloseTo(Math.sqrt(3));

    await vec0.mockUpdate(new Vector3(6, 49, 225));
    await vec1.mockUpdate(new Vector3(169, 8, 121));

    expect(vec0.sqrt().value.x).toBeCloseTo(Math.sqrt(6));
    expect(vec0.sqrt().value.y).toEqual(7);
    expect(vec0.sqrt().value.z).toEqual(15);
    
    expect(vec1.sqrt().value.x).toEqual(13);
    expect(vec1.sqrt().value.y).toBeCloseTo(Math.sqrt(8));
    expect(vec1.sqrt().value.z).toEqual(11);
})

test('check reactive', async () => {
    let vec = new VectorSignalMock(new Vector3(1, 2, 3));

    expect(vec.x.pinLastValue()).toEqual(1);
    expect(vec.y.pinLastValue()).toEqual(2);
    expect(vec.z.pinLastValue()).toEqual(3);

    await vec.mockUpdateX(10);

    expect(vec.x.pinLastValue()).toEqual(10);
    expect(vec.y.pinLastValue()).toEqual(2);
    expect(vec.z.pinLastValue()).toEqual(3);

    let scalarX = new ScalarSignalMock(9);

    await vec.mockUpdateX(scalarX);

    expect(vec.x.pinLastValue()).toEqual(9);
    expect(vec.y.pinLastValue()).toEqual(2);
    expect(vec.z.pinLastValue()).toEqual(3);

    await scalarX.mockUpdate(5);

    expect(vec.x.pinLastValue()).toEqual(5);
    expect(vec.y.pinLastValue()).toEqual(2);
    expect(vec.z.pinLastValue()).toEqual(3);

    let vecSignal = new VectorSignalMock(new Vector3(0, 0, 0));

    await vec.mockUpdate(vecSignal);
    await scalarX.mockUpdate(100);

    expect(vec.x.pinLastValue()).toEqual(0);
    expect(vec.y.pinLastValue()).toEqual(0);
    expect(vec.z.pinLastValue()).toEqual(0);

    await vec.mockUpdateX(scalarX);
    await vecSignal.mockUpdate(new Vector3(0, 10, 10))

    expect(vec.x.pinLastValue()).toEqual(100);
    expect(vec.y.pinLastValue()).toEqual(10);
    expect(vec.z.pinLastValue()).toEqual(10);

    await vec.mockUpdateY(scalarX);
    await vec.mockUpdateZ(scalarX);
    await vecSignal.mockUpdate(new Vector3(10, 0, 0));

    expect(vec.x.pinLastValue()).toEqual(100);
    expect(vec.y.pinLastValue()).toEqual(100);
    expect(vec.z.pinLastValue()).toEqual(100);
})
