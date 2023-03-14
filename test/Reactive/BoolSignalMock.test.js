import BoolSignalMock from "../../src/Reactive/BoolSignal.mock";
import ScalarSignalMock from "../../src/Reactive/ScalarSignal.mock";
import StringSignalMock from "../../src/Reactive/StringSignalMock";
import SubscriptionMock from "../../src/Reactive/Subscription.mock";

test('test onOn function', async () => {
    let boolSignalMock = new BoolSignalMock(true)
    let test1 = null
    let test2 = null
    let subscription = boolSignalMock.onOn().subscribe(() => {
        test1 = "good"
        subscription.unsubscribe()
    })

    let subscriptionOnfireOnInitialValue = boolSignalMock.onOn({ 'fireOnInitialValue': true }).subscribe(async () => {
        test2 = "good";
        subscriptionOnfireOnInitialValue.unsubscribe();
    })

    expect(subscription instanceof SubscriptionMock).toBeTruthy();
    expect(test1).toEqual(null);
    expect(subscriptionOnfireOnInitialValue instanceof SubscriptionMock).toBeTruthy();


    await boolSignalMock.mockUpdate(false)

    expect(test1).toEqual(null);
    expect(test2).toEqual("good");

    await boolSignalMock.mockUpdate(true)

    expect(test1).toEqual("good");
    expect(test2).toEqual("good");

    await boolSignalMock.mockUpdate(false)

    expect(test1).toEqual("good");
    expect(test2).toEqual("good");
})

test('test onOff function', async () => {
    let boolSignalMock = new BoolSignalMock(false)
    let test1 = null
    let test2 = null
    let subscription = boolSignalMock.onOff().subscribe(() => {
        test1 = "good"
        subscription.unsubscribe()
    })

    let subscriptionOfffireOnInitialValue = boolSignalMock.onOff({ 'fireOnInitialValue': true }).subscribe(async () => {
        test2 = "good";
        subscriptionOfffireOnInitialValue.unsubscribe();
    })

    expect(subscription instanceof SubscriptionMock).toBeTruthy();
    expect(test1).toEqual(null);
    expect(subscriptionOfffireOnInitialValue instanceof SubscriptionMock).toBeTruthy();


    await boolSignalMock.mockUpdate(true)

    expect(test1).toEqual(null);
    expect(test2).toEqual("good");

    await boolSignalMock.mockUpdate(false)

    expect(test1).toEqual("good");
    expect(test2).toEqual("good");

    await boolSignalMock.mockUpdate(true)

    expect(test1).toEqual("good");
    expect(test2).toEqual("good");
})

