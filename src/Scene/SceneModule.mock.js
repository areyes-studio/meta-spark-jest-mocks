import SceneObjectBaseMock from "./SceneObjectBase.mock";

/** @type {SceneObjectBaseMock} */
let root = null;

/** @type {import("./SceneObjectBase.mock").SceneObjectBaseMockParams[]} */
let sceneStructure = [];

let possibleDynamicSceneObjects = ['Block', 'Plane', 'Canvas', 'PlanarImage', 'AmbientLightSource', 'DirectionalLightSource', 'PointLightSource', 'SpotLightSource', 'ParticleSystem', 'SceneObject']

export class SceneMock {
    static get root() {
        if (!root) {
            root = new SceneObjectBaseMock({name: 'root', children: sceneStructure});
        };

        return root;
    }

    static projectToScreen() {}
    static unprojectToFocalPlane() {}
    static unprojectWithDepth() {}

    /**
     * @param {import("./SceneObjectBase.mock").SceneObjectBaseMockParams[]} structure
     * @memberof SceneMock
     */
    static mockReset(structure = []) {
        root = null;
        sceneStructure = structure;
    }

    /**
     * @param {string} className 
     * @param {import("./SceneObjectBase.mock").SceneObjectBaseMockParams} initialState
     * @returns { Promise<SceneObjectBaseMock> }
     */
    static async create(className, initialState = {name : 'dynamic' + className}) {
        let create = async () => {
            if (possibleDynamicSceneObjects.includes(className)) {
                let resultSceneObject =  new SceneObjectBaseMock(initialState);
                resultSceneObject._type = className;
                resultSceneObject._dynamic = true;
                resultSceneObject._parent = null;
                return resultSceneObject;
            } else {
                console.warn('Possible Unhandled Promise Rejection: Error: Unexpected class name: ' + className + ' in call to Scene.create()');
                return null;
            }
        }

        return create();
    }


    /**
     * 
     * @param {SceneObjectBaseMock} object
     * @param {import("./SceneObjectBase.mock").SceneObjectBaseMockParams} initialState
     * @param {boolean} cloneChildren 
     */
    static async clone(object, cloneChildren = true, initialState = {name: 'dynamic' + object._type}) {
        let clone = async () => {
            /**@type {import("./SceneObjectBase.mock").SceneObjectBaseMockParams} */
            let objParams = {
                name: initialState.name ?? 'dynamic' + object._type,
                hidden: initialState.hidden ?? false,
                type: object._type,
                transform: Array.from(Object.keys(initialState)).includes('transform') ? {
                    x: initialState.transform.x ?? object.transform.x.value,
                    y: initialState.transform.y ?? object.transform.y.value,
                    z: initialState.transform.z ?? object.transform.z.value,
                    rotationW: initialState.transform.rotationW ?? object.transform.rotation.w.value,
                    rotationX: initialState.transform.rotationX ?? object.transform.rotation.x.value,
                    rotationY: initialState.transform.rotationY ?? object.transform.rotation.y.value,
                    rotationZ: initialState.transform.rotationZ ?? object.transform.rotation.z.value,
                    scaleX: initialState.transform.scaleX ?? object.transform.scaleX.value,
                    scaleY: initialState.transform.scaleY ?? object.transform.scaleY.value,
                    scaleZ: initialState.transform.scaleZ ?? object.transform.scaleZ.value,
                } : /**@type {import("./SceneObjectBase.mock").TransformParams}*/ {},
                tags: initialState.tags ?? object._tags,
                dynamic: true,
            }

            let returnedSceneObject = await SceneMock.create(object._type, objParams);
        
            let parent = object._parent;

            parent._children.forEach(c => {
                while (c._name === returnedSceneObject._name) {
                    let lastChar = returnedSceneObject._name.split('')[returnedSceneObject._name.split('').length - 1];
                    if(!isNaN(parseInt(lastChar))) {
                        let newIndex = parseInt(lastChar) + 1;
                        let childNameArray = returnedSceneObject._name.split('').fill(newIndex.toString(), -1);
                        returnedSceneObject._name = childNameArray.join('');
                    } else {
                        returnedSceneObject._name = returnedSceneObject._name + 0;
                    }
                }
            })

            await parent.addChild(returnedSceneObject);

            /**@type {SceneObjectBaseMock[]} */
            let childrenArray = [];
            if (cloneChildren) {
                object._children.forEach(async(child) => {
                    let newChild = new SceneObjectBaseMock({name: child.name, type: child._type});
                    childrenArray.push(newChild);
                })
            }
            
            returnedSceneObject._children = childrenArray;

            return returnedSceneObject;
        } 
        
        return clone();
    }

    /**
     * @param {SceneObjectBaseMock} object 
     */
    static async destroy(object) {
        let destroy = async() => {if (object._parent !== null) object.removeFromParent()};
        await destroy();
    }
}

export default SceneMock
