export class PatchesMock {
    static get inputs(): typeof PatchesInputsMock;
    static get outputs(): typeof PatchesOuputsMock;
}
export default PatchesMock;
import PatchesInputsMock from "./PatchesInputs.mock";
import PatchesOuputsMock from "./PatchesOutputs.mock";
