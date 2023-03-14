import BoolSignalMock from "../../src/Reactive/BoolSignal.mock";
import SceneObjectBaseMock from "../../src/Scene/SceneObjectBase.mock";
import Scene from "../../src/Scene/SceneModule.mock";

beforeEach(async () => await Scene.mockReset());

test('Check default params', async () => {
    let object = new SceneObjectBaseMock({ name: 'name' });

    expect(object.transform.x.pinLastValue()).toBe(0);
    expect(object.transform.y.pinLastValue()).toBe(0);
    expect(object.transform.z.pinLastValue()).toBe(0);

    expect(object.transform.scaleX.pinLastValue()).toBe(1);
    expect(object.transform.scaleY.pinLastValue()).toBe(1);
    expect(object.transform.scaleZ.pinLastValue()).toBe(1);

    expect(object.transform.rotation.w.pinLastValue()).toBe(1);
    expect(object.transform.rotation.x.pinLastValue()).toBe(0);
    expect(object.transform.rotation.y.pinLastValue()).toBe(0);
    expect(object.transform.rotation.z.pinLastValue()).toBe(0);

    expect(object.hidden.pinLastValue()).toBe(false);

    expect(object.identifier.includes('object:')).toBe(true);
});

test('Check hidden property', async () => {
    let object = new SceneObjectBaseMock({ name: 'name' });
    object.hidden = false;

    expect(object.hidden.pinLastValue()).toBe(false)

    let boolean = new BoolSignalMock(false);
    object.hidden = boolean;

    await boolean.mockUpdate(true);

    expect(object.hidden.pinLastValue()).toBe(true);

    object.hidden = true;
    await boolean.mockUpdate(false);

    expect(object.hidden.pinLastValue()).toBe(true);

});

test('Check findFirst function', async () => {
    Scene.mockReset([
        {
            type: 'SceneObject',
            name: 'object',
            children: [
                {
                    type: 'SceneObject',
                    name: 'object',
                    children: [
                        {
                            type: 'SceneObject',
                            name: 'FindMe',
                            transform: { x: 1 }
                        },
                    ]
                },
                {
                    type: 'SceneObject',
                    name: 'FindMe',
                    transform: { x: 2 }
                },
            ]
        },
        {
            type: 'SceneObject',
            name: 'FindMe',
            transform: { x: 3 }
        }
    ])

    let object = await Scene.root.findFirst('FindMe');

    expect(object.name).toBe('FindMe');
    expect(object.transform.x.pinLastValue()).toBe(1);

    expect((await object.getParent()).name).toBe('object')
});

test('Check findAll function', async () => {
    Scene.mockReset([
        {
            name: 'object',
            children: [
                {
                    name: 'object',
                    children: [
                        {
                            name: 'FindMe',
                            transform: { x: 1 }
                        },
                    ]
                },
                {
                    name: 'FindMe',
                    transform: { x: 2 }
                },
            ]
        },
        {
            name: 'FindMe',
            transform: { x: 3 }
        }
    ])

    let objects = await Scene.root.findAll('FindMe');
    expect(objects.length).toBe(3);

    objects = await Scene.root.findAll('FindMe', { recursive: false });
    expect(objects.length).toBe(1);
});

test('Check findByPath function', async () => {
    Scene.mockReset([
        {
            name: 'object0',
            children: [
                {
                    name: 'object',
                    children: [
                        {
                            name: 'FindMe',
                            transform: { x: 1 }
                        },
                    ]
                },
                {
                    name: 'object0',
                    children: [
                        {
                            name: 'FindMe',
                            transform: { x: 1 }
                        },
                    ]
                },
                {
                    name: 'FindMe',
                    transform: { x: 2 }
                },
            ]
        },
        {
            name: 'object1',
            children: [
                {
                    name: 'FindMe',
                    transform: { x: 3 }
                },
            ]
        },
        {
            name: 'FindMe',
            transform: { x: 4 }
        },
        {
            name: '*',
            transform: { x: 4 }
        }
    ])

    let objects = await Scene.root.findByPath('FindMe');
    expect(objects.length).toBe(1);
    expect(objects[0].transform.x.pinLastValue()).toBe(4);

    objects = await Scene.root.findByPath('object0/FindMe');
    expect(objects.length).toBe(1);
    expect(objects[0].transform.x.pinLastValue()).toBe(2);

    objects = await Scene.root.findByPath('object0/object/FindMe');
    expect(objects.length).toBe(1);
    expect(objects[0].transform.x.pinLastValue()).toBe(1);

    objects = await Scene.root.findByPath('*/FindMe');
    expect(objects.length).toBe(2);

    objects = await Scene.root.findByPath('object*/FindMe');
    expect(objects.length).toBe(2);

    objects = await Scene.root.findByPath('*object1/FindMe');
    expect(objects.length).toBe(1);

    objects = await Scene.root.findByPath('**/FindMe');
    expect(objects.length).toBe(5);

    objects = await Scene.root.findByPath('object0/**/FindMe');
    expect(objects.length).toBe(3);

    objects = await Scene.root.findByPath('object*/**/FindMe');
    expect(objects.length).toBe(4);
});

