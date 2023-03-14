import Reactive from "../../src/Reactive/Reactive.mock";
import ScalarSignalMock from "../../src/Reactive/ScalarSignal.mock";
import StringSignalMock from "../../src/Reactive/StringSignalMock";
import BoolSignalMock from "../../src/Reactive/BoolSignal.mock";
import Vec2SignalMock from "../../src/Reactive/Vec2Signal.mock";
import VectorSignalMock from "../../src/Reactive/VectorSignal.mock";
import QuaternionSignalMock from "../../src/Reactive/QuaternionSignal.mock";
import Quaternion from "quaternion";

import { Vector3, Vector2 } from '@areyes-studio/math-module';

test('Check vector method', async () => {
    let x = new ScalarSignalMock(0);
    let vector = Reactive.vector(x, 0, 0);

    expect(vector.x.pinLastValue()).toBe(0);
    expect(vector.y.pinLastValue()).toBe(0);
    
    await x.mockUpdate(1);

    expect(vector.x.pinLastValue()).toBe(1);
    expect(vector.y.pinLastValue()).toBe(0);
});

test('Check quaternion method', async () => {
    let x = new ScalarSignalMock(0);
    let quaternion = Reactive.quaternion(x, x, 0, 0);

    expect(quaternion.value.x).toBe(0);
    expect(quaternion.value.w).toBe(0);
    expect(quaternion.value.y).toBe(0);
    
    await x.mockUpdate(1);

    expect(quaternion.value.x).toBe(1);
    expect(quaternion.value.w).toBe(1);
    expect(quaternion.value.y).toBe(0);
});

