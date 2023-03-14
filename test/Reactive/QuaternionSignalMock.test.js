import ScalarSignalMock from "../../src/Reactive/ScalarSignal.mock";
import QuaternionSignalMock from "../../src/Reactive/QuaternionSignal.mock";
import Quaternion from 'quaternion';

test('check properties,', async () => {
    let QuaternionMock = new QuaternionSignalMock(new Quaternion(1, 2, 3, 4));
    let testW = QuaternionMock.w;
    let testX = QuaternionMock.x;
    let testY = QuaternionMock.y;
    let testZ = QuaternionMock.z;

    expect(testW).toEqual(new ScalarSignalMock(1));
    expect(testX).toEqual(new ScalarSignalMock(2));
    expect(testY).toEqual(new ScalarSignalMock(3));
    expect(testZ).toEqual(new ScalarSignalMock(4));

    await QuaternionMock.mockUpdate(new Quaternion(0, -1, -2, -3))

    expect(testW).toEqual(new ScalarSignalMock(0));
    expect(testX).toEqual(new ScalarSignalMock(-1));
    expect(testY).toEqual(new ScalarSignalMock(-2));
    expect(testZ).toEqual(new ScalarSignalMock(-3));
})


test('check conjugate function', async () => {
    let QuaternionMock = new QuaternionSignalMock(new Quaternion(10, 25, 0, -7));
    let test = QuaternionMock.conjugate();

    expect(test instanceof QuaternionSignalMock).toBeTruthy();
    expect(test.w.pinLastValue()).toEqual(10);
    expect(test.x.pinLastValue()).toEqual(-25);
    expect(test.y.pinLastValue()).toEqual(-0);
    expect(test.z.pinLastValue()).toEqual(7);

    await QuaternionMock.mockUpdate(new Quaternion(-2, 2, 2, 2));

    expect(test instanceof QuaternionSignalMock).toBeTruthy();
    expect(test.w.pinLastValue()).toEqual(-2);
    expect(test.x.pinLastValue()).toEqual(-2);
    expect(test.y.pinLastValue()).toEqual(-2);
    expect(test.z.pinLastValue()).toEqual(-2);
})