test('Check find by tags functions', async () => {
    Scene.mockReset([
        {
            name: 'object0',
            tags: ['FindMe'],
            children: [
                {
                    name: 'object1',
                    tags: ['FindMe'],
                    children: [
                        {
                            name: 'object2',
                            tags: ['FindMe', 'tag2'],
                        },
                    ]
                },
                {
                    name: 'object3',
                    tags: ['FindMe', 'tag2'],
                },
            ]
        },
        {
            name: 'object4',
            tags: ['FindMeToo'],
        },
        {
            name: 'object5',
        }
    ])

    // check findByTag

    let objects = await Scene.root.findByTag('FindMe');
    expect(objects.length).toBe(4);

    objects = await Scene.root.findByTag('FindMe', { recursive: false });
    expect(objects.length).toBe(1);

    objects = await Scene.root.findByTag('FindMe', { limit: 2 });
    expect(objects.length).toBe(2);

    // check findByAnyTags

    objects = await Scene.root.findByAnyTags(['FindMe', 'FindMeToo']);
    expect(objects.length).toBe(5);

    objects = await Scene.root.findByAnyTags(['FindMe', 'FindMeToo'], { recursive: false });
    expect(objects.length).toBe(2);

    objects = await Scene.root.findByAnyTags(['FindMe', 'FindMeToo'], { limit: 1 });
    expect(objects.length).toBe(1);

    // check findByAllTags

    objects = await Scene.root.findByAllTags(['FindMe', 'tag2']);
    expect(objects.length).toBe(2);

    objects = await Scene.root.findByAllTags(['FindMe', 'tag2'], { recursive: false });
    expect(objects.length).toBe(0);

    objects = await Scene.root.findByAllTags(['FindMe', 'tag2'], { limit: 1 });
    expect(objects.length).toBe(1);

});

test('check addChild method', async () => {
    Scene.mockReset([
        {
            type: 'SceneObject',
            name: 'parent0',
            children: [
                {
                    type: 'SceneObject',
                    name: 'parent2',
                    children: [
                        {
                            name: 'child',
                        }
                    ]
                }
            ]
        },
        {
            type: 'SceneObject',
            name: 'parent1',
            children: [
                {
                    name: 'child0'
                }
            ]
        }
    ])

    let parent0 = await Scene.root.findFirst('parent0');
    let parent1 = await Scene.root.findFirst('parent1');
    let parent2 = await Scene.root.findFirst('parent2');

    let createdChild = await Scene.create('SceneObject', {
        name: 'child',
    })
    let createdChild0 = await Scene.create('SceneObject', {
        name: 'child',
    })
    let createdParent = await Scene.create('SceneObject', {
        name: 'createdParent',
    })

    await parent2.addChild(createdChild);
    expect(parent2._children.includes(createdChild)).toBeTruthy();
    expect(createdChild.name).toEqual('child0');
    expect(createdChild._parent.name).toEqual('parent2')

    await parent2.addChild(createdChild0);
    expect(parent2._children.includes(createdChild0)).toBeTruthy();
    expect(parent2._children.length).toEqual(3);
    expect(createdChild0.name).toEqual('child1');

    await parent1.addChild(createdChild);
    expect(createdChild._parent.name).toEqual('parent1')
    expect(parent2._children.length).toEqual(2);
    expect(parent1._children.length).toEqual(2);
    expect(createdChild.name).toEqual('child1');

    await parent0.addChild(createdParent);
    await createdParent.addChild(createdChild);

    expect(createdParent._children.length).toEqual(1);
})

