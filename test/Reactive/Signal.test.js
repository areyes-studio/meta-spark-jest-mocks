import SignalMock from "../../src/Reactive/Signal.mock";

test('check monitor function', async () => {
    let signal = new SignalMock(0);

    signal.monitor().subscribe((/** @type {*} */ value) => {
        expect(value.oldValue).toBe(0)
        expect(value.newValue).toBe(1)
    })

    await signal.mockUpdate(1);
});