test('check val method', () => {
    let test0 = Reactive.val(5);
    let test1 = Reactive.val('hello');
    let test2 = Reactive.val(true);

    expect(test0 instanceof ScalarSignalMock).toBeTruthy();
    expect(test0.pinLastValue()).toEqual(5);
    expect(test1 instanceof StringSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual('hello');
    expect(test2 instanceof BoolSignalMock).toBeTruthy();
    expect(test2.pinLastValue()).toEqual(true);
})

test('check abs method', async () => {
    let scalar = new ScalarSignalMock(-9);
    let vec2 = new Vec2SignalMock(new Vector2(-9, 0));
    let vec3 = new VectorSignalMock(new Vector3(-9, 0, 8));

    expect(Reactive.abs(scalar).pinLastValue()).toEqual(9);
    expect(Reactive.abs(vec2).value.x).toEqual(9);
    expect(Reactive.abs(vec2).value.y).toEqual(0);

    expect(Reactive.abs(vec3).value.x).toEqual(9);
    expect(Reactive.abs(vec3).value.y).toEqual(0);
    expect(Reactive.abs(vec3).value.z).toEqual(8);
})

test('check add method', async () => {
    let scalar = new ScalarSignalMock(-2);
    let vec2 = new Vec2SignalMock(new Vector2(4, 7));
    let vec3 = new VectorSignalMock(new Vector3(-9, 4, 8));

    expect(Reactive.add(scalar, vec2).value.x).toEqual(2);
    expect(Reactive.add(scalar, vec2).value.y).toEqual(5);
    expect(Reactive.add(scalar, new ScalarSignalMock(5)).pinLastValue()).toEqual(3);
    expect(() => {Reactive.add(vec2, vec3)}).toThrowError(
        'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
    );

    await scalar.mockUpdate(-4);

    expect(Reactive.add(scalar, vec3).value.x).toEqual(-13);
    expect(Reactive.add(scalar, vec3).value.y).toEqual(0);
    expect(Reactive.add(scalar, vec3).value.z).toEqual(4);
})

test('check sub method', async () => {
    let scalar = new ScalarSignalMock(-2);
    let vec2 = new Vec2SignalMock(new Vector2(4, 7));
    let vec3 = new VectorSignalMock(new Vector3(-9, 4, 8));

    expect(Reactive.sub(scalar, vec2).value.x).toEqual(-6);
    expect(Reactive.sub(scalar, vec2).value.y).toEqual(-9);
    expect(Reactive.sub(scalar, new ScalarSignalMock(5)).pinLastValue()).toEqual(-7);
    expect(() => {Reactive.sub(vec2, vec3)}).toThrowError('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');

    await scalar.mockUpdate(-4);

    expect(Reactive.sub(scalar, vec3).value.x).toEqual(5);
    expect(Reactive.sub(scalar, vec3).value.y).toEqual(-8);
    expect(Reactive.sub(scalar, vec3).value.z).toEqual(-12);
}) 

test('check mul method', async () => {
    let scalar = new ScalarSignalMock(-2);
    let vec2 = new Vec2SignalMock(new Vector2(4, 7));
    let vec3 = new VectorSignalMock(new Vector3(-9, 4, 8));

    expect(Reactive.mul(scalar, vec2).value.x).toEqual(-8);
    expect(Reactive.mul(scalar, vec2).value.y).toEqual(-14);
    expect(Reactive.mul(scalar, new ScalarSignalMock(5)).pinLastValue()).toEqual(-10);
    expect(() => {Reactive.mul(vec2, vec3)}).toThrowError('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');

    await scalar.mockUpdate(-4);

    expect(Reactive.mul(scalar, vec3).value.x).toEqual(36);
    expect(Reactive.mul(scalar, vec3).value.y).toEqual(-16);
    expect(Reactive.mul(scalar, vec3).value.z).toEqual(-32);
})

test('check div method', async () => {
    let scalar = new ScalarSignalMock(-2);
    let vec2 = new Vec2SignalMock(new Vector2(4, 0));
    let vec3 = new VectorSignalMock(new Vector3(-10, 4, 8));

    expect(Reactive.div(scalar, vec2).value.x).toEqual(-0.5);
    expect(Reactive.div(scalar, vec2).value.y).toEqual(-Infinity);
    expect(Reactive.div(scalar, new ScalarSignalMock(5)).pinLastValue()).toEqual(-0.4);
    expect(() => {Reactive.div(vec2, vec3)}).toThrowError('Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}');

    await scalar.mockUpdate(-4);

    expect(Reactive.div(scalar, vec3).value.x).toEqual(0.4);
    expect(Reactive.div(scalar, vec3).value.y).toEqual(-1);
    expect(Reactive.div(scalar, vec3).value.z).toEqual(-0.5);
}) 

test('check andList and orList methods', async () => {
    let bool1 = new BoolSignalMock(true);
    let bool0 = new BoolSignalMock(false);
    let arr0 = [bool1, bool1, bool1, bool0, bool1];
    let arr1 = [bool0, bool1, bool1, bool0, bool1];
    let arr2 = [bool1, bool1, bool1, bool1, bool1]

    expect(Reactive.andList(arr0).pinLastValue()).toBeFalsy();
    expect(Reactive.andList(arr1).pinLastValue()).toBeFalsy();
    expect(Reactive.orList(arr1).pinLastValue()).toBeTruthy();
    expect(Reactive.andList(arr2).pinLastValue()).toBeTruthy();

    await bool1.mockUpdate(false);

    expect(Reactive.andList(arr2).pinLastValue()).toBeFalsy();
    expect(Reactive.orList(arr2).pinLastValue()).toBeFalsy();
})

test('check acos and asin methods', async () => {
    let scalar = new ScalarSignalMock(0.5);
    let vec2 = new Vec2SignalMock(new Vector2(-0.3, 0.4));
    let vec3 = new VectorSignalMock(new Vector3(0, -0.9, 0.5));

    expect(Reactive.acos(scalar).pinLastValue()).toBeCloseTo(Math.acos(0.5));
    expect(Reactive.asin(scalar).pinLastValue()).toBeCloseTo(Math.asin(0.5));

    expect(Reactive.acos(vec2).value.x).toBeCloseTo(Math.acos(-0.3));
    expect(Reactive.acos(vec2).value.y).toBeCloseTo(Math.acos(0.4));
    expect(Reactive.asin(vec2).value.x).toBeCloseTo(Math.asin(-0.3));
    expect(Reactive.asin(vec2).value.y).toBeCloseTo(Math.asin(0.4));

    expect(Reactive.acos(vec3).value.x).toBeCloseTo(Math.acos(0));
    expect(Reactive.acos(vec3).value.y).toBeCloseTo(Math.acos(-0.9));
    expect(Reactive.acos(vec3).value.z).toBeCloseTo(Math.acos(0.5));
    expect(Reactive.asin(vec3).value.x).toBeCloseTo(Math.asin(0));
    expect(Reactive.asin(vec3).value.y).toBeCloseTo(Math.asin(-0.9));
    expect(Reactive.asin(vec3).value.z).toBeCloseTo(Math.asin(0.5));

    await vec2.mockUpdate(new Vector2(-1.5, 1));

    expect(Reactive.acos(vec2).value.x).toBeNaN();
    expect(Reactive.acos(vec2).value.y).toBeCloseTo(Math.acos(1));
    expect(Reactive.asin(vec2).value.x).toBeNaN();
    expect(Reactive.asin(vec2).value.y).toBeCloseTo(Math.asin(1));
})

test('check cos and sin methods', async () => {
    let scalar = new ScalarSignalMock(Math.PI);
    let vec2 = new Vec2SignalMock(new Vector2(-0.3, 0.4));
    let vec3 = new VectorSignalMock(new Vector3(0, -0.9, 0.5));

    expect(Reactive.cos(scalar).pinLastValue()).toBeCloseTo(-1);
    expect(Reactive.sin(scalar).pinLastValue()).toBeCloseTo(0);

    expect(Reactive.cos(vec2).value.x).toBeCloseTo(Math.cos(-0.3));
    expect(Reactive.cos(vec2).value.y).toBeCloseTo(Math.cos(0.4));
    expect(Reactive.sin(vec2).value.x).toBeCloseTo(Math.sin(-0.3));
    expect(Reactive.sin(vec2).value.y).toBeCloseTo(Math.sin(0.4));

    expect(Reactive.cos(vec3).value.x).toBeCloseTo(Math.cos(0));
    expect(Reactive.cos(vec3).value.y).toBeCloseTo(Math.cos(-0.9));
    expect(Reactive.cos(vec3).value.z).toBeCloseTo(Math.cos(0.5));
    expect(Reactive.sin(vec3).value.x).toBeCloseTo(Math.sin(0));
    expect(Reactive.sin(vec3).value.y).toBeCloseTo(Math.sin(-0.9));
    expect(Reactive.sin(vec3).value.z).toBeCloseTo(Math.sin(0.5));

    await vec2.mockUpdate(new Vector2(-1.5, 1));

    expect(Reactive.cos(vec2).value.x).toBeCloseTo(Math.cos(-1.5));
    expect(Reactive.cos(vec2).value.y).toBeCloseTo(Math.cos(1));
    expect(Reactive.sin(vec2).value.x).toBeCloseTo(Math.sin(-1.5));
    expect(Reactive.sin(vec2).value.y).toBeCloseTo(Math.sin(1));
})

test('check tan method', async () => {
    let scalar = new ScalarSignalMock(Math.PI);
    let vec2 = new Vec2SignalMock(new Vector2(-0.3, 0.4));
    let vec3 = new VectorSignalMock(new Vector3(0, -0.9, 0.5));

    expect(Reactive.tan(scalar).pinLastValue()).toBeCloseTo(Math.tan(Math.PI));

    expect(Reactive.tan(vec2).value.x).toBeCloseTo(Math.tan(-0.3));
    expect(Reactive.tan(vec2).value.y).toBeCloseTo(Math.tan(0.4));

    expect(Reactive.tan(vec3).value.x).toBeCloseTo(Math.tan(0));
    expect(Reactive.tan(vec3).value.y).toBeCloseTo(Math.tan(-0.9));
    expect(Reactive.tan(vec3).value.z).toBeCloseTo(Math.tan(0.5));

    await vec2.mockUpdate(new Vector2(-1.5, 1));

    expect(Reactive.tan(vec2).value.x).toBeCloseTo(Math.tan(-1.5));
    expect(Reactive.tan(vec2).value.y).toBeCloseTo(Math.tan(1));
})

test('check log method', async () => {
    let scalar = new ScalarSignalMock(3);
    let vec2 = new Vec2SignalMock(new Vector2(1,2));
    let vec3 = new VectorSignalMock(new Vector3(1,2,3));
    let string = new StringSignalMock('hello')

    expect(Reactive.log(scalar).pinLastValue()).toBeCloseTo(Math.log(3));
    expect(Reactive.log(vec2).value.x).toBeCloseTo(Math.log(1));
    expect(Reactive.log(vec2).value.y).toBeCloseTo(Math.log(2));
    expect(Reactive.log(vec3).value.x).toBeCloseTo(Math.log(1));
    expect(Reactive.log(vec3).value.y).toBeCloseTo(Math.log(2));
    expect(Reactive.log(vec3).value.z).toBeCloseTo(Math.log(3));
    // @ts-ignore
    expect(() => {Reactive.log(string)}).toThrowError('Exception in HostFunction: Component is not defined for the provided input types');

    await scalar.mockUpdate(1);

    expect(Reactive.log(scalar).pinLastValue()).toBeCloseTo(Math.log(1));
})

test('check atan methods', async () => {
    let scalar = new ScalarSignalMock(5);
    let vec2 = new Vec2SignalMock(new Vector2(-3, 0.4));
    let vec3 = new VectorSignalMock(new Vector3(0, -0.9, 5));

    expect(Reactive.atan(scalar).pinLastValue()).toBeCloseTo(Math.atan(5));

    expect(Reactive.atan(vec2).value.x).toBeCloseTo(Math.atan(-3));
    expect(Reactive.atan(vec2).value.y).toBeCloseTo(Math.atan(0.4));

    expect(Reactive.atan(vec3).value.x).toBeCloseTo(Math.atan(0));
    expect(Reactive.atan(vec3).value.y).toBeCloseTo(Math.atan(-0.9));
    expect(Reactive.atan(vec3).value.z).toBeCloseTo(Math.atan(5));

    await vec2.mockUpdate(new Vector2(-1.5, 1));

    expect(Reactive.atan(vec2).value.x).toBeCloseTo(Math.atan(-1.5));
    expect(Reactive.atan(vec2).value.y).toBeCloseTo(Math.atan(1));
})

test('check atan2 function', async() => {
    let scalar = new ScalarSignalMock(100);
    let vec2 = new Vec2SignalMock(new Vector2(9,2));
    let vec3 = new VectorSignalMock(new Vector3(2,1,0));

    let test0 = Reactive.atan2(vec2, scalar);
    let test1 = Reactive.atan2(scalar, vec3);

    expect(() => {Reactive.atan2(vec2, vec3)}).toThrowError(
        'Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}'
    );

    expect(test0.value.x).toEqual(Math.atan2(100, 9));
    expect(test0.value.y).toEqual(Math.atan2(100, 2));

    await scalar.mockUpdate(0);

    expect(test1.value.x).toEqual(Math.atan2(2,0));
    expect(test1.value.y).toEqual(Math.atan2(1,0));
    expect(test1.value.z).toEqual(Math.atan2(0,0));
})

test('check distance method', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(2,3));
    let vec1 = new Vec2SignalMock(Vector2.zero);
    let vec2 = new VectorSignalMock(new Vector3(-3, 4, -5));
    let vec3 = new VectorSignalMock(new Vector3(8,4,1));

    let test0 = Reactive.distance(vec0, vec1);
    let test1 = Reactive.distance(vec2, vec3);

    expect(test0.pinLastValue()).toBeCloseTo(Math.sqrt(13));
    expect(test1.pinLastValue()).toBeCloseTo(Math.sqrt(157));
    expect(() => {Reactive.distance(vec0, vec2)}).toThrowError('Exception in HostFunction: Component is not defined for the provided input types');

    await vec0.mockUpdate(new Vector2(5, -4));
    await vec2.mockUpdate(new Vector3(-2, 0, 5));

    expect(test0.pinLastValue()).toBeCloseTo(Math.sqrt(41));
    expect(test1.pinLastValue()).toBeCloseTo(Math.sqrt(132));
})

