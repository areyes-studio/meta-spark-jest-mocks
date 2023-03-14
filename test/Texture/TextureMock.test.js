import Texture from "../../src/Textures/Textures.mock";

beforeEach(async () => Texture.mockReset());
afterAll(async () => Texture.mockReset());

test('Check findFirst function', async () => {
    Texture.mockReset([
        {
            name: 'Texture1',
            height: 5,
            width: 10
        },
        {
            name: 'Texture1',
            height: 50,
            width: 100

        },
        {
            name: 'Texture1',
            height: 25,
            width: 1
        },
    ])

    let texture = await Texture.findFirst('Texture1');
    expect(texture.name).toBe('Texture1')
    expect(texture.height.pinLastValue()).toBe(5)
    expect(texture.width.pinLastValue()).toBe(10)
});

test('Check getAll function', async () => {
    Texture.mockReset([
        {
            name: 'Texture01',
        },
        {
            name: 'Texture1',

        },
        {
            name: 'Texture02',
        },
    ])

    let texture = await Texture.getAll();
    expect(texture.length).toBe(3)
    expect(texture[0].name).toBe('Texture01')
    expect(texture[1].name).toBe('Texture1')
    expect(texture[2].name).toBe('Texture02')
});

test('Check findUsingPattern function', async () => {
    Texture.mockReset([
        {
            name: 'Texture1',
        },
        {
            name: 'Texture2',

        },
        {
            name: 'Texture3',
        },
        {
            name: 'texture1',
        },
        {
            name: 'texture2',

        },
        {
            name: 'texture3',
        },
        {
            name: 'test',
        }, {
            name: 'test',
        },

    ])

    let textureTest1 = await Texture.findUsingPattern('Texture*', { limit: 2 });
    expect(textureTest1.length).toBe(2)
    expect(textureTest1[0].name).toBe('Texture1')
    expect(textureTest1[1].name).toBe('Texture2')

    let textureTest2 = await Texture.findUsingPattern('*exture2');
    expect(textureTest2.length).toBe(2)
    expect(textureTest2[0].name).toBe('Texture2')
    expect(textureTest2[1].name).toBe('texture2')

    let textureTest3 = await Texture.findUsingPattern('*exture', { limit: 4 });
    expect(textureTest3.length).toBe(4)
    expect(textureTest3[0].name).toBe('Texture1')
    expect(textureTest3[1].name).toBe('Texture2')
    expect(textureTest3[2].name).toBe('Texture3')
    expect(textureTest3[3].name).toBe('texture1')

    let textureTest4 = await Texture.findUsingPattern('test');
    expect(textureTest4[0].name).toBe('test')
    expect(textureTest4[1].name).toBe('test')

    let textureTest5 = await Texture.findUsingPattern('test', { limit: 0 });
    expect(textureTest5.length).toBe(0)

    let textureTest6 = await Texture.findUsingPattern('testik');
    expect(textureTest6.length).toBe(0)
});

