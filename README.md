# Meta Spark Jest Mocks
This package provides Jest mocks for the modules used in Meta Spark Studio.

## Installation
You can install this package using npm:

    npm install @areyes.studio/meta-spark-jest-mocks --save-dev

## Usage
Import the mocks into your test files and use them to mock the Meta Spark Studio modules:

    import { mockModuleA, mockModuleB } from '@areyes.studio/meta-spark-jest-mocks';

    jest.mock('module-a', () => mockModuleA);
    jest.mock('module-b', () => mockModuleB);

    describe('My test suite', () => {
    // Tests using the mocked modules
    });

You can modify these mocks as needed to fit your specific testing requirements.

## License
This package is licensed under the MIT License.