test('check dot method', async () => {
    let vec0 = new Vec2SignalMock(new Vector2(2,3));
    let vec1 = new Vec2SignalMock(Vector2.zero);
    let vec2 = new VectorSignalMock(new Vector3(-3, 4, -5));
    let vec3 = new VectorSignalMock(new Vector3(8,4,1));

    let test0 = Reactive.dot(vec0, vec1);
    let test1 = Reactive.dot(vec2, vec3);

    expect(test0.pinLastValue()).toEqual(0);
    expect(test1.pinLastValue()).toEqual(-13);
    expect(() => {Reactive.dot(vec0, vec2)}).toThrowError('Exception in HostFunction: Component is not defined for the provided input types');

    await vec0.mockUpdate(new Vector2(5, -4));
    await vec1.mockUpdate(new Vector2(-2, 3));
    await vec2.mockUpdate(new Vector3(-2, 0, 5));
})

test('check exp methods', async () => {
    let scalar = new ScalarSignalMock(5);
    let vec2 = new Vec2SignalMock(new Vector2(-3, 0.4));
    let vec3 = new VectorSignalMock(new Vector3(0, -0.9, 5));

    expect(Reactive.exp(scalar).pinLastValue()).toBeCloseTo(Math.exp(5));

    expect(Reactive.exp(vec2).value.x).toBeCloseTo(Math.exp(-3));
    expect(Reactive.exp(vec2).value.y).toBeCloseTo(Math.exp(0.4));

    expect(Reactive.exp(vec3).value.x).toBeCloseTo(Math.exp(0));
    expect(Reactive.exp(vec3).value.y).toBeCloseTo(Math.exp(-0.9));
    expect(Reactive.exp(vec3).value.z).toBeCloseTo(Math.exp(5));

    await vec2.mockUpdate(new Vector2(-1.5, 1));

    expect(Reactive.exp(vec2).value.x).toBeCloseTo(Math.exp(-1.5));
    expect(Reactive.exp(vec2).value.y).toBeCloseTo(Math.exp(1));
})

