import Quaternion from "quaternion";
import TransformSignalMock from "../../src/Reactive/TransformSignal.mock";
import VectorSignalMock from "../../src/Reactive/VectorSignal.mock";

import { Vector3 } from '@areyes-studio/math-module';

test('Check TransformSignal properties', async () => {
    let transform = new TransformSignalMock({
        position: new Vector3(0, 0, 0),
        rotation: new Quaternion(1, 0, 0, 0),
        scale: new Vector3(1, 1, 1)
    });

    expect(transform.x.pinLastValue()).toBe(0);
    expect(transform.y.pinLastValue()).toBe(0);
    expect(transform.z.pinLastValue()).toBe(0);

    // expect(transform.rotationX.value).toBe(0);
    // expect(transform.rotationY.value).toBe(0);
    // expect(transform.rotationZ.value).toBe(0);

    expect(transform.scaleX.pinLastValue()).toBe(1);
    expect(transform.scaleY.pinLastValue()).toBe(1);
    expect(transform.scaleZ.pinLastValue()).toBe(1);

    expect(transform.forward.x.pinLastValue()).toBe(0);
    expect(transform.forward.y.pinLastValue()).toBe(0);
    expect(transform.forward.z.pinLastValue()).toBe(-1);
});

test('Check toMatrix and fromMatrix functions', async () => {
    let transform0 = new TransformSignalMock({
        position: new Vector3(0, 0, 0),
        rotation: new Quaternion(1, 0, 1, 0),
        scale: new Vector3(1, 10, 1)
    });

    let matrix = transform0.toMatrix();

    let transform1 = TransformSignalMock.fromMatrix(matrix);

    await transform0.mockUpdate({
        position: new Vector3(0, 1, 0),
        rotation: new Quaternion(1, 0, 0, 0),
        scale: new Vector3(1, 1, 1)
    })

    expect(transform1.x.pinLastValue()).toEqual(0);
    expect(transform1.y.pinLastValue()).toEqual(1);
    expect(transform1.z.pinLastValue()).toEqual(0);

    expect(transform1.rotation.w.pinLastValue()).toBe(1);
    expect(transform1.rotation.x.pinLastValue()).toBe(0);
    expect(transform1.rotation.y.pinLastValue()).toBe(0);
    expect(transform1.rotation.z.pinLastValue()).toBe(0);

    expect(transform1.scaleX.pinLastValue()).toEqual(1);
    expect(transform1.scaleY.pinLastValue()).toEqual(1);
    expect(transform1.scaleZ.pinLastValue()).toEqual(1);
});

test('Check transpose function', async () => {
    let transform0 = new TransformSignalMock({
        position: new Vector3(10, 10, 10),
        rotation: new Quaternion(0.707107, 0, 0.707107, 0),
        scale: new Vector3(10, 10, 55)
    });

    let transform = transform0.transpose();

    // console.log(transform)

    expect(transform.x.pinLastValue()).toEqual(0);
    expect(transform.y.pinLastValue()).toEqual(0);
    expect(transform.z.pinLastValue()).toEqual(0);

    expect(transform.rotation.w.pinLastValue()).toBe(0.7071061595574363);
    expect(transform.rotation.x.pinLastValue()).toBe(0);
    expect(transform.rotation.y.pinLastValue()).toBe(-0.7071074028141546);
    expect(transform.rotation.z.pinLastValue()).toBe(0);

    expect(transform.scaleX.pinLastValue()).toEqual(55.00003403939036);
    expect(transform.scaleY.pinLastValue()).toEqual(10);
    expect(transform.scaleZ.pinLastValue()).toEqual(10.000006189037936);
});

