import Blocks from "../src/Blocks.mock";
import Scene from "../src/Scene/SceneModule.mock";
import SceneObjectBaseMock from "../src/Scene/SceneObjectBase.mock";

test('check instantiate method', async () => {
    Scene.mockReset([
        {
            name: 'mainParent'
        }
    ])

    let block0 = await Blocks.instantiate('block0', {
        name: 'block0'
    })
    let block1 = await Blocks.instantiate('block1');
    let block2 = await Blocks.instantiate('block2');

    let createdParent = await Scene.create('SceneObject', {
        name: 'nullObject'
    })

    let mainParent = await Scene.root.findFirst('mainParent');
    await mainParent.addChild(createdParent);
    await createdParent.addChild(block0);
    await createdParent.addChild(block1);
    await createdParent.addChild(block2);

    expect(createdParent._children.length).toEqual(3);
    expect(block0 instanceof SceneObjectBaseMock).toBeTruthy();
    expect(block0.name).toEqual('block0');
    expect(block1.name).toEqual('dynamicBlock');
    expect(block2.name).toEqual('dynamicBlock0');
})