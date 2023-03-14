import SceneObjectBaseMock from "../../src/Scene/SceneObjectBase.mock";
import Scene from "../../src/Scene/SceneModule.mock";

beforeEach(async () => await Scene.mockReset());

test('Check root creation', async () => {
    expect(Scene.root.name).toBe('root');
});

test('Check creation child Objects process', async () => {
    Scene.mockReset([
        {
            name: 'object'
        },
        {
            name: 'hiddenObject',
            hidden: true
        },
        {
            name: 'scaledObject',
            transform: { scaleX: 10, scaleY: 10, scaleZ: 10 }
        }
    ])

    let object = await Scene.root.findFirst('object');

    expect(object.name).toBe('object');

    let hiddenObject = await Scene.root.findFirst('hiddenObject');

    expect(hiddenObject.name).toBe('hiddenObject');
    expect(hiddenObject.hidden.pinLastValue()).toBe(true);


    let scaledObject = await Scene.root.findFirst('scaledObject');

    expect(scaledObject.name).toBe('scaledObject');
    expect(scaledObject.transform.scaleX.pinLastValue()).toBe(10);
});

test('check create and destroy methods', async () => {
    Scene.mockReset([
        {
            name: 'mainParent'
        }
    ])

    let createdObject = await Scene.create('Plane', {
        name: 'plane0'
    })

    let createdParent = await Scene.create('SceneObject', {
        name: 'nullObject'
    })

    let mainParent = await Scene.root.findFirst('mainParent');
    await mainParent.addChild(createdParent);
    await createdParent.addChild(createdObject);
    expect(createdParent._children.length).toEqual(1);

    expect(createdObject instanceof SceneObjectBaseMock).toBeTruthy();

    await Scene.destroy(createdObject);

    expect(createdParent._children.length).toEqual(0);
})

test('check clone method', async () => {
    Scene.mockReset([
        {
            name: 'mainParent',
        }
    ])

    let mainParent = await Scene.root.findFirst('mainParent');
    let object = await Scene.create('SceneObject', {
        name: 'object'
    });

    await mainParent.addChild(object);

    let child0 = await Scene.create('Plane', {
        name: 'child0'
    });

    let child1 = await Scene.create('SceneObject', {
        name: 'child1'
    })

    await object.addChild(child0);
    await object.addChild(child1);

    let object0 = await Scene.clone(object);

    expect(object0.name).toEqual('dynamicSceneObject');
    expect(object0._children.length).toEqual(2);
    expect(object0._children[0].name).toEqual('child0');
    expect(object0._children[1].name).toEqual('child1');
    expect(object0._tags.length).toEqual(0);

    await object.addTag('newTag');

    let object1 = await Scene.clone(object, false);

    expect(object1.name).toEqual('dynamicSceneObject0');
    expect(object1._children.length).toEqual(0);
    expect(object1._tags[0]).toEqual('newTag');
    expect(object1._tags.length).toEqual(1);
    
    let object2 = await Scene.clone(object, false, {name: 'IhaveName', tags: ['Tag']});

    expect(object2.name).toEqual('IhaveName');
    expect(object2._tags[0]).toEqual('Tag');
    expect(object2._tags.length).toEqual(1);  
})