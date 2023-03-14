# Meta Spark Jest Mocks
This package provides Jest mocks for the modules used in Meta Spark Studio.

## Installation
You can install this package using npm:

    npm install @areyes.studio/meta-spark-jest-mocks --save-dev

## Usage
Import the mocks into your test files and use them to mock the Meta Spark Studio modules:

    import { ReactiveMock, ScalarSignalMock } from "@areyes-studio/meta-spark-jest-mocks";

    test('Check vector method', async () => {
        let x = new ScalarSignalMock(0);
        let vector = ReactiveMock.vector(x, 0, 0);

        expect(vector.x.pinLastValue()).toBe(0);
        expect(vector.y.pinLastValue()).toBe(0);
        
        await x.mockUpdate(1);

        expect(vector.x.pinLastValue()).toBe(1);
        expect(vector.y.pinLastValue()).toBe(0);
    });

You can modify these mocks as needed to fit your specific testing requirements.

## License
This package is licensed under the MIT License.