test('Check applyTo functions', async () => {
    let transform0 = new TransformSignalMock({
        position: new Vector3(1, 1, 1),
        rotation: new Quaternion(0.707107, 0, 0.707107, 0),
        scale: new Vector3(10, 1, 1)
    });

    let transform1 = new TransformSignalMock({
        position: new Vector3(1, 1, 1),
        rotation: new Quaternion(0, 0, 0, 0),
        scale: new Vector3(1, 1, 1)
    });

    let transform = transform0.applyTo(transform1);

    // console.log(transform)

    expect(transform.x.pinLastValue()).toEqual(1.9999944299179984);
    expect(transform.y.pinLastValue()).toEqual(2);
    expect(transform.z.pinLastValue()).toEqual(-9.000006807878002);

    expect(transform.rotation.w.pinLastValue()).toBe(0.7071065623731627);
    expect(transform.rotation.x.pinLastValue()).toBe(0);
    expect(transform.rotation.y.pinLastValue()).toBe(0.7071069999998647);
    expect(transform.rotation.z.pinLastValue()).toBe(0);

    expect(transform.scaleX.pinLastValue()).toEqual(10.000006188981917);
    expect(transform.scaleY.pinLastValue()).toEqual(1);
    expect(transform.scaleZ.pinLastValue()).toEqual(1.0000006188981916);
});

test('Check applyToPoint functions', async () => {
    let transform = new TransformSignalMock({
        position: new Vector3(1, 1, 1),
        rotation: new Quaternion(0.707107, 0, 0.707107, 0),
        scale: new Vector3(10, 1, 1)
    });

    let point = new VectorSignalMock(new Vector3(1, 1, 1));

    let appliedPoint = transform.applyToPoint(point);

    expect(appliedPoint.x.pinLastValue()).toEqual(1.9999944299179984);
    expect(appliedPoint.y.pinLastValue()).toEqual(2);
    expect(appliedPoint.z.pinLastValue()).toEqual(-9.000006807878002);

    await transform.mockUpdate({
        position: new Vector3(1, 1, 1),
        rotation: new Quaternion(1, 0, 0, 0),
        scale: new Vector3(10, 1, 1)
    })

    expect(appliedPoint.x.pinLastValue()).toEqual(11);
    expect(appliedPoint.y.pinLastValue()).toEqual(2);
    expect(appliedPoint.z.pinLastValue()).toEqual(2);

    await point.mockUpdate(new Vector3(1, 2, 1))

    expect(appliedPoint.x.pinLastValue()).toEqual(11);
    expect(appliedPoint.y.pinLastValue()).toEqual(3);
    expect(appliedPoint.z.pinLastValue()).toEqual(2);
});

test('Check applyToVector functions', async () => {
    let transform = new TransformSignalMock({
        position: new Vector3(1, 1, 1),
        rotation: new Quaternion(0.707107, 0, 0.707107, 0),
        scale: new Vector3(10, 1, 1)
    });

    let point = new VectorSignalMock(new Vector3(1, 1, 1));

    let appliedPoint = transform.applyToVector(point);

    expect(appliedPoint.x.pinLastValue()).toEqual(0.9999944299179984);
    expect(appliedPoint.y.pinLastValue()).toEqual(1);
    expect(appliedPoint.z.pinLastValue()).toEqual(-10.000006807878002);

    await transform.mockUpdate({
        position: new Vector3(1, 1, 1),
        rotation: new Quaternion(1, 0, 0, 0),
        scale: new Vector3(10, 1, 1)
    })

    expect(appliedPoint.x.pinLastValue()).toEqual(10);
    expect(appliedPoint.y.pinLastValue()).toEqual(1);
    expect(appliedPoint.z.pinLastValue()).toEqual(1);

    await point.mockUpdate(new Vector3(1, 2, 1))

    expect(appliedPoint.x.pinLastValue()).toEqual(10);
    expect(appliedPoint.y.pinLastValue()).toEqual(2);
    expect(appliedPoint.z.pinLastValue()).toEqual(1);
});

