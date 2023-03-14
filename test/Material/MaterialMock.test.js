import Material from "../../src/Materials/Materials.mock";

beforeEach(async () => Material.mockReset());

test('Check findFirst function', async () => {
    Material.mockReset([
        {
            name: 'Material1',
            doubleSided: true
        },
        {
            name: 'Material1',
        },
        {
            name: 'Material1',
            doubleSided: false
        },
    ])

    let materials = await Material.findFirst('Material1');
    expect(materials.name).toBe('Material1')
    expect(materials.doubleSided.pinLastValue()).toBe(true)
});

test('Check getAll function', async () => {
    Material.mockReset([
        {
            name: 'Material01',
        },
        {
            name: 'Material1',
        },
        {
            name: 'Material02',
        },
    ])

    let materials = await Material.getAll();

    expect(materials.length).toBe(3)
    expect(materials[0].name).toBe('Material01')
    expect(materials[1].name).toBe('Material1')
    expect(materials[2].name).toBe('Material02')
});

test('Check findUsingPattern function', async () => {
    Material.mockReset([
        {
            name: 'Material1',
        },
        {
            name: 'Material2',
        },
        {
            name: 'Material3',
        },
        {
            name: 'Material1',
        },
        {
            name: 'Material2',
        },
        {
            name: 'Material3',
        },
        {
            name: 'test',
        },
        {
            name: 'test',
        },
    ])

    let materialsTest1 = await Material.findUsingPattern('Material*', { limit: 2 });
    expect(materialsTest1.length).toBe(2)
    expect(materialsTest1[0].name).toBe('Material1')
    expect(materialsTest1[1].name).toBe('Material2')

    let materialsTest2 = await Material.findUsingPattern('*aterial2');
    expect(materialsTest2.length).toBe(2)
    expect(materialsTest2[0].name).toBe('Material2')
    expect(materialsTest2[1].name).toBe('Material2')

    let materialsTest3 = await Material.findUsingPattern('*aterial*', { limit: 4 });
    expect(materialsTest3.length).toBe(4)
    expect(materialsTest3[0].name).toBe('Material1')
    expect(materialsTest3[1].name).toBe('Material2')
    expect(materialsTest3[2].name).toBe('Material3')
    expect(materialsTest3[3].name).toBe('Material1')

    let materialsTest4 = await Material.findUsingPattern('test');
    expect(materialsTest4[0].name).toBe('test')
    expect(materialsTest4[1].name).toBe('test')

    let materialsTest5 = await Material.findUsingPattern('test', { limit: 0 });
    expect(materialsTest5.length).toBe(0)

    let materialsTest6 = await Material.findUsingPattern('testik');
    expect(materialsTest6.length).toBe(0)
});

