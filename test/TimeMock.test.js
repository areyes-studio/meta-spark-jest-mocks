import Time from '../src/Time.mock';
// @ts-ignore
import * as matchers from 'jest-extended';

beforeEach(async () => await Time.mockReset());

test('Check deltatime property', async () => {
    await Time.mockIncreaseMs(50);

    expect(Time.ms.value).toBe(50);
    expect(Time.deltaTimeMS.value).toBe(50);

    await Time.mockIncreaseMs(150);

    expect(Time.ms.value).toBe(200);
    expect(Time.deltaTimeMS.value).toBe(150);

    await Time.mockIncreaseMs(10);

    expect(Time.ms.value).toBe(210);
    expect(Time.deltaTimeMS.value).toBe(10);
});

test('Check setInterval', async () => {
    let callback = jest.fn();
    let subscription = Time.setInterval(callback, 100);

    await Time.mockIncreaseMs(50);
    await Time.mockIncreaseMs(100);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(Time.ms.value).toBe(150);

    // check unsubscribe function
    subscription.unsubscribe();

    await Time.mockIncreaseMs(150);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(Time.ms.value).toBe(300);
});

test('Check setTimeout', async () => {
    let callback = jest.fn();
    Time.setTimeout(callback, 100);

    await Time.mockIncreaseMs(200);

    expect(callback).toHaveBeenCalledTimes(1);

    // check unsubscribe function
    let subscription = Time.setTimeout(callback, 100);
    subscription.unsubscribe();

    await Time.mockIncreaseMs(150);

    expect(callback).toHaveBeenCalledTimes(1);
});