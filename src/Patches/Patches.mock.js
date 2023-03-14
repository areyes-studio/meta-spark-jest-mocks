
import PatchesInputsMock from "./PatchesInputs.mock";
import PatchesOuputsMock from "./PatchesOutputs.mock";

export default class PatchesMock {
    static get inputs() {
        return PatchesInputsMock
    }

    static get outputs() {
        return PatchesOuputsMock
    }
}