test('check once method', () => {
    const onFire = jest.fn();

    Reactive.once().subscribe(() => onFire());

    setTimeout(() => {expect(onFire).toHaveBeenCalledTimes(1)},100);
})

test('check pack2 method', async () => {
    let scalar0 = new ScalarSignalMock(9);
    let scalar1 = new ScalarSignalMock(-1);
    let vec2 = new Vec2SignalMock(new Vector2(1,2));

    expect(Reactive.pack2(scalar0, scalar1).x.pinLastValue()).toEqual(9);
    expect(Reactive.pack2(scalar0, scalar1).y.pinLastValue()).toEqual(-1);
    expect(Reactive.pack2(scalar0, vec2).x.pinLastValue()).toEqual(9);
    expect(Reactive.pack2(scalar0, vec2).y.pinLastValue()).toEqual(1);

    await scalar0.mockUpdate(2);

    expect(Reactive.pack2(scalar0, scalar1).x.pinLastValue()).toEqual(2);
    expect(Reactive.pack2(scalar0, scalar1).y.pinLastValue()).toEqual(-1);
})

test('check pack3 method', async () => {
    let scalar0 = new ScalarSignalMock(9);
    let scalar1 = new ScalarSignalMock(-1);
    let scalar2 = new ScalarSignalMock(2);

    expect(Reactive.pack3(scalar0, scalar1, scalar2).x.pinLastValue()).toEqual(9);
    expect(Reactive.pack3(scalar0, scalar1, scalar2).y.pinLastValue()).toEqual(-1);
    expect(Reactive.pack3(scalar0, scalar1, scalar2).z.pinLastValue()).toEqual(2);

    await scalar0.mockUpdate(2);
    await scalar2.mockUpdate(7);

    expect(Reactive.pack3(scalar0, scalar1, scalar2).x.pinLastValue()).toEqual(2);
    expect(Reactive.pack3(scalar0, scalar1, scalar2).y.pinLastValue()).toEqual(-1);
    expect(Reactive.pack3(scalar0, scalar1, scalar2).z.pinLastValue()).toEqual(7);
})

