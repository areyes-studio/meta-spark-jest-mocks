import Persistence from "../../src/Persistence/Persistence.mock";

test('check local property and StorageLocation', async() => {
    let local = Persistence.local
    local.set('key1', 5 )
    local.set('key1', true)
    local.set('key2', [0,1])
    local.set('key3', 'key3')

    let test1 = await local.get('key1')
    let test2 = /**@type {number[]} */ (await local.get('key2'))
    let test3 = await local.get('key3')
    let test4 = await local.get('key4')

    expect(test1).toBe(true)
    expect(test2.length).toBe(2)
    expect(test2[0]).toBe(0)
    expect(test2[1]).toBe(1)
    expect(test3).toBe('key3')
    expect(test4).toBe(null)

    local.remove('key2')

    let test5 = await local.get('key2')

    expect(test5).toBe(null)
})

test('check block property and StorageLocation', async() => {
    let block = Persistence.local
    block.set('key1', 5 )
    block.set('key1', true)
    block.set('key2', [0,1])
    block.set('key3', 'key3')

    let test1 = await block.get('key1')
    let test2 = /**@type {number[]} */ (await block.get('key2'))
    let test3 = await block.get('key3')
    let test4 = await block.get('key4')

    expect(test1).toBe(true)
    expect(test2.length).toBe(2)
    expect(test2[0]).toBe(0)
    expect(test2[1]).toBe(1)
    expect(test3).toBe('key3')
    expect(test4).toBe(null)

    block.remove('key2')

    let test5 = await block.get('key2')

    expect(test5).toBe(null)
})