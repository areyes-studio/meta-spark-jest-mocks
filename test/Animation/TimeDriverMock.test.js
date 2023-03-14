import Animation from "../../src/Animation/Animation.mock";
import Time from "../../src/Time.mock";
// @ts-ignore
import * as matchers from 'jest-extended';

expect.extend(matchers);

test('Check onComplete and onAfterIteration events', async () => {
    let driver = Animation.timeDriver({
        durationMilliseconds: 1000,
        loopCount: 1,
        mirror: false
    })

    driver.start();

    const onAfterIteration = jest.fn();
    const onCompleted = jest.fn();

    driver.onAfterIteration().subscribe(onAfterIteration);
    driver.onCompleted().subscribe(onCompleted);

    await Time.mockIncreaseMs(1000);
        
    expect(onAfterIteration).toHaveBeenCalledTimes(1);
    expect(onCompleted).toHaveBeenCalledTimes(1);
    expect(onCompleted).toHaveBeenCalledBefore(onAfterIteration);
});

test('Check onComplete and onAfterIteration events with infinity loopCount', async () => {
    let driver = Animation.timeDriver({
        durationMilliseconds: 1000,
        loopCount: Infinity,
        mirror: false
    })

    driver.start();

    const onAfterIteration = jest.fn();
    const onCompleted = jest.fn();

    driver.onAfterIteration().subscribe(onAfterIteration);
    driver.onCompleted().subscribe(onCompleted);

    await Time.mockIncreaseMs(10100);
        
    expect(onAfterIteration).toHaveBeenCalledTimes(10);
});

test('Check loopCount parameter', async () => {
    let driver = Animation.timeDriver({
        durationMilliseconds: 1000,
        loopCount: 2,
        mirror: false
    })

    driver.start();

    const onAfterIteration = jest.fn();
    const onCompleted = jest.fn();

    driver.onAfterIteration().subscribe(onAfterIteration);
    driver.onCompleted().subscribe(onCompleted);

    await Time.mockIncreaseMs(1100);
    await Time.mockIncreaseMs(900);
        
    expect(onAfterIteration).toHaveBeenCalledTimes(2);
    expect(onCompleted).toHaveBeenCalledTimes(1);
});

test('Check mirror parameter', async () => {
    let driver = Animation.timeDriver({
        durationMilliseconds: 1000,
        loopCount: 2,
        mirror: true
    })

    driver.start();

    const onAfterIteration = jest.fn();
    const onCompleted = jest.fn();

    driver.onAfterIteration().subscribe(onAfterIteration);
    driver.onCompleted().subscribe(onCompleted);

    while(driver._isRunning.value) {
        await Time.mockIncreaseMs(30)
    }

    expect(onAfterIteration).toHaveBeenCalledTimes(2);
    expect(onCompleted).toHaveBeenCalledTimes(1);
});

test('Check stop function', async () => {
    let driver0 = Animation.timeDriver({
        durationMilliseconds: 500,
        loopCount: 1,
        mirror: false
    })

    driver0.start();

    let driver1 = Animation.timeDriver({
        durationMilliseconds: 1000,
        loopCount: 1,
        mirror: false
    })

    driver1.start();

    driver0.onCompleted().subscribe(() => {
        driver1.stop();
    });

    const onAfterIteration = jest.fn();
    const onCompleted = jest.fn();

    driver1.onAfterIteration().subscribe(onAfterIteration);
    driver1.onCompleted().subscribe(onCompleted);

    while(driver0._isRunning.value || driver1._isRunning.value) {
        await Time.mockIncreaseMs(30);
    }

    expect(onAfterIteration).toHaveBeenCalledTimes(0);
    expect(onCompleted).toHaveBeenCalledTimes(0);
});

test('Check reverse function', async () => {
    let driver0 = Animation.timeDriver({
        durationMilliseconds: 10000,
        loopCount: 1,
        mirror: false
    })

    driver0.start();

    let driver1 = Animation.timeDriver({
        durationMilliseconds: 3000,
        loopCount: 4,
        mirror: false
    })

    driver1.start();

    driver0.onCompleted().subscribe(() => {
        driver1.reverse();
    });

    const onAfterIteration = jest.fn();
    const onCompleted = jest.fn();

    driver1.onAfterIteration().subscribe(onAfterIteration);
    driver1.onCompleted().subscribe(onCompleted);

    while(driver0._isRunning.value || driver1._isRunning.value) {
        await Time.mockIncreaseMs(30);
    }

    expect(onAfterIteration).toHaveBeenCalledTimes(7);
    expect(onCompleted).toHaveBeenCalledTimes(1);
});