test('check scale method', async () => {
    let scalar0 = new ScalarSignalMock(9);
    let scalar1 = new ScalarSignalMock(-1);
    let scalar2 = new ScalarSignalMock(2);

    expect(Reactive.scale(scalar0, scalar1, scalar2).x.pinLastValue()).toEqual(9);
    expect(Reactive.scale(scalar0, scalar1, scalar2).y.pinLastValue()).toEqual(-1);
    expect(Reactive.scale(scalar0, scalar1, scalar2).z.pinLastValue()).toEqual(2);

    await scalar0.mockUpdate(2);
    await scalar2.mockUpdate(7);

    expect(Reactive.scale(scalar0, scalar1, scalar2).x.pinLastValue()).toEqual(2);
    expect(Reactive.scale(scalar0, scalar1, scalar2).y.pinLastValue()).toEqual(-1);
    expect(Reactive.scale(scalar0, scalar1, scalar2).z.pinLastValue()).toEqual(7);
})

test('check monitorMany method', async () => {
    let onFire = jest.fn();

    let scalar0 = new ScalarSignalMock(0);
    let scalar1 = new ScalarSignalMock(3);
    let scalar2 = new ScalarSignalMock(4);
    let scalarArray = [scalar0, scalar1, scalar2];

    Reactive.monitorMany(scalarArray).subscribe(() => {
        onFire();
    })

    await scalar0.mockUpdate(9);

    expect(onFire).toHaveBeenCalledTimes(1);

    await scalar1.mockUpdate(10);
    await scalar2.mockUpdate(14);

    expect(onFire).toHaveBeenCalledTimes(3);
})