test('check getParent method', async () => {
    Scene.mockReset([
        {
            name: 'parent'
        }
    ])

    let child0 = await Scene.create('SceneObject', {
        name: 'child'
    })
    let parent = await Scene.root.findFirst('parent');
    await parent.addChild(child0);

    expect((await child0.getParent()).name).toEqual('parent');
})

test('check setTags and addTag methods', async () => {
    Scene.mockReset([
        {
            name: 'object0',
            children: [
                {
                    name: 'object1',
                    children: [
                        {
                            name: 'object2',
                        },
                    ]
                },
            ]
        },
    ])

    let object0 = await Scene.root.findFirst('object0');
    let object1 = await Scene.root.findFirst('object1');
    let object2 = await Scene.root.findFirst('object2');

    await object0.setTags(['FindMe', 'Hello']);
    await object1.addTag('I am object1');
    await object2.setTags(['HelloWorld', 'I am object2']);
    await object2.addTag('object2');

    let tagCheck0 = await Scene.root.findByTag('Hello');
    let tagCheck1 = await Scene.root.findByTag('FindMe');
    let tagCheck2 = await Scene.root.findByTag('I am object1');
    let tagCheck3 = await Scene.root.findByAllTags(['HelloWorld', 'I am object2', 'object2']);

    expect(tagCheck0[0].name).toEqual('object0');
    expect(tagCheck1[0].name).toEqual('object0');
    expect(tagCheck2[0].name).toEqual('object1');
    expect(tagCheck3[0].name).toEqual('object2');
})

test('check getTags method', async () => {
    Scene.mockReset([
        {
            name: 'object0',
            tags: ['FindMe', 'tag0', 'object0'],
            children: [
                {
                    name: 'object1',
                    tags: ['FindMe'],
                    children: [
                        {
                            name: 'object2',
                            tags: ['FindMe', 'tag2'],
                        },
                    ]
                },
                {
                    name: 'object3',
                    tags: ['FindMe', 'tag3'],
                },
            ]
        },
        {
            name: 'object4',
            tags: ['FindMeToo', 'object4', 'theLastTag'],
        },
    ])

    let object0 = await Scene.root.findFirst('object0');
    let object1 = await Scene.root.findFirst('object1');
    let object2 = await Scene.root.findFirst('object2');
    let object3 = await Scene.root.findFirst('object3');
    let object4 = await Scene.root.findFirst('object4');

    expect(await object0.getTags()).toEqual(['FindMe', 'tag0', 'object0']);
    expect((await object1.getTags())[0]).toEqual('FindMe');
    expect(await object2.getTags()).toEqual(['FindMe', 'tag2']);
    expect(await object3.getTags()).toEqual(['FindMe', 'tag3']);
    expect(await object4.getTags()).toEqual(['FindMeToo', 'object4', 'theLastTag']);
})

test('check removeTag method', async() => {
    Scene.mockReset([
        {
            name: 'object0',
            tags: ['FindMe', 'tag0', 'object0'],
            children: [
                {
                    name: 'object1',
                    tags: ['FindMe'],
                    children: [
                        {
                            name: 'object2',
                            tags: ['FindMe', 'tag2'],
                        },
                    ]
                },
            ]
        },
        {
            name: 'object3',
            tags: ['FindMeToo', 'object4', 'theLastTag'],
        },
    ])

    let object0 = await Scene.root.findFirst('object0');
    let object1 = await Scene.root.findFirst('object1');
    let object2 = await Scene.root.findFirst('object2');
    let object3 = await Scene.root.findFirst('object3');

    await object0.removeTag('FindMe');
    await object1.removeTag('FindMe');
    await object2.removeTag('FindMe');
    await object2.removeTag('tag2');
    await object3.removeTag('object4');

    expect(await object0.getTags()).toEqual(['tag0', 'object0']);
    expect((await object1.getTags()).length).toEqual(0);
    expect(await object2.getTags()).toEqual([]);
    expect(await object3.getTags()).toEqual(['FindMeToo', 'theLastTag']);
})