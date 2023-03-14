import StringSignalMock from "../../src/Reactive/StringSignal.mock";
import BoolSignalMock from "../../src/Reactive/BoolSignal.mock";

test('check concat function', async () => {
    let stringSignalMock = new StringSignalMock('Hello ');
    let stringSignal = new StringSignalMock('World');

    let test1 = stringSignalMock.concat(stringSignal);
    let test2 = stringSignalMock.concat('World');

    expect(test1 instanceof StringSignalMock).toBeTruthy();
    expect(test2 instanceof StringSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual('Hello World')
    expect(test2.pinLastValue()).toEqual('Hello World')

    await stringSignal.mockUpdate('hello')
    await stringSignalMock.mockUpdate('')

    expect(test1 instanceof StringSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual('hello')
    expect(test2.pinLastValue()).toEqual('World')
})

test('check contains function', async () => {
    let stringSignalMock = new StringSignalMock('Hello ');
    let stringSignal = new StringSignalMock('ll');

    let test1 = stringSignalMock.contains(stringSignal);
    let test2 = stringSignalMock.contains('LL');

    expect(test1 instanceof BoolSignalMock).toBeTruthy();
    expect(test2 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(true)
    expect(test2.pinLastValue()).toEqual(false)

    await stringSignal.mockUpdate('heLLo')
    await stringSignalMock.mockUpdate('ll')

    expect(test1 instanceof BoolSignalMock).toBeTruthy();
    expect(test2 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(false)
    expect(test2.pinLastValue()).toEqual(false)
})

test('check eq function', async () => {
    let stringSignalMock = new StringSignalMock('Hello ');
    let stringSignal = new StringSignalMock(' Hello ');

    let test1 = stringSignalMock.eq(stringSignal);
    let test2 = stringSignalMock.eq(' Hello');

    expect(test1 instanceof BoolSignalMock).toBeTruthy();
    expect(test2 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(false);
    expect(test2.pinLastValue()).toEqual(false);

    await stringSignal.mockUpdate('HeLL o ')
    await stringSignalMock.mockUpdate('HeLL o ')

    expect(test1 instanceof BoolSignalMock).toBeTruthy();
    expect(test2 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(true);
    expect(test2.pinLastValue()).toEqual(false);
})

test('check ne function', async () => {
    let stringSignalMock = new StringSignalMock('Hello ');
    let stringSignal = new StringSignalMock(' Hello ');

    let test1 = stringSignalMock.ne(stringSignal);
    let test2 = stringSignalMock.ne(' Hello');

    expect(test1 instanceof BoolSignalMock).toBeTruthy();
    expect(test2 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(true);
    expect(test2.pinLastValue()).toEqual(true);
    await stringSignal.mockUpdate('HeLL o ')
    await stringSignalMock.mockUpdate('HeLL o ')

    expect(test1 instanceof BoolSignalMock).toBeTruthy();
    expect(test2 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(false);
    expect(test2.pinLastValue()).toEqual(true);

})

test('check pin function', async () => {
    let stringSignalMock = new StringSignalMock('Hello ');

    let test1 = stringSignalMock.pin();

    expect(test1 instanceof StringSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual('Hello ');

    await stringSignalMock.mockUpdate('')

    expect(test1 instanceof StringSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual('Hello ');
})

test('check pinLastValue function', async () => {
    let stringSignalMock = new StringSignalMock('Hello ');

    let test1 = stringSignalMock.pinLastValue();

    expect(typeof test1 === 'string').toBeTruthy();
    expect(test1).toEqual('Hello ')

    await stringSignalMock.mockUpdate('')

    expect(typeof test1 === 'string').toBeTruthy();
    expect(test1).toEqual('Hello ')
})

test('test pin function', async () => {
    let stringSignalMock = new StringSignalMock('true')
    let test = stringSignalMock.pin()

    expect(test instanceof StringSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual('true');

    await stringSignalMock.mockUpdate('false')

    expect(stringSignalMock.pinLastValue()).toEqual("false");
    expect(test.pinLastValue()).toEqual("true");
})

test('test pinLastValue function', async () => {
    let stringSignalMock = new StringSignalMock("true")
    let test = stringSignalMock.pinLastValue()

    expect((typeof test == "string")).toBeTruthy();
    expect(test).toEqual("true");

    await stringSignalMock.mockUpdate("false")

    expect(stringSignalMock.pinLastValue()).toEqual("false");
    expect(test).toEqual("true");
})

