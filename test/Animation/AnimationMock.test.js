import Animation from "../../src/Animation/Animation.mock"
import Time from "../../src/Time.mock"

test('check animate function', async () => {
    let driver = Animation.timeDriver({
        durationMilliseconds: 1000,
        loopCount: 1
    });

    driver.start();

    let scalar = Animation.animate(driver, Animation.samplers.linear(0, 10));

    await Time.mockIncreaseMs(500);

    expect(driver.progress.value).toBe(0.5);
    expect(scalar.value).toBe(5);
})