test('test and function', async () => {
    let boolSignalMock = new BoolSignalMock(true)
    let BoolSignal = new BoolSignalMock(false)
    let test1 = boolSignalMock.and(BoolSignal)
    let test2 = boolSignalMock.and(false)

    expect(test1 instanceof BoolSignalMock).toBeTruthy();
    expect(test2 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(false);
    expect(test2.pinLastValue()).toEqual(false);

    await BoolSignal.mockUpdate(true)

    expect(test1.pinLastValue()).toEqual(true);
    expect(test2.pinLastValue()).toEqual(false);

    await boolSignalMock.mockUpdate(false)

    expect(test1.pinLastValue()).toEqual(false);
    expect(test2.pinLastValue()).toEqual(false);
})

test('test or function', async () => {
    let boolSignalMock = new BoolSignalMock(true)
    let BoolSignal = new BoolSignalMock(false)
    let test1 = boolSignalMock.or(BoolSignal)
    let test2 = boolSignalMock.or(false)

    expect(test1 instanceof BoolSignalMock).toBeTruthy();
    expect(test2 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(true);
    expect(test2.pinLastValue()).toEqual(true);

    await boolSignalMock.mockUpdate(false)

    expect(test1.pinLastValue()).toEqual(false);
    expect(test2.pinLastValue()).toEqual(false);

    await BoolSignal.mockUpdate(true)

    expect(test1.pinLastValue()).toEqual(true);
    expect(test2.pinLastValue()).toEqual(false);
})

test('test eq function', async () => {
    let boolSignalMock = new BoolSignalMock(true)
    let BoolSignal = new BoolSignalMock(false)
    let test1 = boolSignalMock.eq(BoolSignal)
    let test2 = boolSignalMock.eq(false)

    expect(test1 instanceof BoolSignalMock).toBeTruthy();
    expect(test2 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(false);
    expect(test2.pinLastValue()).toEqual(false);

    await boolSignalMock.mockUpdate(false)

    expect(test1.pinLastValue()).toEqual(true);
    expect(test2.pinLastValue()).toEqual(true);

    await BoolSignal.mockUpdate(true)

    expect(test1.pinLastValue()).toEqual(false);
    expect(test2.pinLastValue()).toEqual(true);
})

test('test ne function', async () => {
    let boolSignalMock = new BoolSignalMock(true)
    let BoolSignal = new BoolSignalMock(false)
    let test1 = boolSignalMock.ne(BoolSignal)
    let test2 = boolSignalMock.ne(false)

    expect(test1 instanceof BoolSignalMock).toBeTruthy();
    expect(test2 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(true);
    expect(test2.pinLastValue()).toEqual(true);

    await boolSignalMock.mockUpdate(false)

    expect(test1.pinLastValue()).toEqual(false);
    expect(test2.pinLastValue()).toEqual(false);

    await BoolSignal.mockUpdate(true)

    expect(test1.pinLastValue()).toEqual(true);
    expect(test2.pinLastValue()).toEqual(false);
})

test('test not function', async () => {
    let boolSignalMock = new BoolSignalMock(true)
    let test = boolSignalMock.not()

    expect(test instanceof BoolSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(false);

    await boolSignalMock.mockUpdate(false)

    expect(test.pinLastValue()).toEqual(true);
})

test('test xorfunction', async () => {
    let boolSignalMock = new BoolSignalMock(true)
    let test = boolSignalMock.not()

    expect(test instanceof BoolSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(false);

    await boolSignalMock.mockUpdate(false)

    expect(test.pinLastValue()).toEqual(true);
})

test('test xor function', async () => {
    let boolSignalMock = new BoolSignalMock(true)
    let BoolSignal = new BoolSignalMock(false)
    let test1 = boolSignalMock.xor(BoolSignal)
    let test2 = boolSignalMock.xor(false)

    expect(test1 instanceof BoolSignalMock).toBeTruthy();
    expect(test2 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual(true);
    expect(test2.pinLastValue()).toEqual(true);

    await BoolSignal.mockUpdate(true)

    expect(test1.pinLastValue()).toEqual(false);
    expect(test2.pinLastValue()).toEqual(true);

    await boolSignalMock.mockUpdate(false)

    expect(test1.pinLastValue()).toEqual(true);
    expect(test2.pinLastValue()).toEqual(false);

    await BoolSignal.mockUpdate(false)
    expect(test1.pinLastValue()).toEqual(false);
    expect(test2.pinLastValue()).toEqual(false);
})

test('test ifThenElse function', async () => {
    let boolSignalMock = new BoolSignalMock(true)
    let StringSignal = new StringSignalMock('false')
    let ScalarSignal = new ScalarSignalMock(0)
    let BoolSignal = new BoolSignalMock(false)

    let test1 = boolSignalMock.ifThenElse('true', StringSignal)
    let test2 = boolSignalMock.ifThenElse(1, ScalarSignal)
    let test3 = boolSignalMock.ifThenElse(true, BoolSignal)

    expect(test1 instanceof StringSignalMock).toBeTruthy();
    expect(test2 instanceof ScalarSignalMock).toBeTruthy();
    expect(test3 instanceof BoolSignalMock).toBeTruthy();
    expect(test1.pinLastValue()).toEqual('true');
    expect(test2.pinLastValue()).toEqual(1);
    expect(test3.pinLastValue()).toEqual(true);

    await boolSignalMock.mockUpdate(false)

    expect(test1.pinLastValue()).toEqual('false');
    expect(test2.pinLastValue()).toEqual(0);
    expect(test3.pinLastValue()).toEqual(false);

    await StringSignal.mockUpdate('true')
    await ScalarSignal.mockUpdate(1)
    await BoolSignal.mockUpdate(true)

    expect(test1.pinLastValue()).toEqual('true');
    expect(test2.pinLastValue()).toEqual(1);
    expect(test3.pinLastValue()).toEqual(true);
})

test('test pin function', async () => {
    let boolSignalMock = new BoolSignalMock(true)
    let test = boolSignalMock.pin()

    expect(test instanceof BoolSignalMock).toBeTruthy();
    expect(test.pinLastValue()).toEqual(true);

    await boolSignalMock.mockUpdate(false)

    expect(boolSignalMock.pinLastValue()).toEqual(false);
    expect(test.pinLastValue()).toEqual(true);
})

test('test pinLastValue function', async () => {
    let boolSignalMock = new BoolSignalMock(true)
    let test = boolSignalMock.pinLastValue()
    expect((typeof test == "boolean")).toBeTruthy();
    expect(test).toEqual(true);

    await boolSignalMock.mockUpdate(false)

    expect(boolSignalMock.pinLastValue()).toEqual(false);
    expect(test).toEqual(true);
})