test('Check inverse function', async () => {
    let transform0 = new TransformSignalMock({
        position: new Vector3(10, 10, 10),
        rotation: new Quaternion(0.707107, 0, 0.707107, 0),
        scale: new Vector3(10, 10, 55)
    });

    let transform = transform0.inverse();

    expect(transform.x.pinLastValue()).toEqual(0.9999999999992338);
    expect(transform.y.pinLastValue()).toEqual(-0.9999999999999999);
    expect(transform.z.pinLastValue()).toEqual(-0.18181795676450285);

    expect(transform.rotation.w.pinLastValue()).toBe(0.7071061595574363);
    expect(transform.rotation.x.pinLastValue()).toBe(0);
    expect(transform.rotation.y.pinLastValue()).toBe(-0.7071074028141546);
    expect(transform.rotation.z.pinLastValue()).toBe(0);

    expect(transform.scaleX.pinLastValue()).toEqual(0.018181806929232606);
    expect(transform.scaleY.pinLastValue()).toEqual(0.09999999999999999);
    expect(transform.scaleZ.pinLastValue()).toEqual(0.09999993811020061);

    await transform0.mockUpdate({
        position: new Vector3(1, 1, 1),
        rotation: new Quaternion(1, 0, 0, 0),
        scale: new Vector3(2, 1, 1)
    })

    expect(transform.x.pinLastValue()).toEqual(-0.5);
    expect(transform.y.pinLastValue()).toEqual(-1);
    expect(transform.z.pinLastValue()).toEqual(-1);

    expect(transform.rotation.w.pinLastValue()).toBe(1);
    expect(transform.rotation.x.pinLastValue()).toBe(0);
    expect(transform.rotation.y.pinLastValue()).toBe(0);
    expect(transform.rotation.z.pinLastValue()).toBe(0);

    expect(transform.scaleX.pinLastValue()).toEqual(0.5);
    expect(transform.scaleY.pinLastValue()).toEqual(1);
    expect(transform.scaleZ.pinLastValue()).toEqual(1);
});

test('Check lookAt function', async () => {
    let transform0 = new TransformSignalMock({
        position: new Vector3(1, 0, 0),
        rotation: new Quaternion(1, 0, 0, 0),
        scale: new Vector3(10, 1, 1)
    });

    let point = new VectorSignalMock(new Vector3(0, 0, 0))

    let transform = transform0.lookAt(point);

    expect(transform.x.pinLastValue()).toEqual(1);
    expect(transform.y.pinLastValue()).toEqual(0);
    expect(transform.z.pinLastValue()).toEqual(0);

    expect(transform.rotation.w.pinLastValue()).toBe(0.7071067811865476);
    expect(transform.rotation.x.pinLastValue()).toBe(0);
    expect(transform.rotation.y.pinLastValue()).toBe(-0.7071067811865475);
    expect(transform.rotation.z.pinLastValue()).toBe(-0);

    expect(transform.scaleX.pinLastValue()).toEqual(10);
    expect(transform.scaleY.pinLastValue()).toEqual(1);
    expect(transform.scaleZ.pinLastValue()).toEqual(1);

    await transform0.mockUpdate({
        position: new Vector3(1, 1, 1),
        rotation: new Quaternion(0.707107, 0, 0.707107, 0),
        scale: new Vector3(1, 1, 1)
    })

    expect(transform.x.pinLastValue()).toEqual(1);
    expect(transform.y.pinLastValue()).toEqual(1);
    expect(transform.z.pinLastValue()).toEqual(1);

    expect(transform.rotation.w.pinLastValue()).toBe(0.8804762392171493);
    expect(transform.rotation.x.pinLastValue()).toBe(0.27984814233312133);
    expect(transform.rotation.y.pinLastValue()).toBe(-0.3647051996310009);
    expect(transform.rotation.z.pinLastValue()).toBe(-0.11591689595929514);

    expect(transform.scaleX.pinLastValue()).toEqual(1.0000006188981916);
    expect(transform.scaleY.pinLastValue()).toEqual(1);
    expect(transform.scaleZ.pinLastValue()).toEqual(1.0000006188981916);
});