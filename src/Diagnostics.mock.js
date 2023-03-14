let print = true;

export default class DiagnosticsMock {
    /**
     * @static
     * @param {string} text
     * @memberof DiagnosticsMock
     */
    static error(text) { if (print) console.log(text) }

    /**
     * @static
     * @param {string} text
     * @memberof DiagnosticsMock
     */
    static log(text) { if (print) console.log(text) }

    /**
     * @static
     * @param {string} text
     * @memberof DiagnosticsMock
     */
    static warn(text) { if (print) console.log(text) }

    static watch() { }

    static mockLogDisable() {
        print = false;
    }

    static mockLogEnable() {
        print = true;
    }
}