test('check method quaternionFromAngleAxis', async () => {
    let angle = new ScalarSignalMock(Math.PI / 4);
    let axis = new VectorSignalMock(new Vector3(3,5,6))

    let test = Reactive.quaternionFromAngleAxis(angle, axis);

    let normAxis = axis.normalize();
    let x = normAxis.value.x * Math.sin(angle.value / 2);
    let y = normAxis.value.y * Math.sin(angle.value / 2);
    let z = normAxis.value.z * Math.sin(angle.value / 2);
    let w = Math.cos(angle.value / 2);

    expect(test.value.x).toBeCloseTo(x);
    expect(test.value.y).toBeCloseTo(y);
    expect(test.value.z).toBeCloseTo(z);
    expect(test.value.w).toBeCloseTo(w);

    await axis.mockUpdate(new Vector3(9,4,3));

    let normAxis0 = axis.normalize();
    let x0 = normAxis0.value.x * Math.sin(angle.value / 2);
    let y0 = normAxis0.value.y * Math.sin(angle.value / 2);
    let z0 = normAxis0.value.z * Math.sin(angle.value / 2);
    let w0 = Math.cos(angle.value / 2);

    expect(test.value.x).toBeCloseTo(x0);
    expect(test.value.y).toBeCloseTo(y0);
    expect(test.value.z).toBeCloseTo(z0);
    expect(test.value.w).toBeCloseTo(w0);
})

test('check method quaternionFromEuler', async () => {
    let pitch = new ScalarSignalMock(-Math.PI / 2);
    let yaw = new ScalarSignalMock(Math.PI);
    let roll = new ScalarSignalMock(Math.PI / 2);

    let test = Reactive.quaternionFromEuler(pitch, yaw, roll);

    expect(test.value.x).toBeCloseTo(0.5);
    expect(test.value.y).toBeCloseTo(0.5);
    expect(test.value.z).toBeCloseTo(-0.5);
    expect(test.value.w).toBeCloseTo(0.5);

    await pitch.mockUpdate(- Math.PI);
    await yaw.mockUpdate(0);

    expect(test.value.x).toBeCloseTo(-0.707);
    expect(test.value.y).toBeCloseTo(0.707);
    expect(test.value.z).toBeCloseTo(0);
    expect(test.value.w).toBeCloseTo(0);
})

