import BoolSignalMock from "../../src/Reactive/BoolSignal.mock";
import ScalarSignalMock from "../../src/Reactive/ScalarSignal.mock";
import Vec2SignalMock from "../../src/Reactive/Vec2Signal.mock";
import VectorSignalMock from "../../src/Reactive/VectorSignal.mock";

import { Vector3, Vector2 } from '@areyes-studio/math-module';

test('check add function', async() => {
    let scalar = new ScalarSignalMock(1);
    let test = scalar.add(7);
    let test1 = scalar.add(new VectorSignalMock(new Vector3(9,2,1)));
    let test2 = scalar.add(new Vec2SignalMock(new Vector2(2,1))); 

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(8);
    expect(test1 instanceof VectorSignalMock).toBeTruthy();
    expect(test1.value.x).toEqual(10);
    expect(test1.value.y).toEqual(3);
    expect(test1.value.z).toEqual(2);

    await scalar.mockUpdate(2);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(9);
    expect(test2 instanceof Vec2SignalMock).toBeTruthy();
    expect(test2.value.x).toEqual(4);
    expect(test2.value.y).toEqual(3);
})

test('check sub function', async() => {
    let scalar = new ScalarSignalMock(10);
    let test = scalar.sub(6);  
    let test1 = scalar.sub(new VectorSignalMock(new Vector3(9,2,1)));
    let test2 = scalar.sub(new Vec2SignalMock(new Vector2(2,1)));  

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(4);
    expect(test1 instanceof VectorSignalMock).toBeTruthy();
    expect(test1.value.x).toEqual(1);
    expect(test1.value.y).toEqual(8);
    expect(test1.value.z).toEqual(9);

    await scalar.mockUpdate(2);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(-4);
    expect(test2 instanceof Vec2SignalMock).toBeTruthy();
    expect(test2.value.x).toEqual(0);
    expect(test2.value.y).toEqual(1);
})

test('check mul function', async() => {
    let scalar = new ScalarSignalMock(10);
    let test = scalar.mul(6);
    let test1 = scalar.mul(new VectorSignalMock(new Vector3(9,2,1)));
    let test2 = scalar.mul(new Vec2SignalMock(new Vector2(2,1)));    

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(60);
    expect(test1 instanceof VectorSignalMock).toBeTruthy();
    expect(test1.value.x).toEqual(90);
    expect(test1.value.y).toEqual(20);
    expect(test1.value.z).toEqual(10);

    await scalar.mockUpdate(2);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(12);
    expect(test2 instanceof Vec2SignalMock).toBeTruthy();
    expect(test2.value.x).toEqual(4);
    expect(test2.value.y).toEqual(2);
})

test('check div function', async() => {
    let scalar = new ScalarSignalMock(10);
    let test0 = scalar.div(0);

    expect(test0).toThrowError;

    let test = scalar.div(2);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(5);

    await scalar.mockUpdate(24);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(12);
})

