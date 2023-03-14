import Patches from "../../src/Patches/Patches.mock";
import PatchesInputsMock from "../../src/Patches/PatchesInputs.mock";
import PatchesOuputsMock from "../../src/Patches/PatchesOutputs.mock";

test('check properties', async () =>{
    expect(Patches.inputs).toBe(PatchesInputsMock)
    expect(Patches.outputs).toBe(PatchesOuputsMock)
})