test('check dot function', async () => {

    let QuaternionMock = new QuaternionSignalMock(new Quaternion(1, 1, -1, 1))
    let QuaternionMocksignal = new QuaternionSignalMock(new Quaternion(1, -1, -1, -1))
    let test = QuaternionMock.dot(QuaternionMocksignal)

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(0);

    await QuaternionMock.mockUpdate(new Quaternion(-0.5, -0.5, -0.5, 0.5));
    await QuaternionMocksignal.mockUpdate(new Quaternion(0.5, 0.5, 0.5, 0.5));

    expect(test instanceof ScalarSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(-0.5);
})

test('check invert function', async () => {
    let QuaternionMock = new QuaternionSignalMock(new Quaternion(1, 1, 1, 1))
    let test = QuaternionMock.invert()

    expect(test instanceof QuaternionSignalMock).toBeTruthy();
    expect(test.w.pinLastValue()).toEqual(1);
    expect(test.x.pinLastValue()).toEqual(-1);
    expect(test.y.pinLastValue()).toEqual(-1);
    expect(test.z.pinLastValue()).toEqual(-1);

    await QuaternionMock.mockUpdate(new Quaternion(0, 0, 0, 0));

    expect(test instanceof QuaternionSignalMock).toBeTruthy();
    expect(test.w.pinLastValue()).toEqual(0);
    expect(test.x.pinLastValue()).toEqual(-0);
    expect(test.y.pinLastValue()).toEqual(-0);
    expect(test.z.pinLastValue()).toEqual(-0);
})

test('check mul function', async () => {
    let QuaternionMock = new QuaternionSignalMock(new Quaternion(0, 0, 0, 0));
    let QuaternionMocksignal = new QuaternionSignalMock(new Quaternion(1, 1, 1, 1));
    let test = QuaternionMock.mul(QuaternionMocksignal);


    expect(test instanceof QuaternionSignalMock).toBeTruthy();
    expect(test.w.pinLastValue()).toEqual(0);
    expect(test.x.pinLastValue()).toEqual(0);
    expect(test.y.pinLastValue()).toEqual(0);
    expect(test.z.pinLastValue()).toEqual(0);

    await QuaternionMock.mockUpdate(new Quaternion(0, 2, -5, 0));
    await QuaternionMocksignal.mockUpdate(new Quaternion(-25, -6, 8, 3));

    expect(test instanceof QuaternionSignalMock).toBeTruthy();
    expect(test.w.pinLastValue()).toEqual(52);
    expect(test.x.pinLastValue()).toEqual(-65);
    expect(test.y.pinLastValue()).toEqual(119);
    expect(test.z.pinLastValue()).toEqual(-14);
})

test('check pinLastValue function', async () => {
    let QuaternionMock = new QuaternionSignalMock(new Quaternion(0, 0, 0, 0));
    let test = QuaternionMock.pinLastValue();

    expect(test instanceof QuaternionSignalMock).toBeTruthy();
    expect(test.w.pinLastValue()).toEqual(0);
    expect(test.x.pinLastValue()).toEqual(0);
    expect(test.y.pinLastValue()).toEqual(0);
    expect(test.z.pinLastValue()).toEqual(0);

    await QuaternionMock.mockUpdate(new Quaternion(0, 2, -5, 0));

    expect(test instanceof QuaternionSignalMock).toBeTruthy();
    expect(test.w.pinLastValue()).toEqual(0);
    expect(test.x.pinLastValue()).toEqual(0);
    expect(test.y.pinLastValue()).toEqual(0);
    expect(test.z.pinLastValue()).toEqual(0);
})

test('check reactive', async () => {
    let quat = new QuaternionSignalMock(new Quaternion(1, 1, 2, 3));

    expect(quat.x.pinLastValue()).toEqual(1);
    expect(quat.x.pinLastValue()).toEqual(1);
    expect(quat.y.pinLastValue()).toEqual(2);
    expect(quat.z.pinLastValue()).toEqual(3);

    await quat.mockUpdateX(10);

    expect(quat.w.pinLastValue()).toEqual(1);
    expect(quat.x.pinLastValue()).toEqual(10);
    expect(quat.y.pinLastValue()).toEqual(2);
    expect(quat.z.pinLastValue()).toEqual(3);

    let scalarX = new ScalarSignalMock(9);

    await quat.mockUpdateX(scalarX);

    expect(quat.w.pinLastValue()).toEqual(1);
    expect(quat.x.pinLastValue()).toEqual(9);
    expect(quat.y.pinLastValue()).toEqual(2);
    expect(quat.z.pinLastValue()).toEqual(3);

    await scalarX.mockUpdate(5);

    expect(quat.w.pinLastValue()).toEqual(1);
    expect(quat.x.pinLastValue()).toEqual(5);
    expect(quat.y.pinLastValue()).toEqual(2);
    expect(quat.z.pinLastValue()).toEqual(3);

    let quatSignal = new QuaternionSignalMock(new Quaternion(0, 0, 0, 0));

    await quat.mockUpdate(quatSignal);
    await scalarX.mockUpdate(100);

    expect(quat.w.pinLastValue()).toEqual(0);
    expect(quat.x.pinLastValue()).toEqual(0);
    expect(quat.y.pinLastValue()).toEqual(0);
    expect(quat.z.pinLastValue()).toEqual(0);

    await quat.mockUpdateX(scalarX);
    await quatSignal.mockUpdate(new Quaternion(10, 0, 10, 10))

    expect(quat.w.pinLastValue()).toEqual(10);
    expect(quat.x.pinLastValue()).toEqual(100);
    expect(quat.y.pinLastValue()).toEqual(10);
    expect(quat.z.pinLastValue()).toEqual(10);

    await quat.mockUpdateW(scalarX);
    await quat.mockUpdateY(scalarX);
    await quat.mockUpdateZ(scalarX);
    await quatSignal.mockUpdate(new Quaternion(0, 10, 0, 0));

    expect(quat.w.pinLastValue()).toEqual(100);
    expect(quat.x.pinLastValue()).toEqual(100);
    expect(quat.y.pinLastValue()).toEqual(100);
    expect(quat.z.pinLastValue()).toEqual(100);
})