test('check pow function', async() => {
    let scalar = new ScalarSignalMock(10);
    let test = scalar.pow(3);
    let test1 = scalar.pow(0);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(1000);
    expect(test1 instanceof ScalarSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(1);

    await scalar.mockUpdate(2);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(8);
})

test('check mod function', async() => {
    let scalar = new ScalarSignalMock(100);
    let test = scalar.mod(6);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(4);

    await scalar.mockUpdate(12);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(0);
})

test('check abs function', async() => {
    let scalar = new ScalarSignalMock(-10);
    let test = scalar.abs();

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(10);

    await scalar.mockUpdate(12);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(12);
})

test('check round function', async() => {
    let scalar = new ScalarSignalMock(-10.98);
    let test = scalar.round();

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(-11);

    await scalar.mockUpdate(12.096);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(12);
})

test('check sign function', async() => {
    let scalar = new ScalarSignalMock(10);
    let scalar1 = new ScalarSignalMock(-10);
    let test = scalar.sign();
    let test1 = scalar1.sign();

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(1);
    expect(test1 instanceof ScalarSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(-1);

    await scalar.mockUpdate(0);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(0);
})

test('check sqrt function', async() => {
    let scalar = new ScalarSignalMock(16);
    let scalar1 = new ScalarSignalMock(-10);
    let test = scalar.sqrt();
    let test1 = scalar1.sqrt();

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(4);
    expect(test1).toThrowError;

    await scalar.mockUpdate(0);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(0);
})

test('check neg function', async() => {
    let scalar = new ScalarSignalMock(16);
    let scalar1 = new ScalarSignalMock(-10);
    let test = scalar.neg();
    let test1 = scalar1.neg();

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(-16);
    expect(test1 instanceof ScalarSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(10);

    await scalar.mockUpdate(0);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(0);
})

test('check atan2 function', async() => {
    let scalar = new ScalarSignalMock(100);
    let vec2 = new Vec2SignalMock(new Vector2(9,2));
    let vec3 = new VectorSignalMock(new Vector3(2,1,0));
    
    let test0 = scalar.atan2(6);
    let test1 = scalar.atan2(vec2);
    let test2 = scalar.atan2(vec3);

    expect(test0 instanceof ScalarSignalMock).toBeTruthy();
    expect(test0.pinLastValue()).toEqual(Math.atan2(6, 100));

    expect(test1.value.x).toEqual(Math.atan2(9,100));
    expect(test1.value.y).toEqual(Math.atan2(2,100));

    expect(test2.value.x).toEqual(Math.atan2(2,100));
    expect(test2.value.y).toEqual(Math.atan2(1,100));
    expect(test2.value.z).toEqual(Math.atan2(0,100));

    await scalar.mockUpdate(0);

    expect(test0 instanceof ScalarSignalMock).toBeTruthy();
    expect(test0.pinLastValue()).toEqual(Math.atan2(6, 0));
})

test('check ceil function', async() => {
    let scalar = new ScalarSignalMock(112);
    let test = scalar.ceil();

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(Math.ceil(112));

    await scalar.mockUpdate(0);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(Math.ceil(0));
})

test('check floor function', async() => {
    let scalar = new ScalarSignalMock(112);
    let test = scalar.floor();

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(Math.floor(112));

    await scalar.mockUpdate(0);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(Math.floor(0));
})

test('check clamp function', async () => {
    let scalar = new ScalarSignalMock(2.5);
    let min = new ScalarSignalMock(2);
    let max = new ScalarSignalMock(3);
    let vec2Min = new Vec2SignalMock(new Vector2(2,0));
    let vec2Max = new Vec2SignalMock(new Vector2(3,5));
    let vec3Min = new VectorSignalMock(new Vector3(2,0,3));
    let vec3Max = new VectorSignalMock(new Vector3(3,5,7));

    let test = scalar.clamp(min, max);
    let test1 = scalar.clamp(vec2Min, vec2Max);
    let test2 = scalar.clamp(vec3Min, vec3Max);

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(2.5);
    expect(test1.value.x).toEqual(2.5);
    expect(test1.value.y).toEqual(2.5);

    expect(test2.value.x).toEqual(2.5);
    expect(test2.value.y).toEqual(2.5);
    expect(test2.value.z).toEqual(3);

    expect(() => {scalar.clamp(vec2Min, vec3Max)}).toThrowError('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types');
    expect(() => {scalar.clamp(min, vec3Max)}).toThrowError('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types');

    await scalar.mockUpdate(4);

    expect(test.pinLastValue()).toEqual(3);

})

test('check fromRange function', async () => {
    let scalar = new ScalarSignalMock(6);
    let min = new ScalarSignalMock(5);
    let max = new ScalarSignalMock(10);
    let minVec2 = new Vec2SignalMock(new Vector2(5, 2));
    let maxVec2 = new Vector2(10, 10);
    let minVec3 = new VectorSignalMock(new Vector3(5, 2, 7));
    let maxVec3 = new Vector3(10, 10, 10);
    let test0 = scalar.fromRange(min, max);
    let test1 = scalar.fromRange(minVec2, maxVec2);
    let test2 = scalar.fromRange(minVec3, maxVec3);

    expect(test0 instanceof ScalarSignalMock).toBeTruthy();
    expect(test0.pinLastValue()).toEqual(0.2);
    expect(test1.value.x).toBeCloseTo(0.2);
    expect(test1.value.y).toBeCloseTo(0.5);
    expect(test2.value.x).toBeCloseTo(0.2);
    expect(test2.value.y).toBeCloseTo(0.5);
    expect(test2.value.z).toBeCloseTo(-0.33333);
    expect(() => {scalar.fromRange(minVec3, maxVec2)}).toThrowError('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types');

    await scalar.mockUpdate(10);

    expect(test0.pinLastValue()).toEqual(1);

    await scalar.mockUpdate(5);

    expect(test0.pinLastValue()).toEqual(0);

    await scalar.mockUpdate(20);

    expect(test0.pinLastValue()).toEqual(3);
    expect(scalar.fromRange(5,10).pinLastValue()).toEqual(3);
})

test('check toRange function', async () => {
    let scalar = new ScalarSignalMock(0.2);
    let min = new ScalarSignalMock(5);
    let max = new ScalarSignalMock(10);
    let minVec2 = new Vec2SignalMock(new Vector2(5, 2));
    let maxVec2 = new Vector2(10, 10);
    let minVec3 = new VectorSignalMock(new Vector3(5, 2, 7));
    let maxVec3 = new Vector3(10, 10, 10);
    let test = scalar.toRange(min, max);
    let test1 = scalar.toRange(minVec2, maxVec2);
    let test2 = scalar.toRange(minVec3, maxVec3);
    
    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(6);
    expect(test1.value.x).toEqual(6);
    expect(test1.value.y).toBeCloseTo(3.6);
    expect(test2.value.x).toEqual(6);
    expect(test2.value.y).toBeCloseTo(3.6);
    expect(test2.value.z).toBeCloseTo(7.6);
    expect(() => {scalar.fromRange(minVec3, maxVec2)}).toThrowError('JavaScript error: Exception in HostFunction: Component is not defined for the provided input types');

    await scalar.mockUpdate(1);

    expect(test.pinLastValue()).toEqual(10);

    await scalar.mockUpdate(0);

    expect(test.pinLastValue()).toEqual(5);

    await scalar.mockUpdate(2);

    expect(test.pinLastValue()).toEqual(15);
})

test('check eq function', async () => {
    let scalar = new ScalarSignalMock(4);
    let test = scalar.eq(new ScalarSignalMock(4));
    let test1 = scalar.eq(4);

    expect(test instanceof BoolSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toBeTruthy();
    expect(test1.pinLastValue()).toBeTruthy();

    await scalar.mockUpdate(new ScalarSignalMock(5));

    expect(test.pinLastValue()).toBeFalsy();
    expect(test1.pinLastValue()).toBeFalsy();
})

test('check ge function', async () => {
    let scalar = new ScalarSignalMock(4);
    let test = scalar.ge(new ScalarSignalMock(4));
    let test1 = scalar.ge(4);

    expect(test instanceof BoolSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toBeTruthy();
    expect(test1.pinLastValue()).toBeTruthy();

    await scalar.mockUpdate(5);

    expect(test.pinLastValue()).toBeTruthy();
    expect(test1.pinLastValue()).toBeTruthy();

    await scalar.mockUpdate(3);

    expect(test.pinLastValue()).toBeFalsy();
    expect(test1.pinLastValue()).toBeFalsy();
})

test('check gt function', async () => {
    let scalar = new ScalarSignalMock(4);
    let test = scalar.gt(new ScalarSignalMock(4));
    let test1 = scalar.gt(4);

    expect(test instanceof BoolSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toBeFalsy();
    expect(test1.pinLastValue()).toBeFalsy();

    await scalar.mockUpdate(5);

    expect(test.pinLastValue()).toBeTruthy();
    expect(test1.pinLastValue()).toBeTruthy();

    await scalar.mockUpdate(3);

    expect(test.pinLastValue()).toBeFalsy();
    expect(test1.pinLastValue()).toBeFalsy();
})

test('check le function', async () => {
    let scalar = new ScalarSignalMock(4);
    let test = scalar.le(new ScalarSignalMock(4));
    let test1 = scalar.le(4);

    expect(test instanceof BoolSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toBeTruthy();
    expect(test1.pinLastValue()).toBeTruthy();

    await scalar.mockUpdate(5);

    expect(test.pinLastValue()).toBeFalsy();
    expect(test1.pinLastValue()).toBeFalsy();

    await scalar.mockUpdate(3);

    expect(test.pinLastValue()).toBeTruthy();
    expect(test1.pinLastValue()).toBeTruthy();
})

test('check lt function', async () => {
    let scalar = new ScalarSignalMock(4);
    let test = scalar.lt(new ScalarSignalMock(4));
    let test1 = scalar.lt(4);

    expect(test instanceof BoolSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toBeFalsy();
    expect(test1.pinLastValue()).toBeFalsy();

    await scalar.mockUpdate(5);

    expect(test.pinLastValue()).toBeFalsy();
    expect(test1.pinLastValue()).toBeFalsy();

    await scalar.mockUpdate(3);

    expect(test.pinLastValue()).toBeTruthy();
    expect(test1.pinLastValue()).toBeTruthy();
})

test('check ne function', async () => {
    let scalar = new ScalarSignalMock(4);
    let test = scalar.ne(new ScalarSignalMock(4));
    let test1 = scalar.ne(4);

    expect(test instanceof BoolSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toBeFalsy();
    expect(test1.pinLastValue()).toBeFalsy();

    await scalar.mockUpdate(new ScalarSignalMock(5));

    expect(test.pinLastValue()).toBeTruthy();
    expect(test1.pinLastValue()).toBeTruthy();
})

test('check schmittTrigger function', async () => {
    let scalar = new ScalarSignalMock(7);
    let test0 = scalar.schmittTrigger({high: 3, low: 6});
    let test1 = scalar.schmittTrigger({high: 6, low: 3});

    expect(test0.pinLastValue()).toBeUndefined();

    expect(test1 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(true);

    await scalar.mockUpdate(2);

    expect(test1.pinLastValue()).toEqual(false);

    await scalar.mockUpdate(4);

    expect(test1.pinLastValue()).toEqual(false);

    await scalar.mockUpdate(7);

    expect(test1.pinLastValue()).toEqual(true);

    await scalar.mockUpdate(4);

    expect(test1.pinLastValue()).toEqual(true);

    let test2 = scalar.schmittTrigger({high: 6, initialValue: false, low: 3});

    expect(test2.pinLastValue()).toEqual(false);
})

test('check interval method', async () => {
    let scalar0 = new ScalarSignalMock(3);
    let scalar1 = new ScalarSignalMock(5);

    const onInterval0 = jest.fn();
    const onInterval1 = jest.fn();

    scalar0.interval(0.5).subscribe(onInterval0);
    scalar1.interval(1).subscribe(() => onInterval1());
    
    setTimeout(async() => {
        expect(onInterval0).toHaveBeenCalledTimes(6);
        expect(onInterval1).toHaveBeenCalledTimes(5);

        await scalar0.mockUpdate(20);
        await scalar1.mockUpdate(10);

        expect(onInterval0).toHaveBeenCalledTimes(40);
        expect(onInterval1).toHaveBeenCalledTimes(10);
    }, 100);
})

test('check magnitude and magnitudeSquared methods', async () => {
    let scalar0 = new ScalarSignalMock(5);
    let scalar1 = new ScalarSignalMock(1.1);

    expect(scalar0.magnitude().pinLastValue()).toEqual(5);
    expect(scalar1.magnitude().pinLastValue()).toEqual(1.1);
    expect(scalar0.magnitudeSquared().pinLastValue()).toEqual(25);
    expect(scalar1.magnitudeSquared().pinLastValue()).toBeCloseTo(1.21);

    await scalar0.mockUpdate(2);

    expect(scalar0.magnitude().pinLastValue()).toEqual(2);
    expect(scalar0.magnitudeSquared().pinLastValue()).toEqual(4);
})

test('check max and min methods', async () => {
    let scalar0 = new ScalarSignalMock(2);
    let scalar1 = new ScalarSignalMock(1);
    let scalar2 = new ScalarSignalMock(-5);
    let scalar3 = new ScalarSignalMock(10);

    expect(scalar0.max(scalar1).pinLastValue()).toEqual(2);
    expect(scalar2.max(-5).pinLastValue()).toEqual(-5);
    expect(scalar2.max(scalar3).pinLastValue()).toEqual(10);
    expect(scalar0.min(scalar1).pinLastValue()).toEqual(1);
    expect(scalar2.min(scalar2).pinLastValue()).toEqual(-5);
    expect(scalar2.min(scalar3).pinLastValue()).toEqual(-5);

    await scalar0.mockUpdate(-2);
    await scalar2.mockUpdate(15);

    expect(scalar0.max(scalar1).pinLastValue()).toEqual(1);
    expect(scalar2.max(scalar3).pinLastValue()).toEqual(15);
    expect(scalar0.min(scalar1).pinLastValue()).toEqual(-2);
    expect(scalar2.min(10).pinLastValue()).toEqual(10);
})

test('check mix method', async () => {
    let scalar0 = new ScalarSignalMock(5);
    let scalar1 = new ScalarSignalMock(-10);
    let scalar2 = new ScalarSignalMock(9);

    expect(scalar0.mix(-4, 0.6).pinLastValue()).toBeCloseTo(-0.4);
    expect(scalar1.mix(scalar2, 4).pinLastValue()).toEqual(66);

    await scalar0.mockUpdate(-5);
    await scalar1.mockUpdate(7);

    expect(scalar0.mix(9, 0).pinLastValue()).toEqual(-5);
    expect(scalar1.mix(scalar2, 0.8).pinLastValue()).toBeCloseTo(8.6);
})

test('check normalize method', async () => {
    let scalar = new ScalarSignalMock(2);

    expect(scalar.normalize()).toEqual(new ScalarSignalMock(1));

    await scalar.mockUpdate(-2.345);

    expect(scalar.normalize().pinLastValue()).toEqual(1);
})

test('check smoothStep method', async () => {
    let scalar0 = new ScalarSignalMock(5.5);
    let min = new ScalarSignalMock(5);
    let max = new ScalarSignalMock(6);
    let scalar1 = new ScalarSignalMock(7);
    let scalar2 = new ScalarSignalMock(-4);
    let scalar3 = new ScalarSignalMock(7.2);

    expect(scalar0.smoothStep(min, max).pinLastValue()).toBeCloseTo(0.5);
    expect(scalar1.smoothStep(min, max).pinLastValue()).toEqual(1);
    expect(scalar2.smoothStep(min, max).pinLastValue()).toEqual(0);
    expect(scalar3.smoothStep(-5, 10).pinLastValue()).toBeCloseTo(0.8133333);

    await scalar0.mockUpdate(5.9);
    await scalar3.mockUpdate(5);

    expect(scalar0.smoothStep(min, max).pinLastValue()).toBeCloseTo(0.9);
    expect(scalar3.smoothStep(-5, 10).pinLastValue()).toBeCloseTo(0.6666667);
})

test('check multiTrigger method', async () => {
    let scalar = new ScalarSignalMock(0.1);

    const onFire = jest.fn();

    scalar.multiTrigger(0.5).subscribe(() => onFire());

    expect(onFire).not.toHaveBeenCalled();

    await scalar.mockUpdate(0.6);

    expect(onFire).toHaveBeenCalledTimes(1);

    await scalar.mockUpdate(0);

    expect(onFire).toHaveBeenCalledTimes(1);

    await scalar.mockUpdate(1);

    expect(onFire).toHaveBeenCalledTimes(2);
})

test('check trigger method', async () => {
    let scalar = new ScalarSignalMock(0.1);

    const onFire = jest.fn();

    scalar.trigger(0.5).subscribe(() => onFire());

    expect(onFire).not.toHaveBeenCalled();

    await scalar.mockUpdate(0.6);

    expect(onFire).toHaveBeenCalledTimes(1);

    await scalar.mockUpdate(0);

    expect(onFire).toHaveBeenCalledTimes(1);

    await scalar.mockUpdate(1);

    expect(onFire).toHaveBeenCalledTimes(1);
})