test('check quaternionFromTo method', () => {
    let from = new VectorSignalMock(new Vector3(1,2,3));
    let to = new VectorSignalMock(new Vector3(-1,0,4));

    expect(Reactive.quaternionFromTo(from, to).value.w).toBeCloseTo(0.925);
    expect(Reactive.quaternionFromTo(from, to).value.x).toBeCloseTo(3.03);
    expect(Reactive.quaternionFromTo(from, to).value.y).toBeCloseTo(-2.652);
    expect(Reactive.quaternionFromTo(from, to).value.z).toBeCloseTo(0.758);
})

test('check step method', async () => {
    let scalar0 = new ScalarSignalMock(2);
    let scalar1 = new ScalarSignalMock(3);
    let vec2 = new Vec2SignalMock(new Vector2(1,2));
    let vec2_0 = new Vec2SignalMock(new Vector2(0,4));
    let vec3 = new VectorSignalMock(new Vector3(-2, 3, 4));
    let vec3_0 = new VectorSignalMock(new Vector3(0, 4, 9));

    expect(Reactive.step(scalar0, scalar1).pinLastValue()).toEqual(0);
    expect(Reactive.step(scalar1, scalar0).pinLastValue()).toEqual(1);
    expect(Reactive.step(vec3, scalar0).value.x).toEqual(0)
    expect(Reactive.step(vec3, scalar0).value.y).toEqual(1)
    expect(Reactive.step(vec3, scalar0).value.z).toEqual(1)
    expect(() => {Reactive.step(vec2, vec3)}).toThrowError("Exception in HostFunction: Component is not defined for the provided input types: {Vector2, Vector3}");

    await vec2.mockUpdate(Vector2.zero);
    await vec3.mockUpdate(new Vector3(1,2,3));

    expect(Reactive.step(vec2, vec2_0).value.x).toEqual(1);
    expect(Reactive.step(vec2, vec2_0).value.y).toEqual(0);
    
    expect(Reactive.step(vec3, vec3_0).value.x).toEqual(1);
    expect(Reactive.step(vec3, vec3_0).value.y).toEqual(0);
    expect(Reactive.step(vec3, vec3_0).value.z).toEqual(0);
})

test('check switch method', async() => {
    let str0 = new StringSignalMock('Option 1');
    let str1 = new StringSignalMock('Option 10');

    let map = {
        'Option 0' : 'Apple',
        'Option 1' : 'Banana',
        'Option 2' : 'Peach',
        'Option 3' : 'Orange'
    }

    let test0 = Reactive.switch(str0, map, 'Mango');
    let test1 = Reactive.switch(str1, map, 'Mango');

    expect(test0.pinLastValue()).toEqual('Banana');
    expect(test1.pinLastValue()).toEqual('Mango');

    await str0.mockUpdate('Option 2');

    expect(test0.pinLastValue()).toEqual('Peach');
})

test('check transform method', async () => {
    let translation = new VectorSignalMock(new Vector3(1,1,1));
    let scale = new VectorSignalMock(new Vector3(2,2,2));
    let rotation = new QuaternionSignalMock(new Quaternion(1,2,3,4));

    let test = Reactive.transform(translation, scale, rotation);

    expect(test.value).toEqual({
        position: new Vector3(1,1,1),
        rotation: new Quaternion(1,2,3,4),
        scale: new Vector3(2,2,2)
    })

    await scale.mockUpdate(new Vector3(9,2,3));

    expect(test.value).toEqual({
        position: new Vector3(1,1,1),
        rotation: new Quaternion(1,2,3,4),
        scale: new Vector3(9,2,3)
    })
})

test('check xorList method', async () => {
    let trueBool = new BoolSignalMock(true);
    let falseBool = new BoolSignalMock(false);

    expect(Reactive.xorList([trueBool, trueBool, trueBool, trueBool]).pinLastValue()).toBeFalsy();
    expect(Reactive.xorList([falseBool, falseBool, falseBool, falseBool]).pinLastValue()).toBeFalsy();
    expect(Reactive.xorList([falseBool, trueBool, falseBool, falseBool]).pinLastValue()).toBeTruthy();
    expect(Reactive.xorList([trueBool, falseBool, trueBool, trueBool]).pinLastValue()).toBeTruthy();
    expect(Reactive.xorList([falseBool, trueBool, falseBool, trueBool]).pinLastValue()).toBeTruthy();
})