
import PatchesInputsMock from "./PatchesInputs.mock";
import PatchesOuputsMock from "./PatchesOutputs.mock";

export class PatchesMock {
    static get inputs() {
        return PatchesInputsMock
    }

    static get outputs() {
        return PatchesOuputsMock
    }
}

export default PatchesMock